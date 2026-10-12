#!/usr/bin/env node
// Hook Claude Code (PostToolUse sur Edit|MultiEdit|Write) : vérifie le fichier modifié avec les règles SIKU.
// Code de sortie 2 = Claude reçoit le message et doit corriger. Installé par « npx siku ai sync ».
import { readFileSync, existsSync } from 'node:fs';
import { extname } from 'node:path';
import { checkFiles } from './siku.mjs';

let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  let file;
  try { const j = JSON.parse(input || '{}'); file = j.tool_input?.file_path ?? j.tool_input?.path; } catch { process.exit(0); }
  if (!file || !existsSync(file) || !['.svelte', '.css', '.ts', '.js'].includes(extname(file))) process.exit(0);
  if (/node_modules|\/dist\/|\/html\//.test(file)) process.exit(0);
  const errors = checkFiles([file]).filter((f) => f.level === 'error');
  if (!errors.length) process.exit(0);
  process.stderr.write(`Design system SIKU — ${errors.length} violation(s) dans ${file} :\n` +
    errors.map((e) => `- ligne ${e.line} [${e.rule}] ${e.msg}\n    ${e.text}`).join('\n') +
    `\nCorrige en utilisant @siku/ui et ses tokens (voir node_modules/@siku/ui/ai/SIKU.md). Exception justifiée : commentaire « siku-allow » avec la raison.\n`);
  process.exit(2);
});

#!/usr/bin/env node
// Lors d'une installation depuis Git : si le tag contient déjà dist/ (tags de release), rien à faire ;
// sinon (branche de développement), on construit le package.
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const stamp = existsSync('dist/.version') ? readFileSync('dist/.version', 'utf8').trim() : '';
if (stamp === pkg.version && existsSync('dist/index.js')) process.exit(0);
execSync('bun run build', { stdio: 'inherit' });

// SIKU — coloration syntaxique légère pour CodeBlock : un tokenizer par expressions régulières, sans dépendance, pour les formats qu'une interface affiche (configuration, données, scripts).
export type Language = 'json' | 'javascript' | 'typescript' | 'css' | 'html' | 'xml' | 'lua' | 'yaml' | 'shell' | 'markdown' | 'text';
export type TokenType = 'plain' | 'comment' | 'string' | 'number' | 'keyword' | 'name' | 'attr' | 'punct';
export type Token = { type: TokenType; text: string };

type Rule = { type: TokenType; re: RegExp; when?: 'tag' | 'text'; enter?: 'tag' | 'text' };

const EXTENSIONS: Record<string, Language> = {
  json: 'json', js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'javascript', ts: 'typescript', mts: 'typescript', tsx: 'typescript',
  css: 'css', html: 'html', htm: 'html', svelte: 'html', vue: 'html', xml: 'xml', svg: 'xml', lua: 'lua', yml: 'yaml', yaml: 'yaml',
  sh: 'shell', bash: 'shell', zsh: 'shell', cfg: 'shell', md: 'markdown', markdown: 'markdown', txt: 'text', csv: 'text', log: 'text',
};

/** Le langage d'un fichier d'après son extension ; text si inconnu. */
export function languageOf(name: string): Language {
  const dot = name.lastIndexOf('.');
  return EXTENSIONS[dot > 0 ? name.slice(dot + 1).toLowerCase() : ''] ?? 'text';
}

const words = (list: string) => new RegExp(`\\b(?:${list.split(' ').join('|')})\\b`, 'y');
const IDENT = /[A-Za-z_$][\w$]*/y;
const NUMBER = /\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/y;
const DQ = /"(?:[^"\\\n]|\\.)*"?/y;
const SQ = /'(?:[^'\\\n]|\\.)*'?/y;

const JS_KEYWORDS = 'abstract as async await break case catch class const continue debugger default delete do else enum export extends false finally for from function get if implements import in instanceof interface let new null of package private protected public readonly return satisfies set static super switch this throw true try type typeof undefined var void while with yield declare keyof namespace never unknown any number string boolean object symbol bigint';

const RULES: Record<Exclude<Language, 'text'>, Rule[]> = {
  json: [
    { type: 'name', re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y },
    { type: 'string', re: DQ },
    { type: 'number', re: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
    { type: 'keyword', re: words('true false null') },
    { type: 'punct', re: /[{}[\]:,]/y },
  ],
  javascript: [
    { type: 'comment', re: /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y },
    { type: 'string', re: /`(?:[^`\\]|\\[\s\S])*`?/y },
    { type: 'string', re: DQ },
    { type: 'string', re: SQ },
    { type: 'number', re: NUMBER },
    { type: 'keyword', re: words(JS_KEYWORDS) },
    { type: 'name', re: /[A-Za-z_$][\w$]*(?=\s*[(:])/y },
    { type: 'plain', re: IDENT },
    { type: 'punct', re: /[{}()[\].,;]|[+\-*/%=<>!&|?^~:]+/y },
  ],
  typescript: [],
  css: [
    { type: 'comment', re: /\/\*[\s\S]*?(?:\*\/|$)/y },
    { type: 'string', re: DQ },
    { type: 'string', re: SQ },
    { type: 'keyword', re: /@[\w-]+/y },
    { type: 'number', re: /#[0-9a-fA-F]{3,8}\b|-?(?:\d*\.)?\d+(?:%|[a-zA-Z]+)?\b/y },
    { type: 'name', re: /--?[\w-]+(?=\s*:)/y },
    { type: 'attr', re: /[.#:]{1,2}[\w-]+(?:\([^)]*\))?/y },
    { type: 'plain', re: /[A-Za-z_-][\w-]*/y },
    { type: 'punct', re: /[{}();:,>+~*]/y },
  ],
  html: [
    { type: 'comment', re: /<!--[\s\S]*?(?:-->|$)|<![^>]*>/y },
    { type: 'name', re: /<\/?[\w:.-]+/y, enter: 'tag' },
    { type: 'punct', re: /\/?>/y, when: 'tag', enter: 'text' },
    { type: 'string', re: DQ, when: 'tag' },
    { type: 'string', re: SQ, when: 'tag' },
    { type: 'attr', re: /[\w:@.-]+(?=\s*=)/y, when: 'tag' },
    { type: 'punct', re: /=/y, when: 'tag' },
    { type: 'plain', re: /[^<\n]+/y, when: 'text' },
  ],
  xml: [],
  lua: [
    { type: 'comment', re: /--\[(=*)\[[\s\S]*?(?:\]\1\]|$)|--[^\n]*/y },
    { type: 'string', re: /\[(=*)\[[\s\S]*?(?:\]\1\]|$)/y },
    { type: 'string', re: DQ },
    { type: 'string', re: SQ },
    { type: 'number', re: NUMBER },
    { type: 'keyword', re: words('and break do else elseif end false for function goto if in local nil not or repeat return then true until while') },
    { type: 'name', re: /[A-Za-z_]\w*(?=\s*[({"']|\s*\[=*\[)/y },
    { type: 'plain', re: IDENT },
    { type: 'punct', re: /[{}()[\].,;:]|\.\.\.?|[+\-*/%^#=<>~]+/y },
  ],
  yaml: [
    { type: 'comment', re: /#[^\n]*/y },
    { type: 'name', re: /[\w.\-/"']+(?=\s*:(?:\s|$))/my },
    { type: 'string', re: DQ },
    { type: 'string', re: SQ },
    { type: 'number', re: /\b\d+(?:\.\d+)?\b/y },
    { type: 'keyword', re: words('true false null yes no on off') },
    { type: 'punct', re: /^\s*-(?=\s)|[:[\]{},|>&*!]/my },
    { type: 'plain', re: /[A-Za-z_][\w./-]*/y },
  ],
  shell: [
    { type: 'comment', re: /#[^\n]*/y },
    { type: 'string', re: /"(?:[^"\\]|\\[\s\S])*"?/y },
    { type: 'string', re: /'[^']*'?/y },
    { type: 'name', re: /\$\{[^}\n]*\}?|\$[\w@#?*!$-]+/y },
    { type: 'number', re: /\b\d+\b/y },
    { type: 'keyword', re: words('if then else elif fi for in do done while until case esac function return local export set unset echo exit source alias cd ensure start stop restart') },
    { type: 'punct', re: /[|&;<>()=]+/y },
    { type: 'plain', re: /[A-Za-z_][\w./-]*/y },
  ],
  markdown: [
    { type: 'keyword', re: /^#{1,6}[^\n]*/my },
    { type: 'string', re: /```[\s\S]*?(?:```|$)|`[^`\n]*`?/y },
    { type: 'name', re: /\[[^\]\n]*\]\([^)\n]*\)/y },
    { type: 'punct', re: /^\s*(?:[-*+]|\d+\.)(?=\s)|^>+|[*_]{1,3}/my },
    { type: 'plain', re: /[^\n`[*_#>-]+/y },
  ],
};
RULES.typescript = RULES.javascript;
RULES.xml = RULES.html;

/** Découpe le code en lignes de tokens typés. */
export function highlight(code: string, language: Language): Token[][] {
  const rules = language === 'text' ? [] : RULES[language];
  const lines: Token[][] = [];
  let line: Token[] = [];
  let mode: 'tag' | 'text' = 'text';
  let pos = 0;
  const push = (type: TokenType, text: string) => {
    const parts = text.split('\n');
    for (let i = 0; i < parts.length; i += 1) {
      if (i > 0) { lines.push(line); line = []; }
      if (!parts[i]) continue;
      const last = line[line.length - 1];
      if (last && last.type === type) last.text += parts[i];
      else line.push({ type, text: parts[i] });
    }
  };
  while (pos < code.length) {
    let matched = false;
    for (const rule of rules) {
      if (rule.when && rule.when !== mode) continue;
      rule.re.lastIndex = pos;
      const m = rule.re.exec(code);
      if (!m || m.index !== pos || m[0].length === 0) continue;
      push(rule.type, m[0]);
      pos += m[0].length;
      if (rule.enter) mode = rule.enter;
      matched = true;
      break;
    }
    if (!matched) { push('plain', code[pos]); pos += 1; }
  }
  lines.push(line);
  return lines;
}

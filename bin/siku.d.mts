export type Finding = { file: string; line: number; rule: string; level: 'error' | 'warn'; msg: string; text: string };
export function checkFiles(files: string[], options?: { self?: boolean; web?: boolean }): Finding[];

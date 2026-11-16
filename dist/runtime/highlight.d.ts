export type Language = 'json' | 'javascript' | 'typescript' | 'css' | 'html' | 'xml' | 'lua' | 'yaml' | 'shell' | 'markdown' | 'text';
export type TokenType = 'plain' | 'comment' | 'string' | 'number' | 'keyword' | 'name' | 'attr' | 'punct';
export type Token = {
    type: TokenType;
    text: string;
};
/** Le langage d'un fichier d'après son extension ; text si inconnu. */
export declare function languageOf(name: string): Language;
/** Découpe le code en lignes de tokens typés. */
export declare function highlight(code: string, language: Language): Token[][];

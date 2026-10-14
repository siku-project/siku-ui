/** Action Svelte : use:trapFocus — garde le focus dans le nœud, le rend au précédent à la sortie. */
export declare function trapFocus(node: HTMLElement, options?: {
    initial?: string;
}): {
    destroy(): void;
};
/** Index suivant dans une grille de `cols` colonnes et `count` éléments. */
export declare function gridMove(index: number, key: string, cols: number, count: number): number;

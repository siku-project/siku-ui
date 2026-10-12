export type PropDoc = { name: string; type: string; default: string; desc: string };
export type Control = { prop: string; options?: string[]; bool?: boolean; text?: boolean; number?: [number, number] };
export type ComponentDoc = { name: string; group: string; summary: string; use?: string[]; avoid?: string[]; props: PropDoc[]; controls?: Control[]; example: string };
export const groups: { id: string; label: string }[];
export const components: ComponentDoc[];

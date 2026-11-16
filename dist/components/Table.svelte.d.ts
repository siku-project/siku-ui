import type { Snippet } from 'svelte';
declare function $$render<Row extends Record<string, unknown>>(): {
    props: {
        columns: {
            key: string;
            label: string;
            align?: "left" | "right";
            width?: string;
        }[];
        rows: Row[];
        selected?: number;
        caption?: string;
        cell?: Snippet<[Row, {
            key: string;
            label: string;
            align?: "left" | "right";
            width?: string;
        }]>;
        onselect?: (i: number) => void;
    };
    exports: {};
    bindings: "selected";
    slots: {};
    events: {};
};
declare class __sveltets_Render<Row extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<Row>>['props'];
    events(): ReturnType<typeof $$render<Row>>['events'];
    slots(): ReturnType<typeof $$render<Row>>['slots'];
    bindings(): "selected";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Row extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Row>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Row>['props']>, ReturnType<__sveltets_Render<Row>['events']>, ReturnType<__sveltets_Render<Row>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Row>['bindings']>;
    } & ReturnType<__sveltets_Render<Row>['exports']>;
    <Row extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<Row>['props']> & {}): ReturnType<__sveltets_Render<Row>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Table: $$IsomorphicComponent;
type Table<Row extends Record<string, unknown>> = InstanceType<typeof Table<Row>>;
export default Table;

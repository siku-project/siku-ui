import type { Snippet } from 'svelte';
import type { DataColumn, DataState, SortState } from '../types';
declare function $$render<Row extends Record<string, unknown>>(): {
    props: {
        columns: DataColumn[];
        rows: Row[];
        sort?: SortState | null;
        rowKey?: (row: Row, index: number) => string | number;
        selected?: string | number | null;
        caption?: string;
        empty?: string;
        state?: DataState;
        message?: string;
        dense?: boolean;
        sticky?: boolean;
        maxHeight?: string;
        virtual?: boolean;
        rowHeight?: number;
        cell?: Snippet<[Row, DataColumn]>;
        onselect?: (row: Row, index: number) => void;
        onsort?: (sort: SortState) => void;
    };
    exports: {};
    bindings: "sort" | "selected";
    slots: {};
    events: {};
};
declare class __sveltets_Render<Row extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<Row>>['props'];
    events(): ReturnType<typeof $$render<Row>>['events'];
    slots(): ReturnType<typeof $$render<Row>>['slots'];
    bindings(): "sort" | "selected";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Row extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Row>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Row>['props']>, ReturnType<__sveltets_Render<Row>['events']>, ReturnType<__sveltets_Render<Row>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Row>['bindings']>;
    } & ReturnType<__sveltets_Render<Row>['exports']>;
    <Row extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<Row>['props']> & {}): ReturnType<__sveltets_Render<Row>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DataTable: $$IsomorphicComponent;
type DataTable<Row extends Record<string, unknown>> = InstanceType<typeof DataTable<Row>>;
export default DataTable;

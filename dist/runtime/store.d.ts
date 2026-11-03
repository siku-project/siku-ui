export type Readable<T> = {
    subscribe(run: (v: T) => void): () => void;
    get(): T;
};
export declare function writable<T>(initial: T): {
    subscribe(run: (v: T) => void): () => void;
    get: () => T;
    set(v: T): void;
};

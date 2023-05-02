import { Collection } from "discord.js";


export type Monitors<K, V> = Partial<{
    get: (collection: Collection<K, V>, key: K) => unknown;
    set: (key: K, value: V) => unknown;
    delete: (collection: Collection<K, V>, key: K) => unknown
    sweep: (difference: Collection<K, V>) => unknown
}>

export class MonitoredCollection<K, V> extends Collection<K, V> {
    monitors: Monitors<K, V>

    constructor(
        iterable: Iterable<readonly [K, V]> | null | undefined,
        monitors: Monitors<K, V>
    ) {
        super(iterable);
        this.monitors = monitors;
    }

    get(key: K, trigger?: boolean) {
        if (trigger && this.monitors.get)
            this.monitors.get(this, key);
        return super.get(key);
    }

    set(key: K, value: V, trigger?: boolean) {
        if (trigger && this.monitors.set)
            this.monitors.set(key, value);
        return super.set(key, value);
    }

    delete(key: K, trigger?: boolean) {
        if (trigger && this.monitors.delete)
            this.monitors.delete(this, key);
        return super.delete(key);
    }

    sweep(fn: (value: V, key: K, collection: this) => boolean, trigger?: boolean) {
        const old = this.clone();
        const removed = super.sweep(fn);
        if (trigger && this.monitors.sweep)
            this.monitors.sweep(this.difference(old))
        return removed;
    }
}
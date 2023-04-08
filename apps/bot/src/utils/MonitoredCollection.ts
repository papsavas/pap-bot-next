import { Collection } from "discord.js";


export type Monitors<K, V> = Partial<{
    get: (collection: MonitoredCollection<K, V>, key: K) => unknown;
    set: (key: K, value: V) => unknown;
}>

export class MonitoredCollection<K, V> extends Collection<K, V> {
    monitors: Partial<Monitors<K, V>>

    constructor(
        iterable: Iterable<readonly [K, V]> | null | undefined,
        monitors: Partial<Monitors<K, V>>
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
}
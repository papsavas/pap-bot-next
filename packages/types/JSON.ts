import { DataManager } from "discord.js"
export type ToJSON<T> = {
    [K in keyof T]:
    T[K] extends (args: any) => infer R ? R :
    T[K] extends Array<infer U> ? Array<ToJSON<U>> :
    T[K] extends Map<infer K, infer V> ? ToJSON<K> :
    T[K] extends DataManager<infer K, infer Holds, infer R> ? ToJSON<K[]> :
    T[K] extends string | number ? T[K] :
    ToJSON<T[K]>;
}


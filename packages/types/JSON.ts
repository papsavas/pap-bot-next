import { DataManager } from "discord.js"
export type JSON<T> = {
    [K in keyof T]:
    T[K] extends (args: any) => infer R ? R :
    T[K] extends Array<infer U> ? Array<JSON<U>> :
    T[K] extends Map<infer K, infer V> ? JSON<K> :
    T[K] extends DataManager<infer K, infer Holds, infer R> ? JSON<K[]> :
    T[K] extends string | number ? T[K] :
    JSON<T[K]>;
}


export { Collection, Guild, Snowflake } from "discord.js";

type FunctionResult<T> = {
    [K in keyof T]: T[K] extends (...args: any) => any
    ? ReturnType<T[K]>
    : never
}

export type JSON<T> =
    T extends Array<infer U>
    ? Array<FunctionResult<U>>
    : FunctionResult<T>

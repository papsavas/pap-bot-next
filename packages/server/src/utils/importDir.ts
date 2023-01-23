import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * @description Only targets top level directories (`src/<dir>`)
 * @param dir Target Directory 
 * @param filter 
 * @returns Promise Array of provided Type `T`
 */
export const importDir = <T extends any>(
    path: string,
    filter: (v: string) => boolean = () => true): Promise<T>[] =>
    readdirSync(path)
        .filter(filter)
        .map(file =>
            import(join(path, file)).then(r => r.default));

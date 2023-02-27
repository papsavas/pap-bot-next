import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

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
            import(join(pathToFileURL(path).toString(), file)).then(r => r.default));

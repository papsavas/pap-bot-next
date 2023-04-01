import { readdirSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * @description Only targets top level directories (`src/<dir>`)
 * @param dir Target Directory 
 * @param filter 
 * @returns Promise Array of provided Type `T`
 */
export const importDir = <T>(
    path: string,
    filter: (v: string) => boolean = () => true): Promise<T>[] =>
    readdirSync(path)
        .filter(filter)
        .map(file =>
            import(join(pathToFileURL(path).toString(), file)).then(r => r.default));



export const importMappedDir = async <T>(
    path: string,
    filter: (v: string) => boolean = () => true): Promise<Map<string, T>> => {
    const map = new Map<string, T>();
    const files = await readdir(path);
    await Promise.all(
        files
            .filter(filter)
            .map(file =>
                import(
                    join(pathToFileURL(path).toString(), file)
                ).then(r => { map.set(file.split(".")[0], r.default) }))
    )
    return map;
}



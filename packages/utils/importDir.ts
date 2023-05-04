import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type WithFilename<T> = T & { filename: string };

/**
 * @description Requires files with **default export** ⚠️
 * @param path Target relative path (`<parentDir>/<dir>`)
 * @param filter 
 * @returns Promise Array of provided Type `T`
 */
export const importDir = <T>(
    path: string,
    filter: (v: string) => boolean = () => true): Promise<WithFilename<T>[]> => {
    const resolvedPath = resolve(path);
    return readdir(resolvedPath)
        .then(r =>
            Promise.all(
                r
                    .filter(filter)
                    .map(file =>
                        import(join(pathToFileURL(resolvedPath).toString(), file))
                            .then(r => r.default ? ({ ...r.default as T, filename: file }) : Promise.reject(`ImportDir: no default export provided for file ${file}`))
                    )
            )
        )
}


/**
 * @description Requires files with **default export**
 * @description Only targets top level directories (`src/<dir>`)
 * @param dir Target Directory 
 * @param filter 
 * @returns Map<`fileName`, `T`>
 */
export const importMappedDir = async <T>(
    path: string,
    filter: (v: string) => boolean = () => true): Promise<Map<string, T>> => {
    const map = new Map<string, T>();
    const files = await readdir(resolve(path));
    await Promise.all(
        files
            .filter(filter)
            .map(file =>
                import(
                    join(resolve(path).toString(), file)
                ).then(r =>
                    r.default ?
                        map.set(file.split(".")[0], r.default) :
                        Promise.reject(`ImportMappedDir: no default export provided for file ${file}`)
                ))
    )
    return map;
}



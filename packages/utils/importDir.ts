import { Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type Options = {
    path: string,
    filter?: (v: string) => boolean,
    namedExport?: string,
    throwOnMiss?: boolean
}

/**
 * @description Imports directory files
 * @param path Target relative path (`<parentDir>/<dir>`)
 * @param filter 
 * @param namedExport (default `default`)
 * @param throwOnMiss (default `false`)
 * @returns Map<`fileName`, `T`>
 */
export const importDir = async <T>({
    path,
    filter = () => true,
    namedExport = "default",
    throwOnMiss = false
}: Options
): Promise<Collection<string, T>> => {
    const resolvedPath = resolve(path);
    const collection = new Collection<string, T>();
    const files = await readdir(resolvedPath);
    await Promise.all(
        files
            .filter(filter)
            .flatMap(filename =>
                import(join(pathToFileURL(resolvedPath).toString(), filename))
                    .then(r =>
                        r[namedExport] ?
                            [collection.set(filename, r[namedExport])] :
                            throwOnMiss ?
                                Promise.reject(`ImportDir: no ${namedExport} export provided for file ${filename}`) :
                                []
                    ))
    )
    return collection;
}



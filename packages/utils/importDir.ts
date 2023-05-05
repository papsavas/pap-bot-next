import { Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type WithFilename<T> = T & { filename: string };

type Props = {
    path: string,
    filter?: (v: string) => boolean,
    exportName?: string,
    throwOnMiss?: boolean
}

/**
 * @description Imports directory files
 * @param path Target relative path (`<parentDir>/<dir>`)
 * @param filter 
 * @param exportName (default `default`)
 * @param throwOnMiss (default `false`)
 * @returns Map<`fileName`, `T`>
 */
export const importDir = async <T>({
    path,
    filter = () => true,
    exportName = "default",
    throwOnMiss = false
}: Props
): Promise<Collection<string, T>> => {
    const resolvedPath = resolve(path);
    const collection = new Collection<string, T>();
    const files = await readdir(resolvedPath);
    await Promise.all(
        files
            .filter(filter)
            .flatMap(file =>
                import(join(pathToFileURL(resolvedPath).toString(), file)
                ).then(r =>
                    r[exportName] ?
                        [collection.set(file.split(".")[0], r[exportName])] :
                        throwOnMiss ?
                            Promise.reject(`ImportDir: no ${exportName} export provided for file ${file}`) :
                            []
                ))
    )
    return collection;
}



import { Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type Options = {
    path: string,
    filter?: (v: string) => boolean,
    namedExports?: string[],
    throwOnMiss?: boolean
}

/**
 * @description Imports directory files
 * @param path Target relative path (`<parentDir>/<dir>`)
 * @param filter 
 * @param namedExports (default `["default"]`)
 * @param throwOnMiss (default `false`)
 * @returns Map<`fileName`, `T`>
 */
export const importDir = async <T>({
    path,
    filter = () => true,
    namedExports = ["default"],
    throwOnMiss = false
}: Options
): Promise<Collection<string, T>> => {
    const resolvedPath = resolve(path);
    const collection = new Collection<string, T>();
    const files = await readdir(resolvedPath);
    await Promise.all(
        files
            .filter(filter)
            .map(filename =>
                import(join(pathToFileURL(resolvedPath).toString(), filename))
                    .then(r => {
                        const fileExports = Object.entries<T>(r).reduce<T>((acc, [k, v]) => {
                            if (namedExports.includes(k))
                                return k === "default" ? { ...acc, ...v } : { ...acc, [k]: v }
                            if (throwOnMiss)
                                throw new Error(`ImportDir: no ${k} export found in file ${filename}`)
                            return acc;
                        }, {} as T);
                        collection.set(filename, fileExports)
                    })

            )
    )
    return collection;
}



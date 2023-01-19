import { readdirSync } from "node:fs";
import { join } from "node:path";

export const importDir = <T extends any>(
    dir: string,
    filter: (v: string) => boolean = () => true): Promise<T>[] =>
    readdirSync(join(__dirname, "..", dir))
        .filter(filter)
        .map(async file => (await import(join(__dirname, "..", dir, file))).default); 
import { readdir } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { importDir } from "../importDir";
import tsDefaultExport from "./mockDir/export_default_ts";

const dirPath = "tests/mockDir";

const defaultFilter = (s: string) => s.includes("default");
describe('Import Directory', () => {
    it("should only contain default export .ts file", async () => {
        const res = await importDir({ path: dirPath, filter: (f) => defaultFilter(f) && f.endsWith('.ts') });
        expect(res.size).toBe(1);
        expect(res.first()).toStrictEqual(tsDefaultExport);
    })

    it("should only contain default exports", async () => {
        const res = await importDir({ path: dirPath, filter: defaultFilter });
        expect(res.size).toBe(2);
    })

    it("should map file names to keys", async () => {
        const fileNames = await readdir(dirPath)
        const res = await importDir({ path: dirPath, filter: defaultFilter })
        expect([...res.keys()].every(file => fileNames.includes(file))).toBeTruthy()
    })

    it("should contain specified exports", async () => {
        const res = await importDir({
            path: dirPath,
            filter: (f) => !(f.includes("no") || f.includes("default")),
            namedExports: ["specifiedExport"]
        });
        expect(res.size).toBe(2);
    })

    it("should not throw on miss by default", async () => {
        await expect(importDir({ path: dirPath })).resolves.not.toThrow();
    })

    it("should throw on miss", async () => {
        await expect(importDir({ path: dirPath, throwOnMiss: true })).rejects.toThrow();
    })
});


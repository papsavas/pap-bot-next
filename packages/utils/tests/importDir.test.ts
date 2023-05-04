import { readdir } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { importDir, importMappedDir } from "../importDir";

const dirPath = "tests/mockDir";

const defaultFilter = (s: string) => s.includes("default");
describe('Import Directory', () => {
    it("should only import default export .ts file", async () => {
        const res = await importDir(dirPath, (f) => defaultFilter(f) && f.endsWith('.ts'));
        expect(res).toHaveLength(1);
    })

    it("should import default exports", async () => {
        const res = await importDir(dirPath, defaultFilter);
        expect(res).toHaveLength(2)
    })

    it("should throw on non-default exports", async () => {
        await expect(importDir(dirPath)).rejects.toThrow();
    })

});

describe("Import Mapped Directory", () => {
    it("should only import default export .ts file", async () => {
        const res = await importMappedDir(dirPath, (f) => defaultFilter(f) && f.endsWith('.ts'));
        expect(res.size).toBe(1);
    })

    it("should only contain default exports", async () => {
        const res = await importMappedDir(dirPath, defaultFilter);
        expect(res.size).toBe(2);
    })

    it("should map file names to keys", async () => {
        const fileNames = (await readdir(dirPath))
            .map(f => f.split('.')[0]);
        const res = await importMappedDir(dirPath, defaultFilter)
        expect([...res.keys()].every(file => fileNames.includes(file))).toBeTruthy()
    })

    it("should throw on non-default exports", async () => {
        await expect(importMappedDir(dirPath)).rejects.toThrow();
    })
})
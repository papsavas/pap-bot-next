import { readdir } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { importDir, importMappedDir } from "../importDir";

const dirPath = "tests/mockDir";

describe('Import Directory', () => {
    it('should import all', async () => {
        const res = await importDir(dirPath);
        expect(res).toHaveLength(6)
    });

    it("should import ts only", async () => {
        const res = await importDir(dirPath, (f) => f.endsWith('.ts'));
        expect(res).toHaveLength(3);
    })

    it("should only contain default exports", async () => {
        const res = await importDir(dirPath);
        expect(res.filter(v => v)).toHaveLength(2)
        expect(res.filter(v => !v)).toHaveLength(4)
    })
});

describe("Import Mapped Directory", () => {
    it("should import all", async () => {
        const res = await importMappedDir(dirPath);
        expect(res.size).toBe(6);
    })

    it("should import ts only", async () => {
        const res = await importMappedDir(dirPath, (f) => f.endsWith('.ts'));
        expect(res.size).toBe(3);
    })

    it("should only contain default exports", async () => {
        const res = await importMappedDir(dirPath);
        expect([...res.values()].filter(v => v)).toHaveLength(2)
        expect([...res.values()].filter(v => !v)).toHaveLength(4)
    })

    it("should map file names to keys", async () => {
        const fileNames = (await readdir(dirPath))
            .map(f => f.split('.')[0]);
        const res = await importMappedDir(dirPath)
        expect(fileNames.every(file => res.has(file))).toBeTruthy()

    })
})
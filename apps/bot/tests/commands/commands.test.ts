import { APIApplicationCommand, ApplicationCommandData, REST, Routes } from "discord.js";
import { importDir } from "utils";
import { describe, expect, it, } from "vitest";

describe('Commands', async () => {
    it("Should not have duplicate names", async () => {
        const names = await importDir({
            path: "src/commands",
            namedExports: ["name"],
            filter: (f) => f.endsWith(".ts")
        });
        expect(names).toHaveLength(new Set(names).size)
    })

    it("should export data", async () => {
        await expect(importDir({
            path: "src/commands", namedExports: ["data"], throwOnMiss: true
        })).resolves.not.toThrow()
    })

    it.todo("Data should be synced", async (ctx) => {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
        const registeredGlobalCommands = await rest.get(Routes.applicationCommands(process.env.DISCORD_DEV_BOT_ID!)) as APIApplicationCommand[];
        const localCommandData = await importDir<ApplicationCommandData>({
            path: "src/commands", namedExports: ["data"]
        })
        for (const localData of localCommandData.values()) {
            const registeredData = registeredGlobalCommands.find(c => c.name === localData.name);
            expect(registeredData).to.not.toBeUndefined();
            expect(registeredData).toContain(localData);
        }

    })
});
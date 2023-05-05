import { APIApplicationCommand, ApplicationCommandData, ApplicationCommandDataResolvable, REST, Routes } from "discord.js";
import { importDir } from "utils";
import { describe, expect, it, } from "vitest";
import { Command } from "../../types/Command";

describe('Commands', async () => {
    const cmds = await importDir<Command>({ path: "src/commands", filter: (f) => f.endsWith(".ts") });

    it.each([...cmds.values()])('Names should match', async (cmd) => {
        expect(cmd.name).toEqual(cmd.data.name);
    });

    it("Should not have duplicate names", () => {
        const names = cmds.map(c => c.name);
        expect(names).toHaveLength(new Set(names).size)
    })

    it("should export data", async () => {
        await expect(importDir<ApplicationCommandDataResolvable>({
            path: "src/commands", exportName: "data", throwOnMiss: true
        })).resolves.not.toThrow()
    })

    it.todo("Data should be synced", async (ctx) => {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
        const registeredGlobalCommands = await rest.get(Routes.applicationCommands(process.env.DISCORD_DEV_BOT_ID!)) as APIApplicationCommand[];
        const localCommandData = await importDir<ApplicationCommandData>({
            path: "src/commands", exportName: "data"
        })
        for (const localData of localCommandData.values()) {
            const registeredData = registeredGlobalCommands.find(c => c.name === localData.name);
            expect(registeredData).to.not.toBeUndefined();
            expect(registeredData).toContain(localData);
        }

    })
});
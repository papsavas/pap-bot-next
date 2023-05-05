import { APIApplicationCommand, REST, Routes } from "discord.js";
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

    it.todo("Data should be synced", async (ctx) => {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
        const registeredCommands = await rest.get(Routes.applicationCommands(process.env.DISCORD_DEV_BOT_ID!)) as APIApplicationCommand[];
        const localCmds = await importDir<Command>({ path: "src/commands", filter: (f) => f.endsWith('ts') });
        expect(cmds).toHaveLength(localCmds.size);
        for (const registeredCmd of registeredCommands) {
            const localCmd = localCmds.get(registeredCmd.name);
            if (!localCmd) throw `no matching local command for ${registeredCmd.name}`
            expect(registeredCmd.name).toEqual(localCmd.name)
            expect(registeredCmd).to.deep.include(localCmd.data)
        }
    })
});
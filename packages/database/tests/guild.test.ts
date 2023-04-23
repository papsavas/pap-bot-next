import { describe, expect, it, vi } from 'vitest';
import prisma from './__mocks__/prisma';
import { createGuild } from './scripts/guild';

vi.mock('../prisma')

describe("guild", () => {
    const mockGuild = { name: "g_name", icon: "g_icon", id: "g_id" };
    it('should create guild', async () => {
        prisma.guild.create.mockResolvedValue(mockGuild);
        const guild = await createGuild(mockGuild);
        expect(guild).toStrictEqual(mockGuild)
    });
})


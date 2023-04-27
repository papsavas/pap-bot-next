import { describe, expect, it, vi } from 'vitest';
import { createGuild } from '../scripts/guild';
import prisma from './__mocks__/prisma';

vi.mock('../prisma')

describe("guild", () => {
    const mockGuild = { name: "g_name", icon: "g_icon", id: "g_id" };
    it('should create guild', async () => {
        prisma.guild.create.mockResolvedValue(mockGuild);
        const guild = await createGuild(mockGuild, prisma);
        expect(guild).toStrictEqual(mockGuild)
    });
})


import { describe, expect, it, vi } from 'vitest';
import { createGuild, deleteGuild, upsertGuild } from '../scripts/guild';
import { mockGuild } from './__mocks__/guild';
import prisma from './__mocks__/prisma';

vi.mock('../prisma');

describe('guild', () => {
	it('should create guild', async () => {
		prisma.guild.create.mockResolvedValue(mockGuild);
		const guild = await createGuild({ data: mockGuild }, prisma);
		expect(guild).toStrictEqual(mockGuild);
	});

	it('should delete guild', async () => {
		prisma.guild.delete.mockResolvedValue(mockGuild);
		const guild = await deleteGuild({ where: { id: mockGuild.id } }, prisma);
		expect(guild).toStrictEqual(mockGuild);
	});

	it('should upsert guild', async () => {
		prisma.guild.upsert.mockResolvedValue(mockGuild);
		const guild = await upsertGuild(
			{
				where: { id: mockGuild.id },
				create: mockGuild,
				update: mockGuild,
			},
			prisma
		);
		expect(guild).toStrictEqual(mockGuild);
	});
});

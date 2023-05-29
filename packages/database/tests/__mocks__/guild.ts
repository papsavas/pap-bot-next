import { DBPartialGuild } from '../../types';

export const mockGuild: DBPartialGuild = {
	name: 'g_name',
	icon: 'g_icon',
	id: 'g_id',
};
export const mockGuild2: DBPartialGuild = { ...mockGuild, name: 'g_name2' };

import { useContext } from 'react';
import { GuildContext } from '../context/GuildContext';

export const useGuild = (id: string) =>
  useContext(GuildContext).guilds.find((g) => g.id === id);

export const useGuilds = () =>
  useContext(GuildContext).guilds;

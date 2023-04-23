import { useContext } from "react";
import { GuildContext } from "../context/GuildContext";

const ctx = useContext(GuildContext);

export const useGuild = (id: string) =>
    ctx.guilds.find(g => g.id === id)

export const useGuilds = () => ctx.guilds
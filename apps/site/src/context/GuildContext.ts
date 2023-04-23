import { Dispatch, SetStateAction, createContext } from "react";
import { Guild } from "types";

type GuildContext = {
    guilds: Guild[];
    setGuilds: Dispatch<SetStateAction<Guild[]>>;
};

export const GuildContext = createContext<GuildContext>(
    {} as GuildContext
);
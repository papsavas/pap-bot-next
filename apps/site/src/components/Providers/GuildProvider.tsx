"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Guild } from "types";
import { GuildContext } from "./../../context/GuildContext";

export const GuildProvider: FC<PropsWithChildren> = ({ children }) => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  useEffect(() => {
    fetch("/api/guilds", { next: { revalidate: 10 } })
      .then((r) => r.json())
      .then((res) => setGuilds(res));
  }, []);
  return (
    <GuildContext.Provider value={{ guilds, setGuilds }}>
      {children}
    </GuildContext.Provider>
  );
};

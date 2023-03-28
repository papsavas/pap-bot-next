"use client";
import { db } from "database";
import { Guild as GuildProps } from "discord.js";
import { useEffect, useState } from "react";
import Guild from "./Guild";

const GuildList = () => {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  useEffect(()=> {
    const fetchData = async () => {
      await db.
    }
  })
  return (
    <ul>
      {guilds?.map((g) => <Guild guild={g} key={g.id} />) ??
        "connecting..."}
    </ul>
  );
};

export default GuildList;

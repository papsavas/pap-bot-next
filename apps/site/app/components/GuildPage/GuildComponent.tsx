"use client";
import { FC, useEffect, useState } from "react";
import { Guild } from "types";
import GuildPrefix from "./GuildPrefix";

const GuildComponent: FC<{ id: string }> = ({ id }) => {
  const [guild, setGuild] = useState<Guild>();
  useEffect(() => {
    fetch(`/guilds/api/${id}`)
      .then((r) => r.json())
      .then((res) => setGuild(res));
  }, []);

  //TODO: extract name to component with loading state
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild?.name ?? "loading..."}</h1>
      <GuildPrefix guildId={id} />
    </div>
  );
};
export default GuildComponent;

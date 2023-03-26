"use client";
import { useSocket } from "../hooks/useSocket";
import Guild from "./Guild";

const GuildList = () => {
  const { data, isConnected } = useSocket("guilds");
  return (
    <ul>
      {data?.guilds?.map((g) => <Guild guild={g} key={g.id} />) ??
        "connecting..."}
    </ul>
  );
};

export default GuildList;

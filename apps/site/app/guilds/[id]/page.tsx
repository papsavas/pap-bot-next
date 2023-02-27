"use client";
import { FC } from "react";
import { useSocket } from "../../hooks/useSocket";

const GuildPage: FC<{
  params: { guildId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}> = ({ params }) => {
  const { data, emit } = useSocket("prefix");
  const handleClick = () => {
    emit({
      guildId: "746309734851674122",
      userId: "<site-user>",
      value: "^",
    });
  };
  return (
    <div>
      <p>{params.guildId} prefix is:</p>
      {data?.value ?? "loading..."}
      <button onClick={handleClick}>New Prefix</button>
    </div>
  );
};

export default GuildPage;

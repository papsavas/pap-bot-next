"use client";
import { FC } from "react";
import useSWR from "swr";
import { Guild } from "types";
import GuildPrefix from "../../components/GuildPage/GuildPrefix";
import { fetcher } from "../../lib/fetcher";

const GuildPage: FC<SegmentProps> = ({ params }) => {
  const {
    data: guild,
    isLoading: isGuildLoading,
    error: guildError,
  } = useSWR<Guild>(`/guilds/api/${params.id}`, fetcher);

  if (guildError) {
    return <>{guildError.toString()}</>; //TODO: error component
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild?.name ?? "loading..."}</h1>
      <GuildPrefix guildId={params.id} />
    </div>
  );
};

export default GuildPage;

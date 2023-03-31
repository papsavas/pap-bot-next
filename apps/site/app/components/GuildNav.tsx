"use client";
import { Guild as GuildProps } from "database";
import useSWR from "swr";
import Guild from "./Guild";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildNav = () => {
  const { data: guilds, isLoading } = useSWR<GuildProps[]>(
    "/api/guilds",
    fetcher
  );

  return (
    <ul className="flex w-20 flex-shrink list-none flex-col gap-4 bg-neutral-800 px-2 py-4 dark:bg-neutral-800">
      {isLoading
        ? null //TODO: set fallback
        : guilds?.map((g) => <Guild guild={g} key={g.id} />)}
    </ul>
  );
};

export default GuildNav;

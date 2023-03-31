"use client";
import { Guild } from "database";
import useSWR from "swr";
import GuildLink from "./GuildLink";

const fetcher = (url: string) =>
  fetch(url, { cache: "force-cache" }).then((res) => res.json());
const GuildNav = () => {
  const { data: guilds, isLoading } = useSWR<Guild[]>("/api/guilds", fetcher);

  return (
    <ul className="flex w-20 flex-shrink list-none flex-col gap-5 bg-neutral-800 px-2 py-6 dark:bg-neutral-800">
      {isLoading
        ? null //TODO: fallback
        : guilds?.map((g) => <GuildLink guild={g} key={g.id} />)}
    </ul>
  );
};

export default GuildNav;

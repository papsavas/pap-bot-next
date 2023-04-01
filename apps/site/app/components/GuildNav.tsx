"use client";
import useSWR from "swr";
import { Guild, JSON } from "types";
import GuildLink from "./GuildLink";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildNav = () => {
  const { data: guilds, isLoading } = useSWR<JSON<Guild[]>>(
    "/api/guilds",
    fetcher
  );

  return (
    <nav className="flex w-20 flex-shrink list-none flex-col gap-5 bg-neutral-800 px-2 py-6 dark:bg-neutral-800">
      {isLoading
        ? null //TODO: fallback
        : guilds?.map((g) => <GuildLink guild={g} key={g.id} />)}
    </nav>
  );
};

export default GuildNav;

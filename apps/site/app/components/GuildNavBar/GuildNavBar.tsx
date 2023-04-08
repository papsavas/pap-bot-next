"use client";
import useSWR from "swr";
import { Guild } from "types";
import { fetcher } from "../../lib/fetcher";

import GuildLink from "./GuildLink";

const blockSize = 80;
const GuildNavBar = () => {
  const { data: guilds, isLoading } = useSWR<Guild[]>("/api/guilds", fetcher);
  return (
    <nav
      className={`flex w-[${blockSize}px] aspect-square flex-shrink list-none flex-col gap-5 bg-neutral-800 px-2 py-6 dark:bg-neutral-800`}
    >
      {isLoading
        ? Array(Math.round(window.innerHeight / blockSize))
            .fill(0)
            .map(() => (
              <span className="flex-1 animate-pulse rounded-xl bg-neutral-900"></span>
            ))
        : guilds?.map((g) => <GuildLink guild={g} key={g.id} />)}
    </nav>
  );
};

export default GuildNavBar;
"use client";
import useSWR from "swr";
import { Guild } from "types";
import { fetcher } from "../../lib/fetcher";

import GuildLink from "./GuildLink";

const GuildNavBar = () => {
  const { data: guilds, isLoading } = useSWR<Guild[]>("/api/guilds", fetcher);
  return (
    <nav
      className={`no-scrollbar flex w-20 flex-shrink list-none flex-col items-center gap-5 overflow-y-auto bg-neutral-800 px-2 py-6  dark:bg-neutral-800`}
    >
      {isLoading
        ? Array(11)
            .fill(0)
            .map((v, i) => (
              <span
                key={i}
                className="aspect-square min-w-full animate-pulse rounded-xl bg-neutral-900"
              ></span>
            ))
        : guilds?.map((g) => <GuildLink guild={g} key={g.id} />)}
    </nav>
  );
};

export default GuildNavBar;

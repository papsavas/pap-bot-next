"use client";
import useSWR from "swr";
import { Guild } from "types";
import { fetcher } from "../../lib/fetcher";

import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import GuildLink from "./GuildLink";

type SelectedGuildContext = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export const SelectedContext = createContext<SelectedGuildContext>(
  {} as SelectedGuildContext
);

const SelectedProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

const GuildNavBar = () => {
  const { data: guilds, isLoading } = useSWR<Guild[]>("/api/guilds", fetcher);
  return (
    <nav
      className={`no-scrollbar flex w-20 flex-shrink list-none flex-col items-center gap-5 overflow-y-auto bg-neutral-800 px-3 py-6  dark:bg-neutral-800`}
    >
      {isLoading ? (
        Array(11)
          .fill(0)
          .map((v, i) => (
            <span
              key={i}
              className="aspect-square min-w-full animate-pulse rounded-xl bg-neutral-900"
            ></span>
          ))
      ) : (
        <SelectedProvider>
          {guilds?.map((g) => (
            <GuildLink guild={g} key={g.id} />
          ))}
        </SelectedProvider>
      )}
    </nav>
  );
};

export default GuildNavBar;

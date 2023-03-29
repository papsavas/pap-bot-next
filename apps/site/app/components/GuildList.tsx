"use client";
import useSWR from "swr";
import Guild from "./Guild";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildList = () => {
  const { data, isLoading } = useSWR("api/guilds", fetcher);
  return (
    <ul className="flex w-24 list-none flex-col">
      {isLoading
        ? "Loading..."
        : data?.guilds?.map((g: any) => <Guild guild={g} key={g.id} />)}
    </ul>
  );
};

export default GuildList;

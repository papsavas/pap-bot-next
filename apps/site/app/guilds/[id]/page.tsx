"use client";
import { Guild } from "database";
import { FC } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildPage: FC<{
  params: { id: string };
}> = ({ params }) => {
  const {
    data: guild,
    isLoading,
    error,
  } = useSWR<Guild>(`api/${params.id}`, fetcher);
  const handleSubmit = () => {};

  if (error) return <>{error}</>;
  if (isLoading || !guild) return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-center gap-10 dark:text-neutral-100">
      <h1 className="text-5xl ">{guild.name}</h1>
      <form onSubmit={handleSubmit}>
        <span>prefix: {guild.prefix?.value}</span>
      </form>
    </div>
  );
};

export default GuildPage;

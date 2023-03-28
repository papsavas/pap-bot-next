"use client";
import { FC } from "react";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildPage: FC<{
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}> = ({ params }) => {
  const { data, isLoading } = useSWR(
    `api/prefix/${params.id}?guildId=${params.id}`,
    fetcher
  );
  return (
    <div>
      <p>
        {params.id} prefix is: {isLoading ? "loading" : data?.prefix}
      </p>
    </div>
  );
};

export default GuildPage;

"use client";
import { FC, FormEvent } from "react";
import useSWR from "swr";
import { Guild, Prefix } from "types";
import Form from "../../components/Form/Form";
import { tsRest } from "../../lib/ts-rest";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildPage: FC<{
  params: { id: string };
}> = ({ params }) => {
  const {
    data: guild,
    isLoading: isGuildLoading,
    error: guildError,
  } = useSWR<Guild>(`/guilds/api/${params.id}`, fetcher);

  const {
    data: prefix,
    isLoading: isPrefixLoading,
    error: prefixError,
  } = useSWR<Prefix>(`/api/prefix/${params.id}`, fetcher);

  const handlePrefixSubmit: (
    event: FormEvent<Element>,
    value: string
  ) => void = async (ev, value) => {
    ev.preventDefault();
    if (!prefix) return;
    if (value !== prefix.prefix)
      //update prefix
      await tsRest.prefix.putPrefix({
        params: { guildId: params.id },
        body: { prefix: value, userId: "<CURRENT_USER_PLACEHOLDER>" },
      });
  };

  if (guildError || prefixError)
    return <>{(guildError ?? prefixError).toString()}</>; //TODO: error component
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild?.name ?? "loading..."}</h1>
      <Form
        onSubmit={handlePrefixSubmit}
        initialValue={prefix?.prefix ?? "loading..."}
        label="prefix"
        submitLabel="Save"
        disabled={isPrefixLoading}
        inline
      />
    </div>
  );
};

export default GuildPage;

"use client";
import { FC, FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Guild, Prefix } from "types";
import Form from "../../components/Form/Form";
import { fetcher } from "../../lib/fetcher";

//TODO: extract prefix to component
const GuildPage: FC<{
  params: { id: string };
}> = ({ params }) => {
  const [prefixResSuccess, setPrefixResSuccess] = useState(false);
  useEffect(() => {
    if (!prefixResSuccess) return;
    const timer = setTimeout(() => setPrefixResSuccess(false), 1000);
    return () => clearTimeout(timer);
  }, [prefixResSuccess]);
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
    if (!prefix || value === prefix.prefix) return setPrefixResSuccess(true);
    //update prefix
    const res = await fetch(`/api/prefix/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ prefix: value, userId: "<CURRENT_USER_ID>" }),
    });
    setPrefixResSuccess(res.status === 200);
  };

  if (guildError || prefixError)
    return <>{(guildError ?? prefixError).toString()}</>; //TODO: error component
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild?.name ?? "loading..."}</h1>
      <Form
        label="prefix"
        submitLabel="Save"
        initialValue={prefix?.prefix ?? "loading..."}
        onSubmit={handlePrefixSubmit}
        loading={isPrefixLoading}
        disabled={isPrefixLoading}
        success={prefixResSuccess}
        inline
      />
    </div>
  );
};

export default GuildPage;

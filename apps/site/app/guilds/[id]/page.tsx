"use client";
import { Guild } from "database";
import { FC, FormEvent } from "react";
import useSWR from "swr";
import Form from "../../components/Form/Form";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GuildPage: FC<{
  params: { id: string };
}> = ({ params }) => {
  const {
    data: guild,
    isLoading,
    error,
  } = useSWR<Guild>(`api/${params.id}`, fetcher);

  const handleSubmit: (event: FormEvent<Element>, value: string) => void = (
    ev,
    value
  ) => {
    ev.preventDefault();
    if (!guild) return;
    if (value !== guild.prefix?.value)
      fetch(`api/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ value, guildId: guild.id }),
      });
  };

  if (error) return <>{error}</>;
  if (isLoading || !guild) return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild.name}</h1>
      <Form
        onSubmit={handleSubmit}
        initialValue={guild?.prefix?.value ?? "loading"}
        label="prefix"
        submitLabel="Save"
        disabled={isLoading}
        inline
      />
    </div>
  );
};

export default GuildPage;

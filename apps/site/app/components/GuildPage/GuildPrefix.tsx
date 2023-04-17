"use client";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";
import useSWR from "swr";
import { Prefix } from "types";
import useBlink from "../../hooks/useBlink";
import { fetcher } from "../../lib/fetcher";
import Form from "../Form/Form";

const GuildPrefix: FC<{ guildId: string }> = ({ guildId }) => {
  const { user } = useUser();
  const [success, triggerSuccess] = useBlink();
  const [failure, triggerFailure] = useBlink();

  const { data, isLoading, error } = useSWR<Prefix>(
    `/api/prefix/${guildId}`,
    fetcher,
    { revalidateOnFocus: true }
  );

  if (error) triggerFailure();

  const handleSubmit: FormSubmit = async (ev, value) => {
    ev.preventDefault();
    if (!data || value === data.prefix) return triggerSuccess();
    //update prefix
    const res = await fetch(`/api/prefix/${guildId}`, {
      method: "PUT",
      body: JSON.stringify({
        prefix: value,
        userId: user?.externalAccounts[0].providerUserId,
      }),
    });
    if (res.status === 200) return triggerSuccess();
  };

  return (
    <Form
      label="prefix"
      submitLabel="Save"
      initialValue={data?.prefix ?? "loading..."}
      onSubmit={handleSubmit}
      loading={isLoading}
      disabled={isLoading}
      success={success}
      failure={failure}
      error={error}
      inline
    />
  );
};

export default GuildPrefix;

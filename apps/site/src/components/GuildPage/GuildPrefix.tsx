"use client";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";
import useSWR from "swr";
import { Prefix } from "types";
import { fetcher } from "../../lib/fetcher";
import { HapticFormSubmit } from "../../types";
import { getDiscordId } from "../../utils/user";
import HapticForm from "../Form/HapticForm";

const GuildPrefix: FC<{ guildId: string }> = ({ guildId }) => {
  const { user } = useUser();
  const { data, isLoading, error } = useSWR<Prefix>(
    `/api/prefix/${guildId}`,
    fetcher
  );

  const handleSubmit: HapticFormSubmit = async (
    ev,
    value,
    triggerSuccess,
    triggerFailure
  ) => {
    ev.preventDefault();
    const sanitizedValue = value.trim();
    if (!data || sanitizedValue === data.prefix) return triggerSuccess();
    //update prefix
    const res = await fetch(`/api/prefix/${guildId}`, {
      method: "PUT",
      body: JSON.stringify({
        prefix: sanitizedValue,
        userId: getDiscordId(user!),
      }),
    });
    if (res.status === 200) return triggerSuccess();
  };

  return (
    <HapticForm
      label="prefix"
      submitLabel="Save"
      initialValue={data?.prefix ?? "loading..."}
      onSubmit={handleSubmit}
      loading={isLoading}
      disabled={isLoading}
      error={error}
      inline
    />
  );
};

export default GuildPrefix;

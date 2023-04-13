"use client";
import { FC, FormEvent } from "react";
import useSWR from "swr";
import { Prefix } from "types";
import useBlink from "../../hooks/useBlink";
import { fetcher } from "../../lib/fetcher";
import Form from "../Form/Form";

const GuildPrefix: FC<{ guildId: string }> = ({ guildId }) => {
  const [prefixSuccess, triggerPrefixSuccess] = useBlink();
  const [prefixFailure, triggerPrefixFailure] = useBlink();

  const {
    data: prefix,
    isLoading: isPrefixLoading,
    error: prefixError,
  } = useSWR<Prefix>(`/api/prefix/${guildId}`, fetcher);

  if (prefixError) triggerPrefixFailure();

  const handlePrefixSubmit: (
    event: FormEvent<Element>,
    value: string
  ) => void = async (ev, value) => {
    ev.preventDefault();

    if (!prefix || value === prefix.prefix) return triggerPrefixSuccess();
    //update prefix
    const res = await fetch(`/api/prefix/${guildId}`, {
      method: "PUT",
      //TODO: replace with current user id
      body: JSON.stringify({ prefix: value, userId: "<CURRENT_USER_ID>" }),
    });
    if (res.status === 200) triggerPrefixSuccess();
  };

  return (
    <Form
      label="prefix"
      submitLabel="Save"
      initialValue={prefix?.prefix ?? "loading..."}
      onSubmit={handlePrefixSubmit}
      loading={isPrefixLoading}
      disabled={isPrefixLoading}
      success={prefixSuccess}
      failure={prefixFailure}
      error={prefixError}
      inline
    />
  );
};

export default GuildPrefix;

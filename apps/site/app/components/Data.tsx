"use client";
import { useSocket } from "../hooks/useSocket";
const DataComponent = () => {
  const { data, isConnected, emit } = useSocket("prefix", {
    prefix: "init_prefix",
    guildId: "init_guildid",
  });
  return (
    <>
      prefix is {isConnected ? data.toString() : "loading..."}
      <button
        onClick={() => {
          emit({ guildId: "final_guildid", prefix: "final_prefix" });
        }}
      >
        Send
      </button>
    </>
  );
};

export default DataComponent;

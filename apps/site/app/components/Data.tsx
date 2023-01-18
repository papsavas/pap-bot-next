"use client";
import { useSocket } from "../hooks/useSocket";
const DataComponent = () => {
  const { data, isConnected, emit } = useSocket("prefix");
  return (
    <>
      prefix is{" "}
      {isConnected ? (data ? JSON.stringify(data) : "no data") : "loading..."}
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

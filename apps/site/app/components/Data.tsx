"use client";
import { useSocket } from "../hooks/useSocket";
const DataComponent = () => {
  const { data, isConnected } = useSocket<string>("prefix");
  return <div>prefix is {isConnected ? data : "loading..."}</div>;
};

export default DataComponent;

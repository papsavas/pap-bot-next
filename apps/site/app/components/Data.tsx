"use client";
import { useSocket } from "../hooks/useSocket";
const DataComponent = () => {
  const { data, isConnected } = useSocket<string>("message");
  return (
    <div className="text-center text-5xl">
      {isConnected ? "loading..." : data}
    </div>
  );
};

export default DataComponent;

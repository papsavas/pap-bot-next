import { useSocket } from "../hooks/useSocket";
import Guild from "./Guild";

const Guilds = () => {
  const { data, isConnected } = useSocket("guilds");
  return (
    <>{data?.map((g) => <Guild guild={g} key={g.id} />) ?? "connecting..."}</>
  );
};

export default Guilds;

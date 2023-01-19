import { useSocket } from "../hooks/useSocket";

const Guilds = () => {
  const { data, isConnected } = useSocket("guilds");
  return (
    <nav>
      {isConnected
        ? data?.map((g) => <li id={g.id}>{g.name}</li>)
        : "loading guilds..."}
    </nav>
  );
};

export default Guilds;

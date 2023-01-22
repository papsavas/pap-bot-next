import useSWR from "swr";

const Guilds = () => {
  const { data, isLoading } = useSWR("/api/guilds");
  console.log(data);
  return <nav>{isLoading ? "loading guilds..." : data}</nav>;
};

export default Guilds;

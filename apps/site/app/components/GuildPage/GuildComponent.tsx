import { getGuild } from "../../utils/getGuild";
import GuildPrefix from "./GuildPrefix";

export default async function GuildComponent({ id }: { id: string }) {
  const { body: guild, status } = await getGuild(id);
  if (status !== 200) return <>Error: Guild {id} not found</>;
  //TODO: extract name to component with loading state
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl ">{guild.name ?? "loading..."}</h1>
      <GuildPrefix guildId={id} />
    </div>
  );
}

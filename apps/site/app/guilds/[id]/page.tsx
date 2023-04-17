import { Metadata } from "next";
import { Guild } from "types";
import GuildComponent from "../../components/GuildPage/GuildComponent";

export async function generateMetadata({
  params,
}: SegmentProps): Promise<Metadata> {
  try {
    const res = await fetch(`http://localhost:3000/guilds/api/${params.id}`);
    const data: Guild = await res.json();
    return {
      title: `${data.name} | PAPbot`,
      icons: data.iconURL,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "PAPbot",
    };
  }
}

export default async function GuildPage({ params }: SegmentProps) {
  return <GuildComponent id={params.id} />;
}

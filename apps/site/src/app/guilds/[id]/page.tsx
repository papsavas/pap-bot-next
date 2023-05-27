import { Metadata } from "next";
import Guild from "../../../components/GuildPage/GuildComponent";
import { SegmentProps } from "../../../types";
import { getGuild } from "../../../utils/getGuild";

export async function generateMetadata({
  params,
}: SegmentProps): Promise<Metadata> {
  const { body: data, status } = await getGuild(params.id);
  if (status !== 200)
    return {
      title: "PAPbot",
    };

  return {
    title: `${data.name} | PAPbot`,
    icons: data.iconURL,
  };
}

export default async function GuildPage({ params }: SegmentProps) {
  // @ts-expect-error Server Component
  return <Guild id={params.id} />;
}

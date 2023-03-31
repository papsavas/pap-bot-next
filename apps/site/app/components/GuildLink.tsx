import Link from "next/link";
import { FC } from "react";
import { Guild, JSON } from "types";
const GuildLink: FC<{ guild: JSON<Guild> }> = ({ guild }) => {
  const { id, name } = guild;
  return (
    <li id={id} className="flex list-none flex-col items-center">
      <Link href={`/guilds/${id}`} className="text-xl">
        <img
          src={guild.iconURL!}
          alt={`${name} picture`}
          className="rounded-2xl object-contain"
        />
      </Link>
    </li>
  );
};

export default GuildLink;

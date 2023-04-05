import Link from "next/link";
import { FC } from "react";
import { Guild } from "types";

//use default icon
const GuildLink: FC<{ guild: Guild }> = ({ guild }) => {
  const { id, name, icon } = guild;
  return (
    <li id={id} className="flex list-none flex-col items-center">
      <Link href={`/guilds/${id}`} className="text-xl">
        <img
          src={icon!}
          alt={`${name} picture`}
          className="rounded-2xl object-contain"
        />
      </Link>
    </li>
  );
};

export default GuildLink;

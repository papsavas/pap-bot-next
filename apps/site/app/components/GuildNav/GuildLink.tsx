import Link from "next/link";
import { FC } from "react";
import { Guild } from "types";

//use default icon
const GuildLink: FC<{ guild: Guild }> = ({ guild }) => {
  const { id, name, iconURL } = guild;
  return (
    <li id={id}>
      <Link href={`/guilds/${id}`} className="text-xl">
        <img
          src={iconURL!}
          alt={`${name} picture`}
          className="rounded-2xl object-contain"
        />
      </Link>
    </li>
  );
};

export default GuildLink;

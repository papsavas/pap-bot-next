"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Guild } from "types";
import { useSelected } from "../../hooks/useSelected";

//use default icon
const GuildLink: FC<{ guild: Guild }> = ({ guild }) => {
  const { id, name, iconURL } = guild;
  const [selected, setSelected] = useSelected(guild.id);

  return (
    <li id={id} onClick={() => setSelected()}>
      <Link href={`/guilds/${id}`} className="relative flex items-center group">
        <span
          className={`
          absolute -left-[24%] w-[5px] opacity-0 h-[50%]
          rounded-xl bg-white transition-all duration-300
          group-hover:opacity-100
          ${selected && "opacity-100 scale-y-150"}
         `}
        />
        <Image
          src={iconURL!}
          width={128}
          height={128}
          alt={`${name} guild`}
          className="rounded-2xl object-contain"
        />
      </Link>
    </li>
  );
};

export default GuildLink;

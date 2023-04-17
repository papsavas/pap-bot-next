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
      <Link href={`/guilds/${id}`} className="relative flex items-center">
        {selected ? (
          <span className="absolute -ml-2 h-[70%] w-1 rounded-xl bg-white transition-all duration-100 ease-in-out" />
        ) : null}
        <img
          src={iconURL!}
          alt={`${name} guild`}
          className="rounded-2xl object-contain"
        />
      </Link>
    </li>
  );
};

export default GuildLink;

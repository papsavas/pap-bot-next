import { Guild } from "database";
import { FC } from "react";
const Guild: FC<{ guild: Guild }> = ({ guild }) => {
  const { id, name, icon } = guild;
  return (
    <li id={id} className="flex list-none flex-col items-center">
      <a href={`guilds/${id}`} className="text-xl">
        <img
          src={icon!}
          alt={`${name} picture`}
          className="rounded-2xl object-contain"
        />
      </a>
    </li>
  );
};

export default Guild;

import { Prisma } from "database";
import { FC } from "react";

const Guild: FC<{ guild: Prisma.GuildGetPayload<true> }> = ({ guild }) => {
  const { id, name, icon } = guild;
  return (
    <li id={id} className="flex list-none flex-col">
      <img
        //TODO:replace with guild image
        src={icon!}
        alt="guild image"
      />
      <a href={`guilds/${id}`} className="text-4xl">
        {name}
      </a>
    </li>
  );
};

export default Guild;

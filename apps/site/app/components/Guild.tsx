import { Prisma } from "database";
import { FC } from "react";

const Guild: FC<{ guild: Prisma.GuildGetPayload<true> }> = ({ guild }) => {
  const { id, name, icon } = guild;
  return (
    <li id={id} className="flex flex-col">
      <img
        //TODO:replace with guild image
        src="https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ"
        alt="guild image"
      />
      <a href={`guilds/${id}`} className="text-4xl">
        {name}
      </a>
    </li>
  );
};

export default Guild;

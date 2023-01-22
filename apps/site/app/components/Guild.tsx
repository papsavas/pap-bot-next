import { Guild as GuildProps } from "discord.js";
import { FC } from "react";

const Guild: FC<{ guild: GuildProps }> = ({ guild }) => {
  const { id, name, icon } = guild;
  return (
    <li id={id}>
      <img src={icon!} alt="guild image" />
      <a href={`guilds/${id}`}>{name}</a>
    </li>
  );
};

export default Guild;

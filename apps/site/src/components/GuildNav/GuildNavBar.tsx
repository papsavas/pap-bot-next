import { currentUser } from "@clerk/nextjs";
import { getGuilds } from "../../utils/getGuild";
import { getDiscordId } from "../../utils/user";
import { SelectedProvider } from "../Providers/SelectedProvider";
import GuildLink from "./GuildLink";

const navbarStyles =
  "no-scrollbar flex w-20 flex-shrink list-none flex-col items-center gap-5 overflow-y-auto bg-neutral-800 px-3 py-6  dark:bg-neutral-800";

export const GuildNavBarFallback = () => (
  <nav className={navbarStyles}>
    {Array(11)
      .fill(0)
      .map((v, i) => (
        <li
          key={i}
          className="aspect-square min-w-full animate-pulse rounded-xl bg-neutral-900"
        ></li>
      ))}
  </nav>
);

export default async function GuildNavBar() {
  const user = await currentUser();
  const guilds = await getGuilds(getDiscordId(user!));
  if (guilds.status !== 200) return <>Error</>;
  return (
    <nav className={navbarStyles}>
      <SelectedProvider>
        {guilds.body.map((g) => (
          <GuildLink guild={g} key={g.id} />
        ))}
      </SelectedProvider>
    </nav>
  );
}

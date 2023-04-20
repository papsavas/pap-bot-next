import { Guild as DiscordGuild } from "discord.js";
import { assertType, it } from "vitest";
import { Guild, guildObject } from "../Guild";
import { JSON } from "../JSON";

it('JSON Discord Guild', () => {
    assertType<JSON<Pick<DiscordGuild, keyof Guild>>>(guildObject._type)
});

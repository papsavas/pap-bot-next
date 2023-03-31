import { Partials } from "discord.js";
import { migrateMessages } from "../utils/migrateMessages";
import client from "./client";

const [path, file, guildId, oldChannelId, newChannelId, ...rest] = process.argv;

if (!(guildId && oldChannelId && newChannelId))
    throw new Error("<guild_id> <old_channel_id> <new_channel_id>");

const bot = await client(
    ["Guilds", "GuildMessages"],
    [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.ThreadMember]
);

bot.on("ready", async client => {
    await migrateMessages(client, guildId, oldChannelId, newChannelId);
    process.exit(0);
})
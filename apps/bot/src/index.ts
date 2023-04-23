import { Client, ClientEvents, Events, Partials, Snowflake } from "discord.js";
import dotenv from 'dotenv';
import findConfig from "find-config";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { MonitoredCollection, importDir } from "utils";
import { Context, GuildPrefix, ReactionNotifier } from "../types/Context";
import { DiscordEvent } from "../types/DiscordEvent";
import { prefixMonitors } from "./monitors/prefix";
import { reactionNotifierMonitors } from "./monitors/reactionNotifier";

dotenv.config({ path: findConfig('.env')! })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ctx: Context = {
    commands: [],
    prefix: new MonitoredCollection<Snowflake, GuildPrefix>(undefined, prefixMonitors),
    reactionNotifier: new MonitoredCollection<Snowflake, ReactionNotifier>(undefined, reactionNotifierMonitors),
}

export const bot = new Client({
    intents: [
        "Guilds",
        "DirectMessages",
        "MessageContent",
        "GuildMessages",
        "GuildMembers",
        "GuildMessages",
        "GuildMessageReactions"
    ],
    partials: [
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.Reaction
    ]
})

const eventFiles = importDir<DiscordEvent<keyof ClientEvents>>(
    join(__dirname, "events"),
    (file) => {
        const [name, postfix] = file.split(".");
        const isTypescriptFile = postfix === "ts";
        const isNamedDiscordEvent = Object.values<string>(Events).includes(name)
        return isTypescriptFile && isNamedDiscordEvent;
    }
)

eventFiles
    .then(events => events.forEach(ev =>
        bot.on(ev.event,
            async (...args) => { ev.execute(...args) }
        ))
    )

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
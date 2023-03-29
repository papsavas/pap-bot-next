import { Client, ClientEvents, Collection, Events, Partials, Snowflake } from "discord.js";
import dotenv from 'dotenv';
import findConfig from "find-config";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importDir } from "utils";

import { DiscordEvent } from "./types/DiscordEvent";
import { GuildCache, GuildPrefix, GuildReactionNotifier } from "./types/GuildSettings";

dotenv.config({ path: findConfig('.env')! })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const cache: GuildCache = {
    commands: [],
    prefix: new Collection<Snowflake, GuildPrefix>(),
    reactionNotifier: new Collection<Snowflake, GuildReactionNotifier>(),
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

Promise.all(eventFiles)
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
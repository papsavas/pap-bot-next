import { Client, ClientEvents, Collection, Partials, Snowflake } from "discord.js";
import dotenv from 'dotenv';
import findConfig from "find-config";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { ClientSocket, importDir } from "server";
import { io } from "socket.io-client";
import { guilds } from "./actions/guilds";
import { poll } from "./actions/poll";
import { prefix } from "./actions/prefix";
import { DiscordEvent } from "./types/DiscordEvent";
import { GuildCache, GuildPrefix, GuildReactionNotifier } from "./types/GuildSettings";

dotenv.config({ path: findConfig('.env')! })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const socket: ClientSocket = io(`http://localhost:${process.env.SERVER_PORT}`);

export const cache: GuildCache = {
    commands: [],
    prefix: new Collection<Snowflake, GuildPrefix>(),
    reactionNotifier: new Collection<Snowflake, GuildReactionNotifier>(),
}

const actions = [prefix, poll, guilds];
socket.on("connect", () => {
    actions.forEach(({ action, onEvent }) =>
        socket.on(action, (data: any) => { onEvent(socket, data) })
    )
})

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
    (file) => file.endsWith('.ts')
)

Promise.all(eventFiles)
    .then(events => events.forEach(ev =>
        bot.on(ev.event,
            async (...args) => { ev.execute(socket, ...args) }
        ))
    )

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
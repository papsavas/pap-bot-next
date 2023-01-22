import { Client, ClientEvents, Collection, Guild, Partials } from "discord.js";
import { ClientSocket } from "server";
import { io } from "socket.io-client";
import { guilds } from "./actions/guilds";
import { poll } from "./actions/poll";
import { prefix } from "./actions/prefix";
import { DiscordEvent } from "./types/DiscordEvent";
import { importDir } from "./utils/importDir";

require('dotenv')
    .config({ path: require('find-config')('.env') })


const socket: ClientSocket = io(`http://localhost:${process.env.SOCKET_PORT}`);

const actions = [prefix, poll, guilds];


socket.on("connect", () => {
    actions.forEach(({ action, onEvent }) =>
        socket.on(action, (data: any) => { onEvent(socket, data) })
    )

    socket.emit("guilds", new Collection<string, Guild>());
})

export const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    partials: [Partials.Message, Partials.User, Partials.Channel]
})

const eventFiles = importDir<DiscordEvent<keyof ClientEvents>>(
    "events",
    (file) => file.endsWith('.ts')
)

Promise.all(eventFiles)
    .then(events => events.forEach(ev =>
        bot.on(ev.event,
            async (...args) => { ev.execute(socket, ...args) }
        ))
    )

// bot.login(process.env.DISCORD_BOT_TOKEN)
//     .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
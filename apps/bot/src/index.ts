import { Client, Partials } from "discord.js";
import { ClientSocket } from "server";

import { io } from "socket.io-client";
import { prefix } from "./actions/prefix";

require('dotenv')
    .config({ path: require('find-config')('.env') })


const socket: ClientSocket = io(`http://localhost:${process.env.SOCKET_PORT}`);
const actions = [prefix]

socket.on("connect", () => {
    actions.forEach(({ name, onEvent }) =>
        socket.on(name, (data) => { onEvent(socket, data) })
    )
})

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    partials: [Partials.Message, Partials.User, Partials.Channel]
})

bot.on("ready", () => {
    console.log(`bot ready`)

    prefix.emit(socket)
})

// const eventFiles: DiscordEventFile[] = readdirSync("./ClientEvents")
//     .map(file => require(`./ ClientEvents / ${ file }`).default);

// eventFiles.forEach(ev => bot.on(ev.name,
//     async (...args) => { ev.execute(...args) })
// )

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
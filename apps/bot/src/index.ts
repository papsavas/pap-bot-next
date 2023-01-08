import { Client, Partials } from "discord.js";
import { ClientToServerEvents, ServerToClientEvents } from "server";
import { io, Socket } from "socket.io-client";
require('dotenv')
    .config({ path: require('find-config')('.env') })

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`http://localhost:${process.env.SOCKET_PORT}`);

socket.on("connect", () => {
    socket.onAny((ev, ...args) => {
        console.log(`client recv ${ev} | ${args}`)
    })

    socket.emit("prefix", "$", "1314")
})

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    partials: [Partials.Message, Partials.User, Partials.Channel]
})

bot.on("ready", () => { console.log(`client ready.Listing to ${bot.guilds.cache.mapValues(v => v.name)}`) })

// const eventFiles: DiscordEventFile[] = readdirSync("./ClientEvents")
//     .map(file => require(`./ ClientEvents / ${ file }`).default);

// eventFiles.forEach(ev => bot.on(ev.name,
//     async (...args) => { ev.execute(...args) })
// )

// bot.login(process.env.DISCORD_BOT_TOKEN)
//     .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
import { Client, Partials } from "discord.js";
import { io } from "socket.io-client";
require('dotenv')
    .config({ path: require('find-config')('.env') })

const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);

socket.onAny((ev, ...args) => {
    console.log(`recv ${ev} | data: ${args}`)
})

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    partials: [Partials.Message, Partials.User, Partials.Channel]
})

bot.on("ready", () => { socket.emit("command", "client ready") })

bot.on("messageCreate", (message) => {
    socket.emit("message", message.content)
})

// const eventFiles: DiscordEventFile[] = readdirSync("./ClientEvents")
//     .map(file => require(`./ClientEvents/${file}`).default);

// eventFiles.forEach(ev => bot.on(ev.name,
//     async (...args) => { ev.execute(...args) })
// )

bot.login(process.env.DISCORD_BOT_TOKEN)

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
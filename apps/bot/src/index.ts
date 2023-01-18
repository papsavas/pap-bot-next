import { Client, Partials } from "discord.js";
import { ClientSocket } from "server";
import { io } from "socket.io-client";
import { prefix } from "./actions/prefix";
import { guildBanAdd } from "./Events/guildBanAdd";
import { guildBanRemove } from "./Events/guildBanRemove";
import { guildCreate } from "./Events/guildCreate";
import { guildDelete } from "./Events/guildDelete";
import { guildMemberAdd } from "./Events/guildMemberAdd";
import { guildMemberRemove } from "./Events/guildMemberRemove";
import { guildUnavailable } from "./Events/guildUnavailable";
import { interactionCreate } from "./Events/interactionCreate";
import { messageCreate } from './Events/messageCreate';
import { messageDelete } from "./Events/messageDelete";
import { messageReactionAdd } from "./Events/messageReactionAdd";
import { messageReactionRemove } from "./Events/messageReactionRemove";
import { ready } from "./Events/ready";
import { voiceStateUpdate } from "./Events/voiceStateUpdate";

require('dotenv')
    .config({ path: require('find-config')('.env') })


const socket: ClientSocket = io(`http://localhost:${process.env.SOCKET_PORT}`);
const actions = [prefix];
const events = [
    guildBanAdd, guildBanRemove, guildCreate,
    guildDelete, guildMemberAdd,
    guildMemberRemove, guildMemberRemove,
    guildUnavailable, interactionCreate,
    messageCreate, messageDelete,
    messageReactionAdd, messageReactionRemove,
    ready, voiceStateUpdate
]

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

events.forEach(ev =>
    bot.on(ev.name,
        async (...args) => { ev.execute(...args) }
    )
)

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
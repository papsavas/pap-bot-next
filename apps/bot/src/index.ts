import { Client, Partials } from "discord.js";
import { ClientSocket } from "server";
import { io } from "socket.io-client";
import { guilds } from "./actions/guilds";
import { poll } from "./actions/poll";
import { prefix } from "./actions/prefix";
import { guildBanAdd } from "./events/guildBanAdd";
import { guildBanRemove } from "./events/guildBanRemove";
import { guildCreate } from "./events/guildCreate";
import { guildDelete } from "./events/guildDelete";
import { guildMemberAdd } from "./events/guildMemberAdd";
import { guildMemberRemove } from "./events/guildMemberRemove";
import { guildUnavailable } from "./events/guildUnavailable";
import { interactionCreate } from "./events/interactionCreate";
import { messageCreate } from './events/messageCreate';
import { messageDelete } from "./events/messageDelete";
import { messageReactionAdd } from "./events/messageReactionAdd";
import { messageReactionRemove } from "./events/messageReactionRemove";
import { ready } from "./events/ready";
import { voiceStateUpdate } from "./events/voiceStateUpdate";

require('dotenv')
    .config({ path: require('find-config')('.env') })


const socket: ClientSocket = io(`http://localhost:${process.env.SOCKET_PORT}`);
const actions = [prefix, poll, guilds];
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
    actions.forEach(({ action, onEvent }) =>
        socket.on(action, (data: any) => { onEvent(socket, data) })
    )
})

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    partials: [Partials.Message, Partials.User, Partials.Channel]
})

events.forEach(ev =>
    bot.on(ev.event,
        //@ts-expect-error //execute args typed as 'never'
        async (...args) => { ev.execute(socket, ...args) }
    )
)

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(_ => console.log("Logged in"))

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
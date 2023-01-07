import { Client } from "discord.js";
import * as dotenv from 'dotenv';
import { eventFiles } from "server";
dotenv.config()

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent"]
})

eventFiles.forEach(ev => bot.on(ev.name,
    async (...args) => { ev.execute(...args) })
)

bot.login(process.env.BOT_TOKEN)

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
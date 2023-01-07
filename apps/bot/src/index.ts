import { Client } from "discord.js";
import * as dotenv from 'dotenv';
import { readdirSync } from "node:fs";
import { DiscordEventFile } from "./types/DiscordEvent";
dotenv.config()

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent"]
})

const eventFiles: DiscordEventFile[] = readdirSync("/ClientEvents/")
    .map(file => require(`@bot/src/Events/Impl/${file}`).default);



eventFiles.forEach(ev => bot.on(ev.name,
    async (...args) => { ev.execute(...args) })
)

bot.login(process.env.BOT_TOKEN)

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection: ${reason}`)
});
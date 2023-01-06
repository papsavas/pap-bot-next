import { Client } from "discord.js"
import * as dotenv from 'dotenv'
dotenv.config()

const bot = new Client({
    intents: ["Guilds", "DirectMessages", "MessageContent"]
})

bot.on("ready", () => {
    console.log(`bot ready in ${bot.guilds.cache.size} guilds`)
})

bot.login(process.env.BOT_TOKEN)
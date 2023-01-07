import { Client, ClientEvents } from "discord.js";


const name: keyof ClientEvents = "ready";

const execute = async (client: Client<true>) => {
    console.log(`bot ready in ${client.guilds.cache.size} guilds`)
}

export default { name, execute }
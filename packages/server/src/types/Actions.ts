import { Collection, Embed, Guild, Interaction } from "discord.js"

export type Actions = {
    prefix: (data: { prefix: string, guildId: string }) => void,
    poll: (data: { message: string }) => void,
    guilds: (data: Collection<string, Guild>) => void
    embed: (data: { embeds: Embed[], interaction: Interaction }) => void
}
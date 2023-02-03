import { Collection, Embed, Guild, Interaction, Message, User } from "discord.js"

export type Actions = {
    prefix: (data: { value: string, guildId: Guild['id'], userId: User['id'] }) => void,
    poll: (data: { message: string }) => void,
    guilds: (data: { guilds: Collection<string, Guild> }) => void
    embed: (data: { embeds: Embed[], interaction: Interaction }) => void
    message: (data: { message: Message }) => void
}
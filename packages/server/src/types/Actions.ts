import { Collection, Embed, Guild, Interaction, Message, User } from "discord.js"


export type ActionOptions = {
    prefix: { value: string, guildId: Guild['id'], userId: User['id'] },
    poll: { message: string },
    guilds: { guilds: Collection<string, Guild> }
    embed: { embeds: Embed[], interaction: Interaction },
    message: { message: Message },
}

export type ActionCallback<K extends keyof ActionOptions> = (data: ActionOptions[K]) => Promise<void>

export type Actions = {
    [K in keyof ActionOptions]: (data: ActionOptions[K], callback?: ActionCallback<K>) => void;
}
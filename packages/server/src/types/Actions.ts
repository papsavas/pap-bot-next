import { Collection, Embed, Guild, GuildChannel, Interaction, Message, Role, User } from "discord.js"


export type ActionOptions = {
    prefix: { value: string, guildId: Guild['id'], userId: User['id'] },
    poll: {
        content: Embed,
        guildId: Guild['id'],
        channelId: GuildChannel['id'],
        userId: User['id'],
        pingRoleId?: Role['id'],
        timeLimit?: number
    },
    guilds: { guilds: Collection<string, Guild> }
    embed: { embeds: Embed[], interaction: Interaction },
    message: { message: Message },
}

export type ActionCallback<K extends keyof ActionOptions> = (data: ActionOptions[K]) => Promise<void>

export type Actions = {
    [K in keyof ActionOptions]: (data: ActionOptions[K], callback?: ActionCallback<K>) => void;
}
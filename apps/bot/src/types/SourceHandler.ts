import { CommandInteraction, InteractionEditReplyOptions, InteractionReplyOptions, Message, MessageEditOptions, MessageReplyOptions } from "discord.js";

export type EditOptions<T> = T extends CommandInteraction ? InteractionEditReplyOptions : MessageEditOptions
export type ReplyOptions<T> = T extends CommandInteraction ? InteractionReplyOptions : MessageReplyOptions

export type SourceHandlerOptions = <T extends CommandInteraction | Message>(source: T) => {
    source: T
    edit: (data: EditOptions<T>) => Promise<Message>
    reply: (data: ReplyOptions<T>) => Promise<Message>
    delete: () => Promise<Message | void>
}
import { CommandInteraction, InteractionDeferReplyOptions, InteractionEditReplyOptions, InteractionReplyOptions, Message, MessageEditOptions, MessageReplyOptions } from "discord.js";
import { CommandSource } from "./Command";



export type EditOptions<T> =
    T extends CommandInteraction ?
    InteractionEditReplyOptions :
    T extends Message ?
    MessageEditOptions :
    never

export type ReplyOptions<T> =
    T extends CommandInteraction ?
    InteractionReplyOptions :
    T extends Message ?
    MessageReplyOptions :
    never

export type SourceHandlerOptions = <T extends CommandSource>(source: T) => {
    source: T,
    deferReply: (callback: () => unknown, InteractionOptions?: InteractionDeferReplyOptions) => Promise<unknown>
    edit: (options: EditOptions<T>) => Promise<Message>
    reply: (options: ReplyOptions<T>) => Promise<Message>
    delete: () => Promise<Message | void>
}
import { Message, MessageReaction, PartialMessage, PartialMessageReaction, PartialUser, User } from "discord.js";

type Partials = PartialMessage | PartialMessageReaction | PartialUser;
type Complete = Message | MessageReaction | User;

type Unpartialize<T> =
    T extends PartialMessage ?
    Message :
    T extends PartialMessageReaction ?
    MessageReaction :
    T extends PartialUser ?
    User :
    T

export const resolvePartial = async <T extends Complete | Partials>(source: T, force: boolean = false) =>
    (source.partial ? source.fetch(force) : source) as Promise<Unpartialize<T>>
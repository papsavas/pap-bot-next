import { CommandInteraction } from "discord.js";
import { SourceHandlerOptions } from "../../types/SourceHandler";

const SourceHandler: SourceHandlerOptions = (source) => {
    return {
        source,
        deferReply: (callback, interactionOptions) =>
            (source instanceof CommandInteraction ?
                source.deferReply(interactionOptions) :
                source.channel.sendTyping())
                .then(callback),
        edit: (options) =>
            source instanceof CommandInteraction ?
                source.editReply(options) : source.edit(options),

        reply: (options) =>
            source instanceof CommandInteraction ?
                source.deferred ?
                    source.editReply(options) :
                    source.replied ?
                        //@ts-expect-error infers union
                        source.followUp(options) :
                        //@ts-expect-error infers union
                        source.reply(options) :
                //@ts-expect-error infers union
                source.reply(options),

        delete: () =>
            source instanceof CommandInteraction ?
                source.deleteReply() : source.delete()
    }
}

export default SourceHandler;
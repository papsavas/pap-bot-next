import { CommandInteraction } from "discord.js";
import { SourceHandlerOptions } from "../../types/SourceHandler";

const SourceHandler: SourceHandlerOptions = (source) => {
    return {
        source,
        edit: (data) =>
            source instanceof CommandInteraction ?
                source.editReply(data) : source.edit(data),

        reply: (data) =>
            source instanceof CommandInteraction ?
                source.deferred ?
                    source.editReply(data) :
                    source.replied ?
                        //@ts-expect-error infers union
                        source.followUp(data) :
                        //@ts-expect-error infers union
                        source.reply(data) :
                //@ts-expect-error infers union
                source.reply(data),

        delete: () =>
            source instanceof CommandInteraction ?
                source.deleteReply() : source.delete()
    }
}

export default SourceHandler;
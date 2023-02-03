import { makeServerAction } from "../utils/makeAction";

const guildServerAction = makeServerAction({
    action: "guilds",
    async onEvent(socket, data) {
        //TODO: sync db
        return { socket, data }
    }
});

export default guildServerAction;


import { makeClientAction } from "server";
import pollCommand from "../commands/poll";

export const poll = makeClientAction({
    action: "poll",
    async onEvent(socket, data) {
        await pollCommand.execute(socket, data);
        return { socket, data }
    }

})
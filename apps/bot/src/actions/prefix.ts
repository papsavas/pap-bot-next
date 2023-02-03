import { makeClientAction } from "server";

export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        //TODO: change cached prefix
        return { socket, data };
    }

})


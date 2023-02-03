import { makeServerAction } from "../utils/makeAction";

const messageServerAction = makeServerAction({
    action: "message",
    async onEvent(socket, data) {
        return { socket, data }
    },
})

export default messageServerAction;

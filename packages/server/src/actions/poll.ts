import { makeServerAction } from "../utils/makeAction";

const pollServerAction = makeServerAction({
    action: "poll",
    async onEvent(socket, data) {
        return { socket, data }
    },

})

export default pollServerAction;
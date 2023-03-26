import { makeEvent } from "../utils/events/makeEvent";

const messageDelete = makeEvent({
    event: "messageDelete",
    async execute(socket, message) {

    },
})

export default messageDelete;
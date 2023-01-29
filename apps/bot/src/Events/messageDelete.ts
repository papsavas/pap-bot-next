import { makeEvent } from "../utils/events/makeEvent";

const messageDelete = makeEvent({
    event: "messageDelete",
    async execute(socket, message) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default messageDelete;
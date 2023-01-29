import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "messageDelete",
    async execute(socket, message) {
        return Promise.reject(`method has no execution implemented`)
    },
})
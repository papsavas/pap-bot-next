import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "messageDelete",
    async execute(socket, message) {
        return Promise.reject(`method has no execution implemented`)
    },
})
import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "messageCreate",
    async execute(socket, message) {
        return Promise.reject(`method has no execution implemented`)
    }
})
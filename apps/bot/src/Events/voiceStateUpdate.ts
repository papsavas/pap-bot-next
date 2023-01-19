import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "voiceStateUpdate",
    async execute(socket, oldState, newState) {
        return Promise.reject(`method has no execution implemented`)
    },
})
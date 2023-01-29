import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "voiceStateUpdate",
    async execute(socket, oldState, newState) {
        return Promise.reject(`method has no execution implemented`)
    },
})
import { makeEvent } from "../utils/makeEvent"

export const voiceStateUpdate = makeEvent({
    event: "voiceStateUpdate",
    async execute(socket, oldState, newState) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})
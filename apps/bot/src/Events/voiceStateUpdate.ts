import { makeEvent } from "./makeEvent"

export const voiceStateUpdate = makeEvent({
    name: "voiceStateUpdate",
    async execute(oldState, newState) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})
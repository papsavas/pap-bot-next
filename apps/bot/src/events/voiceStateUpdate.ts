import { makeEvent } from "../utils/events/makeEvent";

const voiceStateUpdate = makeEvent({
    event: "voiceStateUpdate",
    async execute(socket, oldState, newState) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default voiceStateUpdate;
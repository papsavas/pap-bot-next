import { makeEvent } from "../utils/events/makeEvent";

const voiceStateUpdate = makeEvent({
    event: "voiceStateUpdate",
    async execute(socket, oldState, newState) {

    },
})

export default voiceStateUpdate;
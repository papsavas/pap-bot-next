import { makeEvent } from "../lib/makeEvent";

const voiceStateUpdate = makeEvent({
    event: "voiceStateUpdate",
    async execute(oldState, newState) {

    },
})

export default voiceStateUpdate;
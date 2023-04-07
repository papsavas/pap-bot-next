import { makeEvent } from "../utils/makeEvent";

const voiceStateUpdate = makeEvent({
    event: "voiceStateUpdate",
    async execute(oldState, newState) {

    },
})

export default voiceStateUpdate;
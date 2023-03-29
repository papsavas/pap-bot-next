import { makeEvent } from "../utils/events/makeEvent";

const messageDelete = makeEvent({
    event: "messageDelete",
    async execute(message) {

    },
})

export default messageDelete;
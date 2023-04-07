import { makeEvent } from "../utils/makeEvent";

const messageDelete = makeEvent({
    event: "messageDelete",
    async execute(message) {

    },
})

export default messageDelete;
import { message as messageAction } from "../actions/message";
import { makeEvent } from "../utils/events/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(socket, message) {
        messageAction.emit(socket, { message });
    }
})

export default messageCreate;
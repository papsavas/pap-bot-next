import { handleReactionNotifications } from "../handlers/reactionNotifications";
import { makeEvent } from "../utils/makeEvent";
import { fetchPartial } from "../utils/Partials";

const messageReactionAdd = makeEvent({
    event: "messageReactionAdd",
    async execute(reaction, user) {
        handleReactionNotifications(await fetchPartial(reaction), await fetchPartial(user));
    },
})

export default messageReactionAdd;


import { handleReactionNotifications } from "../handlers/reactionNotifications";
import { makeEvent } from "../lib/makeEvent";
import { fetchPartial } from "../lib/Partials";

const messageReactionAdd = makeEvent({
    event: "messageReactionAdd",
    async execute(reaction, user) {
        handleReactionNotifications(await fetchPartial(reaction), await fetchPartial(user));
    },
})

export default messageReactionAdd;


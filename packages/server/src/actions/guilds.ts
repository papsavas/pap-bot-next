import { makeServerAction } from "../utils/makeAction";


//TODO!: fix `this` scope. 
export const guilds = makeServerAction({
    action: "guilds",
    onEvent(socket, data) {
        //TODO: sync db
    },
    emit(socket, guilds) {
        socket.broadcast.emit("guilds", guilds);
    },
})


import { makeServerAction } from "../utils/makeAction";


//TODO!: fix `this` scope. 
export const guilds = makeServerAction({
    name: "guilds",
    onEvent(socket, data) {
        //TODO: sync db
        socket.broadcast.emit("guilds", data);
    },
    emit(socket, guilds) {
        socket.broadcast.emit("guilds", guilds);
    },
})
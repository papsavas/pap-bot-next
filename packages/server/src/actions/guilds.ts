import { makeServerAction } from "../utils/makeAction";


//TODO!: fix `this` scope. 
export const guilds = makeServerAction({
    name: "guilds",
    onEvent(socket, data) {
        //TODO: sync db
        this.emit(socket, data);
    },
    emit(socket, guilds) {
        socket.broadcast.emit("guilds", guilds);
    },
})
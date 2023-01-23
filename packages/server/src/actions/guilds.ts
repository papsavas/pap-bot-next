import { makeServerAction } from "../utils/makeAction";


//TODO!: fix `this` scope. 
export default makeServerAction({
    action: "guilds",
    async onEvent(socket, data) {
        //TODO: sync db
        return { socket, data }
    },
    async emit(socket, data) {
        socket.broadcast.emit("guilds", data);
        return { socket, data };
    },
})


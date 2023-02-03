import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { Server } from "socket.io";
import { Actions } from "./types/Actions";
import { ActionData, ClientToServerEvents, ServerSocketAction, ServerToClientEvents } from "./types/Socket";
import { importDir } from "./utils/importDir";

require('dotenv').config({ path: require('find-config')('.env') })
const app = express();
const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, any, ActionData<keyof ServerToClientEvents>>(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.SOCKET_PORT;

const actionFiles = importDir<ServerSocketAction<keyof Actions, "server">>(
    join(__dirname, "actions"),
    (file) => file.endsWith(".ts")
)

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")
    //TODO: fetch data from db, distribute
    Promise.all(actionFiles)
        .then(actions => {
            actions.forEach(({ action, onEvent }) => {
                socket.on(action, async (data: ActionData<typeof action>) => {
                    onEvent(socket, data)
                        .then(({ socket, data }) =>
                            //@ts-expect-error
                            socket.broadcast.emit(action, data)
                        )
                })
            })
        })

})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
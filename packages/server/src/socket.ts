import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { guilds } from "./actions/guilds";
import { poll } from "./actions/poll";
import { prefix } from "./actions/prefix";
import { ActionData, ClientToServerEvents, ServerToClientEvents } from "./types/Socket";

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

const actions = [prefix, poll, guilds]

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")

    actions.forEach(({ action: name, onEvent, emit }) =>
        socket.on(name, async (data: any) => {
            onEvent(socket, data)
                //@ts-ignore
                .then(({ socket, data }) => { emit(socket, data) })
        })
    )
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { poll } from "./actions/poll";
import { prefix } from "./actions/prefix";
import { ClientToServerEvents, ServerToClientEvents } from "./types/Socket";

require('dotenv').config({ path: require('find-config')('.env') })
const app = express();
const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.SOCKET_PORT;

const actions = [poll, prefix]

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")

    actions.forEach(({ name, onEvent }) =>
        socket.on(name, (data: any) => { onEvent(socket, ...data) })
    )
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
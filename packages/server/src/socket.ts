import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
require('dotenv').config({ path: require('find-config')('.env') })
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.SOCKET_PORT;

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")

    //broadcast all
    socket.onAny((event, ...args) => {
        console.log(`server recv ${event}. Broadcasting...`)
        socket.broadcast.emit(event, ...args);
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
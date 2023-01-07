import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
require('dotenv').config({ path: require('find-config')('.env') })
const app = express();
const server = createServer(app)
const io = new Server(server)
const PORT = process.env.SOCKET_PORT;

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")

    socket.on("command", (data) => {
        console.log(`command from ${socket.id} | data=${JSON.stringify(data)}`)
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
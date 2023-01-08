import { PrismaClient } from "@prisma/client";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types/SocketEvents";
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

const prisma = new PrismaClient();

io.on("connection", (socket) => {
    console.log(socket.id, "socket connected")
    // socket.onAny((event, ...args) => {
    //     //act
    //     //broadcast
    //     socket.broadcast.emit(event, ...args);
    // })
    socket.on("prefix", (prefix, guildId) => {
        console.log(`server rcv= prefix=${prefix} for ${guildId}`)
        socket.broadcast.emit("prefix", prefix, guildId)
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
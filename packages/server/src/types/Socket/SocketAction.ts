import { Socket } from "socket.io";
import { Socket as CSocket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./SocketEvents";

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>

export type ClientSocket = CSocket<ServerToClientEvents, ClientToServerEvents>

type SocketScope<T> = T extends "client" ? ClientSocket : ServerSocket

export type SocketAction<E extends keyof ServerToClientEvents, T extends "client" | "server"> = {
    name: E,
    onEvent: (socket: SocketScope<T>, ...data: Parameters<ServerToClientEvents[E]>) => void
    emit: (socket: SocketScope<T>) => unknown
}
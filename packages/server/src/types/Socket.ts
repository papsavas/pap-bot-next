import { Socket } from "socket.io";
import { Socket as CSocket } from "socket.io-client";

type Events = {
    prefix: (data: { prefix: string, guildId: string }) => void,
    poll: (data: { message: string }) => void
}

export type ServerToClientEvents = Events

export type ClientToServerEvents = Events

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>

export type ClientSocket = CSocket<ServerToClientEvents, ClientToServerEvents>

export type ActionData<T extends keyof Events> = Parameters<Events[T]>[number]

export type SocketScope = "client" | "server";

type SocketType<S> = S extends "client" ? ClientSocket : ServerSocket;

export type SocketAction<E extends keyof Events, S extends SocketScope> = {
    name: E,
    onEvent: (socket: SocketType<S>, data: ActionData<E>) => void
    emit: (socket: SocketType<S>) => unknown
}

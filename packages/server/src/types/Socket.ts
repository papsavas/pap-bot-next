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

type SocketScope<T> = T extends "client" ? ClientSocket : ServerSocket

export type SocketAction<E extends keyof Events, S extends "client" | "server"> = {
    name: E,
    onEvent: (socket: SocketScope<S>, data: ActionData<E>) => void
    emit: (socket: SocketScope<S>) => unknown
}

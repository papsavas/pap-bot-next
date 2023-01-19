import { Socket } from "socket.io";
import { Socket as CSocket } from "socket.io-client";
import { Actions } from "./Actions";

export type ServerToClientEvents = Actions

export type ClientToServerEvents = Actions

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>

export type ClientSocket = CSocket<ServerToClientEvents, ClientToServerEvents>

export type ActionData<T extends keyof Actions> = Parameters<Actions[T]>[number]

type SocketScope = "client" | "server";

type SocketType<S> = S extends "client" ? ClientSocket : ServerSocket;

export type SocketAction<E extends keyof Actions, S extends SocketScope> = {
    action: E,
    onEvent: (socket: SocketType<S>, data: ActionData<E>) => void
    emit: (socket: SocketType<S>, data: ActionData<E>) => void
}

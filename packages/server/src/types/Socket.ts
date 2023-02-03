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

type PureActionEvent<E extends keyof Actions, S extends SocketScope> =
    (socket: SocketType<S>, data: ActionData<E>) => Promise<{ socket: SocketType<S>, data: ActionData<E> }>

type SocketAction<E extends keyof Actions, S extends SocketScope> =
    {
        action: E,
        onEvent: PureActionEvent<E, S>

    }

export type ServerSocketAction<E extends keyof Actions, S extends SocketScope> = SocketAction<E, S>
export type ClientSocketAction<E extends keyof Actions, S extends SocketScope> = SocketAction<E, S>

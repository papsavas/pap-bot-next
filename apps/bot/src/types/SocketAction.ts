import { ServerToClientEvents } from "server"


export type SocketAction<T extends keyof ServerToClientEvents> = {
    name: T,
    onEvent: (...data: Parameters<ServerToClientEvents[T]>) => void
    emit: () => unknown
}
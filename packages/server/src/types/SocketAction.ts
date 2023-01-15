import { ServerToClientEvents } from "./SocketEvents"

export type SocketAction<T extends keyof ServerToClientEvents> = {
    name: T,
    onEvent: (...data: Parameters<ServerToClientEvents[T]>) => void
    emit: () => unknown
}
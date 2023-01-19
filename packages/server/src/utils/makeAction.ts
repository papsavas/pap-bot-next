import { ServerToClientEvents, SocketAction } from "../types/Socket";

export const makeServerAction = <E extends keyof ServerToClientEvents>(action: SocketAction<E, "server">) => {
    return action;
}

export const makeClientAction = <E extends keyof ServerToClientEvents>(action: SocketAction<E, "client">) => {
    return action;
}

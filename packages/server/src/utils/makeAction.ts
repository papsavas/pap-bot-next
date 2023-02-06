import { ClientSocketAction, ServerSocketAction, ServerToClientEvents } from "../types/Socket";

export const makeServerAction = <E extends keyof ServerToClientEvents>(
    action: ServerSocketAction<E, "server">
) => {
    return action;
}

export const makeClientAction = <E extends keyof ServerToClientEvents>(
    action: ClientSocketAction<E, "client">
) => {
    return action;
}

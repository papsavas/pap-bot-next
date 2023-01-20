import { ClientSocket } from "server";

export type Command = {
    command: string;
    execute: (socket: ClientSocket, ...args: any) => Promise<unknown>
}
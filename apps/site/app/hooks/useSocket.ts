import { useEffect, useState } from "react";
import { ClientSocket, ClientToServerEvents } from "server";
import { io } from "socket.io-client";
// require('dotenv')
//     .config({ path: require('find-config')('.env') })

const socket: ClientSocket = io(`http://localhost:4001`);
type ActionData<T extends keyof ClientToServerEvents> = ClientToServerEvents[T];
type initialState<T extends keyof ClientToServerEvents> = Parameters<ActionData<T>> | undefined[]

//TODO: error when no generic is specified
export const useSocket = <E extends keyof ClientToServerEvents>(...initialState: initialState<E>) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [state, setState] = useState(initialState);
    const emit = (data) => {
        socket.emit(event, data)
    }
    useEffect(() => {
        socket.on(event, (args: T) => {
            setState(args);
        });
        socket.on('connect', () => { setIsConnected(true) })
        socket.on('disconnect', () => { setIsConnected(false) })

        return () => {
            socket.off(event);
            socket.off('connect');
            socket.off('disconnect')
        }
    }, [state])
    return { data: state, isConnected, emit }
}

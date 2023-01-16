import { useEffect, useState } from "react";
import { ActionData, ClientSocket, ClientToServerEvents } from "server";
import { io } from "socket.io-client";
// require('dotenv')
//     .config({ path: require('find-config')('.env') })

//TODO: work with env port
const socket: ClientSocket = io(`http://localhost:4001`);

//TODO: optional initialState
export const useSocket = <E extends keyof ClientToServerEvents>(ev: E, ...initialState: ActionData<E>) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        //@ts-expect-error
        socket.on(ev, (...data: ActionData<E>) => {
            setState(data);
        });
        socket.on('connect', () => { setIsConnected(true) })
        socket.on('disconnect', () => { setIsConnected(false) })

        return () => {
            socket.off(ev);
            socket.off('connect');
            socket.off('disconnect')
        }
    }, [state]);

    const emit = (...data: ActionData<E>) => {
        socket.emit(ev, ...data)
    };
    return { data: state, isConnected, emit }
}

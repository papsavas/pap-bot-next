import { useEffect, useState } from "react";
import { ActionData, ClientSocket, ClientToServerEvents } from "server";
import { io } from "socket.io-client";
// require('dotenv')
//     .config({ path: require('find-config')('.env') })

//TODO: work with env port
const socket: ClientSocket = io(`http://localhost:4001`);


export const useSocket = <E extends keyof ClientToServerEvents>(ev: E, ...initialState: ActionData<E>) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [state, setState] = useState(initialState);
    const emit = (data: ActionData<E>) => {
        socket.emit(ev, ...data)
    }
    useEffect(() => {
        socket.on(ev, () => {
            setState(data);
        });
        socket.on('connect', () => { setIsConnected(true) })
        socket.on('disconnect', () => { setIsConnected(false) })

        return () => {
            socket.off(ev);
            socket.off('connect');
            socket.off('disconnect')
        }
    }, [state])
    return { data: state, isConnected, emit }
}

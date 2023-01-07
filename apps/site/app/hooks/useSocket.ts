import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// require('dotenv')
//     .config({ path: require('find-config')('.env') })

const socket = io(`http://localhost:4001`);

export const useSocket = <T>(event: string, initialState?: T) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [state, setState] = useState<T>(initialState as T);
    const emit = (data: T) => {
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

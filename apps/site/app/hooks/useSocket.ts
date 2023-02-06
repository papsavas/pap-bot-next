import { useEffect, useState } from "react";
import { ClientSocket, ClientToServerEvents } from "server";
import { ActionOptions } from "server/src/types/Actions";
import { io } from "socket.io-client";
// require('dotenv')
//     .config({ path: require('find-config')('.env') })

//TODO: work with env port
const socket: ClientSocket = io(`http://localhost:4001`);


export const useSocket = <E extends keyof ClientToServerEvents>(ev: E, initialState?: ActionOptions[E]) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        // @ts-expect-error
        socket.on(ev, (data: ActionOptions[E]) => {
            console.log(`${ev} with data:`, data)
            setState(data);
        });

        socket.on('connect', () => {
            console.log(`++ socket ${socket.id}`)
            setIsConnected(true)
        })
        socket.on('disconnect', (reason, description) => {
            console.log(` -- socket | reason: ${reason}`)
            setIsConnected(false)
        })

        return () => {
            socket.off(ev);
            socket.off('connect');
            socket.off('disconnect')
        }
    }, [])

    const emit = (data: ActionOptions[E]) => {
        //@ts-expect-error
        socket.emit(ev, data)
    };

    return { data: state, isConnected, emit }
}

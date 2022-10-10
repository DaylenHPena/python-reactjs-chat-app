import React from 'react'
import { createContext } from "react";

const ConnectionContext = createContext()
export default ConnectionContext;


export const ConnectionProvider = ({ children }) => {
    const url = 'ws://127.0.0.1:8000/ws/chat/hello/';
    const chatSocket = new WebSocket(url);

    let onMessage = () => {
       chatSocket.onmessage = (message) => {
            //console.log('message', JSON.parse(message.data));
            return JSON.parse(message.data)
        }
    }

    let onOpen = () => {
        chatSocket.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    let state = {
        'client': chatSocket,
        'onMessage': onMessage,
        'onOpen': onOpen
    }

    return (
        <ConnectionContext.Provider value={state}>
            {children}
        </ConnectionContext.Provider>
    )
}


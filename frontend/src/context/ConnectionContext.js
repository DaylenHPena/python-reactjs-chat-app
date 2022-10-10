import React from 'react'
import { createContext } from "react";

const ConnectionContext = createContext()
export default ConnectionContext;


export const ConnectionProvider = ({ children }) => {
    const url = 'ws://127.0.0.1:8000/ws/chat/hello/';
    const chatSocket = new WebSocket(url);

    let onOpen = () => {
        chatSocket.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    let state = {
        'client': chatSocket,
        'onOpen': onOpen
    }

    return (
        <ConnectionContext.Provider value={state}>
            {children}
        </ConnectionContext.Provider>
    )
}


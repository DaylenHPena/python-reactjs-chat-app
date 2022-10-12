import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import AuthContext from './AuthContext';

const ConnectionContext = createContext()
export default ConnectionContext;


export const ConnectionProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    console.log('localStorage.getItem(autTokens)', JSON.parse(localStorage.getItem('authTokens')).access)

    const [client, setClient] = useState(null)
    
    const BASE_WS = 'ws://127.0.0.1:8000/ws/'
    let TAIL = '?token=' + JSON.parse(localStorage.getItem('authTokens')).access
    const url = 'ws://127.0.0.1:8000/ws/chat/ghello/?token=' + JSON.parse(localStorage.getItem('authTokens')).access
    const chatSocket = new WebSocket(url);
    console.log('chatSocket', chatSocket )

    useEffect(() => {
        console.log('My ConnectionContext can see the user updating')
    }, [user])

    const connect = (url) => {
        chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/' + url + '?token=' + JSON.parse(localStorage.getItem('authTokens')).access)
        setClient(chatSocket)
        return chatSocket
    }

    const disconnect = () => {
        chatSocket.close()
        setClient(null)
    }

    const onOpen = () => {
        chatSocket.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    let state = {
        'client': client,
        'onOpen': onOpen,
        'connect': connect,
        'disconnect': disconnect
    }

    return (
        <ConnectionContext.Provider value={state}>
            {children}
        </ConnectionContext.Provider>
    )
}


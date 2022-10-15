import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import AuthContext from './AuthContext';

const ConnectionContext = createContext()
export default ConnectionContext;


export const ConnectionProvider = ({ children }) => {

    const { user } = useContext(AuthContext)

    const [client, setClient] = useState(null)
    const [url, setUrl] = useState('ghello')

    useEffect(() => {
        //TODO:Attempt to reconnect  or logout user
    }, [user])

    useEffect(() => {
        //TODO:
    }, [client])

    useEffect(() => {
        if (url) {
            connect(url);
        }
    }, [url])

    const connect = (url) => {
        disconnect()
        let chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + url + '/?token=' + JSON.parse(localStorage.getItem('authTokens')).access)
        setClient(chatSocket)
        setUrl(url)
        return chatSocket
    }

    const disconnect = () => {
        if (client) {
            client.close()
            setClient(null)
        }
    }

    const onOpen = () => {
        if (client) {
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
        }
    }

    let state = {
        'client': client,
        'onOpen': onOpen,
        'connect': connect,
        'url': url,
        'disconnect': disconnect
    }

    return (
        <ConnectionContext.Provider value={state}>
            {children}
        </ConnectionContext.Provider>
    )
}


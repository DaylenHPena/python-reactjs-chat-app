import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import AuthContext from './AuthContext';

const ConnectionContext = createContext()
export default ConnectionContext;


export const ConnectionProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    //console.log('localStorage.getItem(autTokens)', JSON.parse(localStorage.getItem('authTokens')).access)

    const [client, setClient] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        console.log('My ConnectionContext can see the user updating')
        //TODO:Attempt to reconnect  or logout user
    }, [user])

    useEffect(() => {
        console.log('My ConnectionContext client updated', client)
    }, [client])

    useEffect(() => {
        if (url) {
            console.log('My url updated', client)
            connect(url);
        }
    }, [url])

    const connect = (url) => {
        disconnect()
        let chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + url + '/?token=' + JSON.parse(localStorage.getItem('authTokens')).access)
        setClient(chatSocket)
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
        'setUrl': setUrl,
        'connect':connect,
        'disconnect': disconnect
    }

    return (
        <ConnectionContext.Provider value={state}>
            {children}
        </ConnectionContext.Provider>
    )
}


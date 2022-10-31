import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { connectWebSocket } from '../service/ServiceApi';
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
        if (url) {
            connect(url);
        }
    }, [url])

    const connect = (url) => {
        disconnect()
        const ws = connectWebSocket(url)
        if (ws) {
            setClient(ws)
            setUrl(url)

        }

        return client
    }

    const disconnect = () => {
        if (client) {
            client.close()
            setClient(null)
        }
    }

    let state = {
        'client': client,
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


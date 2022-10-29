import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null)

    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (values) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        axios.post('http://localhost:8000/api/token/', JSON.stringify(values), config).fetch().catch()
        let response = await fetch('http://localhost:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            let access = data.access
            if (access) {
                setUser(jwt_decode(access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            } else { alert('Invalid Token') }
        } else {
            return response.status
        }
    }

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        if (authTokens) {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'refresh': authTokens.refresh })
                })

                let data = await response.json()

                if (response.status === 200) {
                    try {
                        setAuthTokens(data)
                        setUser(jwt_decode(data.access))
                        console.log('user', user)
                        localStorage.setItem('authTokens', JSON.stringify(data))
                    } catch (error) { console.log('error', error) }

                } else {
                    console.log('error', response.status)
                }

                if (loading) {
                    setLoading(false)
                }
                console.log('acces updated')
            } catch (error) {
                console.error('Error updating token: ')
            }
        }
    }

    const reload = () => {
        console.log('i reload')
        setLoading(true)
    }

    useEffect(() => {

        console.log('i am paying attntion to loading')

        if (loading) {
            console.log('loading')

            updateToken()
        }
        else {
            console.log('not loading')
        }

        const fourminutes = 1000 * 600 * 4
        let interval = setInterval(() => {
            if (authTokens) { updateToken() }
        }, fourminutes);

        return () => clearInterval(interval)

    }, [authTokens, loading])


    let state = {
        'user': user,
        'loginUser': loginUser,
        'logoutUser': logoutUser,
        'reload': reload,
    }

    return (
        <AuthContext.Provider value={state}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>)
}
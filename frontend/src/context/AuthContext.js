import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { redirect, useNavigate } from 'react-router-dom'

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({ children }) => {

    let fromStorage = localStorage.getItem('authTokens')
    //console.log('fromStorage', fromStorage)

    let [authTokens, setAuthTokens] = useState(() => fromStorage ? JSON.parse(fromStorage) : null)
    let [user, setUser] = useState(() => fromStorage ? jwt_decode(fromStorage.access) : null)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (values) => {
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
            alert('Some error ocurred')
        }
        //console.log('data after call', data)
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
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
                authTokens['access'] = data.access
                setAuthTokens(authTokens)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                // console.log('updated token')
            } else {
                console.log('error', response.status)
            }

            if (loading) {
                setLoading(false)
            }

        } catch (error) {
            console.error('Error updating token: ')

        }

    }

    useEffect(() => {
        if (loading) {
            updateToken()
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
        'logoutUser': logoutUser
    }

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>)
}
import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { redirect, useNavigate } from 'react-router-dom'

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null)
    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) : null)
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
            setRefreshToken(data.refresh)
            setAccessToken(data.access)
            let access = data.access
            if (access) {
                setUser(jwt_decode(access))
                localStorage.setItem('refreshToken', JSON.stringify(data.refresh))
                localStorage.setItem('accessToken', JSON.stringify(data.access))
                navigate('/')
            } else { alert('Invalid Token') }
        } else {
            alert('Some error ocurred')
        }
        //console.log('data after call', data)
    }

    let logoutUser = () => {
        setUser(null)
        setRefreshToken(null)
        setAccessToken(null)
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    let updateToken = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'refresh': refreshToken })
            })

            let data = await response.json()

            if (response.status === 200) {
                setAccessToken(data.access)
                setUser(jwt_decode(data.access))
                localStorage.setItem('accessToken', JSON.stringify(data.access))
            } else {
                console.log('error', response.status)
            }

            if (loading) {
                setLoading(false)
            }
            console.log('acces updated')
        } catch (error) {
            console.error('Error updating token: ', error)

        }

    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        const fourminutes = 1000 * 600 *4
        let interval = setInterval(() => {
            if (refreshToken) { updateToken() }
        }, fourminutes);

        return () => clearInterval(interval)
    }, [refreshToken, loading])


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
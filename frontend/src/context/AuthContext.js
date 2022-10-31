import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import { getToken, refreshAccessToken } from "../service/ServiceApi";

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null)

    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (values) => {
        getToken(values)
            .then(tokens => {
                setAuthTokens(tokens)
                setUser(jwt_decode(tokens.access))
                localStorage.setItem('authTokens', JSON.stringify(tokens))
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        if (authTokens) {
            refreshAccessToken()
                .then((tokens) => {
                    setAuthTokens(tokens)
                    setUser(jwt_decode(tokens.access))
                    localStorage.setItem('authTokens', JSON.stringify(tokens))
                })
                .catch(error => {
                    console.log('Error in updateToken: ', error)
                })

        }
        if (loading) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }
    }, [loading])


    let state = {
        'user': user,
        'loginUser': loginUser,
        'logoutUser': logoutUser,
    }

    return (
        <AuthContext.Provider value={state}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>)
}
import axios from "axios"
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'


const getAuthTokens = () => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

const baseURL = 'http://localhost:8000/api/'

const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
})

AxiosInstance.interceptors.request.use(async req => {
    console.log('I am an interceptor')
    const authTokens = getAuthTokens()
    if (authTokens) {
        console.log('authTokens exists')
        const accessTokenDecoded = jwt_decode(authTokens.access)
        const expiration_time = dayjs.unix(accessTokenDecoded.exp)
        const now = dayjs()
        console.log('expiration time', expiration_time)
        console.log('now', now)
        console.log('expiration_time-now', (expiration_time - now) < 0)
        console.log('expiration_time.diff(now)', expiration_time.diff(now))
        if (accessTokenDecoded) {
            const is_expired = (expiration_time - now) < 0
            if (is_expired) {
                console.log('accessToken is expired, attempt to get a new one')
                refreshAccessToken()
                    .then((data) => { localStorage.setItem('authTokens', JSON.stringify(data)) })

            }
        }
    }
    return req
})

export const getConfig = () => {
    const authTokens = getAuthTokens()
    let config = {
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': authTokens ? 'Bearer ' + authTokens.access : null,
        }
    }
    return config
}

//////////////////// ACCESS  //////////////

export const getToken = (values) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}token/`, values, getConfig())
            .then(response => {
                //returns the access and refresh token
                //console.log('getToken', response.data)
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

export const refreshAccessToken = () => {
    const authTokens = getAuthTokens()
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}token/refresh/`, { 'refresh': authTokens.refresh })
            .then(response => {
                //console.log('refreshAccessToken', response.data)
                //returns a new access token
                resolve(response.data)
            }).catch(error => reject(error))
    })
}
//////////////////// WEBSOCKET  //////////////

export const connectWebSocket = (url) => {
    try {
        const authTokens = getAuthTokens()
        const access = authTokens.access
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${url}/?token=${access}`)
        ws.onopen = () => {
            //console.log('WebSocket Client Connected');
        }
        return (ws)
    }
    catch (error) {
        console.log(error)
        return null;
    }

}


//////////////////// USERS  //////////////

export const createUser = async (data) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.post("auth/registration/", data, getConfig())
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

export const retrieveContact = async (pk) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`contacts/${pk}`, getConfig())
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

//////////////////// CONTACTS  //////////////
export const retrieveContacts = async () => {
    return AxiosInstance.get("contacts/", getConfig()).then(response => (response.data))
}

export const searchUsers = async (filter) => {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`search-contact/?search=${filter}`, getConfig())
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

export const addContact = async (pk) => {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`add_contact/${pk}`, getConfig())
            .then(response => {
                console.log('response.data', response.data)
                resolve(response.data)
            }).catch(error => reject(error))
    })
}


export const retrieveChats = async () => {
    return new Promise((resolve, reject) => {
        AxiosInstance.get("chats/", getConfig())
            .then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
    })
}

export const updateAvatarImage = async (data) => {
    return AxiosInstance.put("update_avatar/", data, getConfig()).then(response => (response.data))
}

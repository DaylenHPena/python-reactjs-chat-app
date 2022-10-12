export const HTTP_HEADERS = ()=> {
    return {headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authTokens') ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access : null,
    }}
}

export const API_BASE = "http://localhost:8000/api/";
export const API_CHATS = API_BASE + "chats/";
export const API_REGISTRATION = API_BASE + "auth/registration/";

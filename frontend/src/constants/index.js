export const HTTP_HEADERS = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authTokens') ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access : null,
        }
    }
}

export const HTTP_HEADERS_AUTH = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authTokens') ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access : null,
        }
    }
}

export const AUTH_HEADER = () => ({
    'Authorization': localStorage.getItem('authTokens') ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access : null,
})

export const API_BASE = "http://localhost:8000/api/";
export const API_SEARCH_CONTACT = API_BASE + "search-contact/?search=";
export const API_ADD_CONTACT = API_BASE + "add_contact/";

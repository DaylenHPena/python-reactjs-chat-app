import { createContext, useState } from "react";
import { API_CHATS, HTTP_HEADERS } from "../constants";

const ChatContext = createContext()
export default ChatContext

export const ChatProvider = ({ children }) => {

    const [chats, setchats] = useState([])
    const [actualChat, setActualChat] = useState(null)
    const [proxyChat, setProxyChat] = useState(null)

    const updateChats = (values) => {
        setchats(values)
        //update actualChat as well, cause it might have changed
        for (const key in chats) {
            if (chats[key]['pk'] === actualChat.pk) {
                console.log('es el mimso que el actual debe actualizar')
                setActualChat(chats[key])
                break;
            }
        }
    }

    const getChats = async () => {
        let response = await fetch(API_CHATS, {
            ...HTTP_HEADERS(),
            method: "GET",
        })

        let data = await response.json()

        if (response.status === 200) {
            return data;
        }
        else {
            return { error: response.statusText }
        }
    }

    const receiveMessage = (message) => {
        //excepcts message to be {'type':'',....}
        const data = JSON.parse(message.data)

        if (data.type === "chat_message") {
            for (const key in chats) {
                const _chat = chats[key]
                if (_chat.pk === data.chat_room) {
                    _chat['messages'] = [..._chat['messages'], data] //add new message
                    if (_chat.pk !== actualChat.pk) {
                        markUnread(_chat)
                    }
                    updateChats([...chats])
                    return;
                }
            }
        }

        else if (data.type === "new_chat") {
            console.log('need to update chats')
            async function fetchData() {
                const data = await getChats()
                if (!data.error) {
                    updateChats(data)
                }
            }
            fetchData()
        }
    }

    const markRead = (chat) => {
        if (Object.hasOwnProperty.call(chat, 'unread')) {
            chat.unread = 0
        }
    }

    const markUnread = (chat) => {
        if (Object.hasOwnProperty.call(chat, 'unread')) {
            chat.unread = chat.unread + 1
        } else {
            chat['unread'] = 1
        }
        console.log('chat[unread]', chat['unread'])
    }

    const updateActualChat = (chat) => {
        markRead(chat)
        setActualChat(chat)
        console.log('actualChat !== proxyChat', actualChat, proxyChat)
        if (proxyChat && actualChat !== proxyChat) {
            //clean  proxy chat
            console.log('i clean proxy chat')
            setProxyChat(null)
        }
    }

    const connectWithUser = (user) => {
        console.log('proxyChat', proxyChat)
        //try to get an existing chat 
        let exist = false
        for (const key in chats) {
            if (('identifier' in chats[key]) && String(chats[key].identifier) === String(user.pk)) {
                updateActualChat(chats[key])
                exist = true
                return;
            }
        }

        // send trough proxy chat if chat doesnt exist
        console.log('i am making a proxy')
        const tempChat = createProxyChat(user.username)
        setProxyChat(tempChat)
        updateActualChat(tempChat)
    }

    const createProxyChat = (name) => ({ 'pk': 'proxy', 'identifier': 'proxy', 'name': name, })

    const state = {
        'chats': chats,
        'updateChats': updateChats,
        'getChats': getChats,
        'markRead': markRead,
        'actualChat': actualChat,
        'updateActualChat': updateActualChat,
        'receiveMessage': receiveMessage,
        'connectWithUser': connectWithUser
    }

    return (<ChatContext.Provider value={state}>
        {children}
    </ChatContext.Provider>)
}
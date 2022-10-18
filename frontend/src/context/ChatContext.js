import { createContext, useState } from "react";

const ChatContext = createContext()
export default ChatContext

export const ChatProvider = ({ children }) => {

    const [chats, setchats] = useState([])
    const [actualChat, setActualChat] = useState(null)

    const updateChats = (values) => {
        setchats(values)
        for (const chat in chats) {
            if (chats[chat]['pk'] === actualChat.pk) {
                console.log('es el mimso que el actual debe actualizar')
                setActualChat(chats[chat])
                break;
            }
        }
    }

    const markRead = (chat) => {
        if (Object.hasOwnProperty.call(chat, 'unread')) {
            chat.unread = 0
        }
    }

    const updateActualChat = (chat) => {
        setActualChat(chat)
    }

    const state = {
        'chats': chats,
        'updateChats': updateChats,
        'markRead': markRead,
        'actualChat': actualChat,
        'updateActualChat': updateActualChat
    }

    return (<ChatContext.Provider value={state}>
        {children}
    </ChatContext.Provider>)
}
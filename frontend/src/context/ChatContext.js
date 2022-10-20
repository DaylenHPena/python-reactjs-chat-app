import { createContext, useState } from "react";

const ChatContext = createContext()
export default ChatContext

export const ChatProvider = ({ children }) => {

    const [chats, setchats] = useState([])
    const [actualChat, setActualChat] = useState(null)
    const [proxyChat, setProxyChat] = useState(null)

    const updateChats = (values) => {
        setchats(values)
        //update actualChat as well, cause it might have changed
        for (const chat in chats) {
            if (chats[chat]['pk'] === actualChat.pk) {
                console.log('es el mimso que el actual debe actualizar')
                setActualChat(chats[chat])
                break;
            }
        }
    }

    const receiveMessage = (message) => {
        const data = JSON.parse(message.data)

        if (data.type === "chat_message") {
            for (const chat in chats) {
                if (chats[chat].pk === data.chat_room) {
                    chats[chat]['messages'] = [...chats[chat]['messages'], data]
                    if (chats[chat]['pk'] !== actualChat.pk) {
                        markUnread(chats[chat])
                    }
                    updateChats([...chats])
                    break;
                }
            }
        }

        else if (data.type === "new_chat") {
            console.log('need to update chats')
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
    }

    const updateActualChat = (chat) => {
        markRead(chat)
        setActualChat(chat)
    }

    const connectWithUser = (user) => {
        //try to get an existing chat 
        console.log('I am looking for my friend')
        let exist = false
        for (const key in chats) {
            if (Object.hasOwnProperty.call('identifier', chats['key']) && chats['key'].identifier === user.pk) {
                updateActualChat(chats['key'])
                exist = true
                break;
            }
        }
        if (!exist) {
            // send trough proxy chat if chat doesnt exist
            const tempChat = createProxyChat(user.username)
            setProxyChat(tempChat)
            updateActualChat(tempChat)
        }
    }

    const createProxyChat = (name) => ({ 'pk': 'proxy', 'identifier': 'proxy', 'name': name, })

    const state = {
        'chats': chats,
        'updateChats': updateChats,
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
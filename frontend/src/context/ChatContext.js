import { createContext, useState } from "react";
import { retrieveChats, retrieveContact } from "../service/ServiceApi";


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

    const receiveMessage = (message) => {
        //excepcts message to be {'type':'',....}
        const parsedMessage = JSON.parse(message.data)

        function updateChatMessages(message) {
            for (const key in chats) {
                const itChat = chats[key]
                if (itChat.pk == message.chat_room) {
                    itChat['messages'] = [...itChat['messages'], message] //add new message
                    if (itChat.pk !== actualChat.pk) {
                        markUnread(itChat)
                    }
                    updateChats([...chats])
                    return;
                }
            }
        }

        if (parsedMessage.type === "new_chat") {
            retrieveChats()
                .then((apdatedChats) => {
                    updateChats(apdatedChats)
                    //check if the new chat is result of the proxy chat by checking the name
                    if (actualChat.identifier == parsedMessage.room_name) {
                        for (const key in chats) {
                            const it_chat = chats[key]
                            if (it_chat.identifier == parsedMessage.room_name) {
                                updateActualChat(it_chat)
                            }
                        }
                    }

                })
                .catch(error => { console.log('Error receiving new chat: ', error) })
        }

        else if (parsedMessage.type === "chat_message") {
            updateChatMessages(parsedMessage)
        }

        else if (parsedMessage.type == 'connection on') { console.log(parsedMessage) }

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
        console.log('actualChat !== proxyChat', actualChat !== proxyChat)
        if (proxyChat && actualChat !== proxyChat) {
            //clean  proxy chat
            console.log('i clean proxy chat')
            setProxyChat(null)
        }
    }

    const connectWithUser = (pk) => {
        console.log('proxyChat', proxyChat)

        retrieveContact(pk)
            .then(contact => {
                console.log('data', contact)
                //try to get an existing chat 
                let exist = false
                for (const key in chats) {
                    if (('identifier' in chats[key]) && chats[key].identifier == contact.pk) {
                        updateActualChat(chats[key])
                        exist = true
                        return;
                    }
                }

                // send trough proxy chat if chat doesnt exist
                if (!exist) {
                    console.log('i am making a proxy')
                    const tempChat = createProxyChat(contact.username, contact.pk)
                    setProxyChat(tempChat)
                    updateActualChat(tempChat)
                }

            })
            .catch(error => { console.error(error) })
    }

    const createProxyChat = (name, receiver_pk) => ({ 'pk': 'proxy', 'identifier': receiver_pk, 'name': name })

    const state = {
        'chats': chats,
        'updateChats': updateChats,
        'getChats': retrieveChats,
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
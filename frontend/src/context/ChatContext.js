import { createContext, useState, useEffect } from "react";
import { retrieveChats, retrieveContact } from "../service/ServiceApi";


const ChatContext = createContext()
export default ChatContext

export const ChatProvider = ({ children }) => {

    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)

    useEffect(() => {
        //update activeChat as well, cause it might have changed
        if (activeChat) {
            if (activeChat.pk == "proxy") {
                for (const key in chats) {
                    if (chats[key]['identifier'] === activeChat.identifier) {
                        setActiveChat(chats[key])
                        return;
                    }
                }
            }
            else {
                for (const key in chats) {
                    if (chats[key]['pk'] === activeChat.pk) {
                        setActiveChat(chats[key])
                        return;
                    }
                }
            }

        }
    }, [chats])

    const receiveMessage = (message) => {
        //excepcts message to be {'type':'',....}
        const parsedMessage = JSON.parse(message.data)

        function updateChatMessages(message) {
            for (const key in chats) {
                const itChat = chats[key]
                if (itChat.pk == message.chat_room) {
                    itChat['messages'] = [...itChat['messages'], message] //add new message
                    if (itChat.pk !== activeChat.pk) {
                        markUnread(itChat)
                    }
                    setChats([...chats])
                    return;
                }
            }
        }

        if (parsedMessage.type === "new_chat") {
            retrieveChats()
                .then((updatedChats) => {
                    setChats([...updatedChats])
                })
        }

        else if (parsedMessage.type === "chat_message") {
            updateChatMessages(parsedMessage)
        }

        else if (parsedMessage.type == 'connection on') { console.log('Connection on: ',parsedMessage) }

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

    const updateActiveChat = (chat) => {
        markRead(chat)
        setActiveChat(chat)
    }

    const connectWithUser = (pk) => {
        retrieveContact(pk)
            .then(contact => {
                //try to get an existing chat 
                let exist = false
                for (const key in chats) {
                    if (('identifier' in chats[key]) && chats[key].identifier == contact.pk) {
                        updateActiveChat(chats[key])
                        exist = true
                        return;
                    }
                }

                // send trough proxy chat if chat doesnt exist
                if (!exist) {
                    const tempChat = createProxyChat(contact.username, contact.pk, contact.avatar)
                    updateActiveChat(tempChat)
                }

            })
            .catch(error => { console.error(error) })
    }

    const createProxyChat = (name, receiver_pk, img) => ({ 'pk': 'proxy', 'identifier': receiver_pk, 'name': name, messages: [], img: img })

    const state = {
        'chats': chats,
        'setChats': setChats,
        'getChats': retrieveChats,
        'markRead': markRead,
        'activeChat': activeChat,
        'updateActiveChat': updateActiveChat,
        'receiveMessage': receiveMessage,
        'connectWithUser': connectWithUser
    }

    return (<ChatContext.Provider value={state}>
        {children}
    </ChatContext.Provider>)
}
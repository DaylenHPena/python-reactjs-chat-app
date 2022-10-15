import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/UserConf'
import { API_CHATS, HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';



function HomePage() {
  let { onOpen, url, client } = useContext(ConnectionContext)

  const [chats, setchats] = useState([])
  const [unreadMessages, setUnreadMessages] = useState([])
  const [actualChat, setActualChat] = useState(null)

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

  //run on first render
  useEffect(() => {
    async function fetchData() {
      let initial = await getChats()
      if (initial.error) {
        console.log('Unauthorized') //TODO:Handle error
      }
      else {
        setchats(initial)
        console.log('chats', chats)
      }
    }
    fetchData()
  }, [])

  // run on every render 
  useEffect(() => {

    if (client) {
      client.onmessage = (message) => {
        if (message != null) {
          console.log('message[type]', message['type'])
          if (message['type'] === "chat_message") {
            setUnreadMessages([...unreadMessages, JSON.parse(message.data)])
            console.log('unreadMessages', unreadMessages)
          }

        }
      }
    }

    //onOpen()

  })

  useEffect(() => {
    for (const key in chats) {
      if (chats[key].identifier === url) {
        setActualChat(chats[key])
        return
      }
      setActualChat([])
    }
  }, [url])

  const chatWindow = () => {
    return (
      <>
        <ChatHeader actualChat={actualChat} />
        <MessageList />
        <ChatInput />
      </>
    )
  }

  return (
    <>
      <div className='row '>
        <div className='col-3 leftsidebar bg-light p-0'>
          <UserConf />
          <ChatList chats={chats} />
        </div>
        <div className='col p-0'>
          {actualChat ? chatWindow() : <><h3>Start chatting with friends</h3></>}
        </div>
      </div>
    </>
  )
}


export default HomePage
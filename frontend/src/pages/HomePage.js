import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/UserConf'
import { API_CHATS, HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';
import AuthContext from '../context/AuthContext';
import ChatContext from '../context/ChatContext';



function HomePage() {
  let { onOpen, client } = useContext(ConnectionContext)
  let { chats, updateChats, actualChat } = useContext(ChatContext)

  const getChats = async () => {
    let response = await fetch(API_CHATS, {
      ...HTTP_HEADERS(),
      method: "GET",
    })

    let data = await response.json()

    if (response.status === 200) {
      console.log('data', data)
      return data;
    }
    else {
      return { error: response.statusText }
    }
  }

  //run on first render
  useEffect(() => {
    //get all chats from database
    async function fetchData() {
      let initial = await getChats()
      if (initial.error) {
        console.log('Unauthorized') //TODO:Handle error
      }
      else {
        updateChats(initial)
      }
    }
    fetchData()
  }, [])

  // run on every render 
  useEffect(() => {
    onOpen()
    if (client) {
      client.onmessage = ((message) => {
        const data=JSON.parse(message.data)
        console.log('message', data)
        console.log('message.chat_room', data.chat_room)
        console.log('chats', chats)
        for (const chat in chats) {
          console.log('chat.pk', chats[chat])
          if (chats[chat].pk === data.chat_room) {
            console.log('first', { ...chats[chat]['messages'], data })
          }

        }
      })
    }
  })

  const chatWindow = () => {
    return (
      <>
        <ChatHeader />
        <MessageList messages={actualChat.messages} />
        <ChatInput />
      </>
    )
  }

  return (
    <>
      <div className='row '>
        <div id="leftsidebar" className='col-3 p-0 border-end border-opacity-50'>
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
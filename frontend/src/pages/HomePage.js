import React, { Component, Fragment, useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatWindow from '../components/chatWindow/ChatWindow'
import UserConf from '../components/UserConf'
import { API_CHATS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';

//const url = 'ws://127.0.0.1:8000/ws/chat/hello/';
//const chatSocket = new WebSocket(url);

const getChats = async () => {
  let response = await fetch(API_CHATS, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  })

  let data = await response.json()
  console.log('getChats data', data)
}

function HomePage() {
  let { client, onOpen } = useContext(ConnectionContext)

  const [chats, setchats] = useState([])

  useEffect(() => { onOpen() })

  return (
    <Fragment>
      <div className='row '>
        <div className='col-3 leftsidebar bg-light'>
          <UserConf></UserConf>
          <ChatList chats={chats}></ChatList>
        </div>
        <div className='col'>
          <ChatWindow></ChatWindow>
        </div>
      </div>
    </Fragment>
  )
}


export default HomePage
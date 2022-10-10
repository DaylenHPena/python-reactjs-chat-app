import React, { Component, Fragment, useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatWindow from '../components/chatWindow/ChatWindow'
import UserConf from '../components/UserConf'
import { API_CHATS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';



function HomePage() {
  let { onOpen } = useContext(ConnectionContext)

  const [chats, setchats] = useState([])

  const getChats = async () => {
    let response = await fetch(API_CHATS, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    let data = await response.json()

    if (data != chats) {
      //console.log('getChats data', data)
    }

    return data;
  }

  useEffect(() => {
    onOpen()
  })

  useEffect(() => {
    async function fetchData() {
      let initial = await getChats()
      setchats(initial)
    }
    fetchData()
  }, [])



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
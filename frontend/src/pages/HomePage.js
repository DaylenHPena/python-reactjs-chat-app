import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatWindow from '../components/chatWindow/ChatWindow'
import UserConf from '../components/UserConf'
import { API_CHATS, HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';



function HomePage() {
  let { onOpen } = useContext(ConnectionContext)

  const [chats, setchats] = useState([])

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

  useEffect(() => {
    onOpen()
  })

  useEffect(() => {
    async function fetchData() {
      let initial = await getChats()
      if (initial.error) {
        console.log('Unauthorized') //TODO:Handle error
      }
      else { setchats(initial) }
    }
    fetchData()
  }, [])



  return (
    <>
      <div className='row '>
        <div className='col-3 leftsidebar bg-light'>
          <UserConf></UserConf>
          <ChatList chats={chats}></ChatList>
        </div>
        <div className='col'>
          <ChatWindow></ChatWindow>
        </div>
      </div>
    </>
  )
}


export default HomePage
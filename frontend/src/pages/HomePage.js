import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/UserConf'
import { API_CHATS, HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';
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
        const data = JSON.parse(message.data)
        if (data.type === "chat_message") {
          for (const chat in chats) {
            if (chats[chat].pk === data.chat_room) {
              chats[chat]['messages'] = [...chats[chat]['messages'], data]
              if (chats[chat]['pk'] !== actualChat.pk) {
                if (Object.hasOwnProperty.call(chats[chat], 'unread')) {
                  console.log('hasOwnProperty.call(chats[chat]) ')
                  chats[chat]['unread'] = chats[chat]['unread'] + 1
                } else {
                  chats[chat]['unread'] = 1
                  console.log('le anado la propiedad')
                }
              }
              updateChats([...chats])
              console.log('chats', chats)
              break;
            }
          }
        }
        console.log('message', data)
        console.log('message.chat_room', data.chat_room)
        console.log('chats', chats)

      })
    }
  })

  useEffect(() => {
    console.log('si vi que se actualizo')
  }, [actualChat])


  const chatWindow = () => {
    return (
      <>
        <ChatHeader />
        <MessageList messages={actualChat.messages} />
        <ChatInput />
      </>
    )
  }

  function ProfileSidebar() {
    return (
      <div id="profile" className="offcanvas offcanvas-start p-0 border-end border-opacity-50 pe-0 bg-sidebar">
        <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
          <span className='fa fa-arrow-left me-2' onClick={toogleMenu}></span>Profile
        </div>
        <div>
          <div className="m-2 mb-4"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0OhzF3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-md' /></div>
          <h5>Username</h5>
          <p>About</p>
        </div>
      </div>)
  }

  const searchChat = (string) => {
  }

  function toogleMenu() {
    //TODO: move outside
    var e = document.getElementById('profile')
    e.classList.toggle("show");
  }

  function Search() {
    //TODO: Search in chat list
    return (
      <div className='px-2 mt-2'>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><span className='fa fa-search'></span></span>
            <input id='search' name='search' type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </form>
      </div>
    )
  }


  return (
    <>
      <div className='row '>

        <ProfileSidebar />

        <div id="leftsidebar" className=' border-end border-opacity-50 pe-0 bg-sidebar'>
          <UserConf />
          <Search />
          <ChatList chats={chats} />
        </div>

        <div className='p-0' id="main">
          {actualChat ? chatWindow() : <><h3>Start chatting with friends</h3></>}
        </div>

      </div>
    </>
  )
}


export default HomePage
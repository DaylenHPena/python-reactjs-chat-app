import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/UserConf'
import { API_CHATS, API_CONTACTS,  HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';
import ChatContext from '../context/ChatContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ContactSidebar from '../components/contact/ContactSidebar';
import AddContactSidebar from '../components/contact/AddContactSidebar';


function HomePage() {
  let { onOpen, client } = useContext(ConnectionContext)
  let { chats, updateChats, actualChat, receiveMessage } = useContext(ChatContext)
  const [contacts, setContacts] = useState([])

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

  const getContacts = async () => {
    let response = await fetch(API_CONTACTS, {
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
      let initialChats = await getChats()
      let initialContacts = await getContacts()
      if (initialChats.error || initialContacts.error) {
        console.log('Unauthorized') //TODO:Handle error
      }
      else {
        updateChats(initialChats)
        setContacts(initialContacts)
      }
    }
    fetchData()
  }, [])

  // run on every render 
  useEffect(() => {
    onOpen()
    if (client) {
      client.onmessage = ((message) => {
        receiveMessage(message)
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
      <div className='row m-0'>

        <ProfileSidebar />
        <ContactSidebar contacts={contacts}/>
        <AddContactSidebar/>

        <div id="leftsidebar" className='border-end border-opacity-50 p-0 bg-sidebar'>
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
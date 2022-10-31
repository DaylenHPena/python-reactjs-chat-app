import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/leftSidebar/UserConf'
import ConnectionContext from '../context/ConnectionContext';
import ChatContext from '../context/ChatContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ContactSidebar from '../components/contact/ContactSidebar';
import AddContactSidebar from '../components/contact/AddContactSidebar';
import { retrieveContacts } from '../service/ServiceApi';
import './home.css'


function HomePage() {
  let { client } = useContext(ConnectionContext)
  let { chats, setChats, activeChat, receiveMessage, getChats } = useContext(ChatContext)
  const [contacts, setContacts] = useState([])
  const { connect } = useContext(ConnectionContext)
  const { connectWithUser } = useContext(ChatContext)


  //run on first render
  useEffect(() => {
    //get all chats from database
    getChats()
      .then((data) => { setChats(data) })
      .then(() => {
        retrieveContacts()
          .then(data => setContacts(data))
      })
      .catch(error => { console.log('Unauthorized: ', error) })
  }, [])

  const onNewContact = (pk) => {
    retrieveContacts()
      .then(data => setContacts(data))
      .catch(error => { console.log(error) })
    connectEvent(pk)
  }

  const connectEvent = (pk) => {
    connect(pk)
    connectWithUser(pk)
  }

  // run on every render 
  useEffect(() => {
    if (client) {
      client.onmessage = ((message) => {
        receiveMessage(message)
      })
    }
  })

  const ChatWindow = () => {
    return (
      <>
        <ChatHeader />
        <MessageList messages={activeChat.messages} />
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
        <ContactSidebar contacts={contacts} onConnect={connectEvent} />
        <AddContactSidebar onNewContact={onNewContact} />

        <div id="leftsidebar" className='p-0'>
          <UserConf />
          <Search />
          <ChatList chats={chats} />
        </div>

        <div className='p-0' id="main">
          {activeChat
            ? <ChatWindow />
            : <div className='connect'>
              <h4 className='mt-5 '>Start chatting with friends</h4>
              <img src='connect.jpg' className='connect-img mt-5'></img>
            </div>}
        </div>

      </div>
    </>
  )
}


export default HomePage
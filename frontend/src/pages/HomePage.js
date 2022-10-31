import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/leftSidebar/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/leftSidebar/UserConf'
import ConnectionContext from '../context/ConnectionContext';
import ChatContext from '../context/ChatContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ContactSidebar from '../components/leftSidebar/contact/ContactSidebar';
import AddContactSidebar from '../components/leftSidebar/contact/AddContactSidebar';
import { retrieveContacts } from '../service/ServiceApi';


function HomePage() {
  let { client } = useContext(ConnectionContext)
  let { chats, updateChats, activeChat, receiveMessage, getChats } = useContext(ChatContext)
  const [contacts, setContacts] = useState([])
  const { connect } = useContext(ConnectionContext)
  const { connectWithUser } = useContext(ChatContext)


  //run on first render
  useEffect(() => {
    //get all chats from database
    getChats()
      .then((data) => { updateChats(data) })
      .then(() => {
        retrieveContacts()
          .then(data => setContacts(data))
      })
      .catch(error => { console.log('Unauthorized: ',error) })
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
      //console.log('the client is here')
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
        <ContactSidebar contacts={contacts} onConnect={connectEvent}/>
        <AddContactSidebar onNewContact={onNewContact} />

        <div id="leftsidebar" className='p-0 bg-sidebar'>
          <UserConf />
          <Search />
          <ChatList chats={chats} />
        </div>

        <div className='p-0' id="main">
          {activeChat
            ? <ChatWindow />
            : <><h3>Start chatting with friends</h3></>}
        </div>

      </div>
    </>
  )
}


export default HomePage
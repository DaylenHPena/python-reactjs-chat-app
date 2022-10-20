import React, { useState, useEffect, useContext } from 'react'
import ChatList from '../components/chatList/ChatList'
import ChatHeader from '../components/chatWindow/ChatHeader';
import ChatInput from '../components/chatWindow/ChatInput';
import MessageList from '../components/chatWindow/MessageList';
import UserConf from '../components/UserConf'
import { API_ADD_CONTACT, API_CHATS, API_CONTACTS, API_SEARCH_CONTACT, HTTP_HEADERS } from '../constants';
import ConnectionContext from '../context/ConnectionContext';
import ChatContext from '../context/ChatContext';
import ToogleOffCanvas from '../utils/ToogleOffCanvas';


function HomePage() {
  let { onOpen, client, connect } = useContext(ConnectionContext)
  let { chats, updateChats, actualChat } = useContext(ChatContext)
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

  const searchContact = async (value) => {
    let response = await fetch(API_SEARCH_CONTACT + value, {
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
        const data = JSON.parse(message.data)
        if (data.type === "chat_message") {
          for (const chat in chats) {
            if (chats[chat].pk === data.chat_room) {
              chats[chat]['messages'] = [...chats[chat]['messages'], data]
              if (chats[chat]['pk'] !== actualChat.pk) {
                if (Object.hasOwnProperty.call(chats[chat], 'unread')) {
                  chats[chat]['unread'] = chats[chat]['unread'] + 1
                } else {
                  chats[chat]['unread'] = 1
                }
              }
              updateChats([...chats])
              break;
            }
          }
        }
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
          <span className='fa fa-arrow-left me-2' data-toogle="profile" onClick={ToogleOffCanvas}></span>Profile
        </div>
        <div>
          <div className="m-2 mb-4"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0OhzF3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-md' /></div>
          <h5>Username</h5>
          <p>About</p>
        </div>
      </div>)
  }

  function AddContacts() {
    const [searchResult, setSearchResult] = useState([])
    const handleSubmit = (e) => {
      e.preventDefault();
      //TODO:check errors
      async function fetchData() {
        const list = await searchContact(e.target.search.value)
        setSearchResult(list)
      }
      fetchData()
    }
    let addContact = async (e) => {
      console.log('e.target.dataset.id', e.target.dataset.id)
      let response = await fetch(API_ADD_CONTACT + e.target.dataset.id + '/', {
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

    //TODO: get contacts only when this window is visible
    return (
      <div id="contacts" className="offcanvas offcanvas-start p-0 border-end border-opacity-50 pe-0 bg-sidebar">
        <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
          <span className='fa fa-arrow-left me-2' onClick={ToogleOffCanvas} data-toogle="contacts"></span>AddContacts
        </div>
        <div className='px-2 mt-2'>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><span className='fa fa-search'></span></span>
              <input id='search' name='search' type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" required />
            </div>
          </form>
        </div>
        <button><span className='fa fa-plus'></span></button>
        <ul className='list-unstyled mt-2'>
          {searchResult.map(contact => (
            <>
              <li key={contact.pk} id={contact.pk} >
                <div className="d-flex px-2 py-3 mb-0 chat-room">
                  <div className="me-3"><img src={contact.avatar} className=' rounded-circle avatar-xs' /></div>
                  <div className='flex-grow-1'>
                    <div key={contact.pk} className='m-0 text-start mw-75'>
                      <p className='fw-semibold m-0 text-truncate'>{contact.username}</p>
                    </div>
                  </div>
                  <a className="btn btn-default" data-id={contact.pk} onClick={addContact} >Add</a>
                </div>
              </li></>
          ))}
        </ul>

      </div>)
  }

  function Contacts() {
    let { connect } = useContext(ConnectionContext)
    let { updateActualChat, markRead } = useContext(ChatContext)

    const [searchResult, setSearchResult] = useState([])

    const handleSubmit = (e) => {
      e.preventDefault();
      //TODO:check errors
      async function fetchData() {
        const list = await searchContact(e.target.search.value)
        setSearchResult(list)
      }
      fetchData()
    }

    function users(user) {
      const handleClick = (e) => {
        connect(user.pk)
        //try to get an existing chat 
        let exist = false
        for (const key in chats) {
          if (Object.hasOwnProperty.call('identifier', chats['key']) && chats['key'].identifier === user.pk) {
            markRead(chats['key'])
            updateActualChat(chats['key'])
            exist = true
            break;
          }
        }
        if (!exist) {
          // send trouhg proxy chat if chat doesnt exist
          updateActualChat(user)
        }
      }

      return (
        <a data-id={user.pk} onClick={handleClick}>
          <div className="d-flex px-2 py-3 mb-0 chat-room" >
            <div className="me-3"><img src={user.avatar} className=' rounded-circle avatar-xs' /></div>
            <div className='flex-grow-1'>
              <div key={user.pk} className='m-0 text-start mw-75'>
                <p className='fw-semibold m-0 text-truncate'>{user.username}</p>
              </div>
            </div>
          </div>
        </a>)
    }


    //TODO: get contacts only when this window is visible
    return (
      <div id="contacts" className="offcanvas offcanvas-start p-0 border-end border-opacity-50 pe-0 bg-sidebar">
        <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
          <span className='fa fa-arrow-left me-2' onClick={ToogleOffCanvas} data-toogle="contacts"></span>Contacts
        </div>
        <div className='px-2 mt-2'>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><span className='fa fa-search'></span></span>
              <input id='search' name='search' type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" required />
            </div>
          </form>
        </div>
        <button><span className='fa fa-plus'></span></button>
        <ul className='list-unstyled mt-2'>
          {contacts.map(contact => (
            <>

              <li key={contact.pk} id={contact.pk} >
                {users(contact)}
              </li></>
          ))}
        </ul>

      </div>)
  }

  const searchChat = (string) => {
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
        <Contacts />

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
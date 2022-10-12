import React, { Fragment, useContext, useEffect, useState } from 'react'
import ConnectionContext from '../../context/ConnectionContext'
import Message from '../chatWindow/Message'

function MessageList() {
  let { client } = useContext(ConnectionContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (client) {
      client.onmessage = (message) => {
        if (message != null) {
          setMessages([...messages, JSON.parse(message.data)])
        }
      }
    }
  })

  return (
    <Fragment>
      <div id='chat-log'>
        <ul className='list-group'>
          {messages.map(message => {
            return (<li key={message.pk} className="message-row"><Message {...message}></Message></li>)
          })}
        </ul>
      </div>
    </Fragment>

  )
}

export default MessageList
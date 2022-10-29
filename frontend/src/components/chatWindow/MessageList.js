import React, { Fragment, useContext, useEffect, useState } from 'react'
import ConnectionContext from '../../context/ConnectionContext'
import Message from '../chatWindow/Message'

function MessageList({messages}) {

  return (
    <Fragment>
      <div id='chat-log'>
        <ul className='list-group'>
          {messages && messages.map(message => {
            return (<li key={message.sender+message.created_at} className="message-row"><Message message={message}></Message></li>)
          })}
        </ul>
      </div>
    </Fragment>

  )
}

export default MessageList
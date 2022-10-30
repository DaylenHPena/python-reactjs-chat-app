import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext'
import ConnectionContext from '../../context/ConnectionContext'

function ChatInput() {
  const { client } = useContext(ConnectionContext)
  let { actualChat } = useContext(ChatContext)


  let handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting')
    client.send(JSON.stringify({
      'text': e.target.message.value,
      'chat_room': actualChat.pk,
      'type': 'chat_message',
    }));
    e.target.message.value = '';
  }

  return (
    <div className='position-relative'>
      <form id="message-form" onSubmit={handleSubmit}>
        <input name="message" type="text" placeholder="Write a message..." className='form-control '></input>
        <button type='submit' className="btn btn-outline-secondary"><i
          className="fa fa-paper-plane"></i></button>
      </form>
    </div>
  )
}

export default ChatInput

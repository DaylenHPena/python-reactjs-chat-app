import React, { useContext } from 'react'
import ConnectionContext from '../../context/ConnectionContext'

function ChatInput() {
  const { client } = useContext(ConnectionContext)

  let handleSubmit = (e) => {
    e.preventDefault();
    client.send(JSON.stringify({
      'message': e.target.message.value,
      'user_id': 'Test',
      'receiver':''
    }));
    e.target.message.value = '';
  }

  return (
    <form id="message-form" className="bg-light" onSubmit={handleSubmit}>
      <input name="message" type="text" placeholder="Write a message..." className='form-control'></input>
      <button type='submit' className="btn btn-outline-secondary"><i
        className="fa fa-paper-plane"></i></button>
    </form>
  )
}

export default ChatInput

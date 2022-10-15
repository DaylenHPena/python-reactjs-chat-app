import React, { useContext } from 'react'
import ConnectionContext from '../../context/ConnectionContext'

function ChatInput() {
  const { client } = useContext(ConnectionContext)

  let handleSubmit = (e) => {
    e.preventDefault();
    client.send(JSON.stringify({
      'message': e.target.message.value,
    }));
    e.target.message.value = '';
  }

  return (
    <div className='position-relative'>
      <form id="message-form" className="bg-light" onSubmit={handleSubmit}>
        <input name="message" type="text" placeholder="Write a message..." className='form-control'></input>
        <button type='submit' className="btn btn-outline-secondary"><i
          className="fa fa-paper-plane"></i></button>
      </form>
    </div>
  )
}

export default ChatInput

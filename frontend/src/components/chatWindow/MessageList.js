import Message from '../chatWindow/Message'

function MessageList({ messages }) {

  return (
    <>
      <div id='chat-log'>
        <ul className='list-group'>
          {messages
            ? messages.map(message => {
              return (<li key={message.sender + message.created_at} className="message-row"><Message message={message}></Message></li>)
            })
            : <h5 className="mt-5">Start the talk</h5>
          }
        </ul>
      </div>
    </>

  )
}

export default MessageList
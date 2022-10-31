import Message from '../chatWindow/Message'
import { dateDiffInDays, toDateFormat, isToday, isYesterday } from "../../utils/date";

function MessageList({ messages }) {
  let date = null;


  function DateHeader({ message }) {
    const messagedate = new Date(message.created_at)

    if (!date || dateDiffInDays(date, messagedate) !== 0) {
      date = messagedate
      return <li key={messagedate} className="date-header mb-5">
        <span >{isToday(messagedate, new Date()) ? "Today"
          : isYesterday(messagedate, new Date()) ? "Yesterday"
            : toDateFormat(new Date(message.created_at))}</span>
      </li>
    }
    return null
  }

  return (
    <>
      <div id='chat-log'>
        <ul className='list-group'>
          {messages
            ?
            messages.map(message => {
              return (
                <>
                  <DateHeader message={message} />
                  <li key={message.sender + message.created_at} className="message-row">
                    <Message message={message} />
                  </li>
                </>
              )
            })
            : <h5 className="mt-5">Start the talk</h5>
          }
        </ul>
      </div>
    </>

  )
}

export default MessageList
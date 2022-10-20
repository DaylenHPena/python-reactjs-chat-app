import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext';
import ConnectionContext from '../../context/ConnectionContext'

function ChatThumbnail(props) {
    const { chat } = props;
    const { connect } = useContext(ConnectionContext)
    let { updateActualChat } = useContext(ChatContext)

    const badgeCount = () => {
        if (Object.hasOwnProperty.call(chat, 'unread') & chat.unread !== 0) {
            return (<span className="badge rounded-pill text-bg-success">{chat.unread}</span>)
        }
        return (null)
    }

    const handleClick = (e) => {
        connect(chat.identifier)
        updateActualChat(chat)
    }

    const lastMessage = () => {
        if (Object.hasOwnProperty.call(chat, 'messages') & chat.messages.length !== 0) {
            return (chat.messages[chat.messages.length - 1].text)
        }
        return (null)
    }

    const time = (stringDate) => (new Date(stringDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

    const lastDate = () => {
        if (Object.hasOwnProperty.call(chat, 'messages') & chat.messages.length !== 0) {
            const d = new Date(chat.messages[chat.messages.length - 1].created_at)
            return isSameDay(d, new Date()) ? time(d) : toDateFormat(d)

        }
        return (null)
    }

    const isSameDay = (date1, date2) => (date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear())

    const toDateFormat = (date) => {
        let options = { month: "short", day: "numeric" }
        if (date.getFullYear() !== (new Date().getFullYear())) { options['year'] = "numeric" }
        return date.toLocaleDateString('en-us', options)
    }

    return (
        <a onClick={handleClick}>
            <div className="d-flex px-2 py-3 mb-0 chat-room">
                <div className="me-3"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-xs' /></div>
                <div className='flex-grow-1'>
                    <div key={chat.identifier} className='m-0 text-start mw-75'>
                        <p className='fw-semibold m-0 text-truncate'>{chat.name}</p>
                        <p className='last-message m-0 gray text-truncate'>{lastMessage()}</p>
                    </div>
                </div>
                <div className='last-message gray'>
                    <p className='m-0'>{lastDate()}</p>
                    {badgeCount()}
                </div>
            </div>
        </a >
    )
}

export default ChatThumbnail


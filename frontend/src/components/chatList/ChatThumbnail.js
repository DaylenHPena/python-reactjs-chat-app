import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext';
import ConnectionContext from '../../context/ConnectionContext'
import { isToday, isYesterday, toDateFormat } from '../../utils/date';
import './chatList.css'

function ChatThumbnail({ chat }) {
    const { name, identifier, img } = chat;
    const { connect } = useContext(ConnectionContext)
    let { updateActiveChat } = useContext(ChatContext)

    const badgeCount = () => {
        if (Object.hasOwnProperty.call(chat, 'unread') & chat.unread !== 0) {
            return (<span className="badge rounded-pill text-bg-success">{chat.unread}</span>)
        }
        return (null)
    }

    const handleClick = () => {
        connect(chat.identifier)
        updateActiveChat(chat)
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
            return isToday(d, new Date()) ? time(d) : toDateFormat(d)

        }
        return (null)
    }

    return (
        <a onClick={handleClick}>
            <div className="d-flex px-2 py-3 mb-0 chat-room">
                <div className="me-3"><img src={img} className=' rounded-circle avatar-xs' /></div>
                <div className='flex-grow-1'>
                    <div key={identifier} className='m-0 text-start mw-75'>
                        <p className='fw-semibold m-0 text-truncate name'>{name}</p>
                        <p className='last-message m-0 text-truncate last-message'>{lastMessage()}</p>
                    </div>
                </div>
                <div className='last-message'>
                    <p className='m-0'>{lastDate()}</p>
                    {badgeCount()}
                </div>
            </div>
        </a >
    )
}

export default ChatThumbnail


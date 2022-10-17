import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext';
import ConnectionContext from '../../context/ConnectionContext'

function ChatThumbnail(props) {
    const { chat } = props;
    const {connect} = useContext(ConnectionContext)
    let { updateActualChat } = useContext(ChatContext)

    
    const handleClick = (e) => {
        connect(chat.identifier)
        updateActualChat(chat)
    }
    return (
        <a onClick={handleClick}>
            <div className="d-flex p-2 mb-0 chat-room">
                <div className="m-2"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-xs' /></div>
                <div className='flex-grow-1'>
                    <div key={chat.identifier} className='m-0 text-start '>
                        <p className='fw-semibold text-truncate'>{chat.name}</p>
                        <p className='fs-smaller gray text-truncate'>{chat.message}</p>
                    </div>
                </div>
                <div className='gray'>
                    <p>{chat.date}</p>
                    <p>2s</p>
                </div>
            </div>
        </a >
    )
}

export default ChatThumbnail


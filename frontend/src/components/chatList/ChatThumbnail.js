import React, { Component } from 'react'

function ChatThumbnail(props) {
    const { chat } = props;
    return (
        <a>
            <div className="d-flex p-2 mb-0 chat-room">
                <div className="m-2"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-xs' /></div>
                <div className='flex-grow-1'>
                    <div className='m-0 text-start '>
                        <p className='fs-small fw-bold '>{chat.name}</p>
                        <p className='fs-smaller gray'>{chat.message}</p>
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


import React, { Fragment, Component } from 'react'
import ChatThumbnail from './ChatThumbnail'

function ChatList(props) {
    return (
        <>
            <ul className='list-group'>
                {props.chats && props.chats.map(chat => (
                    <>
                        {console.log('chat', chat.pk)}
                        <li key={chat.pk} id={chat.pk} ><ChatThumbnail chat={chat}></ChatThumbnail></li></>
                ))}
            </ul>
        </>
    )
}

export default ChatList
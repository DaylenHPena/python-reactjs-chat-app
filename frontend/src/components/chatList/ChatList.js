import React, { Fragment, Component } from 'react'
import ChatThumbnail from './ChatThumbnail'

function ChatList(props) {
    console.log('props.chats', props.chats)
    return (
        <>
            <ul className='list-group'>
                {props.chats.map(chat => (
                    <>
                        <li key={chat.pk}><ChatThumbnail chat={chat}></ChatThumbnail></li></>
                ))}
            </ul>
        </>
    )
}

export default ChatList
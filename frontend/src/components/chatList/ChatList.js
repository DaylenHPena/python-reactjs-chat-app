import React, { Fragment, Component } from 'react'
import ChatThumbnail from './ChatThumbnail'

function ChatList(props) {
    return (
        <>
            <ul className='list-group px-4'>
                {props.chats && props.chats.map(chat => (
                    <>
                        <li key={chat.identifier} id={chat.identifier} ><ChatThumbnail chat={chat}></ChatThumbnail></li></>
                ))}
            </ul>
        </>
    )
}

export default ChatList
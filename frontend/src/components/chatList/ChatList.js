import React, { Fragment, Component } from 'react'
import ChatThumbnail from './ChatThumbnail'

function ChatList(props) {
    return (
        <>
            <ul className='list-group'>
                {props.chats.map(chat => (
                    <><h3>un chat</h3>
                        <li ><ChatThumbnail chat={chat}></ChatThumbnail></li></>
                ))}

            </ul>
        </>
    )
}

export default ChatList
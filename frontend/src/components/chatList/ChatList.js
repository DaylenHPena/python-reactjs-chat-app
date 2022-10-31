import ChatThumbnail from './ChatThumbnail'

function ChatList({ chats }) {
    return (
        <ul className='list-unstyled mt-2' key={1}>
            {chats ?
                chats.map(chat => (
                    <li key={chat.identifier} id={chat.identifier} >
                        <ChatThumbnail key={chat.identifier} chat={chat} />
                    </li>
                ))
                : <li className='list-item'>No chats found</li>
            }
        </ul>
    )
}

export default ChatList
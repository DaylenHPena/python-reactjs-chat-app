import React, { Fragment, Component } from 'react'
import ChatThumbnail from './ChatThumbnail'


export class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
    }
    render() {
        console.log('this.state.chats', this.state.chats)
        return (
            <Fragment>
                <ul className='list-group'>
                    {this.state.chats.map(chat => {
                        return (<li key={chat.pk}><ChatThumbnail {...chat}></ChatThumbnail></li>)
                    })}
                </ul>
            </Fragment>
        )
    }
}


export default ChatList
import React, { Component } from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

export class ChatWindow extends Component {
  render() {
    return (
      <div>
        <ChatHeader></ChatHeader>
        <MessageList></MessageList>
        <ChatInput></ChatInput>
      </div>
    )
  }
}

export default ChatWindow
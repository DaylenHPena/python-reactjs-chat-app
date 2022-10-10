import React, { Component } from 'react'

export class ChatHeader extends Component {
  render() {
    return (
      <div id="room-detail" className="bg-dark-style-header d-flex p-2 align-items-center text-white">
        <img></img>
        <p className="p-0">
          Chat Room Details
        </p>
        <p>Last seen</p>
        <a><span className='fa fa-times'></span></a>
        <a><span className='fa fa-search'></span></a>
        <a><span className='fa fa-dot'></span></a>
      </div>
    )
  }
}

export default ChatHeader
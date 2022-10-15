import React, { useContext } from 'react'
import ConnectionContext from '../../context/ConnectionContext'

function ChatHeader({ actualChat }) {
  console.log('actualChat', actualChat)
  return (
    <div id="room-detail" className="bg-dark-style-header d-flex p-2 align-items-center text-white">
      <div className="m-2"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-xs' /></div>
      <p className="p-0">
        {actualChat && actualChat.name}
      </p>
      <a><span className='fa fa-search'></span></a>
      <a><span className='fa fa-dot'></span></a>
    </div>
  )
}

export default ChatHeader

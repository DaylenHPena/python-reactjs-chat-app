import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext'
import ConnectionContext from '../../context/ConnectionContext'

function ChatHeader() {
  let { actualChat } = useContext(ChatContext)

  return (
    <div id="room-detail" className="d-flex p-2 align-items-center border-bottom">
      <div className='col-8 d-flex align-items-center'>
        <div className="m-2"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-xs' /></div>
        <p className="p-0 text-truncate fs-4">
          {actualChat && actualChat.name}
        </p>
      </div>
      <div className='actions col-4 d-flex align-items-center'>
        <span className='fa fa-search ms-4'></span>
        <span className='fa fa-phone ms-4'></span>
        <span className='fa fa-video-camera ms-4'></span>
        <span className='fa fa-user ms-4'></span>
        <span className='fa fa-ellipsis-h ms-4'></span>
        
      </div>
    </div>
  )
}

export default ChatHeader

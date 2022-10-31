import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext'

function ChatHeader() {
  let { activeChat } = useContext(ChatContext)
  const { name, img } = activeChat || {}

  return (
    <div id="room-detail" className="d-flex p-2 align-items-center top-nav">
      <div className='col-8 d-flex align-items-center'>
        <div className="m-2"><img src={img} className=' rounded-circle avatar-xs' /></div>
        <p className="p-0 text-truncate fs-4">
          {activeChat && name}
        </p>
      </div>
      <div className='actions unimplemented-actions  col-4 pe-4 d-flex align-items-center justify-content-end'>
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

import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ToogleOffCanvas from '../../utils/ToogleOffCanvas';

function UserConf() {
  let { user } = useContext(AuthContext)

  return (user
    ? <>
      <div id="user-nav-info" className="d-flex px-4 align-items-center justify-content-between top-nav">
        <img src={user.avatar} className="rounded-circle avatar-xs" onClick={ToogleOffCanvas} data-toogle="profile"></img>
        <p id="user_name">{user && user.username}</p>
        
        <div className='d-flex justify-content-around align-items-center' >
          <span className="fa fa-user-o me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" onClick={ToogleOffCanvas} data-toogle="contacts"></span>
        </div>

      </div>
    </>
    : null
  )
}

export default UserConf

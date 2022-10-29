import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ToogleOffCanvas from '../../utils/ToogleOffCanvas';

function UserConf() {
  let { user, logoutUser } = useContext(AuthContext)

  return (
    <>
      <div id="user-nav-info" className="d-flex px-4 align-items-center justify-content-between top-nav">
        <img src={user.avatar} className="rounded-circle avatar-xs" onClick={ToogleOffCanvas} data-toogle="profile"></img>
        <p id="user_name">{user && user.username}</p>
        <div className='d-flex justify-content-around align-items-center' >
          <span className="fa fa-pencil "></span>
          
          <span className="fa fa-user-o" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" onClick={ToogleOffCanvas} data-toogle="contacts"></span>
          <div class="dropdown bg-sidebar">
            <span class="dropdown-toggle fa fa-ellipsis-v" type="button" data-bs-toggle="dropdown" aria-expanded="false"/>
            <ul class="dropdown-menu bg-sidebar">
              <li><a class="dropdown-item" href="#">Logout<span className="fa fa-sign-out" onClick={logoutUser}></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserConf

import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function UserConf() {
  let { user } = useContext(AuthContext)

  return (
    <>
      <div id="user-nav-info" className="bg-dark-style-header d-flex p-2 align-items-center">
        <img className="img-thumbnail rounded-circle"></img>
        {!user && <p>Anonymus</p>}
        {user && <p id="user_name">{user.username}</p>}
        <a className="float-end px-2"><span className="fa fa-sign-out"></span></a>
      </div>
    </>
  )
}

export default UserConf

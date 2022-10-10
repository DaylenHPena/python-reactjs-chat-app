import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function UserConf() {
  let { user } = useContext(AuthContext)

  return (
    <>
      <div id="user-nav-info d-flex" className="bg-dark-style-header d-flex p-2 align-items-center">
        <img src="https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg" className="rounded-circle avatar-xs"></img>
        {!user && <p>Anonymus</p>}
        {user && <p id="user_name">{user.username}</p>}
        <a className="float-end px-2"><span className="fa fa-sign-out"></span></a>
      </div>
    </>
  )
}

export default UserConf

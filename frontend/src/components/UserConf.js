import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function UserConf() {
  let { user, logoutUser } = useContext(AuthContext)
  function toogleMenu() {
    //TODO: move outside
    var e = document.getElementById('profile')
    e.classList.toggle("show");
  }

  return (
    <>
      <div id="user-nav-info" className="d-flex px-4 align-items-center justify-content-between top-nav bg-dark-nav">
        <img src="https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg" className="rounded-circle avatar-xs" onClick={toogleMenu}></img>
        <p id="user_name">{user.username}</p>
        <div className='d-flex justify-content-around align-items-center'>
          <span className="fa fa-pencil "></span>
          <span className="fa fa-sign-out" onClick={logoutUser}></span>
          <span className="fa fa-ellipsis-v"></span>
        </div>
      </div>
    </>
  )
}

export default UserConf

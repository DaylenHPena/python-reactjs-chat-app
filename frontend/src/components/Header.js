import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let { user, logoutUser} = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      {!user &&
        <>
          <p>Hello Anonymus</p>
          <Link to="/login">Login</Link>
        </>

      }
      {user && <p>Welcome {user.username}</p> && <p onClick={logoutUser}>Logout</p> }
    </div>
  )
}

export default Header
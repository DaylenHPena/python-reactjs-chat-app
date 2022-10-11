import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let { user} = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      {!user &&
        <>
          <Link to="/login">Login</Link>
        </>

      }
     
    </div>
  )
}

export default Header
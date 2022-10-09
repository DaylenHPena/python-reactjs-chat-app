import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext)
  
  return (
    <Routes><Route {...rest} >{ children }</Route></Routes>)
}

export default PrivateRoute
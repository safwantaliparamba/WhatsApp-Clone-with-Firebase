import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../screens/Login'

const AuthRouter = () => {
  return (
    <Routes>
        <Route path="login/" element={<Login />} />
    </Routes>
  )
}

export default AuthRouter
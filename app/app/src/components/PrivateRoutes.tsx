import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PrivateRouteProps {
  children: JSX.Element
  role: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute

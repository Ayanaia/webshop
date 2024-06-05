// Login.tsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'
import style from './Login.module.css'

function Login() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!authContext) {
    return <div>Loading...</div>
  }

  const { login } = authContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post('/login', { email, password })
      const token = response.data.token
      await login(token) // Use the token to set user context
      const userResponse = await api.get('/users/current')
      const userRole = userResponse.data.role
      if (userRole === 'seller') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed', error)
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={style.container}>
      {error && <div className={style.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Login</h1>

        <div className={style.formGroup}>
          <label>Email</label>
          <input
            className={style.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Password</label>
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={style.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        <button
          className={style.registerBtn}
          onClick={() => navigate('/register')}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Login

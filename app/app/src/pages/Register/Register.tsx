import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './Register.module.css'

const generateRandomPassword = () => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

function Register() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [showPassword, setShowPassword] = useState(false)

  if (!authContext) {
    return <div>Loading...</div>
  }

  const { login } = authContext

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword()
    setPassword(generatedPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/register', { name, email, password, phoneNumber, role })
      const loginResponse = await api.post('/login', { email, password })
      await login(loginResponse.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.registerTitle}>Register</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.generateButton}
                onClick={handleGeneratePassword}>
                Generate
              </button>
            </div>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className={styles.checkbox}
              />
              Show Password
            </label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" className={styles.btn}>
            Register
          </button>
          <button
            type="button"
            className={styles.loginBtn}
            onClick={() => navigate('/login')}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register

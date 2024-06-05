import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../core/modules/user/User.api'
import styles from './Profile.module.css'

const EditProfile = () => {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const updatedUser = await updateUser(user?._id ?? '', {
        name,
        email,
        phoneNumber,
      })
      setUser(updatedUser)
      alert('Profile updated successfully')
      navigate('/profile')
      window.location.reload() // Force a page refresh becuase "Hello, User" in the header is not updating till i refresh :(
    } catch (error) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>

      <div className={styles.editProfileContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.editProfileForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.updateButton}
            disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile

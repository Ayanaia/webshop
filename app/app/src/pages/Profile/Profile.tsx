import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.css'

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/profile/edit')
  }

  return (
    <div>
      <h1>Profile</h1>

      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user?.phoneNumber}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
        <button className={styles.editButton} onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile

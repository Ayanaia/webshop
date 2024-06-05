import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { FaUser } from 'react-icons/fa'
import styles from './Header.module.css'

const Header = () => {
  const authContext = useContext(AuthContext)
  const { user, logout } = authContext || {}
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleContactClick = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/contact')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/?search=${searchQuery}`)
  }

  const handleLogout = () => {
    if (logout) {
      logout()
    }
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        {user?.role !== 'seller' && (
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        )}
        <h1 className={styles.storeName}>Galore Boutique</h1>
        <div className={styles.headerIcons}>
          {user?.role !== 'seller' && (
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/cart">Cart</Link>
            </>
          )}
          {user ? (
            <div
              className={styles.userDropdown}
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}>
              <span>{`Hello, ${user.name}`}</span>
              {dropdownVisible && (
                <div className={styles.dropdownMenu}>
                  <Link to="/profile" className={styles.dropdownItem}>
                    Profile Settings
                  </Link>
                  <Link to="/orders" className={styles.dropdownItem}>
                    {user.role === 'seller' ? 'Placed Orders' : 'Order History'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdownItemBtn}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUser /> Log in
            </Link>
          )}
        </div>
      </div>
      <nav className={styles.navBar}>
        <Link to={user?.role === 'seller' ? '/dashboard' : '/'}>
          {user?.role === 'seller' ? 'Dashboard' : 'All Products'}
        </Link>
        <Link to="/about-us">About Us</Link>
        <button className={styles.navButton} onClick={handleContactClick}>
          Contact
        </button>
      </nav>
    </header>
  )
}

export default Header

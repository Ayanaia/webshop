import { Link } from 'react-router-dom'
import style from './Footer.module.css'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const Footer = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext || {}

  return (
    <footer className={style.footer}>
      <nav className={style.footer__nav}>
        <li className={style.footer__nav_item}>
          <Link
            to={user?.role === 'seller' ? '/dashboard' : '/'}
            className={style.footer__nav_link}>
            {user?.role === 'seller' ? 'Dashboard' : 'All Products'}
          </Link>
        </li>
        <li className={style.footer__nav_item}>
          <Link to="/about-us" className={style.footer__nav_link}>
            About Us
          </Link>
        </li>
        <li className={style.footer__nav_item}>
          <Link to="/contact" className={style.footer__nav_link}>
            Contact
          </Link>
        </li>
      </nav>
      <p className={style.footer__copyright}>
        © 2024 Ayah Kardes. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer

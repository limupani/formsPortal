import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'
import Logo from './Logo'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/portal' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
]

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth()

  return (
    <header className={styles.navbar}>
      <Logo />

      <nav className={styles.links} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className={styles.link}>
              Dashboard
            </Link>
            <Link to="/profile" className={styles.link}>
              Profile
            </Link>
          </>
        )}
        <Link to="/report-a-problem" className={styles.link}>
          Report a Problem
        </Link>
        {isAuthenticated ? (
          <button type="button" className={styles.signInBtn} onClick={signOut}>
            Sign out{user?.name ? ` (${user.name})` : ''}
          </button>
        ) : (
          <Link to="/sign-in" className={styles.signInBtn}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}

import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

export default function Logo({ to = '/portal' }) {
  return (
    <Link to={to} className={styles.logo} aria-label="Engro home">
      <img src="/logo/engro-logo.svg" alt="Engro" className={styles.mark} />
    </Link>
  )
}

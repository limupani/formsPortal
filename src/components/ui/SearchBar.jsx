import { Search } from 'lucide-react'
import styles from './SearchBar.module.css'

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  ...rest
}) {
  return (
    <label className={styles.wrapper}>
      <Search className={styles.icon} aria-hidden="true" />
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
    </label>
  )
}

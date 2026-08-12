import styles from './SearchBar.module.css'

function SearchIcon() {
  return (
    <svg
      className={styles.icon}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.5 18.5L14.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  ...rest
}) {
  return (
    <label className={styles.wrapper}>
      <SearchIcon />
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

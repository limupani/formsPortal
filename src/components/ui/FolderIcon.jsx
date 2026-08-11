import styles from './FolderIcon.module.css'

export default function FolderIcon({ label, count, active = false, onClick }) {
  return (
    <button
      type="button"
      className={styles.wrapper}
      onClick={onClick}
      aria-pressed={active}
    >
      <svg
        className={active ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        width="132"
        height="92"
        viewBox="0 0 132 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M76.92 23.75L70.55 3.73999C69.94 1.80999 68.14 0.5 66.1 0.5H8.92999C4.26999 0.5 0.5 4.25998 0.5 8.88998V82.33C0.5 86.96 4.26999 90.72 8.92999 90.72H122.71C127.37 90.72 131.14 86.96 131.14 82.33V35.38C131.14 30.75 127.37 26.99 122.71 26.99H81.37C79.34 26.99 77.53 25.68 76.92 23.75Z"
          className={styles.iconShape}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.label}>
        {label}
        {typeof count === 'number' ? ` (${count})` : ''}
      </span>
    </button>
  )
}

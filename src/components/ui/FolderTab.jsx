import styles from './FolderTab.module.css'

/**
 * @param {string} label - tab text
 * @param {boolean} active - true when this tab is the current selection (renders filled black, same as hover)
 * @param {number} zIndex - stacking order so left-most tabs sit above tabs to their right, matching the wireframe overlap
 */
export default function FolderTab({ label, active = false, zIndex = 0, ...rest }) {
  return (
    <button
      type="button"
      className={active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
      style={{ zIndex }}
      {...rest}
    >
      {label}
    </button>
  )
}

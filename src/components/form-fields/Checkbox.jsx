import styles from './FormFields.module.css'

export default function Checkbox({ id, checked, onChange }) {
  return (
    <input
      id={id}
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  )
}

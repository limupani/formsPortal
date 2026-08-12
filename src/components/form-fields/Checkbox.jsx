import styles from './FormFields.module.css'

export default function Checkbox({ id, checked, onChange, disabled = false }) {
  return (
    <input
      id={id}
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  )
}

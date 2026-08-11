import styles from './FormFields.module.css'

export default function TextField({ id, value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      id={id}
      type={type}
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      {...rest}
    />
  )
}

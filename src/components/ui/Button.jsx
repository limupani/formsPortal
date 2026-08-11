import styles from './Button.module.css'

/**
 * variant: 'primary' (solid black, e.g. Submit Form) | 'secondary' (outlined, e.g. Cancel / Save Draft)
 */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  ...rest
}) {
  const className = variant === 'primary' ? styles.primary : styles.secondary
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  )
}

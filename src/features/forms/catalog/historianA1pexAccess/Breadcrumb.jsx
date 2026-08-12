import styles from './Breadcrumb.module.css'

export default function Breadcrumb({ items }) {
  return <div className={styles.breadcrumb}>{items.join(' > ')}</div>
}

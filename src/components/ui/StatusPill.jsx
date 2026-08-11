import styles from './StatusPill.module.css'

const STATUS_CLASS = {
  approved: styles.approved,
  completed: styles.approved,
  rejected: styles.rejected,
  pending: styles.pending,
  draft: styles.draft,
}

const STATUS_LABEL = {
  approved: 'Approved',
  completed: 'Completed',
  rejected: 'Rejected',
  pending: 'Pending',
  draft: 'Draft',
}

export default function StatusPill({ status }) {
  const className = STATUS_CLASS[status] ?? styles.pending
  return <span className={`${styles.pill} ${className}`}>{STATUS_LABEL[status] ?? status}</span>
}

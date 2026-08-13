import styles from './DepartmentList.module.css'

export default function DepartmentList({ departments, onSelect }) {
  return (
    <div className={styles.fullBleed}>
      {departments.map((dept) => (
        <div
          key={dept.id}
          className={styles.row}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(dept.id)}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(dept.id)}
        >
          <div className={styles.rowInner}>
            <span className={styles.name}>{dept.name}</span>
            {dept.tagline && <span className={styles.tagline}>{dept.tagline}</span>}
          </div>
        </div>
      ))}

      <div
        className={styles.row}
        role="button"
        tabIndex={0}
        onClick={() => onSelect('all-forms')}
        onKeyDown={(e) => e.key === 'Enter' && onSelect('all-forms')}
      >
        <div className={styles.rowInner}>
          <span className={styles.name}>Access all forms</span>
        </div>
      </div>
    </div>
  )
}

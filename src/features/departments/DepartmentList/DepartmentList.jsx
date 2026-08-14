import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFormsForDepartment } from '../../forms/forms.registry'
import styles from './DepartmentList.module.css'

/** Returns this row's forms, tagged with which department each one belongs to.
 *  'all-forms' flattens every department into one list; anything else is a single department. */
function getFormsForRow(id, departments) {
  if (id === 'all-forms') {
    return departments.flatMap((d) =>
      getFormsForDepartment(d.id).available.map((f) => ({ ...f, departmentId: d.id, departmentName: d.name }))
    )
  }
  return getFormsForDepartment(id).available.map((f) => ({ ...f, departmentId: id }))
}

export default function DepartmentList({ departments }) {
  const [expandedId, setExpandedId] = useState(null)
  const navigate = useNavigate()

  function toggleRow(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function openForm(departmentId, formId) {
    navigate(`/portal/${departmentId}/forms/${formId}`)
  }

  const rows = [...departments, { id: 'all-forms', name: 'Access all forms' }]

  return (
    <div className={styles.fullBleed}>
      {rows.map((dept) => {
        const isExpanded = expandedId === dept.id
        const forms = isExpanded ? getFormsForRow(dept.id, departments) : []

        return (
          <div key={dept.id}>
            <div
              className={isExpanded ? `${styles.row} ${styles.rowExpanded}` : styles.row}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => toggleRow(dept.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggleRow(dept.id)}
            >
              <div className={styles.rowInner}>
                <span className={styles.name}>{dept.name}</span>
                {dept.tagline && <span className={styles.tagline}>{dept.tagline}</span>}
              </div>
            </div>

            {isExpanded && (
              <div className={styles.formsPanel}>
                <div className={styles.formsPanelInner}>
                  {forms.length === 0 ? (
                    <p className={styles.empty}>No forms available yet.</p>
                  ) : (
                    forms.map((form, i) => (
                      <button
                        key={`${form.departmentId}-${form.id}`}
                        type="button"
                        className={styles.formRow}
                        onClick={() => openForm(form.departmentId, form.id)}
                      >
                        <span className={styles.formIndex}>{String(i + 1).padStart(2, '0')}.</span>
                        <span className={styles.formTitle}>
                          {form.departmentName ? `${form.title} — ${form.departmentName}` : form.title}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
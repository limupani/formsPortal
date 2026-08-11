import { useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import FolderTab from '../../components/ui/FolderTab'
import FormListRow from '../../components/ui/FormListRow'
import { departments, getDepartmentById } from './departments.config'
import { getFormsForDepartment } from '../forms/forms.registry'
import styles from './DepartmentFormsPage.module.css'

export default function DepartmentFormsPage() {
  const { departmentId } = useParams()
  const navigate = useNavigate()

  const isAll = departmentId === 'all'
  const department = isAll ? { id: 'all', name: 'Access all forms' } : getDepartmentById(departmentId)

  const available = isAll
    ? departments.flatMap((d) =>
        getFormsForDepartment(d.id).available.map((f) => ({ ...f, departmentId: d.id, departmentName: d.name }))
      )
    : getFormsForDepartment(departmentId).available.map((f) => ({ ...f, departmentId }))

  const expired = isAll
    ? departments.flatMap((d) => getFormsForDepartment(d.id).expired)
    : getFormsForDepartment(departmentId).expired

  if (!department) {
    return (
      <PageShell>
        <p>That department doesn't exist.</p>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className={styles.tabRow}>
        <FolderTab label={department.name} active />
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelHeading}>Available Forms</h2>

        {available.length === 0 && <p className={styles.empty}>No forms available yet.</p>}

        {available.map((form, i) => (
          <FormListRow
            key={form.id}
            index={String(i + 1).padStart(2, '0')}
            title={isAll ? `${form.title} — ${form.departmentName}` : form.title}
            onClick={() => navigate(`/portal/${form.departmentId}/forms/${form.id}`)}
          />
        ))}

        {expired.length > 0 && (
          <>
            <h2 className={`${styles.panelHeading} ${styles.expiredHeading}`}>Expired</h2>
            {expired.map((form, i) => (
              <FormListRow
                key={form.id}
                index={String(i + 1).padStart(2, '0')}
                title={form.title}
                expiredOn={form.expiredOn}
              />
            ))}
          </>
        )}
      </div>
    </PageShell>
  )
}

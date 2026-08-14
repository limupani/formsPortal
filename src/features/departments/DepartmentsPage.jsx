import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import DepartmentList from './DepartmentList/DepartmentList'
import { departments } from './departments.config'
import { getFormsForDepartment } from '../forms/forms.registry'
import styles from './DepartmentsPage.module.css'

export default function DepartmentsPage() {
  const navigate = useNavigate()

  function handleSelect(id) {
    navigate(id === 'all-forms' ? '/portal/all' : `/portal/${id}`)
  }

  // Live count, not stored data — always matches whatever's actually in forms.registry.js.
  const departmentsWithFormCounts = departments.map((dept) => {
    const count = getFormsForDepartment(dept.id).available.length
    return { ...dept, tagline: `${count} ${count === 1 ? 'Form' : 'Forms'}` }
  })

  return (
    <PageShell>
      {/* Sticky: stays pinned as the page scrolls, so the panel below can scroll up and overlap it */}
      <div className={styles.stickyHeading}>
        <h1 className={styles.heading}>DEPARTMENTS</h1>
      </div>

      {/* Higher stacking + opaque background so it visibly covers the heading while scrolling past it */}
      <div className={styles.overlapPanel}>
        <DepartmentList departments={departmentsWithFormCounts} onSelect={handleSelect} />

      </div>
    </PageShell>
  )
}
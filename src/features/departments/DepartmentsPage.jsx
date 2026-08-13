import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import FolderIcon from '../../components/ui/FolderIcon'
import DepartmentList from './DepartmentList/DepartmentList'
import { departments } from './departments.config'
import styles from './DepartmentsPage.module.css'

export default function DepartmentsPage() {
  const navigate = useNavigate()

  function handleSelect(id) {
    navigate(id === 'all-forms' ? '/portal/all' : `/portal/${id}`)
  }

  return (
    <PageShell>
      {/* Sticky: stays pinned as the page scrolls, so the panel below can scroll up and overlap it */}
      <div className={styles.stickyHeading}>
        <h1 className={styles.heading}>Welcome to Portal</h1>
      </div>

      {/* Higher stacking + opaque background so it visibly covers the heading while scrolling past it */}
      <div className={styles.overlapPanel}>
        <DepartmentList departments={departments} onSelect={handleSelect} />

        <div className={styles.shortcuts}>
          <FolderIcon label="My Submissions" onClick={() => navigate('/dashboard?tab=submissions')} />
          <FolderIcon label="My Saved Drafts" onClick={() => navigate('/dashboard?tab=drafts')} />
        </div>
      </div>
    </PageShell>
  )
}

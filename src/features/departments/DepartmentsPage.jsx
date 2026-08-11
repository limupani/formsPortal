import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import FolderIcon from '../../components/ui/FolderIcon'
import FolderTabs from './FolderTabs/FolderTabs'
import styles from './DepartmentsPage.module.css'

export default function DepartmentsPage() {
  const navigate = useNavigate()

  function handleSelectTab(id) {
    navigate(id === 'all-forms' ? '/portal/all' : `/portal/${id}`)
  }

  return (
    <PageShell>
      <h1 className={styles.heading}>Welcome to Portal</h1>

      <div className={styles.tabsWrapper}>
        <FolderTabs onSelect={handleSelectTab} />
      </div>

      <div className={styles.shortcuts}>
        <FolderIcon label="My Submissions" onClick={() => navigate('/dashboard?tab=submissions')} />
        <FolderIcon label="My Saved Drafts" onClick={() => navigate('/dashboard?tab=drafts')} />
      </div>
    </PageShell>
  )
}

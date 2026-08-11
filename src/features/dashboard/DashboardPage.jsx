import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import FolderIcon from '../../components/ui/FolderIcon'
import StatusPill from '../../components/ui/StatusPill'
import { departments, getDepartmentById } from '../departments/departments.config'
import { getRecordsForUser } from '../../data/formsStore'
import { useAuth } from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import styles from './DashboardPage.module.css'

const SUBMISSION_FOLDERS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'drafts' ? 'drafts' : 'submissions'

  const [activeFolder, setActiveFolder] = useState(null)
  const records = useMemo(() => getRecordsForUser(user.id), [user.id])

  const submissionsByStatus = {
    pending: records.filter((r) => r.status === 'pending'),
    approved: records.filter((r) => r.status === 'approved'),
    rejected: records.filter((r) => r.status === 'rejected'),
  }

  const draftsByDept = Object.fromEntries(
    departments.map((d) => [d.id, records.filter((r) => r.status === 'draft' && r.departmentId === d.id)])
  )

  const [group, setGroup] = useState(initialTab)

  function openFolder(nextGroup, folderId) {
    setGroup(nextGroup)
    setActiveFolder(folderId)
  }

  const activeList =
    group === 'submissions' ? submissionsByStatus[activeFolder] ?? [] : draftsByDept[activeFolder] ?? []

  return (
    <PageShell>
      <section className={styles.section}>
        <h2 className={styles.heading}>My Submissions</h2>
        <div className={styles.folderRow}>
          {SUBMISSION_FOLDERS.map((f) => (
            <FolderIcon
              key={f.id}
              label={f.label}
              count={submissionsByStatus[f.id]?.length}
              active={group === 'submissions' && activeFolder === f.id}
              onClick={() => openFolder('submissions', f.id)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>My Saved Drafts</h2>
        <div className={styles.folderRow}>
          {departments.map((d) => (
            <FolderIcon
              key={d.id}
              label={d.name}
              count={draftsByDept[d.id]?.length}
              active={group === 'drafts' && activeFolder === d.id}
              onClick={() => openFolder('drafts', d.id)}
            />
          ))}
        </div>
      </section>

      {activeFolder && (
        <section className={styles.detail}>
          <h3 className={styles.detailHeading}>
            {group === 'submissions'
              ? `${SUBMISSION_FOLDERS.find((f) => f.id === activeFolder)?.label ?? 'Approved'} submissions`
              : `Drafts — ${getDepartmentById(activeFolder)?.name ?? ''}`}
          </h3>

          {activeList.length === 0 ? (
            <p className={styles.empty}>Nothing here yet.</p>
          ) : (
            <ul className={styles.list}>
              {activeList.map((record) => (
                <li key={record.id} className={styles.listRow}>
                  <span className={styles.formTitle}>{record.formTitle}</span>
                  <span className={styles.updatedAt}>
                    {new Date(record.updatedAt).toLocaleDateString()}
                  </span>
                  <StatusPill status={record.status} />
                  {record.status === 'draft' && (
                    <Link
                      className={styles.resumeLink}
                      to={`/portal/${record.departmentId}/forms/${record.formId}`}
                    >
                      Resume
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </PageShell>
  )
}

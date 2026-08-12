import { useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { getDepartmentById } from '../departments/departments.config'
import { getFormEntry } from './forms.registry'
import { getRecord, saveDraft, submitForm } from '../../data/formsStore'
import { useAuth } from '../auth/AuthContext'
import styles from './FormPage.module.css'

export default function FormPage() {
  const { departmentId, formId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const department = getDepartmentById(departmentId)
  const entry = getFormEntry(departmentId, formId)

  if (!department || !entry) {
    return (
      <PageShell>
        <p>That form couldn't be found.</p>
      </PageShell>
    )
  }

  const existingRecord = getRecord({ userId: user.id, formId })
  const FormComponent = entry.component

  function handleSave(data) {
    saveDraft({
      userId: user.id,
      formId,
      departmentId,
      formTitle: entry.title,
      data,
    })
    navigate('/dashboard?tab=drafts')
  }

  function handleSubmit(data) {
    submitForm({
      userId: user.id,
      formId,
      departmentId,
      formTitle: entry.title,
      data,
    })
    navigate('/dashboard?tab=submissions')
  }

  return (
    <PageShell>
      <div className={styles.wrapper}>
        <FormComponent
          formId={formId}
          title={entry.title}
          departmentName={department.name}
          initialData={existingRecord?.data ?? null}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      </div>
    </PageShell>
  )
}

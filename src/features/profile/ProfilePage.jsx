import { useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import FormRow from '../../components/form-fields/FormRow'
import TextField from '../../components/form-fields/TextField'
import Checkbox from '../../components/form-fields/Checkbox'
import Button from '../../components/ui/Button'
import { useAuth } from '../auth/AuthContext'
import styles from './ProfilePage.module.css'

const SETTINGS_OPTIONS = [
  { id: 'emailNotifications', label: 'Email me when a form I submitted is approved or rejected' },
  { id: 'draftReminders', label: 'Remind me about unfinished draft forms' },
  { id: 'compactView', label: 'Use a compact list view for forms' },
]

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    draftReminders: true,
    compactView: false,
  })

  function handleSave(e) {
    e.preventDefault()
    updateProfile({ name })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleSetting(id, value) {
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <PageShell showSearch={false}>
      <h1 className={styles.heading}>Profile</h1>

      <form className={styles.form} onSubmit={handleSave}>
        <FormRow label="Full Name :" htmlFor="name">
          <TextField id="name" value={name} onChange={setName} />
        </FormRow>
        <FormRow label="Email :" htmlFor="email">
          <TextField id="email" value={user.email} disabled />
        </FormRow>
        <FormRow label="Department :" htmlFor="department">
          <TextField id="department" value={user.department} disabled />
        </FormRow>
        <FormRow label="Title :" htmlFor="title">
          <TextField id="title" value={user.title} disabled />
        </FormRow>

        <div className={styles.actions}>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          {saved && <span className={styles.savedNote}>Saved.</span>}
        </div>
      </form>

      <h2 className={styles.subheading}>Settings</h2>
      <ul className={styles.settingsList}>
        {SETTINGS_OPTIONS.map((opt) => (
          <li key={opt.id} className={styles.settingsRow}>
            <label htmlFor={opt.id} className={styles.settingsLabel}>
              {opt.label}
            </label>
            <Checkbox id={opt.id} checked={settings[opt.id]} onChange={(v) => toggleSetting(opt.id, v)} />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

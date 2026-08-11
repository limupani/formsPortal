import { useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import Checkbox from '../../components/form-fields/Checkbox'
import styles from './SettingsPage.module.css'

const SETTINGS_OPTIONS = [
  { id: 'emailNotifications', label: 'Email me when a form I submitted is approved or rejected' },
  { id: 'draftReminders', label: 'Remind me about unfinished draft forms' },
  { id: 'compactView', label: 'Use a compact list view for forms' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    draftReminders: true,
    compactView: false,
  })

  function toggle(id, value) {
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <PageShell showSearch={false}>
      <h1 className={styles.heading}>Settings</h1>

      <ul className={styles.list}>
        {SETTINGS_OPTIONS.map((opt) => (
          <li key={opt.id} className={styles.row}>
            <label htmlFor={opt.id} className={styles.label}>
              {opt.label}
            </label>
            <Checkbox id={opt.id} checked={settings[opt.id]} onChange={(v) => toggle(opt.id, v)} />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

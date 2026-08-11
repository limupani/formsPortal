import styles from './PlaceholderForm.module.css'

/**
 * Every form component receives this same contract:
 *   formId       - registry id of this form
 *   initialData  - saved draft/submission data to pre-fill, or null
 *   onSave       - call with a data object to save a draft
 *   onSubmit     - call with a data object to submit the form
 *
 * This placeholder is used for catalog entries that haven't been custom
 * built yet. Copy this file's shape when starting a new real form.
 */
export default function PlaceholderForm({ title }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.body}>This form hasn't been built yet.</p>
    </div>
  )
}

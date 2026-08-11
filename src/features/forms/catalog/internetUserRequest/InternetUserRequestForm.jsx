import { useState } from 'react'
import FormRow from '../../../../components/form-fields/FormRow'
import TextField from '../../../../components/form-fields/TextField'
import SegmentedField from '../../../../components/form-fields/SegmentedField'
import Checkbox from '../../../../components/form-fields/Checkbox'
import FileUpload from '../../../../components/form-fields/FileUpload'
import Button from '../../../../components/ui/Button'
import styles from './InternetUserRequestForm.module.css'

const CNIC_PATTERN = buildPattern([5, 7, 1])
const MOBILE_PATTERN = buildPattern([4, 7])

const PACKAGES = [
  { id: '10mbps', label: '10 Mbps', price: 'Rs 3200' },
  { id: '12mbps', label: '12 Mbps', price: 'Rs 4000' },
  { id: '20mbps', label: '20 Mbps', price: 'Rs 6000' },
  { id: 'dsl8mbps', label: 'DSL 8 Mbps', price: 'Rs 1900' },
]

function buildPattern(groupSizes) {
  const pattern = []
  groupSizes.forEach((size, i) => {
    for (let n = 0; n < size; n += 1) pattern.push('d')
    if (i < groupSizes.length - 1) pattern.push('-')
  })
  return pattern
}

const EMPTY_DATA = {
  userName: '',
  cnic: '',
  mobile: '',
  extension: '',
  grade: '',
  pNumber: '',
  houseBoq: '',
  department: '',
  requestDate: '',
  activateFrom: '',
  selectedPackage: '',
  requestSign: '',
  cnicCopyName: '',
}

export default function InternetUserRequestForm({ initialData, onSave, onSubmit }) {
  const [data, setData] = useState({ ...EMPTY_DATA, ...(initialData ?? {}) })

  function set(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit?.(data)
  }

  function handleSaveDraft() {
    onSave?.(data)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.title}>INTERNET USER REQUEST (COLONY)</h1>
      <p className={styles.subtitle}>
        Engro Corporation Limited
        <br />
        Information Systems Department
      </p>

      <h2 className={styles.sectionHeading}>To be filled by User</h2>

      <FormRow label="User Name (full) :" htmlFor="userName">
        <TextField id="userName" value={data.userName} onChange={(v) => set('userName', v)} />
      </FormRow>

      <FormRow label="CNIC Number :" htmlFor="cnic">
        <SegmentedField id="cnic" pattern={CNIC_PATTERN} value={data.cnic} onChange={(v) => set('cnic', v)} />
      </FormRow>

      <FormRow label="Mobile Number :" htmlFor="mobile">
        <SegmentedField id="mobile" pattern={MOBILE_PATTERN} value={data.mobile} onChange={(v) => set('mobile', v)} />
      </FormRow>

      <FormRow label="Telephone Extention No. :" htmlFor="extension" width={220}>
        <TextField id="extension" value={data.extension} onChange={(v) => set('extension', v)} />
      </FormRow>

      <div className={styles.triRow}>
        <FormRow label="Grade :" htmlFor="grade">
          <TextField id="grade" value={data.grade} onChange={(v) => set('grade', v)} />
        </FormRow>
        <FormRow label="P. No. :" htmlFor="pNumber">
          <TextField id="pNumber" value={data.pNumber} onChange={(v) => set('pNumber', v)} />
        </FormRow>
        <FormRow label="House / BOQ :" htmlFor="houseBoq">
          <TextField id="houseBoq" value={data.houseBoq} onChange={(v) => set('houseBoq', v)} />
        </FormRow>
      </div>

      <FormRow label="Department / Section :" htmlFor="department">
        <TextField id="department" value={data.department} onChange={(v) => set('department', v)} />
      </FormRow>

      <FormRow label="Request Date :" htmlFor="requestDate">
        <TextField id="requestDate" type="date" value={data.requestDate} onChange={(v) => set('requestDate', v)} />
      </FormRow>

      <FormRow label="Internet to be activated from :" htmlFor="activateFrom">
        <TextField id="activateFrom" type="date" value={data.activateFrom} onChange={(v) => set('activateFrom', v)} />
      </FormRow>

      <div className={styles.packageBlock}>
        <p className={styles.packageLabel}>Select Internet Package :</p>
        <div className={styles.packageGrid}>
          {PACKAGES.map((pkg) => (
            <label key={pkg.id} className={styles.packageOption}>
              <span>{pkg.label}</span>
              <span className={styles.packagePrice}>({pkg.price})</span>
              <Checkbox
                id={`package-${pkg.id}`}
                checked={data.selectedPackage === pkg.id}
                onChange={(checked) => set('selectedPackage', checked ? pkg.id : '')}
              />
            </label>
          ))}
        </div>
      </div>

      <div className={styles.ethics}>
        <h2 className={styles.ethicsTitle}>FTTH/DSL Ethics</h2>
        <p className={styles.ethicsBody}>
          It is the ethical responsibility of the FTTH/DSL end user to ensure the service provided is not
          misused and that the connection provided will be used by a single user and is not distributed to
          other users. If evidence is found of any such activity in which the service is being distributed to
          other users or the service is being misused, then IS has right of terminating the connection without
          prior notice in addition to further actions. FTTH/DSL user will be entirely responsible how he uses
          the service and the information sent and received and company shall not be involved in any case.
          However, the company reserves the right to audit the use age.
        </p>
      </div>

      <FormRow label="User Request Sign :" htmlFor="requestSign" width={260}>
        <TextField id="requestSign" value={data.requestSign} onChange={(v) => set('requestSign', v)} />
      </FormRow>

      <FormRow label="CNIC Copy :" htmlFor="cnicCopy">
        <FileUpload
          id="cnicCopy"
          fileName={data.cnicCopyName}
          onChange={(file) => set('cnicCopyName', file?.name ?? '')}
        />
      </FormRow>

      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          Submit Form
        </Button>
        <div className={styles.secondaryActions}>
          <Button type="button" variant="secondary" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={handleSaveDraft}>
            Save Draft
          </Button>
        </div>
      </div>
    </form>
  )
}

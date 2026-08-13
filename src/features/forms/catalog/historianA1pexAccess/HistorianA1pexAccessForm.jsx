import { useState } from 'react'
import Button from '../../../../components/ui/Button'
import styles from './HistorianA1pexAccessForm.module.css'

const EMPTY_DATA = {
  fullName: '',
  initials: '',
  department: '',
  requestType: '', // 'new' | 'renew'
  submissionDate: '',
  pcIpAddress: '',
  macAddress: '',
  wifiLanConnectivity: '',
  computerName: '',
  accessType: '', // free text: thin / thick
  authorizationType: '', // free text: User / ENGR
  clientAccessProvided: '', // 'thin' | 'thick'
  credentialsShared: '', // 'no' | 'yes'
  excelAddInCoordinator: '', // 'not-available' | 'no' | 'yes'
  thinClientProvided: '', // 'not-available' | 'no' | 'yes'
  thickClientProvided: '', // 'not-available' | 'no' | 'yes'
  excelAddInIsSection: '', // 'not-available' | 'no' | 'yes'
}

const REQUEST_TYPE_LABEL = {
  new: 'New Access',
  renew: 'Access Renew',
}

function display(value) {
  return value && value.length > 0 ? value : '—'
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <span className={styles.opts}>
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </span>
  )
}

/** Read-only recap of what the applicant entered on step 1, carried forward into steps 2 and 3. */
function RequestSummaryCard({ data }) {
  const requestTypeLabel = REQUEST_TYPE_LABEL[data.requestType] ?? 'Request'

  return (
    <>
      <div className={styles.sectionTitle}>Applicant's Request — {requestTypeLabel}</div>
      <div className={styles.card}>
        <div className={styles.summaryGrid}>
          <div>
            <p>
              <b>Name:</b> {display(data.fullName)}
            </p>
            <p>
              <b>Department:</b> {display(data.department)}
            </p>
          </div>
          <div>
            <p>
              <b>Computer Name:</b> {display(data.computerName)}
            </p>
            <p>
              <b>IP Address:</b> {display(data.pcIpAddress)}
            </p>
            <p>
              <b>MAC Address:</b> {display(data.macAddress)}
            </p>
          </div>
        </div>
        <div className={styles.summaryRequests}>
          <p>
            <b>Requests</b>
          </p>
          <div className={styles.summaryRequestsRow}>
            <p>
              <b>Connectivity:</b> {display(data.wifiLanConnectivity)}
            </p>
            <p>
              <b>Access Type:</b> {display(data.accessType)}
            </p>
            <p>
              <b>Authorization Type:</b> {display(data.authorizationType)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function HistorianA1pexAccessForm({ departmentName, title, initialData, onSave, onSubmit }) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ ...EMPTY_DATA, ...(initialData ?? {}) })

  function set(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSaveDraft() {
    onSave?.(data)
  }

  function handleCancel() {
    window.history.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        Home &gt; {departmentName ?? 'Department'} &gt; {title ?? 'IP21 Historian Access Form'}
      </div>

      <h1 className={styles.h1}>IP21 Historian Access Form</h1>
      <p className={styles.role}>
        {page === 1 && 'APPLICANT'}
        {page === 2 && 'A1PEX SYSTEM COORDINATOR'}
        {page === 3 && 'INFORMATION SYSTEM — DHK'}
      </p>
      <div className={styles.subtitle}>
        Engro Corporation Limited
        <br />
        Information Systems Department
      </div>

      {/* PAGE 1 — Applicant */}
      {page === 1 && (
        <section className={styles.page}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                placeholder="full name"
                value={data.fullName}
                onChange={(e) => set('fullName', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Initials</label>
              <input
                type="text"
                placeholder="e.g. JD"
                value={data.initials}
                onChange={(e) => set('initials', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Department</label>
              <input
                type="text"
                placeholder="e.g. IT"
                value={data.department}
                onChange={(e) => set('department', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Request Type</label>
              <div className={styles.radios}>
                <label>
                  <input
                    type="radio"
                    name="requestType"
                    checked={data.requestType === 'new'}
                    onChange={() => set('requestType', 'new')}
                  />
                  new access
                </label>
                <label>
                  <input
                    type="radio"
                    name="requestType"
                    checked={data.requestType === 'renew'}
                    onChange={() => set('requestType', 'renew')}
                  />
                  access renew
                </label>
              </div>
            </div>
            <div className={styles.field}>
              <label>Submission Date</label>
              <input
                type="date"
                value={data.submissionDate}
                onChange={(e) => set('submissionDate', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>PC IP Address</label>
              <input
                type="text"
                placeholder="192.168.x.x"
                value={data.pcIpAddress}
                onChange={(e) => set('pcIpAddress', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>MAC Address</label>
              <input
                type="text"
                placeholder="00-00-00-00-00-00"
                value={data.macAddress}
                onChange={(e) => set('macAddress', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Wi-Fi / LAN Connectivity</label>
              <input
                type="text"
                placeholder="e.g. WiFi / LAN"
                value={data.wifiLanConnectivity}
                onChange={(e) => set('wifiLanConnectivity', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Computer Name</label>
              <input
                type="text"
                placeholder="e.g. PC-1234"
                value={data.computerName}
                onChange={(e) => set('computerName', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Access Type (thin or thick client)</label>
            <input
              type="text"
              placeholder="thin / thick"
              value={data.accessType}
              onChange={(e) => set('accessType', e.target.value)}
            />
            <div className={styles.note}>
              Note: We have limited licenses for thick clients. If we encounter limitations, we may need
              to revoke an existing license or incur the cost of a new license.
            </div>
          </div>

          <div className={styles.field}>
            <label>Authorization Type (User or ENGR)</label>
            <input
              type="text"
              placeholder="user / ENGR"
              value={data.authorizationType}
              onChange={(e) => set('authorizationType', e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="primary" onClick={() => setPage(2)}>
              Submit Form
            </Button>
            <div className={styles.secondaryRow}>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 2 — A1PEX System Coordinator */}
      {page === 2 && (
        <section className={styles.page}>
          <RequestSummaryCard data={data} />

          <div className={styles.sectionTitle}>A1PEX System Coordinator</div>
          <div className={styles.qtable}>
            <div className={styles.qrow}>
              <span className={styles.q}>Client access provided</span>
              <RadioGroup
                name="clientAccessProvided"
                value={data.clientAccessProvided}
                onChange={(v) => set('clientAccessProvided', v)}
                options={[
                  { value: 'thin', label: 'thin' },
                  { value: 'thick', label: 'thick' },
                ]}
              />
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Login credentials shared with applicant?</span>
              <RadioGroup
                name="credentialsShared"
                value={data.credentialsShared}
                onChange={(v) => set('credentialsShared', v)}
                options={[
                  { value: 'no', label: 'no' },
                  { value: 'yes', label: 'yes' },
                ]}
              />
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Has Excel Add-in been installed on PC for thick clients?</span>
              <RadioGroup
                name="excelAddInCoordinator"
                value={data.excelAddInCoordinator}
                onChange={(v) => set('excelAddInCoordinator', v)}
                options={[
                  { value: 'not-available', label: 'not available' },
                  { value: 'no', label: 'no' },
                  { value: 'yes', label: 'yes' },
                ]}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="primary" onClick={() => setPage(3)}>
              Submit Form
            </Button>
            <div className={styles.secondaryRow}>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 3 — IS Section DHK */}
      {page === 3 && (
        <section className={styles.page}>
          <RequestSummaryCard data={data} />

          <div className={styles.sectionTitle}>A1PEX System Coordinator Response</div>
          <div className={styles.qtable}>
            <div className={styles.qrow}>
              <span className={styles.q}>Client access provided:</span>
              <span className={styles.answer}>{display(data.clientAccessProvided)}</span>
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Login credentials shared with applicant?</span>
              <span className={styles.answer}>{display(data.credentialsShared)}</span>
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Has Excel Add-in been installed on PC for thick clients?</span>
              <span className={styles.answer}>{display(data.excelAddInCoordinator)}</span>
            </div>
          </div>

          <div className={styles.sectionTitle}>To be filled by IS Section DHK</div>
          <div className={styles.qtable}>
            <div className={styles.qrow}>
              <span className={styles.q}>Access provided to thin client?</span>
              <RadioGroup
                name="thinClientProvided"
                value={data.thinClientProvided}
                onChange={(v) => set('thinClientProvided', v)}
                options={[
                  { value: 'not-available', label: 'not available' },
                  { value: 'no', label: 'no' },
                  { value: 'yes', label: 'yes' },
                ]}
              />
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Access provided to thick client?</span>
              <RadioGroup
                name="thickClientProvided"
                value={data.thickClientProvided}
                onChange={(v) => set('thickClientProvided', v)}
                options={[
                  { value: 'not-available', label: 'not available' },
                  { value: 'no', label: 'no' },
                  { value: 'yes', label: 'yes' },
                ]}
              />
            </div>
            <div className={styles.qrow}>
              <span className={styles.q}>Excel Add-in installed for thick client?</span>
              <RadioGroup
                name="excelAddInIsSection"
                value={data.excelAddInIsSection}
                onChange={(v) => set('excelAddInIsSection', v)}
                options={[
                  { value: 'not-available', label: 'not available' },
                  { value: 'no', label: 'no' },
                  { value: 'yes', label: 'yes' },
                ]}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="primary" onClick={() => onSubmit?.(data)}>
              Submit Form
            </Button>
            <div className={styles.secondaryRow}>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

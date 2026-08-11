/**
 * FORMS STORE (mock backend)
 * ---------------------------
 * Persists drafts and submissions to localStorage, keyed by user.
 * This simulates what a real API would do. When a real backend exists,
 * only the function bodies below need to change — every screen that
 * imports from this file (FormPage, DashboardPage) keeps working as-is.
 *
 * Record shape:
 * {
 *   id: string                // unique record id
 *   formId: string            // matches an id in forms.registry.js
 *   departmentId: string
 *   formTitle: string
 *   userId: string
 *   status: 'draft' | 'pending' | 'approved' | 'rejected'
 *   data: object              // the form's own field values
 *   updatedAt: string (ISO)
 * }
 */

const STORAGE_KEY = 'engro_portal_form_records'

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function writeAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function seedIfEmpty() {
  const existing = readAll()
  if (existing.length > 0) return

  const now = new Date().toISOString()
  writeAll([
    {
      id: 'seed-1',
      formId: 'internet-user-request',
      departmentId: 'dept-two',
      formTitle: 'Internet User Request Form',
      userId: 'demo',
      status: 'approved',
      data: {},
      updatedAt: now,
    },
    {
      id: 'seed-2',
      formId: 'user-request-form',
      departmentId: 'dept-two',
      formTitle: 'User Request Form',
      userId: 'demo',
      status: 'rejected',
      data: {},
      updatedAt: now,
    },
  ])
}

seedIfEmpty()

export function getRecordsForUser(userId) {
  return readAll().filter((r) => r.userId === userId)
}

export function getRecord({ userId, formId }) {
  return readAll().find((r) => r.userId === userId && r.formId === formId)
}

export function saveDraft({ userId, formId, departmentId, formTitle, data }) {
  const records = readAll()
  const idx = records.findIndex((r) => r.userId === userId && r.formId === formId)
  const record = {
    id: idx >= 0 ? records[idx].id : `${formId}-${userId}-${Date.now()}`,
    formId,
    departmentId,
    formTitle,
    userId,
    status: 'draft',
    data,
    updatedAt: new Date().toISOString(),
  }
  if (idx >= 0) {
    records[idx] = record
  } else {
    records.push(record)
  }
  writeAll(records)
  return record
}

export function submitForm({ userId, formId, departmentId, formTitle, data }) {
  const records = readAll()
  const idx = records.findIndex((r) => r.userId === userId && r.formId === formId)
  const record = {
    id: idx >= 0 ? records[idx].id : `${formId}-${userId}-${Date.now()}`,
    formId,
    departmentId,
    formTitle,
    userId,
    status: 'pending',
    data,
    updatedAt: new Date().toISOString(),
  }
  if (idx >= 0) {
    records[idx] = record
  } else {
    records.push(record)
  }
  writeAll(records)
  return record
}

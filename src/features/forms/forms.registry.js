import InternetUserRequestForm from './catalog/internetUserRequest/InternetUserRequestForm'
import PlaceholderForm from './catalog/_placeholder/PlaceholderForm'

/**
 * FORMS REGISTRY
 * ---------------
 * Maps each department id (see departments.config.js) to the forms that
 * belong to it. This is the ONLY place that wires a form's data (title,
 * description) to the component that renders it.
 *
 * To add a new form:
 *   1. Build the component in `catalog/<yourFormName>/YourForm.jsx`.
 *      It must accept: formId, initialData, onSave, onSubmit.
 *   2. Import it above.
 *   3. Add one entry to the relevant department's `available` list below.
 * The department page, routing, and dashboard tracking all pick it up
 * automatically — no other file needs to change.
 *
 * `expired` entries are display-only (they don't need a component yet
 * since expired forms can't be opened).
 */
export const formsRegistry = {
  'dept-two': {
    available: [
      {
        id: 'internet-user-request',
        title: 'Internet User Request Form',
        description: 'Request or update residential internet service.',
        component: InternetUserRequestForm,
      },
      {
        id: 'user-request-form',
        title: 'User Request Form',
        description: 'General IT user account request.',
        component: PlaceholderForm,
      },
      {
        id: 'internet-form',
        title: 'Internet Form',
        description: 'Office internet connectivity request.',
        component: PlaceholderForm,
      },
      {
        id: 'vending-machine-request',
        title: 'Vending Machine Request Form',
        description: 'Request vending machine installation or service.',
        component: PlaceholderForm,
      },
      {
        id: 'cafeteria-hygiene',
        title: 'Cafeteria Hygiene Form',
        description: 'Report or review cafeteria hygiene standards.',
        component: PlaceholderForm,
      },
    ],
    expired: [
      { id: 'internet-user-request-expired', title: 'Internet User Request Form', expiredOn: '12.4.26' },
      { id: 'user-request-form-expired', title: 'User Request Form', expiredOn: '12.4.26' },
    ],
  },

  'dept-one': { available: [], expired: [] },
  'dept-three': { available: [], expired: [] },
  'dept-four': { available: [], expired: [] },
  'dept-five': { available: [], expired: [] },
}

export function getFormsForDepartment(departmentId) {
  return formsRegistry[departmentId] ?? { available: [], expired: [] }
}

export function getFormEntry(departmentId, formId) {
  const dept = getFormsForDepartment(departmentId)
  return dept.available.find((f) => f.id === formId)
}

/** Flat lookup across all departments — used by the dashboard to resolve a saved record's title/department. */
export function findFormAnywhere(formId) {
  for (const [departmentId, dept] of Object.entries(formsRegistry)) {
    const found = dept.available.find((f) => f.id === formId)
    if (found) return { departmentId, ...found }
  }
  return null
}

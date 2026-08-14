/**
 * DEPARTMENTS CONFIG
 * -------------------
 * This is the single place that defines which departments exist in the portal.
 *
 * To add a new department:
 *   1. Add a new entry to this array (id, name).
 *   2. Add its forms to `src/features/forms/forms.registry.js` under the same id.
 * That's it — the Welcome page department list and routing all pick it up
 * automatically. No other file needs to change.
 *
 * Note: each row's "N Forms" caption is NOT stored here — it's computed live
 * from forms.registry.js in DepartmentsPage.jsx, so it always matches reality.
 */
export const departments = [
  { id: 'dept-one', name: 'IT and Systems' },
  { id: 'dept-two', name: 'Administration' },
  { id: 'dept-three', name: 'Maintenance' },
  { id: 'dept-four', name: 'Marketing' },
  { id: 'dept-five', name: 'Medical' },
  { id: 'dept-six', name: 'EPQL Colony' },
  { id: 'dept-seven', name: 'Mechanical Engineering' },
  { id: 'dept-eight', name: 'Process Engineering' },
  { id: 'dept-nine', name: 'Produciton' },
  { id: 'dept-ten', name: 'Others' },
]

export function getDepartmentById(id) {
  return departments.find((d) => d.id === id)
}
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
  { id: 'dept-two', name: 'Design and Marketing' },
  { id: 'dept-three', name: 'Mechanics' },
  { id: 'dept-four', name: 'HR and Administration' },
  { id: 'dept-five', name: 'HR and Administration' },
]

export function getDepartmentById(id) {
  return departments.find((d) => d.id === id)
}
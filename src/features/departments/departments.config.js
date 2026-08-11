/**
 * DEPARTMENTS CONFIG
 * -------------------
 * This is the single place that defines which departments exist in the portal.
 *
 * To add a new department:
 *   1. Add a new entry to this array (id, name).
 *   2. Add its forms to `src/features/forms/forms.registry.js` under the same id.
 * That's it — the Welcome page, the department tabs, and routing all pick it
 * up automatically. No other file needs to change.
 */
export const departments = [
  { id: 'dept-one', name: 'Department One' },
  { id: 'dept-two', name: 'Department Two' },
  { id: 'dept-three', name: 'Department Three' },
  { id: 'dept-four', name: 'Department Four' },
  { id: 'dept-five', name: 'Department Five' },
]

export function getDepartmentById(id) {
  return departments.find((d) => d.id === id)
}

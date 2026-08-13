/**
 * DEPARTMENTS CONFIG
 * -------------------
 * This is the single place that defines which departments exist in the portal.
 *
 * To add a new department:
 *   1. Add a new entry to this array (id, name, tagline).
 *   2. Add its forms to `src/features/forms/forms.registry.js` under the same id.
 * That's it — the Welcome page department list and routing all pick it up
 * automatically. No other file needs to change.
 */
export const departments = [
  { id: 'dept-one', name: 'IT and Systems', tagline: 'IT and Systems' },
  { id: 'dept-two', name: 'Design and Marketing', tagline: 'Design and Marketing' },
  { id: 'dept-three', name: 'Mechanics', tagline: 'Mechanics' },
  { id: 'dept-four', name: 'HR and Administration', tagline: 'HR and Administration' },
  { id: 'dept-five', name: 'HR and Administration', tagline: 'HR and Administration' },
]

export function getDepartmentById(id) {
  return departments.find((d) => d.id === id)
}

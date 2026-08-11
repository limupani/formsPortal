import { useState } from 'react'
import { departments, getDepartmentById } from '../departments.config'
import { folderPath, tabPath, ROW_GAP, TAB_H, VB_W, VB_H } from './folderTabGeometry'
import { FOLDER_TAB_ROWS, ALL_FORMS_ID } from './folderTabsLayout'
import styles from './FolderTabs.module.css'

function labelFor(id) {
  if (id === ALL_FORMS_ID) return 'Access all forms'
  return getDepartmentById(id)?.name ?? id
}

export default function FolderTabs({ onSelect }) {
  const [hoveredId, setHoveredId] = useState(null)

  const flat = FOLDER_TAB_ROWS.flatMap((tabs, i) => tabs.map((t) => ({ ...t, y: i * ROW_GAP })))
  const highlightedTab = flat.find((t) => t.id === hoveredId)

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className={styles.svg} aria-label="Department folders">
      {FOLDER_TAB_ROWS.map((tabs, i) => (
        <g key={i}>
          <path d={folderPath(tabs, i * ROW_GAP)} className={styles.folderBody} strokeWidth={1.6} />
          {tabs.map((t) => (
            <g
              key={t.id}
              className={styles.tabHit}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelect?.(t.id)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect?.(t.id)}
              aria-label={labelFor(t.id)}
            >
              <path d={tabPath(t, i * ROW_GAP)} className={styles.tabHitArea} />
              {hoveredId !== t.id && (
                <text
                  x={t.x + t.width / 2}
                  y={i * ROW_GAP + 28}
                  textAnchor="middle"
                  className={styles.tabLabel}
                >
                  {labelFor(t.id)}
                </text>
              )}
            </g>
          ))}
        </g>
      ))}

      {highlightedTab && (
        <g
          onMouseEnter={() => setHoveredId(highlightedTab.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onSelect?.(highlightedTab.id)}
          className={styles.tabHit}
        >
          <path d={tabPath(highlightedTab, highlightedTab.y)} className={styles.tabActive} strokeWidth={1.6} />
          <text
            x={highlightedTab.x + highlightedTab.width / 2}
            y={highlightedTab.y + 28}
            textAnchor="middle"
            className={styles.tabActiveLabel}
          >
            {labelFor(highlightedTab.id)}
          </text>
        </g>
      )}
    </svg>
  )
}

/** Exported so DepartmentsPage can sanity-check that layout ids line up with configured departments. */
export const configuredDepartmentIds = departments.map((d) => d.id)

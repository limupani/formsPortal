export const ROW_GAP = 46
export const TAB_H = 42
export const SLANT = 16
export const VB_W = 1240
export const VB_H = 330
export const RADIUS = 5

/**
 * Draws the folder body for one row, with notches cut out of the top
 * edge for every tab in that row.
 */
export function folderPath(tabs, y) {
  let d = `M ${RADIUS} ${y + TAB_H} `
  d += `Q 0 ${y + TAB_H} 0 ${y + TAB_H + RADIUS} `
  d += `L 0 ${VB_H - RADIUS} Q 0 ${VB_H} ${RADIUS} ${VB_H} `
  d += `L ${VB_W - RADIUS} ${VB_H} Q ${VB_W} ${VB_H} ${VB_W} ${VB_H - RADIUS} `
  d += `L ${VB_W} ${y + TAB_H + RADIUS} Q ${VB_W} ${y + TAB_H} ${VB_W - RADIUS} ${y + TAB_H} `

  const ordered = [...tabs].sort((a, b) => b.x - a.x)
  for (const t of ordered) {
    d += `L ${t.x + t.width + SLANT} ${y + TAB_H} `
    d += `L ${t.x + t.width - SLANT / 2} ${y + RADIUS} `
    d += `Q ${t.x + t.width - SLANT} ${y} ${t.x + t.width - SLANT - RADIUS} ${y} `
    d += `L ${t.x + SLANT + RADIUS} ${y} `
    d += `Q ${t.x + SLANT} ${y} ${t.x + SLANT - 2} ${y + RADIUS} `
    d += `L ${t.x} ${y + TAB_H} `
  }
  d += 'Z'
  return d
}

/** Draws a single raised tab shape, used both as the click-hit area and as the highlighted (hover/active) tab. */
export function tabPath(t, y) {
  return (
    `M ${t.x} ${y + TAB_H} L ${t.x + SLANT - 2} ${y + RADIUS} ` +
    `Q ${t.x + SLANT} ${y} ${t.x + SLANT + RADIUS} ${y} ` +
    `L ${t.x + t.width - SLANT - RADIUS} ${y} ` +
    `Q ${t.x + t.width - SLANT} ${y} ${t.x + t.width - SLANT / 2} ${y + RADIUS} ` +
    `L ${t.x + t.width + SLANT} ${y + TAB_H} Z`
  )
}

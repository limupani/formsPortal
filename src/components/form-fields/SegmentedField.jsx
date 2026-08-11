import { useRef } from 'react'
import styles from './FormFields.module.css'

/**
 * Renders a row of single-character boxes with optional dash separators.
 * `pattern` describes the shape, e.g. ['5','5','5','5','5','-','7','1','1','1','1','1','1','-','1']
 * where '-' inserts a visual dash instead of an input box.
 */
export default function SegmentedField({ id, pattern, value, onChange }) {
  const boxCount = pattern.filter((p) => p !== '-').length
  const chars = (value ?? '').padEnd(boxCount, ' ').split('')
  const inputRefs = useRef([])

  function handleChange(boxIndex, char) {
    const nextChars = [...chars]
    nextChars[boxIndex] = char.slice(-1)
    onChange?.(nextChars.join('').trimEnd())
    if (char && inputRefs.current[boxIndex + 1]) {
      inputRefs.current[boxIndex + 1].focus()
    }
  }

  let boxIndex = -1

  return (
    <div id={id} className={styles.segmentedGroup}>
      {pattern.map((token, i) => {
        if (token === '-') {
          return (
            <span key={i} className={styles.segmentedDash}>
              —
            </span>
          )
        }
        boxIndex += 1
        const thisIndex = boxIndex
        return (
          <input
            key={i}
            ref={(el) => (inputRefs.current[thisIndex] = el)}
            className={styles.segmentedBox}
            maxLength={1}
            value={chars[thisIndex]?.trim() ?? ''}
            onChange={(e) => handleChange(thisIndex, e.target.value)}
          />
        )
      })}
    </div>
  )
}

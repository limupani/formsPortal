import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import SearchBar from '../ui/SearchBar'
import styles from './PageShell.module.css'

export default function PageShell({ children, showSearch = true }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.content}>
        {showSearch && (
          <form onSubmit={handleSubmit} className={styles.searchRow}>
            <SearchBar value={query} onChange={setQuery} />
          </form>
        )}
        {children}
      </main>
    </div>
  )
}

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'engro_portal_user'

/**
 * AuthProvider owns the "who is signed in" state for the whole app.
 *
 * This is currently a MOCK implementation backed by localStorage so the
 * rest of the app can be built against a real contract. When real company
 * SSO/auth is ready, only the body of signIn/signOut below needs to change —
 * every other file just calls useAuth() and never talks to storage directly.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  function signIn({ name, email }) {
    const nextUser = {
      id: email,
      name,
      email,
      department: 'Information Systems',
      title: 'Employee',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  function updateProfile(patch) {
    setUser((prev) => {
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

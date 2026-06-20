import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, getAdminToken, setAdminToken } from '../api/client'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = getAdminToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return null
    }
    try {
      const profile = await api.adminMe()
      setUser(profile)
      return profile
    } catch {
      setAdminToken(null)
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = useCallback(async (username, password) => {
    const result = await api.adminLogin(username, password)
    setAdminToken(result.token)
    setUser(result.user)
    return result.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.adminLogout()
    } catch {
      // ignore network errors during logout
    }
    setAdminToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, logout, refreshUser, isAuthenticated: Boolean(user) }),
    [user, loading, login, logout, refreshUser],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

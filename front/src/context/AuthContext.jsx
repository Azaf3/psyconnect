import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'acolhe-auth-user'
const REGISTERED_STORAGE_KEY = 'acolhe-registered-user'

const AuthContext = createContext(null)

function buildDefaultProfile(profile) {
  const baseProfile = {
    address: '',
    sessions: [
      {
        id: 1,
        professional: 'Dra. Camila Rocha',
        specialty: 'Ansiedade',
        date: '12/03/2026',
        status: 'Realizada',
        notes: 'Foco em ansiedade e rotina de sono.',
      },
      {
        id: 2,
        professional: 'Dr. Rafael Mendes',
        specialty: 'Depressão',
        date: '21/03/2026',
        status: 'Realizada',
        notes: 'Retorno clínico, acompanhamento geral.',
      },
    ],
  }

  return {
    ...baseProfile,
    ...profile,
    address: profile?.address || '',
    sessions: profile?.sessions || baseProfile.sessions,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      setUser(buildDefaultProfile(JSON.parse(storedUser)))
    }
  }, [])

  function login({ email, password }) {
    const registeredUser = localStorage.getItem(REGISTERED_STORAGE_KEY)
    const parsedRegisteredUser = registeredUser ? JSON.parse(registeredUser) : null

    const nextUser = parsedRegisteredUser && parsedRegisteredUser.email === email
      ? buildDefaultProfile(parsedRegisteredUser)
      : {
          name: email.split('@')[0],
          email,
          role: 'paciente',
          address: '',
          sessions: buildDefaultProfile().sessions,
        }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }

  function register(profile) {
    const normalizedProfile = buildDefaultProfile(profile)
    localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify(normalizedProfile))
    return normalizedProfile
  }

  function updateUser(patch) {
    setUser(currentUser => {
      if (!currentUser) {
        return currentUser
      }

      const nextUser = {
        ...currentUser,
        ...patch,
      }

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))

      const registeredUser = localStorage.getItem(REGISTERED_STORAGE_KEY)
      if (registeredUser) {
        const parsedRegisteredUser = JSON.parse(registeredUser)
        if (parsedRegisteredUser.email === nextUser.email) {
          localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify(nextUser))
        }
      }

      return nextUser
    })
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
    register,
    updateUser,
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

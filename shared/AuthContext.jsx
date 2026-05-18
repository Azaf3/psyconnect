import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, setToken } from './api'
import { getItem, removeItem, setItem } from './storage'

const AUTH_STORAGE_KEY = 'acolhe-auth-user'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const stored = await getItem(AUTH_STORAGE_KEY)
      const token = await getItem('acolhe-auth-token')

      if (stored && token) {
        try {
          const data = await api.me()
          const u = {
            id: data._id,
            nome: data.nome,
            email: data.email,
            role: data.role,
            profissional: data.profissional,
          }
          setUser(u)
          await setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
        } catch {
          await removeItem(AUTH_STORAGE_KEY)
          await setToken(null)
          setUser(null)
        }
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  async function login({ email, password, role }) {
    const loginFn = role === 'profissional' ? api.loginProfissional : api.loginPaciente
    const data = await loginFn(email, password)
    await setToken(data.token)

    const u = {
      id: data.user.id,
      nome: data.user.nome,
      email: data.user.email,
      role: data.user.role,
      profissional: data.profissional,
    }

    await setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
    setUser(u)
    return u
  }

  async function register({ name, email, password, role }) {
    const backendRole = role === 'psicologo' ? 'profissional' : 'paciente'

    if (backendRole === 'profissional') {
      const data = await api.registerProfissional({ nome: name, email, senha: password, name })
      await setToken(data.token)
      const u = {
        id: data.user.id,
        nome: data.user.nome,
        email: data.user.email,
        role: data.user.role,
        profissional: data.profissional,
      }
      await setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
      setUser(u)
      return u
    }

    const data = await api.registerPaciente(name, email, password)
    await setToken(data.token)

    const u = {
      id: data.user.id,
      nome: data.user.nome,
      email: data.user.email,
      role: data.user.role,
    }
    await setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
    setUser(u)
    return u
  }

  function updateUser(patch) {
    setUser((current) => {
      if (!current) return current
      const next = { ...current, ...patch }
      setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  async function logout() {
    await removeItem(AUTH_STORAGE_KEY)
    await setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
      updateUser,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

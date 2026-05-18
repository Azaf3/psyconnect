import React from 'react'
import { NavLink, Outlet, Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function ProfessionalLayout() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const navigate = useNavigate()

  if (loading) return null

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (user.role !== 'profissional') return <Navigate to="/" replace />

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="pro-layout container">
      <aside className="pro-sidebar">
        <div className="pro-sidebar-header">
          <div className="pro-avatar">{user.nome?.charAt(0)?.toUpperCase() || 'P'}</div>
          <div>
            <strong className="pro-sidebar-name">{user.nome}</strong>
            <span className="pro-sidebar-role">Profissional</span>
          </div>
        </div>

        <nav className="pro-nav">
          <NavLink to="/profissional/dashboard" className={({ isActive }) => `pro-nav-item${isActive ? ' active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Painel
          </NavLink>
          <NavLink to="/profissional/pacientes" className={({ isActive }) => `pro-nav-item${isActive ? ' active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            Pacientes
          </NavLink>
          <NavLink to="/profissional/agenda" className={({ isActive }) => `pro-nav-item${isActive ? ' active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Agenda
          </NavLink>
          <NavLink to="/profissional/perfil" className={({ isActive }) => `pro-nav-item${isActive ? ' active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Meu perfil
          </NavLink>
        </nav>

        <div className="pro-sidebar-footer">
          <Link to="/" className="pro-nav-item pro-nav-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
            Ir para o site
          </Link>
          <button className="pro-nav-item pro-nav-logout" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair da conta
          </button>
        </div>
      </aside>

      <main className="pro-content">
        <Outlet />
      </main>
    </div>
  )
}

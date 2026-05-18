import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavItem({ to, label, children }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
    >
      {children}
      <span>{label}</span>
    </NavLink>
  )
}

export function BottomNav() {
  const { isAuthenticated, user } = useAuth()
  const isProfessional = user?.role === 'profissional'

  return (
    <nav className="bottom-nav">
      <NavItem to="/" label="Início">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      </NavItem>

      {!isProfessional && (
        <NavItem to="/buscar" label="Buscar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </NavItem>
      )}

      {isAuthenticated && !isProfessional && (
        <NavItem to="/minha-ficha" label="Minha ficha">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </NavItem>
      )}

      {isAuthenticated && (
        <NavItem to="/perfil" label="Perfil">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
          </svg>
        </NavItem>
      )}
    </nav>
  )
}

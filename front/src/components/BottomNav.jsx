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
  const { isAuthenticated } = useAuth()

  return (
    <>
      <nav className="bottom-nav">
        <NavItem to="/" label="Início">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            <path d="M9 21V12h6v9" />
          </svg>
        </NavItem>

        <NavItem to="/buscar" label="Buscar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </NavItem>

        <NavItem to={isAuthenticated ? '/minha-ficha' : '/cadastro'} label={isAuthenticated ? 'Minha ficha' : 'Cadastro'}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
        </NavItem>

        <NavItem to={isAuthenticated ? '/perfil' : '/login'} label={isAuthenticated ? 'Perfil' : 'Entrar'}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </NavItem>
      </nav>
      <div className="bottom-nav-spacer" />
    </>
  )
}

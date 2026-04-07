import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.acolhe+.png" alt="Acolhe+" className="logo-img" />
        </Link>

        <nav className="nav">
          <a href="/#como-funciona">Atalhos</a>
          <Link to="/buscar">Buscar profissional</Link>
          <a href="/#modalidades">Acessos</a>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <Link to="/perfil" className="btn btn-primary btn-sm">{user?.name?.split(' ')[0] || 'Perfil'}</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Entrar</Link>
              <Link to="/cadastro" className="btn btn-primary btn-sm">Criar conta</Link>
            </>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#como-funciona" onClick={() => setMenuOpen(false)}>Atalhos</a>
          <Link to="/buscar" onClick={() => setMenuOpen(false)}>Buscar profissional</Link>
          <a href="/#modalidades" onClick={() => setMenuOpen(false)}>Acessos</a>
          {isAuthenticated ? (
            <Link to="/perfil" onClick={() => setMenuOpen(false)}>Meu perfil</Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link>
              <Link to="/cadastro" onClick={() => setMenuOpen(false)}>Criar conta</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

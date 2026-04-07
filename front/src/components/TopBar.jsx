import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-mark">A</span>
          <span className="logo-text">Acolhe+</span>
        </Link>

        <nav className="nav">
          <a href="/#como-funciona">Atalhos</a>
          <Link to="/buscar">Profissionais</Link>
          <a href="/#modalidades">Acessos</a>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="btn btn-ghost">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm">Criar conta</Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#como-funciona" onClick={() => setMenuOpen(false)}>Atalhos</a>
          <Link to="/buscar" onClick={() => setMenuOpen(false)}>Profissionais</Link>
          <a href="/#modalidades" onClick={() => setMenuOpen(false)}>Acessos</a>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link>
          <Link to="/cadastro" onClick={() => setMenuOpen(false)}>Criar conta</Link>
        </div>
      )}
    </header>
  )
}

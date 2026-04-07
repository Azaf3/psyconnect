import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function HomePanel() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/buscar${search ? `?q=${encodeURIComponent(search)}` : ''}`)
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-main">
          <h1>Encontre seu profissional</h1>
          <p className="hero-subtitle">Psicólogos, psicanalistas e psiquiatras a partir de R$ 50/sessão</p>

          <form className="hero-search" onSubmit={handleSearch}>
            <svg className="hero-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Nome, especialidade ou abordagem"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>

          <div className="hero-chips">
            <button type="button" onClick={() => navigate('/buscar?profissao=Psicólogo(a)')}>Psicólogos</button>
            <button type="button" onClick={() => navigate('/buscar?profissao=Psicanalista')}>Psicanalistas</button>
            <button type="button" onClick={() => navigate('/buscar?profissao=Psiquiatra')}>Psiquiatras</button>
            <button type="button" onClick={() => navigate('/buscar?especialidade=Ansiedade')}>Ansiedade</button>
            <button type="button" onClick={() => navigate('/buscar?especialidade=Depressão')}>Depressão</button>
          </div>
        </div>
      </div>
    </section>
  )
}

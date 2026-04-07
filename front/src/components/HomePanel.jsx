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
      <div className="container hero-shell">
        <div className="hero-main">
          <div className="hero-badge">Tela inicial</div>
          <h1>Buscar atendimento</h1>
          <p className="hero-subtitle">Busque profissionais, veja sua ficha ou entre na conta.</p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Especialidade, profissional ou abordagem"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>

          <div className="hero-shortcuts">
            <button className="btn btn-primary" onClick={() => navigate('/buscar')}>
              Abrir busca
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/minha-ficha')}>
              Minha ficha
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/login')}>
              Entrar
            </button>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-panel">
            <strong className="hero-panel-title">Resumo</strong>

            <div className="hero-mini-grid">
              <div className="hero-mini-card">
                <span>Valor</span>
                <strong>até R$ 50</strong>
              </div>
              <div className="hero-mini-card">
                <span>Perfis</span>
                <strong>3 acessos</strong>
              </div>
              <div className="hero-mini-card hero-mini-card-wide">
                <span>Status</span>
                <strong>Profissionais verificados, online ou presencial</strong>
              </div>
            </div>

            <ul className="hero-list">
              <li>Busca por especialidade</li>
              <li>Acesso para pacientes, profissionais e empresas</li>
              <li>Ficha com histórico de sessões</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

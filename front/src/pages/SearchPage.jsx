import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AUDIENCE_OPTIONS, PSYCHOLOGISTS } from '../data/psychologists'

const SPECIALTIES = [
  'Ansiedade', 'Depressão', 'Relacionamentos', 'Autoconhecimento',
  'Trauma e TEPT', 'Família', 'Dependência Química', 'Luto',
]

const APPROACHES = ['Cognitivo-Comportamental (TCC)', 'Psicanálise', 'Humanista', 'EMDR', 'Gestalt']

function StarRating({ value }) {
  return (
    <span className="star-rating">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
        <path d="M8 1l1.854 3.756L14 5.763l-3 2.924.708 4.126L8 10.757l-3.708 2.056L5 8.687 2 5.763l4.146-.007L8 1z" />
      </svg>
      {value}
    </span>
  )
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [specialty, setSpecialty] = useState(searchParams.get('especialidade') || '')
  const [audience, setAudience] = useState(searchParams.get('perfil') || '')
  const [approach, setApproach] = useState('')
  const [modality, setModality] = useState('')

  const filtered = useMemo(() => PSYCHOLOGISTS.filter(p => {
    const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.specialty.toLowerCase().includes(query.toLowerCase())
    const matchSpecialty = !specialty || p.specialty === specialty
    const matchAudience = !audience || p.audience === audience
    const matchApproach = !approach || p.approach === approach
    const matchModality = !modality || (modality === 'online' ? p.online : p.presential)
    return matchQuery && matchSpecialty && matchAudience && matchApproach && matchModality
  }), [approach, audience, modality, query, specialty])

  function handleSearch(e) {
    e.preventDefault()
    const params = {}
    if (query) params.q = query
    if (specialty) params.especialidade = specialty
    if (audience) params.perfil = audience
    setSearchParams(params)
  }

  function clearFilters() {
    setQuery('')
    setSpecialty('')
    setAudience('')
    setApproach('')
    setModality('')
    setSearchParams({})
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1>Encontre seu psicólogo</h1>
          <p className="search-caption">Todos os profissionais aqui atendem por até R$ 50 a sessão.</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Nome, especialidade ou abordagem..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>

      <div className="container search-layout">
        <aside className="search-filters">
          <div className="filters-header">
            <h3>Filtros</h3>
            <button className="btn-link" onClick={clearFilters}>Limpar</button>
          </div>

          <div className="filter-group">
            <label>Especialidade</label>
            <select value={specialty} onChange={e => setSpecialty(e.target.value)}>
              <option value="">Todas</option>
              {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Perfil do atendimento</label>
            <select value={audience} onChange={e => setAudience(e.target.value)}>
              <option value="">Todos</option>
              {AUDIENCE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Abordagem</label>
            <select value={approach} onChange={e => setApproach(e.target.value)}>
              <option value="">Todas</option>
              {APPROACHES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Modalidade</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="modality" value="" checked={modality === ''} onChange={e => setModality(e.target.value)} />
                Todas
              </label>
              <label className="radio-label">
                <input type="radio" name="modality" value="online" checked={modality === 'online'} onChange={e => setModality(e.target.value)} />
                Online
              </label>
              <label className="radio-label">
                <input type="radio" name="modality" value="presencial" checked={modality === 'presencial'} onChange={e => setModality(e.target.value)} />
                Presencial
              </label>
            </div>
          </div>
        </aside>

        <main className="search-results">
          <p className="results-count">
            {filtered.length} profissional{filtered.length !== 1 ? 'is' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum profissional encontrado com esses filtros.</p>
              <button className="btn btn-outline" onClick={clearFilters}>Limpar filtros</button>
            </div>
          ) : (
            <div className="psychologist-list">
              {filtered.map(p => (
                <div key={p.id} className="psychologist-card">
                  <div className="psy-avatar">{p.name.split(' ').slice(0, 2).map(n => n[0]).join('')}</div>
                  <div className="psy-info">
                    <div className="psy-name-row">
                      <h3>{p.name}</h3>
                      <span className="psy-crp">{p.crp}</span>
                    </div>
                    <div className="psy-tags">
                      <span className="tag tag-specialty">{p.specialty}</span>
                      <span className="tag tag-approach">{p.approach}</span>
                      <span className="tag tag-audience">{p.audience}</span>
                      {p.online && <span className="tag tag-online">Online</span>}
                      {p.presential && <span className="tag tag-presential">Presencial</span>}
                    </div>
                    <p className="psy-bio">{p.bio}</p>
                    <div className="psy-footer">
                      <div className="psy-meta">
                        <StarRating value={p.rating} />
                        <span className="psy-reviews">({p.reviews} avaliações)</span>
                        <span className="psy-price">R$ {p.price} / sessão</span>
                      </div>
                      <Link to={`/profissional/${p.id}`} className="btn btn-primary btn-sm">
                        Ver perfil
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

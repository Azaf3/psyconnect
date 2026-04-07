import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AUDIENCE_OPTIONS, PROFESSION_OPTIONS, PSYCHOLOGISTS } from '../data/psychologists'

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
  const [profession, setProfession] = useState(searchParams.get('profissao') || '')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => PSYCHOLOGISTS.filter(p => {
    const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.specialty.toLowerCase().includes(query.toLowerCase()) || p.profession.toLowerCase().includes(query.toLowerCase())
    const matchSpecialty = !specialty || p.specialty === specialty
    const matchAudience = !audience || p.audience === audience
    const matchApproach = !approach || p.approach === approach
    const matchModality = !modality || (modality === 'online' ? p.online : p.presential)
    const matchProfession = !profession || p.profession === profession
    return matchQuery && matchSpecialty && matchAudience && matchApproach && matchModality && matchProfession
  }), [approach, audience, modality, profession, query, specialty])

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
    setProfession('')
    setSearchParams({})
  }

  const activeFilterCount = [profession, specialty, audience, approach, modality].filter(Boolean).length

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <form className="search-bar" onSubmit={handleSearch}>
            <svg className="search-bar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
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
        <aside className={`search-filters ${filtersOpen ? 'open' : ''}`}>
          <button className="filters-toggle" onClick={() => setFiltersOpen(o => !o)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filtros{activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
            <svg className="filters-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div className="filters-body">
            <div className="filter-group">
              <label>Profissão</label>
              <select value={profession} onChange={e => setProfession(e.target.value)}>
                <option value="">Todas</option>
                {PROFESSION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label>Especialidade</label>
              <select value={specialty} onChange={e => setSpecialty(e.target.value)}>
                <option value="">Todas</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label>Perfil</label>
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
            {activeFilterCount > 0 && (
              <button className="btn btn-ghost btn-sm filters-clear" onClick={clearFilters}>Limpar filtros</button>
            )}
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
                <Link to={`/profissional/${p.id}`} key={p.id} className="psychologist-card">
                  <div className="psy-card-top">
                    <img className="psy-photo" src={p.photo} alt={p.name} />
                    <div className="psy-card-header">
                      <h3>{p.name}</h3>
                      <span className="psy-profession">{p.profession}</span>
                      <span className="psy-crp">{p.crp}</span>
                    </div>
                  </div>
                  <div className="psy-tags">
                    <span className="tag tag-specialty">{p.specialty}</span>
                    <span className="tag tag-approach">{p.approach}</span>
                    {p.online && <span className="tag tag-online">Online</span>}
                    {p.presential && <span className="tag tag-presential">Presencial</span>}
                  </div>
                  <div className="psy-card-bottom">
                    <StarRating value={p.rating} />
                    <span className="psy-reviews">({p.reviews})</span>
                    <span className="psy-price">R$ {p.price}/sessão</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

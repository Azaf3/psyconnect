import React from 'react'
import { useNavigate } from 'react-router-dom'

export function SpecialtyGrid() {
  const navigate = useNavigate()

  const actions = [
    { key: 'Ansiedade', title: 'Ansiedade', desc: 'Controle de ansiedade e ataques de pânico' },
    { key: 'Depressao', title: 'Depressão', desc: 'Acompanhamento contínuo e suporte emocional' },
    { key: 'Relacionamentos', title: 'Relacionamentos', desc: 'Terapia de casal e vínculos afetivos' },
    { key: 'Autoconhecimento', title: 'Autoconhecimento', desc: 'Desenvolvimento pessoal e identidade' },
    { key: 'Trauma', title: 'Trauma e TEPT', desc: 'Trabalho com traumas e estresse pós-traumático' },
    { key: 'Familia', title: 'Família', desc: 'Dinâmica familiar e parentalidade' },
  ]

  return (
    <section className="quick-actions" id="especialidades">
      <div className="container">
        <div className="section-header">
          <h2>Especialidades</h2>
          <p className="section-subtitle">Atalhos por tema para abrir a busca já filtrada.</p>
        </div>
        <div className="actions-grid">
          {actions.map((action) => (
            <button
              key={action.key}
              className="action-card"
              onClick={() => navigate(`/buscar?especialidade=${encodeURIComponent(action.title)}`)}
            >
              <div className="action-icon">{action.title.slice(0, 2).toUpperCase()}</div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
              <svg className="action-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

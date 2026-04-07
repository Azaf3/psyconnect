import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CARE_MODELS } from '../data/psychologists'

export function AccessProfiles() {
  const navigate = useNavigate()

  return (
    <section className="audience-programs" id="modalidades">
      <div className="container">
        <div className="section-header">
          <h2>Escolha o tipo de acesso</h2>
          <p className="section-subtitle">Selecione o perfil que se encaixa na sua situação.</p>
        </div>

        <div className="program-grid">
          {CARE_MODELS.map((model) => (
            <article key={model.id} className="program-card">
              <div className="program-chip">{model.audience}</div>
              <h3>{model.title}</h3>
              <p className="program-price">{model.priceLabel}</p>
              <p className="program-description">{model.description}</p>
              <button className="btn btn-outline btn-full" onClick={() => navigate(`/buscar?perfil=${encodeURIComponent(model.queryValue)}`)}>
                {model.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AppShortcuts() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const steps = [
    {
      num: '01',
      title: 'Abrir busca',
      desc: 'Pesquise por especialidade, perfil ou modalidade.',
    },
    {
      num: '02',
      title: 'Ver sua ficha',
      desc: 'Veja suas sessões e os profissionais que te atenderam.',
    },
    {
      num: '03',
      title: isAuthenticated ? 'Abrir perfil' : 'Entrar no app',
      desc: isAuthenticated ? 'Veja seus dados e continue de onde parou.' : 'Entre pra acessar ficha, perfil e tudo mais.',
    },
  ]

  return (
    <section className="how-it-works" id="como-funciona">
      <div className="container">
        <div className="section-header">
          <h2>Atalhos do app</h2>
          <p className="section-subtitle">Os caminhos principais ficam aqui.</p>
        </div>

        <div className="steps">
          {steps.map((step, idx) => (
            <div key={step.num} className="step">
              <div className="step-number">{step.num}</div>
              {idx < steps.length - 1 && <div className="step-connector" />}
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="how-cta">
          <button className="btn btn-primary btn-large" onClick={() => navigate(isAuthenticated ? '/perfil' : '/login')}>
            {isAuthenticated ? 'Abrir perfil' : 'Entrar agora'}
          </button>
        </div>
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleTitles = {
  paciente: 'Ficha do paciente',
  psicologo: 'Ficha profissional',
  empresa: 'Ficha da empresa parceira',
}

const statusClass = {
  'Agendada': 'session-status-agendada',
  'Realizada': '',
  'Cancelada': 'session-status-cancelada',
}

export function FichaPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const [toast, setToast] = useState('')

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const isPatient = user.role === 'paciente'
  const sessions = user.sessions || []
  const uniqueProfessionals = [...new Set(sessions.filter(s => s.status !== 'Cancelada').map(s => s.professional))]
  const activeSessions = sessions.filter(s => s.status !== 'Cancelada')

  function cancelSession(sessionId) {
    const updated = sessions.map(s =>
      s.id === sessionId ? { ...s, status: 'Cancelada' } : s
    )
    updateUser({ sessions: updated })
    setToast('Sessão cancelada.')
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="profile-hub container">
      {toast && <div className="toast">{toast}</div>}
      <div className="profile-hub-card">
        <h1>{roleTitles[user.role] || 'Minha ficha'}</h1>
        <p className="profile-hub-subtitle">Dados gerais e histórico de sessões.</p>

        {isPatient ? (
          <>
            <div className="patient-ficha-layout">
              <section className="patient-ficha-panel">
                <div className="patient-ficha-note">
                  <strong>Atenção:</strong> essa ficha é somente leitura. As sessões são registradas pelos profissionais.
                </div>

                <div className="patient-summary-grid">
                  <div className="summary-card">
                    <span>Sessões ativas</span>
                    <strong>{activeSessions.length}</strong>
                  </div>
                  <div className="summary-card">
                    <span>Profissionais que atenderam</span>
                    <strong>{uniqueProfessionals.length}</strong>
                  </div>
                  <div className="summary-card summary-card-wide">
                    <span>Profissionais</span>
                    <strong>{uniqueProfessionals.join(', ') || 'Nenhum atendimento registrado'}</strong>
                  </div>
                </div>
              </section>

              <aside className="sessions-card">
                <div className="sessions-card-header">
                  <h2>Sessões registradas</h2>
                  <p>Registros feitos pelos profissionais e agendamentos.</p>
                </div>

                <div className="sessions-list">
                  {sessions.length === 0 ? (
                    <div className="empty-state" style={{ padding: '32px 0' }}>
                      <p>Nenhuma sessão registrada ainda.</p>
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <article key={session.id} className="session-item">
                        <div className="session-item-header">
                          <strong>{session.professional}</strong>
                          <span className={statusClass[session.status] || ''}>{session.status}</span>
                        </div>
                        <p className="session-meta">
                          {session.specialty} • {session.date}
                          {session.time && ` às ${session.time}`}
                        </p>
                        <p className="session-notes">{session.notes}</p>
                        {session.status === 'Agendada' && (
                          <button className="session-cancel-btn" onClick={() => cancelSession(session.id)}>
                            Cancelar sessão
                          </button>
                        )}
                      </article>
                    ))
                  )}
                </div>
              </aside>
            </div>
          </>
        ) : (
          <div className="ficha-grid">
            <div className="ficha-item">
              <span>Nome</span>
              <strong>{user.name}</strong>
            </div>
            <div className="ficha-item">
              <span>E-mail</span>
              <strong>{user.email}</strong>
            </div>
            <div className="ficha-item">
              <span>Perfil</span>
              <strong>{user.role}</strong>
            </div>
            <div className="ficha-item">
              <span>Faixa de atendimento</span>
              <strong>Até R$ 50 por sessão</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

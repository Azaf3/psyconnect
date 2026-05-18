import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const roleTitles = {
  paciente: 'Ficha do paciente',
  psicologo: 'Ficha profissional',
  empresa: 'Ficha da empresa parceira',
}

const statusClass = {
  Agendada: 'session-status-agendada',
  Realizada: '',
  Cancelada: 'session-status-cancelada',
}

export function FichaPage() {
  const { user, isAuthenticated } = useAuth()
  const [toast, setToast] = useState('')
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return

    api.getAppointments()
      .then(data => setSessions(data))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const isProfessional = user.role === 'profissional'
  const isPatient = user.role === 'paciente'
  const showProfessionals = !isProfessional
  const activeSessions = sessions.filter(s => s.status !== 'cancelado')
  const uniqueProfessionals = Array.from(
    new Set(sessions.map(session => session.profissionalId?._id).filter(Boolean))
  )

  if (isProfessional && !window.location.pathname.match(/\/profissional\/pacientes\//)) {
    return <Navigate to="/profissional/dashboard" replace />
  }

  async function cancelSession(sessionId) {
    try {
      await api.cancelAppointment(sessionId)
      setSessions(prev => prev.map(s => s._id === sessionId ? { ...s, status: 'cancelado' } : s))
      setToast('Sessão cancelada.')
      setTimeout(() => setToast(''), 3000)
    } catch {
      setToast('Erro ao cancelar sessão.')
      setTimeout(() => setToast(''), 3000)
    }
  }

  const statusLabels = {
    agendado: 'Agendada',
    confirmado: 'Confirmada',
    cancelado: 'Cancelada',
    concluido: 'Realizada',
  }

  return (
    <div className="profile-hub container">
      {toast && <div className="toast">{toast}</div>}
      <div className="profile-hub-card">
        <h1>{roleTitles[user.role] || 'Minha ficha'}</h1>
        <p className="profile-hub-subtitle">Dados gerais e histórico de sessões.</p>

        {isPatient || isProfessional ? (
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
                  {showProfessionals && (
                    <div className="summary-card">
                      <span>Profissionais atendentes</span>
                      <strong>{uniqueProfessionals.length}</strong>
                    </div>
                  )}
                </div>
              </section>

              <section className="patient-ficha-history">
                <h2>Histórico de sessões</h2>
                {sessions.length === 0 ? (
                  <div className="empty-list">
                    <p>Nenhuma sessão registrada ainda.</p>
                  </div>
                ) : (
                  sessions.map((session) => {
                    const isOwnProfessional = isProfessional && session.profissionalId?._id === user.id
                    return (
                      <article key={session._id} className="session-item">
                        <div className="session-item-header">
                          {showProfessionals && <strong>{session.profissionalId?.name || 'Profissional'}</strong>}
                          <span className={statusClass[statusLabels[session.status]] || ''}>
                            {statusLabels[session.status] || session.status}
                          </span>
                        </div>
                        <p className="session-meta">
                          {session.formato} • {new Date(session.data).toLocaleDateString('pt-BR')}
                          {' às ' + new Date(session.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {(isPatient || isOwnProfessional) && (
                          <p className="session-notes">{session.observacoes}</p>
                        )}
                        {session.status === 'agendado' && isPatient && (
                          <button className="session-cancel-btn" onClick={() => cancelSession(session._id)}>
                            Cancelar sessão
                          </button>
                        )}
                      </article>
                    )
                  })
                )}
              </section>
            </div>
          </>
        ) : (
          <div className="empty-list">
            <p>Ficha não disponível.</p>
          </div>
        )}
      </div>
    </div>
  )
}

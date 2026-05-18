import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api'

const statusLabels = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  concluido: 'Concluído',
}

const statusClasses = {
  agendado: 'pro-status-agendado',
  confirmado: 'pro-status-confirmado',
  cancelado: 'pro-status-cancelado',
  concluido: 'pro-status-concluido',
}

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAppointments()
      .then(data => setAppointments(data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }, [])

  const pending = appointments.filter(a => a.status === 'agendado')
  const confirmed = appointments.filter(a => a.status === 'confirmado')
  const past = appointments.filter(a => a.status === 'concluido')
  const cancelled = appointments.filter(a => a.status === 'cancelado')

  // Pacientes únicos
  const uniquePatients = [...new Map(
    appointments
      .filter(a => a.pacienteId)
      .map(a => [a.pacienteId._id || a.pacienteId, a.pacienteId])
  ).values()]

  async function updateStatus(id, status) {
    try {
      await api.updateAppointmentStatus(id, status)
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a))
    } catch {
      // silently fail
    }
  }

  return (
    <div className="pro-dashboard">
      <div className="pro-welcome">
        <div>
          <h1 className="pro-page-title">Olá, {user.nome}</h1>
          <p className="pro-page-subtitle">Gerencie seus atendimentos e acompanhe seus pacientes.</p>
        </div>
        <div className="pro-welcome-actions">
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/profissional/pacientes')}>
            Ver pacientes
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/profissional/agenda')}>
            Minha agenda
          </button>
        </div>
      </div>

      <div className="pro-stats">
        <div className="pro-stat-card pro-stat-pending">
          <span className="pro-stat-number">{pending.length}</span>
          <span className="pro-stat-label">Aguardando confirmação</span>
        </div>
        <div className="pro-stat-card pro-stat-confirmed">
          <span className="pro-stat-number">{confirmed.length}</span>
          <span className="pro-stat-label">Confirmados</span>
        </div>
        <div className="pro-stat-card">
          <span className="pro-stat-number">{past.length}</span>
          <span className="pro-stat-label">Realizados</span>
        </div>
        <div className="pro-stat-card">
          <span className="pro-stat-number">{uniquePatients.length}</span>
          <span className="pro-stat-label">Pacientes</span>
        </div>
      </div>

      {/* Solicitações pendentes — destaque */}
      {pending.length > 0 && (
        <section className="pro-section pro-section-highlight">
          <h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            Solicitações de atendimento
          </h2>
          <p className="pro-section-desc">Esses pacientes estão aguardando sua confirmação.</p>
          <div className="pro-appointments">
            {pending.map(apt => (
              <div key={apt._id} className="pro-apt-card pro-apt-pending">
                <div className="pro-apt-header">
                  <div className="pro-apt-patient">
                    <div className="pro-apt-patient-avatar">{(apt.pacienteId?.nome || 'P').charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{apt.pacienteId?.nome || 'Paciente'}</strong>
                      {apt.pacienteId?.email && <span className="pro-apt-email">{apt.pacienteId.email}</span>}
                    </div>
                  </div>
                  <span className={`pro-status ${statusClasses[apt.status]}`}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
                <p className="pro-apt-meta">
                  {apt.formato} &bull; {new Date(apt.data).toLocaleDateString('pt-BR')}
                  {' às ' + new Date(apt.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                {apt.observacoes && <p className="pro-apt-notes">{apt.observacoes}</p>}
                <div className="pro-apt-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => updateStatus(apt._id, 'confirmado')}>
                    Confirmar
                  </button>
                  <button className="btn btn-sm btn-outline" onClick={() => updateStatus(apt._id, 'cancelado')}>
                    Recusar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Próximas sessões confirmadas */}
      <section className="pro-section">
        <h2>Sessões confirmadas</h2>
        {loading ? (
          <p className="pro-empty">Carregando...</p>
        ) : confirmed.length === 0 ? (
          <p className="pro-empty">Nenhuma sessão confirmada no momento.</p>
        ) : (
          <div className="pro-appointments">
            {confirmed.map(apt => (
              <div key={apt._id} className="pro-apt-card">
                <div className="pro-apt-header">
                  <div className="pro-apt-patient">
                    <div className="pro-apt-patient-avatar">{(apt.pacienteId?.nome || 'P').charAt(0).toUpperCase()}</div>
                    <strong>{apt.pacienteId?.nome || 'Paciente'}</strong>
                  </div>
                  <span className="pro-status pro-status-confirmado">Confirmado</span>
                </div>
                <p className="pro-apt-meta">
                  {apt.formato} &bull; {new Date(apt.data).toLocaleDateString('pt-BR')}
                  {' às ' + new Date(apt.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="pro-apt-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => updateStatus(apt._id, 'concluido')}>
                    Marcar como realizado
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pacientes recentes */}
      <section className="pro-section">
        <div className="pro-section-header">
          <h2>Pacientes recentes</h2>
          <button className="btn-link" onClick={() => navigate('/profissional/pacientes')}>Ver todos</button>
        </div>
        {uniquePatients.length === 0 ? (
          <p className="pro-empty">Nenhum paciente vinculado ainda.</p>
        ) : (
          <div className="pro-patients-preview">
            {uniquePatients.slice(0, 5).map(p => (
              <div key={p._id || p} className="pro-patient-preview-card">
                <div className="pro-patient-card-avatar">{(p.nome || 'P').charAt(0).toUpperCase()}</div>
                <div>
                  <strong>{p.nome || 'Paciente'}</strong>
                  <span>{p.email || ''}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Histórico recente */}
      <section className="pro-section">
        <h2>Últimas sessões realizadas</h2>
        {past.length === 0 ? (
          <p className="pro-empty">Nenhuma sessão realizada ainda.</p>
        ) : (
          <div className="pro-appointments">
            {past.slice(0, 5).map(apt => (
              <div key={apt._id} className="pro-apt-card pro-apt-done">
                <div className="pro-apt-header">
                  <strong>{apt.pacienteId?.nome || 'Paciente'}</strong>
                  <span className="pro-status pro-status-concluido">Concluído</span>
                </div>
                <p className="pro-apt-meta">
                  {apt.formato} &bull; {new Date(apt.data).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
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

export function PacientesPage() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [patientHistory, setPatientHistory] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getMyPatients()
      .then(data => setPatients(data))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false))
  }, [])

  async function openPatient(patient) {
    setSelected(patient)
    setLoadingHistory(true)
    try {
      const history = await api.getPatientHistory(patient._id)
      setPatientHistory(history)
    } catch {
      setPatientHistory([])
    } finally {
      setLoadingHistory(false)
    }
  }

  function closePatient() {
    setSelected(null)
    setPatientHistory([])
  }

  const filtered = patients.filter(p => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (p.nome || '').toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q)
  })

  const totalSessions = patientHistory.filter(s => s.status === 'concluido').length
  const activeSessions = patientHistory.filter(s => s.status === 'agendado' || s.status === 'confirmado').length

  // Ficha completa de um paciente
  if (selected) {
    return (
      <div className="pro-dashboard">
        <button className="pro-back-btn" onClick={closePatient}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Voltar para lista
        </button>

        <div className="pro-patient-header">
          <div className="pro-patient-avatar">{selected.nome?.charAt(0)?.toUpperCase() || 'P'}</div>
          <div>
            <h1 className="pro-page-title">{selected.nome}</h1>
            <p className="pro-page-subtitle">{selected.email}</p>
          </div>
        </div>

        <div className="pro-stats" style={{ marginTop: 20 }}>
          <div className="pro-stat-card">
            <span className="pro-stat-number">{totalSessions}</span>
            <span className="pro-stat-label">Sessões realizadas</span>
          </div>
          <div className="pro-stat-card">
            <span className="pro-stat-number">{activeSessions}</span>
            <span className="pro-stat-label">Agendamentos ativos</span>
          </div>
          <div className="pro-stat-card">
            <span className="pro-stat-number">{patientHistory.length}</span>
            <span className="pro-stat-label">Total de registros</span>
          </div>
        </div>

        <section className="pro-section">
          <h2>Dados do paciente</h2>
          <div className="pro-patient-info-grid">
            <div className="pro-patient-info-item">
              <span>Nome</span>
              <strong>{selected.nome}</strong>
            </div>
            <div className="pro-patient-info-item">
              <span>E-mail</span>
              <strong>{selected.email}</strong>
            </div>
            {selected.telefone && (
              <div className="pro-patient-info-item">
                <span>Telefone</span>
                <strong>{selected.telefone}</strong>
              </div>
            )}
            {selected.dataNascimento && (
              <div className="pro-patient-info-item">
                <span>Data de nascimento</span>
                <strong>{new Date(selected.dataNascimento).toLocaleDateString('pt-BR')}</strong>
              </div>
            )}
          </div>
        </section>

        <section className="pro-section">
          <h2>Histórico de sessões</h2>
          {loadingHistory ? (
            <p className="pro-empty">Carregando histórico...</p>
          ) : patientHistory.length === 0 ? (
            <p className="pro-empty">Nenhuma sessão registrada com esse paciente.</p>
          ) : (
            <div className="pro-appointments">
              {patientHistory.map(session => (
                <div key={session._id} className="pro-apt-card">
                  <div className="pro-apt-header">
                    <strong>{new Date(session.data).toLocaleDateString('pt-BR')}</strong>
                    <span className={`pro-status ${statusClasses[session.status] || ''}`}>
                      {statusLabels[session.status] || session.status}
                    </span>
                  </div>
                  <p className="pro-apt-meta">
                    {session.formato}
                    {' às ' + new Date(session.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {session.observacoes && <p className="pro-apt-notes">{session.observacoes}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    )
  }

  // Lista de pacientes
  return (
    <div className="pro-dashboard">
      <h1 className="pro-page-title">Meus pacientes</h1>
      <p className="pro-page-subtitle">Pacientes que agendaram ou realizaram sessões com você.</p>

      <div className="pro-search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar paciente por nome ou e-mail..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="pro-empty">Carregando pacientes...</p>
      ) : filtered.length === 0 ? (
        <p className="pro-empty">
          {search ? 'Nenhum paciente encontrado.' : 'Nenhum paciente vinculado ainda.'}
        </p>
      ) : (
        <div className="pro-patients-list">
          {filtered.map(patient => (
            <button key={patient._id} className="pro-patient-card" onClick={() => openPatient(patient)}>
              <div className="pro-patient-card-avatar">{patient.nome?.charAt(0)?.toUpperCase() || 'P'}</div>
              <div className="pro-patient-card-info">
                <strong>{patient.nome}</strong>
                <span>{patient.email}</span>
              </div>
              <div className="pro-patient-card-meta">
                <span>{patient.totalSessoes || 0} sessões</span>
                {patient.ultimaSessao && (
                  <span className="pro-patient-card-date">
                    Última: {new Date(patient.ultimaSessao).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              <svg className="pro-patient-card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

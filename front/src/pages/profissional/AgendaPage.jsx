import React, { useEffect, useState } from 'react'
import { api } from '../../api'

const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
]

export function AgendaPage() {
  const [availability, setAvailability] = useState({})
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    Promise.all([
      api.getMyAvailability().catch(() => ({})),
      api.getAppointments().catch(() => []),
    ]).then(([avail, apts]) => {
      setAvailability(avail.slots || {})
      setAppointments(apts)
    }).finally(() => setLoading(false))
  }, [])

  function toggleSlot(day, time) {
    setAvailability(prev => {
      const daySlots = prev[day] || []
      const exists = daySlots.includes(time)
      return {
        ...prev,
        [day]: exists ? daySlots.filter(t => t !== time) : [...daySlots, time].sort(),
      }
    })
    setSaved(false)
  }

  async function saveAvailability() {
    try {
      await api.updateMyAvailability({ slots: availability })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      // silently fail
    }
  }

  function clearDay(day) {
    setAvailability(prev => ({ ...prev, [day]: [] }))
    setSaved(false)
  }

  // próximos 7 dias com agendamentos
  const upcomingByDate = {}
  appointments
    .filter(a => a.status === 'agendado' || a.status === 'confirmado')
    .forEach(a => {
      const dateKey = new Date(a.data).toLocaleDateString('pt-BR')
      if (!upcomingByDate[dateKey]) upcomingByDate[dateKey] = []
      upcomingByDate[dateKey].push(a)
    })

  if (loading) {
    return (
      <div className="pro-dashboard">
        <h1 className="pro-page-title">Agenda</h1>
        <p className="pro-empty">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="pro-dashboard">
      <h1 className="pro-page-title">Agenda</h1>
      <p className="pro-page-subtitle">Defina seus horários disponíveis e acompanhe agendamentos.</p>

      <section className="pro-section">
        <div className="pro-section-header">
          <h2>Horários disponíveis</h2>
          <button className="btn btn-primary btn-sm" onClick={saveAvailability}>
            Salvar horários
          </button>
        </div>

        {saved && <div className="pro-toast">Horários salvos com sucesso.</div>}

        <div className="agenda-grid">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="agenda-day">
              <div className="agenda-day-header">
                <strong>{day}</strong>
                <button className="btn-link" onClick={() => clearDay(day)}>Limpar</button>
              </div>
              <div className="agenda-slots">
                {TIME_SLOTS.map(time => {
                  const active = (availability[day] || []).includes(time)
                  return (
                    <button
                      key={time}
                      className={`agenda-slot${active ? ' active' : ''}`}
                      onClick={() => toggleSlot(day, time)}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-section">
        <h2>Agendamentos marcados</h2>
        {Object.keys(upcomingByDate).length === 0 ? (
          <p className="pro-empty">Nenhum agendamento nos próximos dias.</p>
        ) : (
          <div className="agenda-bookings">
            {Object.entries(upcomingByDate).map(([date, apts]) => (
              <div key={date} className="agenda-date-group">
                <h3 className="agenda-date-label">{date}</h3>
                {apts.map(apt => (
                  <div key={apt._id} className="pro-apt-card">
                    <div className="pro-apt-header">
                      <strong>{apt.pacienteId?.nome || 'Paciente'}</strong>
                      <span className="pro-apt-time">
                        {new Date(apt.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="pro-apt-meta">{apt.formato}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

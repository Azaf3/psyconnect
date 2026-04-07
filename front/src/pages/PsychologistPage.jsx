import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { PSYCHOLOGISTS } from '../data/psychologists'
import { useAuth } from '../context/AuthContext'

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

export function PsychologistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, updateUser } = useAuth()
  const psy = PSYCHOLOGISTS.find(p => p.id === Number(id))

  const [showBooking, setShowBooking] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingDone, setBookingDone] = useState(false)

  if (!psy) {
    return (
      <div className="not-found container">
        <h2>Profissional não encontrado</h2>
        <Link to="/buscar" className="btn btn-primary">Voltar para busca</Link>
      </div>
    )
  }

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  function getNextDates() {
    const days = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' })
      days.push({
        label: `${dayName} ${d.getDate()}/${d.getMonth() + 1}`,
        value: d.toLocaleDateString('pt-BR'),
      })
    }
    return days
  }

  function handleBooking() {
    if (!isAuthenticated) {
      navigate('/cadastro')
      return
    }
    setShowBooking(true)
  }

  function confirmBooking() {
    if (!selectedDay || !selectedTime) return

    const newSession = {
      id: Date.now(),
      professional: psy.name,
      specialty: psy.specialty,
      date: selectedDay,
      time: selectedTime,
      status: 'Agendada',
      notes: `Sessão de ${psy.specialty.toLowerCase()} — ${psy.approach}`,
    }

    const currentSessions = user.sessions || []
    updateUser({ sessions: [...currentSessions, newSession] })
    setBookingDone(true)
  }

  return (
    <div className="profile-page container">
      <Link to="/buscar" className="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Voltar para busca
      </Link>

      <div className="profile-layout">
        <div className="profile-main">
          <div className="profile-hero">
            <img className="psy-photo psy-photo-lg" src={psy.photo} alt={psy.name} />
            <div className="profile-identity">
              <h1>{psy.name}</h1>
              <p className="profile-crp">{psy.profession} • {psy.crp}</p>
              <div className="psy-tags">
                <span className="tag tag-specialty">{psy.specialty}</span>
                <span className="tag tag-approach">{psy.approach}</span>
                <span className="tag tag-audience">{psy.audience}</span>
                {psy.online && <span className="tag tag-online">Online</span>}
                {psy.presential && <span className="tag tag-presential">Presencial</span>}
              </div>
              <div className="profile-rating">
                <StarRating value={psy.rating} />
                <span className="psy-reviews">{psy.reviews} avaliações</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Sobre mim</h2>
            <p>{psy.bio}</p>
          </div>

          <div className="profile-section">
            <h2>Formação</h2>
            <ul className="formation-list">
              <li>{psy.formation}</li>
              <li>{psy.specialization}</li>
            </ul>
          </div>

          <div className="profile-section">
            <h2>Áreas de atuação</h2>
            <div className="areas-grid">
              {psy.areas.map(area => (
                <span key={area} className="area-tag">{area}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Perfil de atendimento</h2>
            <div className="profile-model-box">
              <p><strong>Público:</strong> {psy.audience}</p>
              <p><strong>Modalidade:</strong> {psy.careModel}</p>
              <p><strong>Faixa de valor:</strong> até R$ 50 por sessão</p>
            </div>
          </div>

          <div className="profile-section">
            <h2>Depoimentos</h2>
            <div className="profile-testimonials">
              {psy.testimonials.map((t, i) => (
                <div key={i} className="testimonial-mini">
                  <StarRating value={5} />
                  <p>{t.text}</p>
                  <span>— {t.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="profile-sidebar">
          <div className="booking-card">
            <p className="booking-price">
              <strong>R$ {psy.price}</strong> / sessão
            </p>
            <p className="booking-model">{psy.careModel} para {psy.audience.toLowerCase()}</p>
            <div className="booking-schedule">
              <h4>Disponibilidade</h4>
              <ul>
                {psy.schedule.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <button className="btn btn-primary btn-full" onClick={handleBooking}>
              Agendar sessão
            </button>
            <button className="btn btn-outline btn-full" onClick={() => isAuthenticated ? navigate('/minha-ficha') : navigate('/cadastro')}>
              {isAuthenticated ? 'Ver minha ficha' : 'Enviar mensagem'}
            </button>
            <p className="booking-note">
              {isAuthenticated ? 'Escolha um horário para agendar.' : 'Você precisará criar uma conta para agendar.'}
            </p>
          </div>
        </aside>
      </div>

      {showBooking && (
        <div className="modal-overlay" onClick={() => { setShowBooking(false); setBookingDone(false); setSelectedDay(''); setSelectedTime('') }}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            {bookingDone ? (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h2>Sessão agendada</h2>
                <p>Sua sessão com <strong>{psy.name}</strong> foi marcada para <strong>{selectedDay}</strong> às <strong>{selectedTime}</strong>.</p>
                <div className="booking-success-actions">
                  <button className="btn btn-primary" onClick={() => navigate('/minha-ficha')}>Ver minha ficha</button>
                  <button className="btn btn-outline" onClick={() => { setShowBooking(false); setBookingDone(false); setSelectedDay(''); setSelectedTime('') }}>Fechar</button>
                </div>
              </div>
            ) : (
              <>
                <h2>Agendar com {psy.name}</h2>
                <p className="modal-subtitle">{psy.specialty} • {psy.approach} • R$ {psy.price}/sessão</p>

                <div className="booking-step">
                  <h4>Escolha o dia</h4>
                  <div className="date-grid">
                    {getNextDates().map(d => (
                      <button
                        key={d.value}
                        type="button"
                        className={`date-chip ${selectedDay === d.value ? 'active' : ''}`}
                        onClick={() => setSelectedDay(d.value)}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="booking-step">
                  <h4>Escolha o horário</h4>
                  <div className="time-grid">
                    {timeSlots.map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`time-chip ${selectedTime === t ? 'active' : ''}`}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-full"
                  disabled={!selectedDay || !selectedTime}
                  onClick={confirmBooking}
                >
                  Confirmar agendamento
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

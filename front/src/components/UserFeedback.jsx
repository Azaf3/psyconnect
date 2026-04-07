import React from 'react'

function Stars({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < count ? '#f59e0b' : '#e5e7eb'}>
          <path d="M8 1l1.854 3.756L14 5.763l-3 2.924.708 4.126L8 10.757l-3.708 2.056L5 8.687 2 5.763l4.146-.007L8 1z" />
        </svg>
      ))}
    </div>
  )
}

export function UserFeedback() {
  const reviews = [
    { text: 'Achei o profissional certo em minutos!', author: 'Maria S.', stars: 5, initial: 'M' },
    { text: 'Agendamento simples, atendimento ótimo.', author: 'João S.', stars: 5, initial: 'J' },
    { text: 'Organizou minha agenda e trouxe pacientes.', author: 'Dra. Ana C.', stars: 5, initial: 'A' },
  ]

  return (
    <section className="testimonials" id="depoimentos">
      <div className="container">
        <div className="section-header">
          <h2>O que dizem sobre nós</h2>
          <p className="section-subtitle">Experiências de quem já usou o app</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <div key={review.author} className="testimonial">
              <Stars count={review.stars} />
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">{review.initial}</div>
                <p className="testimonial-author">{review.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

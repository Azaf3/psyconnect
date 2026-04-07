import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleLabels = {
  paciente: 'Paciente',
  psicologo: 'Psicólogo',
  empresa: 'Empresa parceira',
}

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-hub container">
      <div className="profile-hub-card">
        <div className="profile-hub-header">
          <div className="profile-hub-avatar">{user.name?.slice(0, 1)?.toUpperCase() || 'U'}</div>
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className="profile-hub-role">{roleLabels[user.role] || 'Usuário'}</span>
          </div>
        </div>

        <div className="profile-hub-grid">
          <button className="profile-shortcut" onClick={() => navigate('/minha-ficha')}>
            <strong>Minha ficha</strong>
            <span>Histórico de sessões e dados cadastrais</span>
          </button>
          <button className="profile-shortcut" onClick={() => navigate('/buscar')}>
            <strong>Buscar profissionais</strong>
            <span>Pesquisar por especialidade ou nome</span>
          </button>
        </div>

        <button className="btn btn-outline btn-full" onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </div>
  )
}

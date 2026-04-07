import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RegisterPage() {
  const [role, setRole] = useState('paciente')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { register } = useAuth()

  const roleContent = {
    paciente: {
      title: 'Criar conta gratuita',
      subtitle: 'Encontre sessões de até R$ 50 com profissionais verificados.',
      nameLabel: 'Nome completo',
      namePlaceholder: 'Seu nome completo',
    },
    psicologo: {
      title: 'Cadastrar perfil profissional',
      subtitle: 'Psicólogos, psicanalistas e psiquiatras — cadastre seu perfil e atenda pela plataforma.',
      nameLabel: 'Nome profissional',
      namePlaceholder: 'Seu nome como deseja exibir',
    },
    empresa: {
      title: 'Cadastrar empresa parceira',
      subtitle: 'Ofereça sessões de até R$ 50 pros colaboradores da sua empresa.',
      nameLabel: 'Nome da empresa',
      namePlaceholder: 'Razão social ou nome fantasia',
    },
  }

  function validate() {
    const errs = {}
    if (!form.name || form.name.trim().length < 3) errs.name = 'Nome deve ter pelo menos 3 caracteres'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'E-mail inválido'
    if (!form.password || form.password.length < 8) errs.password = 'Senha deve ter pelo menos 8 caracteres'
    if (form.password !== form.confirm) errs.confirm = 'As senhas não correspondem'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    register({
      name: form.name,
      email: form.email,
      role,
    })
    navigate('/login')
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-logo">
          <Link to="/">Acolhe+</Link>
        </div>
        <h2>{roleContent[role].title}</h2>
        <p className="auth-subtitle">{roleContent[role].subtitle}</p>

        <div className="role-toggle">
          <button
            type="button"
            className={`role-btn ${role === 'paciente' ? 'active' : ''}`}
            onClick={() => setRole('paciente')}
          >
            Sou paciente
          </button>
          <button
            type="button"
            className={`role-btn ${role === 'psicologo' ? 'active' : ''}`}
            onClick={() => setRole('psicologo')}
          >
            Sou psicólogo
          </button>
          <button
            type="button"
            className={`role-btn ${role === 'empresa' ? 'active' : ''}`}
            onClick={() => setRole('empresa')}
          >
            Sou empresa
          </button>
        </div>

        <div className="role-helper-box">
          {role === 'paciente' && <p>Pra quem quer atendimento social, plano essencial ou benefício corporativo.</p>}
          {role === 'psicologo' && <p>Psicólogos, psicanalistas e psiquiatras — monte seu perfil e participe das frentes de atendimento.</p>}
          {role === 'empresa' && <p>Cadastre a empresa e subsidie sessões pros seus colaboradores.</p>}
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">{roleContent[role].nameLabel}</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={roleContent[role].namePlaceholder}
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              autoComplete="name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
                autoComplete="new-password"
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirmar senha</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Repita a senha"
                value={form.confirm}
                onChange={handleChange}
                className={errors.confirm ? 'input-error' : ''}
                autoComplete="new-password"
              />
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>
          </div>

          <p className="auth-terms">
            Ao criar uma conta você concorda com os{' '}
            <a href="/#">Termos de Uso</a> e a{' '}
            <a href="/#">Política de Privacidade</a>.
          </p>

          <button type="submit" className="btn btn-primary btn-full">
            Criar conta
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

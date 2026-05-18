import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api'

export function ProfessionalProfilePage() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    name: '',
    specialty: '',
    approach: '',
    crp: '',
    bio: '',
    price: '',
    online: true,
    presential: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.getMyProfile()
      .then(data => {
        setForm({
          name: data.name || user.nome || '',
          specialty: data.specialty || '',
          approach: data.approach || '',
          crp: data.crp || '',
          bio: data.bio || '',
          price: data.price || '',
          online: data.online ?? true,
          presential: data.presential ?? false,
        })
      })
      .catch(() => {
        setForm(f => ({ ...f, name: user.nome || '' }))
      })
      .finally(() => setLoading(false))
  }, [user.nome])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setSaved(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.updateMyProfile(form)
      updateUser({ nome: form.name })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      // silently fail
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="pro-dashboard">
        <h1 className="pro-page-title">Meu perfil</h1>
        <p className="pro-empty">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="pro-dashboard">
      <h1 className="pro-page-title">Meu perfil</h1>
      <p className="pro-page-subtitle">Edite suas informações profissionais visíveis para pacientes.</p>

      {saved && <div className="pro-toast">Perfil atualizado com sucesso.</div>}

      <form className="pro-profile-form" onSubmit={handleSubmit}>
        <div className="pro-form-grid">
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="crp">CRP</label>
            <input id="crp" name="crp" type="text" value={form.crp} onChange={handleChange} placeholder="Ex: CRP 06/12345" />
          </div>

          <div className="form-group">
            <label htmlFor="specialty">Especialidade</label>
            <input id="specialty" name="specialty" type="text" value={form.specialty} onChange={handleChange} placeholder="Ex: Ansiedade, Depressão" />
          </div>

          <div className="form-group">
            <label htmlFor="approach">Abordagem</label>
            <input id="approach" name="approach" type="text" value={form.approach} onChange={handleChange} placeholder="Ex: TCC, Psicanálise" />
          </div>

          <div className="form-group">
            <label htmlFor="price">Valor da sessão (R$)</label>
            <input id="price" name="price" type="text" value={form.price} onChange={handleChange} placeholder="Ex: 50" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Sobre você</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            placeholder="Descreva sua formação, experiência e como você trabalha..."
          />
        </div>

        <div className="pro-check-row">
          <label className="pro-check">
            <input type="checkbox" name="online" checked={form.online} onChange={handleChange} />
            Atendimento online
          </label>
          <label className="pro-check">
            <input type="checkbox" name="presential" checked={form.presential} onChange={handleChange} />
            Atendimento presencial
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar perfil'}
        </button>
      </form>
    </div>
  )
}

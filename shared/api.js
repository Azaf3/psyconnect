import { getItem, setItem as setStorageItem, removeItem as removeStorageItem } from './storage'

const API_URL = 'http://localhost:3000'

export async function setToken(token) {
  if (token) {
    await setStorageItem('acolhe-auth-token', token)
  } else {
    await removeStorageItem('acolhe-auth-token')
  }
}

async function request(path, options = {}) {
  const token = await getItem('acolhe-auth-token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) {
    const err = new Error(data.error || 'Erro no servidor')
    err.status = res.status
    throw err
  }

  return data
}

export const api = {
  loginPaciente: (email, senha) =>
    request('/auth/login/paciente', { method: 'POST', body: JSON.stringify({ email, senha }) }),

  registerPaciente: (nome, email, senha) =>
    request('/auth/register/paciente', { method: 'POST', body: JSON.stringify({ nome, email, senha }) }),

  loginProfissional: (email, senha) =>
    request('/auth/login/profissional', { method: 'POST', body: JSON.stringify({ email, senha }) }),

  registerProfissional: (data) =>
    request('/auth/register/profissional', { method: 'POST', body: JSON.stringify(data) }),

  me: () => request('/auth/me'),

  getProfessionals: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/professionals${qs ? '?' + qs : ''}`)
  },

  getProfessional: (id) => request(`/professionals/${id}`),

  createAppointment: (data) =>
    request('/appointments', { method: 'POST', body: JSON.stringify(data) }),

  getAppointments: () => request('/appointments'),

  cancelAppointment: (id) =>
    request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'cancelado' }) }),

  updateAppointmentStatus: (id, status) =>
    request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  getMyProfile: () => request('/professionals/me'),

  updateMyProfile: (data) =>
    request('/professionals/me', { method: 'PUT', body: JSON.stringify(data) }),

  getMyPatients: () => request('/professionals/me/patients'),

  getPatientHistory: (patientId) => request(`/professionals/me/patients/${patientId}/history`),

  getMyAvailability: () => request('/professionals/me/availability'),

  updateMyAvailability: (data) =>
    request('/professionals/me/availability', { method: 'PUT', body: JSON.stringify(data) }),
}

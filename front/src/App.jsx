import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { TopBar } from './components/TopBar'
import { BottomNav } from './components/BottomNav'
import { HomePanel } from './components/HomePanel'
import { AccessProfiles } from './components/AccessProfiles'
import { SpecialtyGrid } from './components/SpecialtyGrid'
import { AppShortcuts } from './components/AppShortcuts'
import { UserFeedback } from './components/UserFeedback'
import { SearchPage } from './pages/SearchPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PsychologistPage } from './pages/PsychologistPage'
import { ProfilePage } from './pages/ProfilePage'
import { FichaPage } from './pages/FichaPage'
import { ProfessionalLayout } from './pages/profissional/ProfessionalLayout'
import { DashboardPage } from './pages/profissional/DashboardPage'
import { AgendaPage } from './pages/profissional/AgendaPage'
import { ProfessionalProfilePage } from './pages/profissional/ProfessionalProfilePage'
import { PacientesPage } from './pages/profissional/PacientesPage'

function HomePage() {
  return (
    <main>
      <HomePanel />
      <AccessProfiles />
      <SpecialtyGrid />
      <AppShortcuts />
      <UserFeedback />
    </main>
  )
}

function App() {
  const location = useLocation()
  const isProfessionalArea = location.pathname.startsWith('/profissional/')
    && !location.pathname.match(/^\/profissional\/\d/)

  return (
    <div className="app">
      {!isProfessionalArea && <TopBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/minha-ficha" element={<FichaPage />} />
        <Route path="/profissional/:id" element={<PsychologistPage />} />

        <Route path="/profissional" element={<ProfessionalLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="perfil" element={<ProfessionalProfilePage />} />
        </Route>
      </Routes>
      {!isProfessionalArea && <BottomNav />}
    </div>
  )
}

export default App

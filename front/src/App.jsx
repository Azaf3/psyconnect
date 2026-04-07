import { Routes, Route } from 'react-router-dom'
import './App.css'
import { TopBar } from './components/TopBar'
import { BottomNav } from './components/BottomNav'
import { HomePanel } from './components/HomePanel'
import { AccessProfiles } from './components/AccessProfiles'
import { SpecialtyGrid } from './components/SpecialtyGrid'
import { AppShortcuts } from './components/AppShortcuts'
import { SearchPage } from './pages/SearchPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PsychologistPage } from './pages/PsychologistPage'
import { ProfilePage } from './pages/ProfilePage'
import { FichaPage } from './pages/FichaPage'

function HomePage() {
  return (
    <main>
      <HomePanel />
      <AccessProfiles />
      <SpecialtyGrid />
      <AppShortcuts />
    </main>
  )
}

function App() {
  return (
    <div className="app">
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/minha-ficha" element={<FichaPage />} />
        <Route path="/profissional/:id" element={<PsychologistPage />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App

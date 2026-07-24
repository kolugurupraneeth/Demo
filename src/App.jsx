import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import ScrollToHash from './components/ScrollToHash/ScrollToHash'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SolutionsPage from './pages/SolutionsPage'
import CareersPage from './pages/CareersPage'
import JobApplyPage from './pages/JobApplyPage'
import ConnectPage from './pages/ConnectPage'
import ContactPage from './pages/ContactPage'

function AppShell() {
  const { pathname } = useLocation()
  return (
    <>
      <Nav />
      <main key={pathname} id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply/:jobSlug" element={<JobApplyPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <AppShell />
    </BrowserRouter>
  )
}

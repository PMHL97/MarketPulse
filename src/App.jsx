import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MarketsPage from './pages/MarketsPage'
import ChartsPage from './pages/ChartsPage'
import CommunityPage from './pages/CommunityPage'
import ScreenersPage from './pages/ScreenersPage'
import HeatmapsPage from './pages/HeatmapsPage'
import CalendarsPage from './pages/CalendarsPage'
import AlertsPage from './pages/AlertsPage'
import PineScriptPage from './pages/PineScriptPage'
import BrokerIntegrationPage from './pages/BrokerIntegrationPage'
import ApiPage from './pages/ApiPage'
import EducationPage from './pages/EducationPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import PaperTradingPage from './pages/PaperTradingPage'
import BrokersPage from './pages/BrokersPage'
import TradingFeaturesPage from './pages/TradingFeaturesPage'
import HelpPage from './pages/HelpPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import DisclaimerPage from './pages/DisclaimerPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import BusinessPartnersPage from './pages/BusinessPartnersPage'
import BusinessAdvertisingPage from './pages/BusinessAdvertisingPage'
import useAuthStore from './store/authStore'
import './App.css'

function App() {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    // Initialize authentication state from localStorage
    initializeAuth()
  }, [initializeAuth])

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/screeners" element={<ScreenersPage />} />
            <Route path="/heatmaps" element={<HeatmapsPage />} />
            <Route path="/calendars" element={<CalendarsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/pine-script" element={<PineScriptPage />} />
            <Route path="/broker-integration" element={<BrokerIntegrationPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/paper-trading" element={<PaperTradingPage />} />
            <Route path="/brokers" element={<BrokersPage />} />
            <Route path="/trading-features" element={<TradingFeaturesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/business/partners" element={<BusinessPartnersPage />} />
            <Route path="/business/advertising" element={<BusinessAdvertisingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

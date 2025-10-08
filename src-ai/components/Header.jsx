import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Bot, 
  User, 
  Bell, 
  Sparkles,
  Check
} from 'lucide-react'
import TraceIcon from './TraceIcon'
import AuthModal from './AuthModal'
import useAuthStore from '../store/authStore'

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuthStore()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Bot },
  ]

  const isActive = (path) => location.pathname === path

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <TraceIcon className="w-8 h-8 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-slate-900">Market Pulse</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Auth buttons */}
              {!isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                      <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</button>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>


      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
        />
      )}
    </>
  )
}

export default Header
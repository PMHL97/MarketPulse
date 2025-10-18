
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
// Removed StockDetailPage import - using embedded view instead
import { ChatProvider } from './contexts/ChatContext'

const App = () => {
  return (
    <ChatProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
        {/* Floating pills (Classic / AI) */}
        <div className="fixed top-4 right-4 z-40">
          <div className="flex items-center rounded-full border border-gray-300 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden shadow-sm">
            <button
              onClick={() => {
                const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
                const classicUrl = isLocal ? (import.meta.env.VITE_CLASSIC_APP_URL || 'http://localhost:3001') : import.meta.env.VITE_CLASSIC_APP_URL
                if (!classicUrl) throw new Error('VITE_CLASSIC_APP_URL must be set in production build')
                window.location.href = classicUrl.endsWith('/') ? classicUrl : `${classicUrl}/`
              }}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 h-8 rounded-l-full"
              aria-label="Switch to Classic"
            >
              Classic
            </button>
            <button
              onClick={() => {
                const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
                const aiUrl = isLocal ? (import.meta.env.VITE_AI_APP_URL || 'http://localhost:3002') : import.meta.env.VITE_AI_APP_URL
                if (!aiUrl) throw new Error('VITE_AI_APP_URL must be set in production build')
                window.location.href = aiUrl.endsWith('/') ? aiUrl : `${aiUrl}/`
              }}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 h-8 rounded-r-full"
              aria-label="AI Mode"
            >
              AI
            </button>
          </div>
        </div>
        <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index-ai.html" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        </main>
        </div>
      </BrowserRouter>
    </ChatProvider>
  )
}

export default App


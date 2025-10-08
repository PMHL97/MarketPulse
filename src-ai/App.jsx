
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
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center rounded-full border border-gray-300 bg-gray-100 overflow-hidden shadow-sm">
            <button
              onClick={() => { window.location.href = 'http://localhost:3001/' }}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 h-8 rounded-l-full"
              aria-label="Switch to Classic"
            >
              Classic
            </button>
            <button
              onClick={() => { window.location.href = 'http://localhost:3002/' }}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-green-700 bg-gray-100 hover:bg-gray-200 h-8 rounded-r-full"
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


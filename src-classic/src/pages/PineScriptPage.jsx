import React from 'react'
import { Code, Play, Download, BookOpen, Star, Users } from 'lucide-react'

const PineScriptPage = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Pine Script</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Create custom indicators and strategies with Pine Script, the powerful programming language for TradingView
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <div className="text-primary-600 mb-4">
            <Code className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Coming Soon</h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            We're working on bringing Pine Script integration to Market Pulse. This will allow you to create, 
            test, and share custom indicators and trading strategies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-primary-600 mb-2">
                <Play className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Create Scripts</h3>
              <p className="text-sm text-secondary-600">Build custom indicators and strategies</p>
            </div>
            <div className="text-center">
              <div className="text-primary-600 mb-2">
                <Download className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Import Scripts</h3>
              <p className="text-sm text-secondary-600">Import existing Pine Script code</p>
            </div>
            <div className="text-center">
              <div className="text-primary-600 mb-2">
                <Users className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Share Scripts</h3>
              <p className="text-sm text-secondary-600">Share your creations with the community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PineScriptPage


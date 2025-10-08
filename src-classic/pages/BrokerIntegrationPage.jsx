import React from 'react'
import { Link, Shield, Zap, Globe, CheckCircle } from 'lucide-react'

const BrokerIntegrationPage = () => {
  const brokers = [
    { name: 'Interactive Brokers', status: 'coming-soon', description: 'Professional trading platform' },
    { name: 'TD Ameritrade', status: 'coming-soon', description: 'Popular retail broker' },
    { name: 'E*TRADE', status: 'coming-soon', description: 'Online brokerage services' },
    { name: 'Charles Schwab', status: 'coming-soon', description: 'Full-service investment firm' },
    { name: 'Fidelity', status: 'coming-soon', description: 'Investment and financial services' },
    { name: 'Robinhood', status: 'coming-soon', description: 'Commission-free trading' }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Broker Integration</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Connect your broker account to Market Pulse for seamless trading and portfolio management
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Shield className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Secure Connection</h3>
            <p className="text-secondary-600">Bank-level security with encrypted connections</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Zap className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Real-time Data</h3>
            <p className="text-secondary-600">Live market data and portfolio updates</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Globe className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Global Access</h3>
            <p className="text-secondary-600">Trade on multiple exchanges worldwide</p>
          </div>
        </div>

        {/* Supported Brokers */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Supported Brokers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brokers.map((broker, index) => (
              <div key={index} className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-secondary-900">{broker.name}</h3>
                  <span className="text-xs bg-warning-100 text-warning-800 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-secondary-600 mb-3">{broker.description}</p>
                <button 
                  disabled
                  className="w-full py-2 px-4 bg-secondary-200 text-secondary-500 rounded-lg cursor-not-allowed"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Integration Coming Soon</h3>
          <p className="text-primary-700 mb-4">
            We're working on secure broker integrations. Sign up to be notified when your broker becomes available.
          </p>
          <Link 
            to="/community" 
            className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Join Community
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BrokerIntegrationPage


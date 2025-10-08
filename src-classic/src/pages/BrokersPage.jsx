import React from 'react'
import { Check, Star, Globe, Shield, Zap, Users } from 'lucide-react'

const BrokersPage = () => {
  const brokers = [
    {
      name: 'Interactive Brokers',
      logo: '/api/placeholder/120/60',
      rating: 4.8,
      features: ['Low commissions', 'Global markets', 'Advanced tools', 'Professional platform'],
      commission: 'Starting at $0.35',
      minDeposit: '$0',
      popular: true
    },
    {
      name: 'TD Ameritrade',
      logo: '/api/placeholder/120/60',
      rating: 4.6,
      features: ['Commission-free stocks', 'Educational resources', 'Mobile app', 'Research tools'],
      commission: 'Commission-free',
      minDeposit: '$0',
      popular: false
    },
    {
      name: 'E*TRADE',
      logo: '/api/placeholder/120/60',
      rating: 4.5,
      features: ['Power E*TRADE platform', 'Options trading', 'Mutual funds', 'Retirement accounts'],
      commission: 'Commission-free',
      minDeposit: '$0',
      popular: false
    },
    {
      name: 'Charles Schwab',
      logo: '/api/placeholder/120/60',
      rating: 4.7,
      features: ['Full-service brokerage', 'Investment advice', 'Banking services', 'Research'],
      commission: 'Commission-free',
      minDeposit: '$0',
      popular: false
    },
    {
      name: 'Fidelity',
      logo: '/api/placeholder/120/60',
      rating: 4.6,
      features: ['Zero-fee index funds', 'Research tools', 'Mobile trading', 'Retirement planning'],
      commission: 'Commission-free',
      minDeposit: '$0',
      popular: false
    },
    {
      name: 'Robinhood',
      logo: '/api/placeholder/120/60',
      rating: 4.2,
      features: ['Commission-free trading', 'Cryptocurrency', 'Fractional shares', 'Mobile-first'],
      commission: 'Commission-free',
      minDeposit: '$0',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Supported Brokers</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Connect with leading brokers to execute your trades. All major brokers are supported with seamless integration.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Shield className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Secure Integration</h3>
            <p className="text-secondary-600">Bank-level security with encrypted connections</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Zap className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Real-time Execution</h3>
            <p className="text-secondary-600">Execute trades instantly with live market data</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Globe className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Global Markets</h3>
            <p className="text-secondary-600">Access markets worldwide through your broker</p>
          </div>
        </div>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {brokers.map((broker, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-shadow ${
              broker.popular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-secondary-200'
            }`}>
              {broker.popular && (
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm font-medium text-warning-800">Most Popular</span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <div className="h-12 bg-secondary-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-secondary-600 font-semibold">{broker.name}</span>
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="font-semibold text-secondary-900">{broker.rating}</span>
                  <span className="text-sm text-secondary-600">(1,234 reviews)</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {broker.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success-600 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-secondary-600">Commission:</span>
                  <span className="font-semibold text-secondary-900">{broker.commission}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600">Min. Deposit:</span>
                  <span className="font-semibold text-secondary-900">{broker.minDeposit}</span>
                </div>
              </div>

              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                broker.popular
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-secondary-200 text-secondary-800 hover:bg-secondary-300'
              }`}>
                Connect Broker
              </button>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">How Broker Integration Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Choose Your Broker</h3>
              <p className="text-sm text-secondary-600">Select from our list of supported brokers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Secure Connection</h3>
              <p className="text-sm text-secondary-600">Connect your account with bank-level security</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Start Trading</h3>
              <p className="text-sm text-secondary-600">Execute trades directly from Market Pulse</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Monitor Portfolio</h3>
              <p className="text-sm text-secondary-600">Track your performance in real-time</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Broker Integration Coming Soon</h3>
          <p className="text-primary-700 mb-4">
            We're working on seamless integration with all major brokers. 
            Sign up to be notified when your broker becomes available.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  )
}

export default BrokersPage


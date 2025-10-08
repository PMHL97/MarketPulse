import React from 'react'
import { Play, TrendingUp, DollarSign, BarChart3, Target, Award } from 'lucide-react'

const PaperTradingPage = () => {
  const features = [
    {
      title: 'Risk-Free Practice',
      description: 'Learn to trade without risking real money',
      icon: Target
    },
    {
      title: 'Real Market Data',
      description: 'Practice with live market conditions',
      icon: BarChart3
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor your progress and improvements',
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Paper Trading</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Practice trading with virtual money using real market data. Perfect for beginners and experienced traders alike.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
                <div className="text-primary-600 mb-4">
                  <Icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">How Paper Trading Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Start with $100,000</h3>
              <p className="text-sm text-secondary-600">Begin with virtual money to practice trading</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Place Trades</h3>
              <p className="text-sm text-secondary-600">Execute buy and sell orders with real market data</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Track Performance</h3>
              <p className="text-sm text-secondary-600">Monitor your portfolio and trading statistics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Learn & Improve</h3>
              <p className="text-sm text-secondary-600">Analyze your trades and refine your strategy</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Perfect for Beginners</h3>
            <ul className="space-y-2 text-secondary-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Learn trading basics without financial risk</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Understand market mechanics and order types</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Practice with different trading strategies</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Build confidence before trading with real money</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Great for Experienced Traders</h3>
            <ul className="space-y-2 text-secondary-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Test new strategies and indicators</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Validate trading algorithms</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Practice with different market conditions</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <span>Refine risk management techniques</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <Play className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Start Paper Trading Today</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Join thousands of traders who use our paper trading platform to practice and improve their skills. 
            It's completely free and requires no signup.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Start Paper Trading
          </button>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-white border border-secondary-200 rounded-lg p-6 text-center">
          <Award className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Paper Trading Coming Soon</h3>
          <p className="text-secondary-600 mb-4">
            We're building a comprehensive paper trading platform with advanced features and real-time market data.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-secondary-200 text-secondary-800 rounded-lg hover:bg-secondary-300 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaperTradingPage


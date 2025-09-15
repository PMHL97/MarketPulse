import React from 'react'
import { TrendingUp, BarChart3, Zap, Shield, Globe, Target, Users, Award } from 'lucide-react'

const TradingFeaturesPage = () => {
  const features = [
    {
      title: 'Advanced Charting',
      description: 'Professional-grade charts with 100+ technical indicators',
      icon: BarChart3,
      category: 'Analysis'
    },
    {
      title: 'Real-time Data',
      description: 'Live market data from global exchanges',
      icon: Zap,
      category: 'Data'
    },
    {
      title: 'Portfolio Management',
      description: 'Track and manage your investments in one place',
      icon: Target,
      category: 'Portfolio'
    },
    {
      title: 'Risk Management',
      description: 'Advanced risk assessment and position sizing tools',
      icon: Shield,
      category: 'Risk'
    },
    {
      title: 'Global Markets',
      description: 'Access stocks, crypto, forex, and commodities',
      icon: Globe,
      category: 'Markets'
    },
    {
      title: 'Social Trading',
      description: 'Follow and copy successful traders',
      icon: Users,
      category: 'Social'
    },
    {
      title: 'Automated Trading',
      description: 'Create and deploy trading algorithms',
      icon: TrendingUp,
      category: 'Automation'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed performance metrics and reporting',
      icon: Award,
      category: 'Analytics'
    }
  ]

  const categories = ['All', 'Analysis', 'Data', 'Portfolio', 'Risk', 'Markets', 'Social', 'Automation', 'Analytics']

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Trading Features</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Discover the powerful tools and features that make Market Pulse the ultimate trading platform
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-primary-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="mb-2">
                  <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Advanced Trading Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Technical Analysis</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>100+ technical indicators and overlays</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Custom chart layouts and timeframes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Pattern recognition and alerts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Multi-timeframe analysis</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Risk Management</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Position sizing calculators</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Stop-loss and take-profit orders</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Portfolio risk assessment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Correlation analysis tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-secondary-900">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-secondary-900">Pro</th>
                  <th className="text-center py-3 px-4 font-semibold text-secondary-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-secondary-100">
                  <td className="py-3 px-4 text-secondary-700">Basic Charts</td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100">
                  <td className="py-3 px-4 text-secondary-700">Advanced Indicators</td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-danger-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100">
                  <td className="py-3 px-4 text-secondary-700">Custom Indicators</td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-danger-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-danger-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100">
                  <td className="py-3 px-4 text-secondary-700">API Access</td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-warning-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="w-4 h-4 bg-success-600 rounded-full mx-auto"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Ready to Start Trading?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Experience all these powerful features with a free trial. No credit card required.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradingFeaturesPage


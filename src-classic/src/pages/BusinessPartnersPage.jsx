import React from 'react'
import { Users, HeartHandshake, TrendingUp, Globe, Star, Award } from 'lucide-react'

const BusinessPartnersPage = () => {
  const partnershipTypes = [
    {
      title: 'Technology Partners',
      description: 'Integrate with leading fintech and data providers',
      icon: TrendingUp,
      benefits: ['API access', 'Technical support', 'Co-marketing opportunities']
    },
    {
      title: 'Broker Partners',
      description: 'Connect with major brokerage firms and trading platforms',
      icon: Globe,
      benefits: ['White-label solutions', 'Revenue sharing', 'Joint development']
    },
    {
      title: 'Content Partners',
      description: 'Collaborate with financial media and research firms',
      icon: Star,
      benefits: ['Content syndication', 'Cross-promotion', 'Data licensing']
    }
  ]

  const currentPartners = [
    {
      name: 'Alpha Vantage',
      type: 'Data Provider',
      description: 'Real-time and historical market data',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'News API',
      type: 'Content Provider',
      description: 'Financial news and sentiment analysis',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Interactive Brokers',
      type: 'Broker Partner',
      description: 'Trading execution and portfolio management',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'TradingView',
      type: 'Technology Partner',
      description: 'Charting and technical analysis tools',
      logo: '/api/placeholder/120/60'
    }
  ]

  const benefits = [
    {
      title: 'Revenue Sharing',
      description: 'Earn revenue through our partnership programs',
      icon: TrendingUp
    },
    {
      title: 'Technical Support',
      description: 'Dedicated technical resources and documentation',
      icon: Award
    },
    {
      title: 'Marketing Support',
      description: 'Co-marketing opportunities and joint campaigns',
      icon: Star
    },
    {
      title: 'Global Reach',
      description: 'Access to our international user base',
      icon: Globe
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Business Partnerships</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Partner with Market Pulse to expand your reach and grow your business in the financial technology space.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {partnershipTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-primary-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{type.title}</h3>
                <p className="text-secondary-600 text-sm mb-4">{type.description}</p>
                <ul className="space-y-1">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm text-secondary-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Current Partners */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPartners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="h-16 bg-secondary-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-secondary-600 font-semibold text-sm">{partner.name}</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{partner.name}</h3>
                <p className="text-xs text-primary-600 mb-2">{partner.type}</p>
                <p className="text-sm text-secondary-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
                  <div className="text-primary-600 mb-4">
                    <Icon className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{benefit.title}</h3>
                  <p className="text-secondary-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Partnership Process */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Partnership Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Initial Contact</h3>
              <p className="text-sm text-secondary-600">Reach out to discuss partnership opportunities</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Evaluation</h3>
              <p className="text-sm text-secondary-600">We evaluate the partnership fit and potential</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Agreement</h3>
              <p className="text-sm text-secondary-600">Negotiate terms and sign partnership agreement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Launch</h3>
              <p className="text-sm text-secondary-600">Implement partnership and go to market</p>
            </div>
          </div>
        </div>

        {/* Partnership Criteria */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Partnership Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">What We Look For</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Complementary products or services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Strong brand reputation and market presence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Technical compatibility and integration capabilities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Shared values and commitment to quality</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Partnership Requirements</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Established business with proven track record</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Compliance with financial regulations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Dedicated partnership team and resources</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Commitment to mutual success and growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <HeartHandshake className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Ready to Partner with Us?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Let's explore how we can work together to create value for both our businesses and our customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Become a Partner
            </button>
            <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
              Download Partnership Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessPartnersPage


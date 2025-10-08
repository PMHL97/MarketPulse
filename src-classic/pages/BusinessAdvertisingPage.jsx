import React from 'react'
import { TrendingUp, Target, BarChart3, Users, Globe, Award } from 'lucide-react'

const BusinessAdvertisingPage = () => {
  const advertisingOptions = [
    {
      title: 'Display Advertising',
      description: 'Prominent banner ads on our platform',
      icon: BarChart3,
      features: ['High visibility placement', 'Targeted audience reach', 'Rich media support'],
      pricing: 'Starting at $5,000/month'
    },
    {
      title: 'Sponsored Content',
      description: 'Native advertising that fits seamlessly',
      icon: TrendingUp,
      features: ['Native integration', 'Editorial quality', 'Engagement focused'],
      pricing: 'Starting at $3,000/month'
    },
    {
      title: 'Newsletter Advertising',
      description: 'Reach our engaged subscriber base',
      icon: Users,
      features: ['Premium placement', 'High open rates', 'Direct engagement'],
      pricing: 'Starting at $2,000/month'
    }
  ]

  const audienceStats = [
    {
      metric: 'Monthly Active Users',
      value: '500K+',
      description: 'Engaged traders and investors'
    },
    {
      metric: 'Average Session Time',
      value: '45 min',
      description: 'Deep engagement with platform'
    },
    {
      metric: 'Geographic Reach',
      value: '150+',
      description: 'Countries worldwide'
    },
    {
      metric: 'Demographics',
      value: '25-55',
      description: 'Age range of primary audience'
    }
  ]

  const industries = [
    'Financial Services',
    'Investment Management',
    'Trading Platforms',
    'Financial Technology',
    'Cryptocurrency',
    'Real Estate',
    'Insurance',
    'Banking'
  ]

  const benefits = [
    {
      title: 'Targeted Reach',
      description: 'Access to qualified financial professionals and investors',
      icon: Target
    },
    {
      title: 'High Engagement',
      description: 'Users spend significant time on our platform',
      icon: TrendingUp
    },
    {
      title: 'Global Audience',
      description: 'Reach traders and investors worldwide',
      icon: Globe
    },
    {
      title: 'Premium Branding',
      description: 'Associate your brand with trusted financial platform',
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Advertising Opportunities</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Reach a highly engaged audience of traders, investors, and financial professionals through our premium advertising platform.
          </p>
        </div>

        {/* Audience Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {audienceStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-secondary-900 mb-1">{stat.metric}</div>
              <div className="text-xs text-secondary-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Advertising Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Advertising Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advertisingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
                  <div className="text-primary-600 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{option.title}</h3>
                  <p className="text-secondary-600 text-sm mb-4">{option.description}</p>
                  <ul className="space-y-1 mb-4">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-secondary-600 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm font-semibold text-primary-600">{option.pricing}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Why Advertise with Us</h2>
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

        {/* Target Industries */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Target Industries</h2>
          <p className="text-secondary-600 text-center mb-6">
            Our platform is ideal for advertising to these key industries:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="bg-secondary-50 border border-secondary-200 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-secondary-900">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Specifications */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Ad Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Display Ads</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Banner: 728x90, 300x250, 160x600</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Mobile: 320x50, 300x250</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Formats: JPG, PNG, GIF, HTML5</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>File size: Max 100KB</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Content Guidelines</h3>
              <ul className="space-y-2 text-secondary-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Relevant to financial markets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Professional and trustworthy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>Compliant with regulations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span>No misleading claims</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Pricing & Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-secondary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Starter</h3>
              <div className="text-2xl font-bold text-primary-600 mb-4">$2,000<span className="text-sm text-secondary-600">/month</span></div>
              <ul className="space-y-2 text-sm text-secondary-600 mb-6">
                <li>• Newsletter placement</li>
                <li>• Basic targeting</li>
                <li>• Standard reporting</li>
                <li>• Email support</li>
              </ul>
              <button className="w-full py-2 px-4 bg-secondary-200 text-secondary-800 rounded-lg hover:bg-secondary-300 transition-colors">
                Get Started
              </button>
            </div>
            
            <div className="border-2 border-primary-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Professional</h3>
              <div className="text-2xl font-bold text-primary-600 mb-4">$5,000<span className="text-sm text-secondary-600">/month</span></div>
              <ul className="space-y-2 text-sm text-secondary-600 mb-6">
                <li>• Display advertising</li>
                <li>• Advanced targeting</li>
                <li>• Detailed analytics</li>
                <li>• Priority support</li>
                <li>• A/B testing</li>
              </ul>
              <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Get Started
              </button>
            </div>
            
            <div className="border border-secondary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Enterprise</h3>
              <div className="text-2xl font-bold text-primary-600 mb-4">Custom<span className="text-sm text-secondary-600"> pricing</span></div>
              <ul className="space-y-2 text-sm text-secondary-600 mb-6">
                <li>• All advertising options</li>
                <li>• Custom targeting</li>
                <li>• Dedicated account manager</li>
                <li>• Custom reporting</li>
                <li>• White-label solutions</li>
              </ul>
              <button className="w-full py-2 px-4 bg-secondary-200 text-secondary-800 rounded-lg hover:bg-secondary-300 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Ready to Reach Our Audience?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Contact our advertising team to discuss your campaign goals and get a custom proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Start Your Campaign
            </button>
            <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
              Download Media Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessAdvertisingPage


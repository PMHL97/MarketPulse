import React, { useState } from 'react'
import { Search, BookOpen, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      question: 'How do I get started with Market Pulse?',
      answer: 'Getting started is easy! Simply create a free account, explore our features, and start with our paper trading mode to practice without risk.'
    },
    {
      question: 'What markets can I trade on?',
      answer: 'Market Pulse supports stocks, cryptocurrencies, forex, commodities, and ETFs from major global exchanges including NYSE, NASDAQ, and international markets.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use bank-level encryption and security measures to protect your data. We never store your trading credentials and use read-only access for broker integrations.'
    },
    {
      question: 'How much does Market Pulse cost?',
      answer: 'We offer a free plan with basic features, a Pro plan at $29/month, and Enterprise plans for institutions. All plans include a 14-day free trial.'
    },
    {
      question: 'Can I use Market Pulse on mobile?',
      answer: 'Yes, Market Pulse is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android.'
    },
    {
      question: 'How do I connect my broker?',
      answer: 'Go to the Broker Integration page, select your broker, and follow the secure connection process. We support all major brokers with read-only access.'
    }
  ]

  const categories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      articles: [
        'Creating your first account',
        'Setting up your profile',
        'Understanding the interface',
        'Paper trading basics'
      ]
    },
    {
      title: 'Trading Features',
      icon: BookOpen,
      articles: [
        'Using charts and indicators',
        'Setting up alerts',
        'Portfolio management',
        'Risk management tools'
      ]
    },
    {
      title: 'Account & Billing',
      icon: BookOpen,
      articles: [
        'Managing your subscription',
        'Payment methods',
        'Account settings',
        'Data export'
      ]
    },
    {
      title: 'Technical Support',
      icon: BookOpen,
      articles: [
        'Browser compatibility',
        'Mobile app issues',
        'Data synchronization',
        'Performance optimization'
      ]
    }
  ]

  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      available: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      available: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak with a support specialist',
      icon: Phone,
      available: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Help Center</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Find answers to your questions and get the support you need
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-primary-600 mb-4">
                  <Icon className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{method.title}</h3>
                <p className="text-secondary-600 text-sm mb-3">{method.description}</p>
                <p className="text-xs text-secondary-500 mb-4">{method.available}</p>
                <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  {method.action}
                </button>
              </div>
            )
          })}
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-primary-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a href="#" className="text-secondary-600 hover:text-primary-600 text-sm flex items-center space-x-2">
                          <span>•</span>
                          <span>{article}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-secondary-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary-50 transition-colors"
                >
                  <span className="font-medium text-secondary-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-secondary-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-secondary-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-secondary-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'How to set up your first watchlist',
              'Understanding technical indicators',
              'Setting up price alerts',
              'Managing your portfolio',
              'Using the mobile app',
              'Troubleshooting login issues'
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-lg border border-secondary-200 p-4 hover:shadow-md transition-shadow">
                <a href="#" className="block">
                  <h3 className="font-medium text-secondary-900 hover:text-primary-600 transition-colors">
                    {article}
                  </h3>
                  <p className="text-sm text-secondary-600 mt-1">
                    Learn how to get the most out of this feature...
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Still Need Help?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you succeed. Get in touch and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage


import React, { useState } from 'react'
import { Code, Key, BookOpen, Zap, Shield, Globe } from 'lucide-react'

const ApiPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'authentication', name: 'Authentication', icon: Key },
    { id: 'endpoints', name: 'Endpoints', icon: Zap },
    { id: 'examples', name: 'Examples', icon: Code }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Market Pulse API</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Access real-time market data, news, and analysis through our comprehensive REST API
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Zap className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Real-time Data</h3>
            <p className="text-secondary-600">Live market data and price feeds</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Shield className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Secure Access</h3>
            <p className="text-secondary-600">API key authentication and rate limiting</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Globe className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Global Markets</h3>
            <p className="text-secondary-600">Stocks, crypto, forex, and commodities</p>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
          {/* Tabs */}
          <div className="border-b border-secondary-200">
            <div className="flex space-x-1 p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">API Overview</h2>
                <div className="prose max-w-none">
                  <p className="text-secondary-600 mb-4">
                    The Market Pulse API provides programmatic access to our comprehensive market data, 
                    news feeds, and analysis tools. Build powerful trading applications, research tools, 
                    and financial dashboards.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">Available Data</h3>
                  <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-6">
                    <li>Real-time and historical price data</li>
                    <li>Market news and sentiment analysis</li>
                    <li>Economic calendar events</li>
                    <li>Company fundamentals and earnings</li>
                    <li>Technical indicators and analysis</li>
                  </ul>

                  <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 mb-2">Base URL</h4>
                    <code className="text-sm text-primary-600">https://api.marketpulse.com/v1</code>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Authentication</h2>
                <div className="prose max-w-none">
                  <p className="text-secondary-600 mb-4">
                    All API requests require authentication using an API key. Include your API key 
                    in the request header.
                  </p>
                  
                  <div className="bg-secondary-900 text-secondary-100 rounded-lg p-4 mb-4">
                    <pre className="text-sm">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.marketpulse.com/v1/markets/stocks`}
                    </pre>
                  </div>

                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">Rate Limits</h3>
                  <ul className="list-disc list-inside text-secondary-600 space-y-2">
                    <li>Free tier: 100 requests per hour</li>
                    <li>Pro tier: 1,000 requests per hour</li>
                    <li>Enterprise: Custom limits</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">API Endpoints</h2>
                <div className="space-y-4">
                  <div className="border border-secondary-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded">GET</span>
                      <code className="text-sm font-mono">/markets/stocks</code>
                    </div>
                    <p className="text-secondary-600 text-sm">Get real-time stock market data</p>
                  </div>
                  
                  <div className="border border-secondary-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded">GET</span>
                      <code className="text-sm font-mono">/news</code>
                    </div>
                    <p className="text-secondary-600 text-sm">Get market news and sentiment analysis</p>
                  </div>
                  
                  <div className="border border-secondary-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded">GET</span>
                      <code className="text-sm font-mono">/calendar/economic</code>
                    </div>
                    <p className="text-secondary-600 text-sm">Get economic calendar events</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Code Examples</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">JavaScript</h3>
                    <div className="bg-secondary-900 text-secondary-100 rounded-lg p-4">
                      <pre className="text-sm">
{`const response = await fetch('https://api.marketpulse.com/v1/markets/stocks', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Python</h3>
                    <div className="bg-secondary-900 text-secondary-100 rounded-lg p-4">
                      <pre className="text-sm">
{`import requests

headers = {'Authorization': 'Bearer YOUR_API_KEY'}
response = requests.get('https://api.marketpulse.com/v1/markets/stocks', headers=headers)
data = response.json()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <Code className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 mb-2">API Coming Soon</h3>
          <p className="text-primary-700 mb-4">
            We're building a comprehensive API for developers. Sign up to be notified when it's available.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Request Early Access
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiPage


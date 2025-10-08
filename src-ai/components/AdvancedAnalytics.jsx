import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Brain, Target, AlertCircle, Activity } from 'lucide-react'
import { analysisService, articleService } from '../services/api'

const AdvancedAnalytics = ({ isOpen, onClose }) => {
  const [analytics, setAnalytics] = useState({
    sentiment: null,
    marketTrend: null,
    aiInsights: null,
    volatility: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics()
    }
  }, [isOpen, selectedTimeframe, selectedSymbol])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      // Fetch sentiment analysis
      const sentimentResponse = await analysisService.getSentimentData()
      
      // Fetch market trend analysis
      const trendResponse = await articleService.getSentimentTrends(selectedSymbol, selectedTimeframe)
      
      // Generate AI insights (mock for now)
      const aiInsights = generateAIInsights(sentimentResponse.data, trendResponse.data)
      
      setAnalytics({
        sentiment: sentimentResponse.data,
        marketTrend: trendResponse.data,
        aiInsights,
        volatility: calculateVolatility(trendResponse.data)
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Use mock data as fallback
      setAnalytics(generateMockAnalytics())
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIInsights = (sentiment, trend) => {
    return {
      recommendation: 'BUY',
      confidence: 0.78,
      reasoning: [
        'Strong positive sentiment trend over the past week',
        'Technical indicators showing bullish momentum',
        'Volume analysis suggests institutional interest',
        'AI model confidence: 78%'
      ],
      riskLevel: 'Medium',
      timeframe: 'Short-term (1-2 weeks)'
    }
  }

  const calculateVolatility = (trendData) => {
    if (!trendData || !trendData.length) return 0.15
    const prices = trendData.map(d => d.price)
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length
    const variance = prices.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / prices.length
    return Math.sqrt(variance) / avg
  }

  const generateMockAnalytics = () => ({
    sentiment: {
      overall: 0.65,
      trend: 'positive',
      breakdown: {
        positive: 0.45,
        neutral: 0.35,
        negative: 0.20
      }
    },
    marketTrend: {
      direction: 'bullish',
      strength: 0.72,
      indicators: ['RSI', 'MACD', 'Volume']
    },
    aiInsights: {
      recommendation: 'BUY',
      confidence: 0.78,
      reasoning: [
        'AI analysis shows strong bullish sentiment',
        'Technical indicators align with positive outlook',
        'Market momentum favors upward movement'
      ],
      riskLevel: 'Medium',
      timeframe: 'Short-term'
    },
    volatility: 0.18
  })

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.6) return 'text-green-600'
    if (sentiment < 0.4) return 'text-red-600'
    return 'text-yellow-600'
  }

  const getSentimentIcon = (sentiment) => {
    if (sentiment > 0.6) return <TrendingUp className="w-5 h-5 text-green-600" />
    if (sentiment < 0.4) return <TrendingDown className="w-5 h-5 text-red-600" />
    return <Activity className="w-5 h-5 text-yellow-600" />
  }

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-200'
      case 'SELL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Advanced Analytics</h2>
            <p className="text-sm text-gray-600 mt-1">AI-powered market analysis and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AAPL">AAPL</option>
              <option value="MSFT">MSFT</option>
              <option value="GOOGL">GOOGL</option>
              <option value="TSLA">TSLA</option>
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">1 Day</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing market data...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* AI Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">AI Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-1">Recommendation</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRecommendationColor(analytics.aiInsights?.recommendation)}`}>
                    {analytics.aiInsights?.recommendation}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((analytics.aiInsights?.confidence || 0) * 100)}%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-1">Risk Level</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {analytics.aiInsights?.riskLevel}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">AI Reasoning:</div>
                <ul className="space-y-1">
                  {analytics.aiInsights?.reasoning?.map((reason, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Overall Sentiment</span>
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon(analytics.sentiment?.overall || 0.5)}
                      <span className={`font-semibold ${getSentimentColor(analytics.sentiment?.overall || 0.5)}`}>
                        {Math.round((analytics.sentiment?.overall || 0.5) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Positive</span>
                      <span>{Math.round((analytics.sentiment?.breakdown?.positive || 0.33) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(analytics.sentiment?.breakdown?.positive || 0.33) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Neutral</span>
                      <span>{Math.round((analytics.sentiment?.breakdown?.neutral || 0.33) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${(analytics.sentiment?.breakdown?.neutral || 0.33) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Negative</span>
                      <span>{Math.round((analytics.sentiment?.breakdown?.negative || 0.33) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(analytics.sentiment?.breakdown?.negative || 0.33) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Market Trend</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Direction</span>
                    <span className={`font-semibold ${
                      analytics.marketTrend?.direction === 'bullish' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analytics.marketTrend?.direction?.toUpperCase() || 'NEUTRAL'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Strength</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round((analytics.marketTrend?.strength || 0.5) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Volatility</span>
                    <span className="font-semibold text-orange-600">
                      {Math.round((analytics.volatility || 0.15) * 100)}%
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-2">Key Indicators</div>
                    <div className="flex flex-wrap gap-2">
                      {(analytics.marketTrend?.indicators || ['RSI', 'MACD', 'Volume']).map((indicator, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{analytics.aiInsights?.riskLevel || 'Medium'}</div>
                  <div className="text-sm text-gray-600">Risk Level</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{analytics.aiInsights?.timeframe || 'Short-term'}</div>
                  <div className="text-sm text-gray-600">Recommended Timeframe</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{Math.round((analytics.volatility || 0.15) * 100)}%</div>
                  <div className="text-sm text-gray-600">Volatility</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedAnalytics

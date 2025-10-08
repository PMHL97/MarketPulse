import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  RefreshCw,
  Zap,
  Target,
  BarChart3,
  DollarSign
} from 'lucide-react'

const AIMarketBrief = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Mock AI-generated market brief data
  const marketBrief = {
    summary: "Markets showing strong bullish momentum with tech leading gains. AI sector rally continues on strong earnings. VIX at low levels suggests continued risk appetite.",
    sentiment: "Bullish",
    confidence: 78,
    keyEvents: [
      {
        title: "NVIDIA Earnings Beat",
        impact: "Positive",
        description: "Strong AI chip demand drives 15% after-hours gain",
        time: "2 hours ago"
      },
      {
        title: "Fed Rate Decision",
        impact: "Neutral", 
        description: "Held rates steady, hints at potential cuts in Q2",
        time: "1 day ago"
      },
      {
        title: "Oil Price Stabilization",
        impact: "Positive",
        description: "Crude oil finds support at $75, easing inflation concerns",
        time: "3 hours ago"
      }
    ],
    sectorAnalysis: [
      { name: "Technology", change: "+2.8%", trend: "up", aiInsight: "AI stocks leading with strong fundamentals" },
      { name: "Healthcare", change: "+1.2%", trend: "up", aiInsight: "Biotech showing recovery signs" },
      { name: "Financials", change: "-0.5%", trend: "down", aiInsight: "Rate uncertainty weighing on banks" },
      { name: "Energy", change: "+0.8%", trend: "up", aiInsight: "Oil stabilization supporting sector" }
    ],
    aiRecommendations: [
      {
        type: "Buy",
        symbol: "NVDA",
        reason: "AI leadership position with strong earnings momentum",
        confidence: 85
      },
      {
        type: "Watch",
        symbol: "AAPL",
        reason: "Approaching resistance at $185, wait for breakout",
        confidence: 72
      },
      {
        type: "Avoid",
        symbol: "Banks",
        reason: "Rate uncertainty creating headwinds",
        confidence: 68
      }
    ],
    riskLevel: "Low-Medium",
    nextCatalyst: "Earnings season continues with MSFT, GOOGL reporting this week"
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 2000)
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish': return 'text-success-600 bg-success-100'
      case 'bearish': return 'text-danger-600 bg-danger-100'
      case 'neutral': return 'text-warning-600 bg-warning-100'
      default: return 'text-secondary-600 bg-secondary-100'
    }
  }

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'positive': return 'text-success-600'
      case 'negative': return 'text-danger-600'
      case 'neutral': return 'text-warning-600'
      default: return 'text-secondary-600'
    }
  }

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-success-600" /> : 
      <TrendingDown className="w-4 h-4 text-danger-600" />
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold">AI Market Brief</h3>
              <p className="text-sm opacity-90">Powered by advanced market analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="text-xs opacity-75">
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Market Summary */}
        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary-600" />
              <h4 className="font-semibold text-secondary-900">Market Summary</h4>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(marketBrief.sentiment)}`}>
              {marketBrief.sentiment} ({marketBrief.confidence}% confidence)
            </div>
          </div>
          <p className="text-secondary-700 leading-relaxed">{marketBrief.summary}</p>
        </div>

        {/* Key Events */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            <h4 className="font-semibold text-secondary-900">Key Events</h4>
          </div>
          <div className="space-y-3">
            {marketBrief.keyEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${getImpactColor(event.impact).replace('text-', 'bg-')}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-secondary-900">{event.title}</h5>
                    <span className="text-xs text-secondary-500">{event.time}</span>
                  </div>
                  <p className="text-sm text-secondary-600 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Analysis */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-secondary-900">Sector Analysis</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {marketBrief.sectorAnalysis.map((sector, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getTrendIcon(sector.trend)}
                  <div>
                    <div className="font-medium text-secondary-900">{sector.name}</div>
                    <div className="text-sm text-secondary-600">{sector.aiInsight}</div>
                  </div>
                </div>
                <div className={`font-semibold ${sector.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
                  {sector.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-success-600" />
            <h4 className="font-semibold text-secondary-900">AI Recommendations</h4>
          </div>
          <div className="space-y-3">
            {marketBrief.aiRecommendations.map((rec, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                rec.type === 'Buy' ? 'bg-success-50 border-success-500' :
                rec.type === 'Watch' ? 'bg-warning-50 border-warning-500' :
                'bg-danger-50 border-danger-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.type === 'Buy' ? 'bg-success-100 text-success-700' :
                      rec.type === 'Watch' ? 'bg-warning-100 text-warning-700' :
                      'bg-danger-100 text-danger-700'
                    }`}>
                      {rec.type}
                    </span>
                    <span className="font-medium text-secondary-900">{rec.symbol}</span>
                  </div>
                  <span className="text-xs text-secondary-500">{rec.confidence}% confidence</span>
                </div>
                <p className="text-sm text-secondary-600 mt-1">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-gradient-to-r from-warning-50 to-danger-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning-600" />
              <div>
                <h4 className="font-semibold text-secondary-900">Risk Assessment</h4>
                <p className="text-sm text-secondary-600">Current market risk level</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-warning-600">{marketBrief.riskLevel}</div>
              <div className="text-xs text-secondary-500">Moderate volatility expected</div>
            </div>
          </div>
        </div>

        {/* Next Catalyst */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-secondary-900">Next Catalyst</h4>
          </div>
          <p className="text-sm text-secondary-700">{marketBrief.nextCatalyst}</p>
        </div>
      </div>
    </div>
  )
}

export default AIMarketBrief


import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  BarChart3,
  PieChart,
  Zap,
  RefreshCw
} from 'lucide-react'

const AIPortfolioDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState('$1000 to $4000')

  // Mock AI portfolio data
  const portfolioData = {
    currentValue: 1250.75,
    initialValue: 1000.00,
    totalReturn: 25.08,
    dailyChange: 2.34,
    goalValue: 4000.00,
    progressToGoal: 31.27,
    timeToGoal: "18 months",
    riskLevel: "Medium",
    aiScore: 78,
    holdings: [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 2, price: 178.23, value: 356.46, change: 1.67, changePercent: 0.95, aiRating: 'Buy' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 1, price: 168.45, value: 168.45, change: 3.12, changePercent: 1.89, aiRating: 'Strong Buy' },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market', shares: 3, price: 245.67, value: 737.01, change: 0.89, changePercent: 0.36, aiRating: 'Hold' },
      { symbol: 'BND', name: 'Vanguard Total Bond Market', shares: 1, price: 78.45, value: 78.45, change: -0.23, changePercent: -0.29, aiRating: 'Hold' }
    ],
    aiInsights: [
      {
        type: 'success',
        title: 'Portfolio Performance',
        message: 'Your portfolio is outperforming the market by 8.2% this quarter',
        icon: TrendingUp
      },
      {
        type: 'warning',
        title: 'Rebalancing Needed',
        message: 'Consider reducing tech exposure and adding more bonds for diversification',
        icon: AlertTriangle
      },
      {
        type: 'info',
        title: 'AI Recommendation',
        message: 'Add 1 share of QQQ to increase tech diversification',
        icon: Brain
      }
    ],
    nextActions: [
      {
        action: 'Buy',
        symbol: 'QQQ',
        quantity: 1,
        reason: 'Increase tech diversification',
        confidence: 85,
        expectedReturn: '12-15%'
      },
      {
        action: 'Sell',
        symbol: 'AAPL',
        quantity: 0.5,
        reason: 'Take profits at resistance',
        confidence: 72,
        expectedReturn: 'Lock in 15% gains'
      }
    ],
    marketComparison: {
      sp500: 2.1,
      nasdaq: 3.2,
      portfolio: 2.34
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Strong Buy': return 'text-success-600 bg-success-100'
      case 'Buy': return 'text-success-600 bg-success-100'
      case 'Hold': return 'text-warning-600 bg-warning-100'
      case 'Sell': return 'text-danger-600 bg-danger-100'
      default: return 'text-secondary-600 bg-secondary-100'
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-success-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-warning-600" />
      case 'info': return <Brain className="w-5 h-5 text-primary-600" />
      default: return <BarChart3 className="w-5 h-5 text-secondary-600" />
    }
  }

  const getInsightBg = (type) => {
    switch (type) {
      case 'success': return 'bg-success-50 border-success-200'
      case 'warning': return 'bg-warning-50 border-warning-200'
      case 'info': return 'bg-primary-50 border-primary-200'
      default: return 'bg-secondary-50 border-secondary-200'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Portfolio Overview */}
      <div className="lg:col-span-2 space-y-6">
        {/* Portfolio Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <PieChart className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="text-xl font-bold text-secondary-900">AI Portfolio Dashboard</h3>
                <p className="text-sm text-secondary-600">Goal: {selectedGoal}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">${portfolioData.currentValue.toFixed(2)}</div>
              <div className="text-sm text-secondary-600">Current Value</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">+{portfolioData.totalReturn}%</div>
              <div className="text-sm text-secondary-600">Total Return</div>
            </div>
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <div className="text-2xl font-bold text-warning-600">{portfolioData.progressToGoal}%</div>
              <div className="text-sm text-secondary-600">Goal Progress</div>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-secondary-600">{portfolioData.aiScore}</div>
              <div className="text-sm text-secondary-600">AI Score</div>
            </div>
          </div>

          {/* Holdings */}
          <div>
            <h4 className="font-semibold text-secondary-900 mb-4">Holdings</h4>
            <div className="space-y-3">
              {portfolioData.holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-600">{holding.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-secondary-900">{holding.symbol}</div>
                      <div className="text-sm text-secondary-600">{holding.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-secondary-900">${holding.value.toFixed(2)}</div>
                    <div className={`text-sm ${holding.change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)} ({holding.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(holding.aiRating)}`}>
                    {holding.aiRating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-secondary-900">AI Insights</h4>
          </div>
          <div className="space-y-3">
            {portfolioData.aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getInsightBg(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h5 className="font-medium text-secondary-900">{insight.title}</h5>
                    <p className="text-sm text-secondary-600 mt-1">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Goal Progress */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-success-600" />
            <h4 className="font-semibold text-secondary-900">Goal Progress</h4>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to $4,000</span>
                <span>{portfolioData.progressToGoal}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${portfolioData.progressToGoal}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">{portfolioData.timeToGoal}</div>
              <div className="text-sm text-secondary-600">Estimated time to goal</div>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-warning-600" />
            <h4 className="font-semibold text-secondary-900">AI Recommendations</h4>
          </div>
          <div className="space-y-3">
            {portfolioData.nextActions.map((action, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    action.action === 'Buy' ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'
                  }`}>
                    {action.action}
                  </span>
                  <span className="text-xs text-secondary-500">{action.confidence}% confidence</span>
                </div>
                <div className="text-sm font-medium text-secondary-900">{action.symbol} ({action.quantity} shares)</div>
                <div className="text-xs text-secondary-600 mt-1">{action.reason}</div>
                <div className="text-xs text-primary-600 mt-1">Expected: {action.expectedReturn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Comparison */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-secondary-900">vs Market</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600">S&P 500</span>
              <span className={`text-sm font-medium ${portfolioData.marketComparison.sp500 >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {portfolioData.marketComparison.sp500 >= 0 ? '+' : ''}{portfolioData.marketComparison.sp500}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600">NASDAQ</span>
              <span className={`text-sm font-medium ${portfolioData.marketComparison.nasdaq >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {portfolioData.marketComparison.nasdaq >= 0 ? '+' : ''}{portfolioData.marketComparison.nasdaq}%
              </span>
            </div>
            <div className="flex justify-between border-t border-secondary-200 pt-2">
              <span className="text-sm font-medium text-secondary-900">Your Portfolio</span>
              <span className={`text-sm font-bold ${portfolioData.marketComparison.portfolio >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {portfolioData.marketComparison.portfolio >= 0 ? '+' : ''}{portfolioData.marketComparison.portfolio}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIPortfolioDashboard


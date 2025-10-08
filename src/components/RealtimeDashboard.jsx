import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw, Activity, DollarSign, BarChart3 } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'
import RealtimeTicker from './RealtimeTicker'

const RealtimeDashboard = () => {
  const { marketOverview, fetchMarketOverview, isLoading } = useMarketDataStore()
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  // Load initial data
  useEffect(() => {
    fetchMarketOverview()
  }, [fetchMarketOverview])

  // Set up real-time updates
  useEffect(() => {
    const interval = setInterval(async () => {
      setIsRefreshing(true)
      try {
        await fetchMarketOverview()
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Failed to update market data:', error)
      } finally {
        setIsRefreshing(false)
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [fetchMarketOverview])

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getChangeColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatPrice = (price) => {
    if (typeof price === 'string') return price
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`
    }
    return `$${price.toFixed(2)}`
  }

  const formatChange = (change, changePercent) => {
    if (typeof change === 'string') return change
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`
  }

  const getMarketSentiment = () => {
    if (!marketOverview?.indices) return 'neutral'
    
    const upCount = marketOverview.indices.filter(index => index.trend === 'up').length
    const totalCount = marketOverview.indices.length
    const upRatio = upCount / totalCount
    
    if (upRatio >= 0.7) return 'bullish'
    if (upRatio <= 0.3) return 'bearish'
    return 'neutral'
  }

  const sentiment = getMarketSentiment()
  const sentimentColor = {
    bullish: 'text-green-600 bg-green-50',
    bearish: 'text-red-600 bg-red-50',
    neutral: 'text-yellow-600 bg-yellow-50'
  }

  const sentimentIcon = {
    bullish: <TrendingUp className="w-5 h-5" />,
    bearish: <TrendingDown className="w-5 h-5" />,
    neutral: <Activity className="w-5 h-5" />
  }

  return (
    <div className="space-y-6">
      {/* Real-time ticker */}
      <RealtimeTicker />

      {/* Market overview header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Real-time Market Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">LIVE</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {isRefreshing && (
            <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
          )}
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Market sentiment */}
      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${sentimentColor[sentiment]}`}>
        {sentimentIcon[sentiment]}
        <span className="font-medium">
          Market Sentiment: {sentiment.toUpperCase()}
        </span>
      </div>

      {/* Key metrics */}
      {marketOverview && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Indices</p>
                <p className="text-2xl font-bold text-gray-900">{marketOverview.indices?.length || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {marketOverview.indices?.filter(i => i.trend === 'up').length || 0} up, {' '}
              {marketOverview.indices?.filter(i => i.trend === 'down').length || 0} down
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Crypto Assets</p>
                <p className="text-2xl font-bold text-gray-900">{marketOverview.crypto?.length || 0}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {marketOverview.crypto?.filter(c => c.trend === 'up').length || 0} up, {' '}
              {marketOverview.crypto?.filter(c => c.trend === 'down').length || 0} down
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commodities</p>
                <p className="text-2xl font-bold text-gray-900">{marketOverview.commodities?.length || 0}</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {marketOverview.commodities?.filter(c => c.trend === 'up').length || 0} up, {' '}
              {marketOverview.commodities?.filter(c => c.trend === 'down').length || 0} down
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forex Pairs</p>
                <p className="text-2xl font-bold text-gray-900">{marketOverview.forex?.length || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {marketOverview.forex?.filter(f => f.trend === 'up').length || 0} up, {' '}
              {marketOverview.forex?.filter(f => f.trend === 'down').length || 0} down
            </div>
          </div>
        </div>
      )}

      {/* Market data tables */}
      {marketOverview && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Major Indices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Indices</h3>
            <div className="space-y-3">
              {marketOverview.indices?.slice(0, 6).map((index, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(index.trend)}
                    <div>
                      <div className="font-medium text-gray-900">{index.name}</div>
                      <div className="text-sm text-gray-500">{index.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatPrice(index.price)}</div>
                    <div className={`text-sm font-medium ${getChangeColor(index.trend)}`}>
                      {formatChange(index.change, index.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptocurrency */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cryptocurrency</h3>
            <div className="space-y-3">
              {marketOverview.crypto?.slice(0, 6).map((crypto, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(crypto.trend)}
                    <div>
                      <div className="font-medium text-gray-900">{crypto.name}</div>
                      <div className="text-sm text-gray-500">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatPrice(crypto.price)}</div>
                    <div className={`text-sm font-medium ${getChangeColor(crypto.trend)}`}>
                      {formatChange(crypto.change, crypto.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 text-gray-500 animate-spin" />
          <span className="ml-2 text-gray-500">Loading market data...</span>
        </div>
      )}
    </div>
  )
}

export default RealtimeDashboard

import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'

const MarketBrief = () => {
  const { marketOverview, fetchRealtimeMarketData, isLoading } = useMarketDataStore()
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load initial data
  useEffect(() => {
    fetchRealtimeMarketData()
  }, [fetchRealtimeMarketData])

  // Set up real-time updates
  useEffect(() => {
    const interval = setInterval(async () => {
      setIsRefreshing(true)
      try {
        await fetchRealtimeMarketData()
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Failed to update market data:', error)
      } finally {
        setIsRefreshing(false)
      }
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [fetchRealtimeMarketData])

  // Calculate market sentiment
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
    bullish: 'text-green-600',
    bearish: 'text-red-600',
    neutral: 'text-yellow-600'
  }

  const sentimentIcon = {
    bullish: <TrendingUp className="w-4 h-4" />,
    bearish: <TrendingDown className="w-4 h-4" />,
    neutral: <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Market Brief</h3>
        <div className="flex items-center space-x-2">
          {isRefreshing && (
            <RefreshCw className="w-4 h-4 text-slate-500 animate-spin" />
          )}
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Market sentiment */}
        <div className="flex items-center space-x-2">
          {sentimentIcon[sentiment]}
          <span className={`font-medium ${sentimentColor[sentiment]}`}>
            Market sentiment: {sentiment.toUpperCase()}
          </span>
        </div>

        {/* Real-time data summary */}
        {marketOverview && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-500">Major Indices</div>
              <div className="font-medium">
                {marketOverview.indices?.filter(i => i.trend === 'up').length || 0} up, {' '}
                {marketOverview.indices?.filter(i => i.trend === 'down').length || 0} down
              </div>
            </div>
            <div>
              <div className="text-slate-500">Crypto</div>
              <div className="font-medium">
                {marketOverview.crypto?.filter(c => c.trend === 'up').length || 0} up, {' '}
                {marketOverview.crypto?.filter(c => c.trend === 'down').length || 0} down
              </div>
            </div>
          </div>
        )}

        {/* Market analysis */}
        <p className="text-slate-600">
          {sentiment === 'bullish' 
            ? 'Markets are showing strong bullish momentum with most indices in positive territory. Tech stocks continue to lead gains while traditional sectors show mixed performance.'
            : sentiment === 'bearish'
            ? 'Markets are experiencing bearish pressure with most indices in negative territory. Investors are showing caution amid economic uncertainty and market volatility.'
            : 'Markets are showing mixed signals with indices trading in both directions. AI-powered analysis suggests continued volatility as investors weigh various economic factors.'
          }
        </p>

        {/* Last updated */}
        {lastUpdated && (
          <div className="text-xs text-slate-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketBrief


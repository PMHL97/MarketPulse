import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'

const MarketSummary = () => {
  const { marketOverview, fetchMarketOverview, isLoading } = useMarketDataStore()
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

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
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [fetchMarketOverview])

  // Use real-time data or fallback to static data
  const marketData = marketOverview || {
    indices: [
      { name: 'Nasdaq 100', symbol: 'NDX', price: '15,234.56', change: '+1.23%', trend: 'up' },
      { name: 'Japan 225', symbol: 'NI225', price: '32,456.78', change: '-0.45%', trend: 'down' },
      { name: 'SSE Composite', symbol: '000001', price: '3,123.45', change: '+0.78%', trend: 'up' },
      { name: 'FTSE 100', symbol: 'UKX', price: '7,456.78', change: '+0.12%', trend: 'up' },
      { name: 'DAX', symbol: 'DAX', price: '15,678.90', change: '-0.23%', trend: 'down' },
      { name: 'CAC 40', symbol: 'PX1', price: '7,234.56', change: '+0.34%', trend: 'up' },
    ],
    crypto: [
      { name: 'Bitcoin', symbol: 'BTCUSD', price: '43,567.89', change: '+2.34%', trend: 'up' },
      { name: 'Ethereum', symbol: 'ETHUSD', price: '2,345.67', change: '+1.78%', trend: 'up' },
    ],
    commodities: [
      { name: 'WTI Crude Oil', symbol: 'CL1!', price: '78.90', change: '-1.23%', trend: 'down' },
      { name: 'Gas', symbol: 'NG1!', price: '2.34', change: '+0.45%', trend: 'up' },
      { name: 'Gold', symbol: 'GC1!', price: '1,987.65', change: '+0.67%', trend: 'up' },
      { name: 'Copper', symbol: 'HG1!', price: '3.45', change: '-0.12%', trend: 'down' },
    ],
    forex: [
      { name: 'U.S. Dollar', symbol: 'DXY', price: '102.34', change: '+0.23%', trend: 'up' },
    ]
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger" />
      default:
        return <Minus className="w-4 h-4 text-secondary-400" />
    }
  }

  const getChangeColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success'
      case 'down':
        return 'text-danger'
      default:
        return 'text-secondary-500'
    }
  }

  const MarketCard = ({ title, data, className = '' }) => (
    <div className={`rounded-[24px] bg-[#e9ecdf] border border-secondary-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0a3b4a]">{title}</h3>
        {isRefreshing && (
          <RefreshCw className="w-4 h-4 text-secondary-500 animate-spin" />
        )}
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-secondary-200/60 last:border-b-0">
            <div className="flex items-center space-x-3">
              {getTrendIcon(item.trend)}
              <div>
                <div className="font-medium text-[#0a3b4a]">{item.name}</div>
                <div className="text-sm text-secondary-700">{item.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-[#0a3b4a]">{item.price}</div>
              <div className={`text-sm font-medium ${getChangeColor(item.trend)}`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Real-time indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-secondary-600">
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Real-time data'}
          </span>
        </div>
        {isLoading && (
          <div className="text-sm text-secondary-500">Loading...</div>
        )}
      </div>
      
      {/* Market cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MarketCard title="Major Indices" data={marketData.indices} />
        <MarketCard title="Cryptocurrency" data={marketData.crypto} />
        <MarketCard title="Commodities" data={marketData.commodities} />
        <MarketCard title="Forex" data={marketData.forex} />
      </div>
    </div>
  )
}

export default MarketSummary

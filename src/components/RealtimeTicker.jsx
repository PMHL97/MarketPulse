import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'

const RealtimeTicker = () => {
  const { stockPrices, fetchStockPrice, subscribeToRealTimeUpdates } = useMarketDataStore()
  const [tickerData, setTickerData] = useState([])
  const [isScrolling, setIsScrolling] = useState(true)

  // Popular stocks to track
  const trackedStocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX', 'AMD', 'INTC']

  // Load initial data and set up subscriptions
  useEffect(() => {
    const loadInitialData = async () => {
      const promises = trackedStocks.map(async (symbol) => {
        try {
          const data = await fetchStockPrice(symbol)
          return { symbol, ...data }
        } catch (error) {
          console.error(`Failed to fetch ${symbol}:`, error)
          return null
        }
      })

      const results = await Promise.all(promises)
      const validResults = results.filter(Boolean)
      setTickerData(validResults)
    }

    loadInitialData()

    // Set up real-time subscriptions
    const unsubscribers = trackedStocks.map(symbol => 
      subscribeToRealTimeUpdates(symbol, (data) => {
        setTickerData(prev => {
          const updated = [...prev]
          const index = updated.findIndex(item => item.symbol === symbol)
          if (index !== -1) {
            updated[index] = { symbol, ...data }
          } else {
            updated.push({ symbol, ...data })
          }
          return updated
        })
      })
    )

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe())
    }
  }, [fetchStockPrice, subscribeToRealTimeUpdates])

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />
      default:
        return <Minus className="w-3 h-3 text-gray-500" />
    }
  }

  const getChangeColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`
    }
    return `$${price.toFixed(2)}`
  }

  const formatChange = (change, changePercent) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`
  }

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="flex items-center space-x-1 py-2">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 mr-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </div>
        
        <div 
          className={`flex space-x-8 ${isScrolling ? 'animate-scroll' : ''}`}
          onMouseEnter={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(true)}
        >
          {tickerData.map((stock, index) => (
            <div key={`${stock.symbol}-${index}`} className="flex items-center space-x-2 whitespace-nowrap">
              <span className="font-medium text-gray-900">{stock.symbol}</span>
              <span className="text-gray-700">{formatPrice(stock.price)}</span>
              <div className="flex items-center space-x-1">
                {getTrendIcon(stock.trend)}
                <span className={`text-sm ${getChangeColor(stock.trend)}`}>
                  {formatChange(stock.change, stock.changePercent)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default RealtimeTicker

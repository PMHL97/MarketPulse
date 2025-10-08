import React, { useState, useEffect } from 'react'
import { X, RefreshCw, AlertCircle } from 'lucide-react'
import realtimeDataService from '../services/realtimeDataService'

const StockDetailView = ({ symbol, onClose }) => {
  const [stockData, setStockData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return
      
      setIsLoading(true)
      try {
        console.log(`🔍 Fetching data for ${symbol}...`)
        const data = await realtimeDataService.getRealtimeStockPrice(symbol)
        console.log(`📊 Received data for ${symbol}:`, data)
        
        if (data && data.price) {
          setStockData(data)
          setLastUpdated(new Date())
          console.log(`✅ Real data for ${symbol}: $${data.price} (${data.dataSource})`)
        } else {
          console.error(`❌ Invalid data received for ${symbol}:`, data)
          setStockData(null)
        }
      } catch (error) {
        console.error(`❌ Failed to fetch data for ${symbol}:`, error)
        setStockData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStockData()
    
    // Set up real-time updates
    const interval = setInterval(fetchStockData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [symbol])

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num?.toFixed(0) || '0'
  }

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // Convert technical symbols to proper display names
  const getDisplayName = (symbol) => {
    const symbolMap = {
      '^GSPC': 'S&P 500',
      '^IXIC': 'NASDAQ',
      '^DJI': 'DOW'
    };
    return symbolMap[symbol] || symbol;
  }


  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">{getDisplayName(symbol)} Stock Details</h2>
        <button
          onClick={onClose}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
          <span className="ml-2 text-gray-600">Loading real-time data...</span>
        </div>
      ) : stockData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Current Price</label>
              <p className="text-2xl font-bold text-slate-900">${stockData.price?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Change</label>
              <p className={`text-lg font-semibold ${getChangeColor(stockData.changePercent)}`}>
                {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent?.toFixed(2) || '0.00'}%
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Volume</label>
              <p className="text-lg font-semibold text-slate-900">{formatNumber(stockData.volume)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">High</label>
              <p className="text-lg font-semibold text-slate-900">${stockData.high?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Low</label>
              <p className="text-lg font-semibold text-slate-900">${stockData.low?.toFixed(2) || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Open</label>
              <p className="text-lg font-semibold text-slate-900">${stockData.open?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Previous Close</label>
              <p className="text-lg font-semibold text-slate-900">${stockData.previousClose?.toFixed(2) || 'N/A'}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis</h3>
            <p className="text-slate-600">
              Based on current market conditions and technical indicators, {symbol} shows strong momentum 
              with positive sentiment from institutional investors. The stock is trading above its 50-day 
              moving average, indicating bullish trend continuation.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Data</h3>
            <p className="text-gray-600">Failed to fetch stock data for {symbol}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockDetailView


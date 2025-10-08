import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, RefreshCw } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'
import useWatchlistStore from '../store/watchlistStore'

const PortfolioTracker = ({ isOpen, onClose }) => {
  const { stockPrices, fetchStockPrice, subscribeToRealTimeUpdates, isLoading } = useMarketDataStore()
  const { watchlist } = useWatchlistStore()
  const [portfolio, setPortfolio] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)
  const [totalChangePercent, setTotalChangePercent] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock portfolio data (in real app, this would come from backend)
  const mockPortfolio = [
    { symbol: 'AAPL', shares: 10, avgPrice: 150.00, currentPrice: 0 }, // Will be updated with real data
    { symbol: 'MSFT', shares: 5, avgPrice: 300.00, currentPrice: 0 }, // Will be updated with real data
    { symbol: 'GOOGL', shares: 3, avgPrice: 120.00, currentPrice: 0 }, // Will be updated with real data
    { symbol: 'TSLA', shares: 2, avgPrice: 200.00, currentPrice: 0 }, // Will be updated with real data
  ]

  useEffect(() => {
    if (isOpen) {
      // Load portfolio data with real prices
      const loadPortfolioWithRealData = async () => {
        setIsRefreshing(true)
        try {
          const portfolioWithRealData = await Promise.all(
            mockPortfolio.map(async (holding) => {
              try {
                const realData = await fetchStockPrice(holding.symbol)
                return {
                  ...holding,
                  currentPrice: realData.price || holding.currentPrice,
                  realData: realData
                }
              } catch (error) {
                console.error(`Failed to fetch real data for ${holding.symbol}:`, error)
                return holding
              }
            })
          )
          
          setPortfolio(portfolioWithRealData)
          setLastUpdated(new Date())
        } catch (error) {
          console.error('Failed to load portfolio with real data:', error)
          setPortfolio(mockPortfolio)
        } finally {
          setIsRefreshing(false)
        }
      }
      
      loadPortfolioWithRealData()
    }
  }, [isOpen, fetchStockPrice])

  // Set up real-time subscriptions
  useEffect(() => {
    if (isOpen && portfolio.length > 0) {
      const unsubscribers = portfolio.map(holding => 
        subscribeToRealTimeUpdates(holding.symbol, (data) => {
          setLastUpdated(new Date())
        })
      )

      return () => {
        unsubscribers.forEach(unsubscribe => unsubscribe())
      }
    }
  }, [isOpen, portfolio, subscribeToRealTimeUpdates])

  useEffect(() => {
    if (portfolio.length > 0) {
      let total = 0
      let totalCost = 0
      
      portfolio.forEach(holding => {
        const currentPrice = stockPrices[holding.symbol]?.price || holding.currentPrice
        const value = holding.shares * currentPrice
        const cost = holding.shares * holding.avgPrice
        
        total += value
        totalCost += cost
      })
      
      const change = total - totalCost
      const changePercent = totalCost > 0 ? (change / totalCost) * 100 : 0
      
      setTotalValue(total)
      setTotalChange(change)
      setTotalChangePercent(changePercent)
    }
  }, [portfolio, stockPrices])

  const getPerformanceColor = (change) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getPerformanceIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return <div className="w-4 h-4" />
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Tracker</h2>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">LIVE</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Monitor your investments and performance</p>
            {lastUpdated && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isRefreshing && (
              <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
            )}
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

        {/* Portfolio Summary */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Value</p>
                  <p className="text-2xl font-bold text-blue-900">${totalValue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className={`rounded-xl p-4 ${totalChange >= 0 ? 'bg-gradient-to-r from-green-50 to-green-100' : 'bg-gradient-to-r from-red-50 to-red-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Total Change
                  </p>
                  <p className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
                  </p>
                </div>
                {getPerformanceIcon(totalChange)}
              </div>
            </div>
            
            <div className={`rounded-xl p-4 ${totalChangePercent >= 0 ? 'bg-gradient-to-r from-green-50 to-green-100' : 'bg-gradient-to-r from-red-50 to-red-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Total Return
                  </p>
                  <p className={`text-2xl font-bold ${totalChangePercent >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Symbol</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Shares</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Current Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">%</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((holding, index) => {
                  const currentPrice = stockPrices[holding.symbol]?.price || holding.currentPrice
                  const value = holding.shares * currentPrice
                  const cost = holding.shares * holding.avgPrice
                  const change = value - cost
                  const changePercent = cost > 0 ? (change / cost) * 100 : 0
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{holding.symbol}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{holding.shares}</td>
                      <td className="py-3 px-4 text-gray-700">${holding.avgPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-gray-700">${currentPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">${value.toFixed(2)}</td>
                      <td className={`py-3 px-4 font-semibold ${getPerformanceColor(change)}`}>
                        {change >= 0 ? '+' : ''}${change.toFixed(2)}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${getPerformanceColor(change)}`}>
                        {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Performance chart will be displayed here</p>
            <p className="text-sm text-gray-400 mt-2">Real-time portfolio analytics coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioTracker

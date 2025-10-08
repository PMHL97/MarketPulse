import React, { useState, useEffect } from 'react'
import useMarketDataStore from '../store/marketDataStore'

const AIPortfolioDashboard = () => {
  const { fetchStockPrice } = useMarketDataStore()
  const [portfolioValue, setPortfolioValue] = useState(12456.78)
  const [todayChange, setTodayChange] = useState(0)
  const [changePercent, setChangePercent] = useState(0)

  // Load real portfolio data
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        // Mock portfolio holdings
        const holdings = [
          { symbol: 'AAPL', shares: 10, avgPrice: 150.00 },
          { symbol: 'MSFT', shares: 5, avgPrice: 300.00 },
          { symbol: 'GOOGL', shares: 3, avgPrice: 120.00 },
          { symbol: 'TSLA', shares: 2, avgPrice: 200.00 }
        ]

        let totalValue = 0
        let totalCost = 0

        for (const holding of holdings) {
          try {
            const realData = await fetchStockPrice(holding.symbol)
            const currentPrice = realData.price || 0
            const value = holding.shares * currentPrice
            const cost = holding.shares * holding.avgPrice
            
            totalValue += value
            totalCost += cost
          } catch (error) {
            console.error(`Failed to fetch data for ${holding.symbol}:`, error)
          }
        }

        const change = totalValue - totalCost
        const changePercent = totalCost > 0 ? (change / totalCost) * 100 : 0

        setPortfolioValue(totalValue)
        setTodayChange(change)
        setChangePercent(changePercent)
      } catch (error) {
        console.error('Failed to load portfolio data:', error)
      }
    }

    loadPortfolioData()
  }, [fetchStockPrice])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">AI Portfolio Dashboard</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Portfolio Value</span>
          <span className="text-xl font-bold text-slate-900">${portfolioValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Today's Change</span>
          <span className={`text-lg font-semibold ${todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {todayChange >= 0 ? '+' : ''}${todayChange.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            AI recommends rebalancing your portfolio with 60% stocks, 30% bonds, and 10% crypto.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIPortfolioDashboard


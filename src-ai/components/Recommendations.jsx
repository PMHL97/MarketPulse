import React, { useState, useEffect } from 'react'
import useMarketDataStore from '../store/marketDataStore'

const actionToStyles = (action) => {
  const a = (action || '').toLowerCase()
  if (a === 'buy') return { badge: 'bg-green-100 text-green-700 border-green-200', text: 'text-green-700' }
  if (a === 'sell') return { badge: 'bg-red-100 text-red-700 border-red-200', text: 'text-red-700' }
  // default: wait/hold/neutral
  return { badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'text-yellow-700' }
}

const Recommendations = ({ onStockClick }) => {
  const { fetchStockPrice } = useMarketDataStore()
  const [picks, setPicks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 0, change: 0, action: 'Buy', note: 'Earnings resilience, services growth' }, // Will be updated with real data
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 0, change: 0, action: 'Buy', note: 'AI leadership, strong datacenter demand' }, // Will be updated with real data
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 0, change: 0, action: 'Wait', note: 'Great fundamentals; consider better entry' }, // Will be updated with real data
    { symbol: 'META', name: 'Meta Platforms', price: 0, change: 0, action: 'Sell', note: 'Headline/regulatory pressure near-term' }, // Will be updated with real data
  ])

  // Load real data for recommendations
  useEffect(() => {
    const loadRecommendationsWithRealData = async () => {
      try {
        const picksWithRealData = await Promise.all(
          picks.map(async (pick) => {
            try {
              const realData = await fetchStockPrice(pick.symbol)
              return {
                ...pick,
                price: realData.price || pick.price,
                change: realData.changePercent || pick.change
              }
            } catch (error) {
              console.error(`Failed to fetch real data for ${pick.symbol}:`, error)
              return pick
            }
          })
        )
        setPicks(picksWithRealData)
      } catch (error) {
        console.error('Failed to load recommendations with real data:', error)
      }
    }
    
    loadRecommendationsWithRealData()
  }, [fetchStockPrice])
  
  return (
    <div className="mb-4">
      {/* Description */}
      <div className="mb-3">
        <p className="text-sm text-secondary-700">Curated ideas with suggested actions. Tap a card to open details.</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {picks.map((stock, idx) => {
          const styles = actionToStyles(stock.action)
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              onClick={() => onStockClick && onStockClick(stock.symbol)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-900 text-base">{stock.symbol}</div>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full border ${styles.badge}`}>
                      {stock.action}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">{stock.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{stock.note}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 text-base">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm font-medium ${(stock.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(stock.change ?? 0) >= 0 ? '+' : ''}{Math.abs(stock.change ?? 0).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recommendations

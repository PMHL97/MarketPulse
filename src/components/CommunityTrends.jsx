import React from 'react'
import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react'

const CommunityTrends = () => {
  const trendingStocks = [
    { symbol: 'NVIDIA', name: 'NVIDIA Corporation', price: '168.45', change: '+2.34%', volume: '45.2M', sentiment: 'bullish' },
    { symbol: 'AAPL', name: 'Apple Inc', price: '178.23', change: '+1.67%', volume: '52.8M', sentiment: 'bullish' },
    { symbol: 'AMD', name: 'Advanced Micro Devices Inc', price: '89.67', change: '-0.45%', volume: '38.1M', sentiment: 'bearish' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '145.89', change: '+0.89%', volume: '41.3M', sentiment: 'bullish' },
    { symbol: 'ASML', name: 'ASML Holding N.V.', price: '234.56', change: '+1.23%', volume: '12.7M', sentiment: 'bullish' },
    { symbol: 'AVGO', name: 'Broadcom Inc.', price: '456.78', change: '-0.78%', volume: '8.9M', sentiment: 'bearish' },
    { symbol: 'COIN', name: 'Coinbase Global, Inc.', price: '67.89', change: '+3.45%', volume: '15.2M', sentiment: 'bullish' },
    { symbol: 'CRWD', name: 'CrowdStrike Holdings, Inc.', price: '123.45', change: '+2.12%', volume: '6.8M', sentiment: 'bullish' },
  ]

  const marketSentiment = {
    overall: 'bullish',
    score: 72,
    change: '+5',
    sectors: [
      { name: 'Technology', sentiment: 'bullish', score: 78 },
      { name: 'Healthcare', sentiment: 'neutral', score: 52 },
      { name: 'Financials', sentiment: 'bullish', score: 65 },
      { name: 'Energy', sentiment: 'bearish', score: 38 },
      { name: 'Consumer', sentiment: 'neutral', score: 48 },
    ]
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-success bg-success/10'
      case 'bearish':
        return 'text-danger bg-danger/10'
      default:
        return 'text-secondary-600 bg-secondary-100'
    }
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4" />
      case 'bearish':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <span className="w-4 h-4">—</span>
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Trending Stocks */}
      <div className="rounded-[24px] bg-[#e9ecdf] border border-secondary-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#0a3b4a]">Trending Stocks</h3>
          <div className="flex items-center space-x-2 text-sm text-secondary-500">
            <Activity className="w-4 h-4" />
            <span>Live</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {trendingStocks.map((stock, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-[#e0e4d4] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#0a3b4a] text-lg">{stock.symbol}</div>
                <div className="text-sm text-secondary-700 truncate">{stock.name}</div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white text-[#0a3b4a] border border-secondary-200 whitespace-nowrap">${stock.price}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${stock.change.startsWith('+') ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>{stock.change}</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white text-secondary-800 border border-secondary-200 whitespace-nowrap">Vol {stock.volume}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 whitespace-nowrap ${getSentimentColor(stock.sentiment)}`}>
                  {getSentimentIcon(stock.sentiment)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="rounded-[24px] bg-[#e9ecdf] border border-secondary-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#0a3b4a]">Market Sentiment</h3>
          <div className="flex items-center space-x-2 text-sm text-secondary-500">
            <Users className="w-4 h-4" />
            <span>Community</span>
          </div>
        </div>
        
        {/* Overall Sentiment */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-secondary-800">Overall Sentiment</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(marketSentiment.overall)}`}>
              {getSentimentIcon(marketSentiment.overall)}
              <span className="ml-1 capitalize">{marketSentiment.overall}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-[#0a3b4a]">{marketSentiment.score}</div>
            <div className="text-sm text-secondary-500">
              <span className="text-success">+{marketSentiment.change}</span> from yesterday
            </div>
          </div>
          
          {/* Sentiment Bar */}
          <div className="w-full bg-white rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-danger via-warning to-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${marketSentiment.score}%` }}
            ></div>
          </div>
        </div>
        
        {/* Sector Sentiment */}
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-3">Sector Sentiment</h4>
          <div className="space-y-3">
            {marketSentiment.sectors.map((sector, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-secondary-800">{sector.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-white rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        sector.sentiment === 'bullish' ? 'bg-success' : 
                        sector.sentiment === 'bearish' ? 'bg-danger' : 'bg-secondary-400'
                      }`}
                      style={{ width: `${sector.score}%` }}
                    ></div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(sector.sentiment)}`}>
                    {sector.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityTrends

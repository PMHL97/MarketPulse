import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Globe,
  Zap,
  Settings,
  RefreshCw,
  Eye,
  Star,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useWatchlistStore from '../store/watchlistStore'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const HeatmapsPage = () => {
  const [activeHeatmap, setActiveHeatmap] = useState('stocks')
  const [showFilters, setShowFilters] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [heatmapData, setHeatmapData] = useState([])
  const [filters, setFilters] = useState({
    marketCap: 'all',
    sector: 'all',
    timeframe: '1D'
  })
  
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInWatchlist, 
    fetchWatchlist 
  } = useWatchlistStore()

  // Load watchlist on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchWatchlist()
    }
  }, [isAuthenticated, fetchWatchlist])

  // Mock heatmap data
  const mockHeatmapData = {
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 178.23, change: 1.67, marketCap: '2.8T', sector: 'Technology' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.45, change: 2.34, marketCap: '2.8T', sector: 'Technology' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 145.67, change: -0.45, marketCap: '1.8T', sector: 'Technology' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 145.89, change: 0.89, marketCap: '1.5T', sector: 'Consumer' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: 234.56, change: 3.12, marketCap: '745B', sector: 'Automotive' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 168.45, change: 2.34, marketCap: '415B', sector: 'Technology' },
      { symbol: 'META', name: 'Meta Platforms, Inc.', price: 312.78, change: -1.23, marketCap: '790B', sector: 'Technology' },
      { symbol: 'NFLX', name: 'Netflix, Inc.', price: 456.32, change: 0.78, marketCap: '200B', sector: 'Entertainment' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 145.67, change: -0.89, marketCap: '425B', sector: 'Financials' },
      { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: 0.45, marketCap: '410B', sector: 'Healthcare' },
      { symbol: 'V', name: 'Visa Inc.', price: 234.56, change: 1.23, marketCap: '485B', sector: 'Financials' },
      { symbol: 'PG', name: 'Procter & Gamble', price: 145.89, change: -0.34, marketCap: '345B', sector: 'Consumer' }
    ],
    crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin', price: 43567.89, change: 2.34, marketCap: '852B', sector: 'Cryptocurrency' },
      { symbol: 'ETHUSD', name: 'Ethereum', price: 2345.67, change: 1.78, marketCap: '281B', sector: 'Cryptocurrency' },
      { symbol: 'BNBUSD', name: 'Binance Coin', price: 234.56, change: 0.89, marketCap: '35B', sector: 'Cryptocurrency' },
      { symbol: 'ADAUSD', name: 'Cardano', price: 0.456, change: -1.23, marketCap: '16B', sector: 'Cryptocurrency' },
      { symbol: 'SOLUSD', name: 'Solana', price: 98.45, change: 3.45, marketCap: '42B', sector: 'Cryptocurrency' },
      { symbol: 'DOTUSD', name: 'Polkadot', price: 6.78, change: -0.56, marketCap: '8.5B', sector: 'Cryptocurrency' },
      { symbol: 'MATICUSD', name: 'Polygon', price: 0.89, change: 2.12, marketCap: '8.2B', sector: 'Cryptocurrency' },
      { symbol: 'AVAXUSD', name: 'Avalanche', price: 23.45, change: -0.78, marketCap: '5.6B', sector: 'Cryptocurrency' }
    ],
    forex: [
      { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0876, change: 0.23, marketCap: 'Major', sector: 'Forex' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: 1.2654, change: -0.12, marketCap: 'Major', sector: 'Forex' },
      { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', price: 148.23, change: 0.45, marketCap: 'Major', sector: 'Forex' },
      { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', price: 0.6543, change: -0.34, marketCap: 'Major', sector: 'Forex' },
      { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', price: 1.3456, change: 0.12, marketCap: 'Major', sector: 'Forex' },
      { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', price: 0.6123, change: -0.23, marketCap: 'Major', sector: 'Forex' }
    ]
  }

  // Load heatmap data
  const loadHeatmapData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = mockHeatmapData[activeHeatmap] || []
      setHeatmapData(data)
    } catch (error) {
      console.error('Error loading heatmap data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when heatmap type changes
  useEffect(() => {
    loadHeatmapData()
  }, [activeHeatmap])

  // Handle watchlist toggle
  const handleWatchlistToggle = async (symbol) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    try {
      if (isInWatchlist(symbol)) {
        await removeFromWatchlist(symbol)
      } else {
        await addToWatchlist(symbol)
      }
    } catch (error) {
      console.error('Error updating watchlist:', error)
    }
  }

  // Handle view chart
  const handleViewChart = (symbol) => {
    navigate(`/charts?symbol=${symbol}`)
  }

  // Get color intensity based on change percentage
  const getColorIntensity = (change) => {
    const absChange = Math.abs(change)
    if (absChange < 0.5) return 'opacity-30'
    if (absChange < 1) return 'opacity-50'
    if (absChange < 2) return 'opacity-70'
    if (absChange < 5) return 'opacity-90'
    return 'opacity-100'
  }

  const heatmaps = [
    { id: 'stocks', name: 'Stock Heatmap', icon: TrendingUp, description: 'US stock market heatmap' },
    { id: 'crypto', name: 'Crypto Heatmap', icon: Zap, description: 'Cryptocurrency market heatmap' },
    { id: 'forex', name: 'Forex Heatmap', icon: Globe, description: 'Foreign exchange heatmap' },
    { id: 'sectors', name: 'Sector Heatmap', icon: BarChart3, description: 'Sector performance heatmap' }
  ]

  const timeframes = ['1H', '4H', '1D', '1W', '1M']
  const sectors = ['Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer', 'Automotive', 'Entertainment', 'Cryptocurrency', 'Forex']

  const HeatmapCard = ({ item }) => (
    <div 
      className={`relative rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        item.change >= 0 
          ? `bg-success ${getColorIntensity(item.change)}` 
          : `bg-danger ${getColorIntensity(item.change)}`
      }`}
      onClick={() => handleViewChart(item.symbol)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              handleWatchlistToggle(item.symbol)
            }}
            className={`transition-colors ${
              isInWatchlist(item.symbol) 
                ? 'text-warning hover:text-warning-600' 
                : 'text-white/70 hover:text-warning'
            }`}
            title={isInWatchlist(item.symbol) ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={`w-4 h-4 ${isInWatchlist(item.symbol) ? 'fill-current' : ''}`} />
          </button>
          <span className="font-mono font-bold text-white">{item.symbol}</span>
        </div>
        <div className="text-right">
          <div className="text-white font-semibold">
            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
          </div>
          <div className="text-white/90 text-sm">
            {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="text-white/80 text-sm">
        <div className="truncate">{item.name}</div>
        <div className="flex justify-between">
          <span>{item.sector}</span>
          <span>{item.marketCap}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Market Heatmaps</h1>
          <p className="text-secondary-600">Visualize market performance with interactive heatmaps</p>
        </div>

        {/* Heatmap Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <div className="flex space-x-1">
            {heatmaps.map((heatmap) => {
              const Icon = heatmap.icon
              return (
                <button
                  key={heatmap.id}
                  onClick={() => setActiveHeatmap(heatmap.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeHeatmap === heatmap.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{heatmap.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Timeframe</label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {timeframes.map(timeframe => (
                      <option key={timeframe} value={timeframe}>{timeframe}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => setFilters({...filters, sector: e.target.value})}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Sectors</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button 
                onClick={loadHeatmapData}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Market Cap</label>
                  <select
                    value={filters.marketCap}
                    onChange={(e) => setFilters({...filters, marketCap: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Market Caps</option>
                    <option value="mega">Mega Cap (1T+)</option>
                    <option value="large">Large Cap (10B+)</option>
                    <option value="mid">Mid Cap (2B-10B)</option>
                      <option value="small">Small Cap (&lt;2B)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="change">Change %</option>
                    <option value="volume">Volume</option>
                    <option value="marketCap">Market Cap</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">View</label>
                  <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                    <option value="compact">Compact View</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Heatmap Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {heatmaps.find(h => h.id === activeHeatmap)?.name} - {filters.timeframe}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-success rounded"></div>
                  <span className="text-secondary-600">Gainers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-danger rounded"></div>
                  <span className="text-secondary-600">Losers</span>
                </div>
              </div>
              <button className="p-2 text-secondary-400 hover:text-secondary-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-secondary-600">Loading heatmap data...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {heatmapData.map((item, index) => (
                <HeatmapCard key={index} item={item} />
              ))}
            </div>
          )}

          {/* Market Summary */}
          <div className="mt-8 pt-6 border-t border-secondary-200">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Market Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="text-success font-semibold">Gainers</div>
                <div className="text-2xl font-bold text-success">
                  {heatmapData.filter(item => item.change > 0).length}
                </div>
                <div className="text-sm text-secondary-600">
                  {heatmapData.length > 0 ? 
                    ((heatmapData.filter(item => item.change > 0).length / heatmapData.length) * 100).toFixed(1) + '%' 
                    : '0%'
                  } of market
                </div>
              </div>
              
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
                <div className="text-danger font-semibold">Losers</div>
                <div className="text-2xl font-bold text-danger">
                  {heatmapData.filter(item => item.change < 0).length}
                </div>
                <div className="text-sm text-secondary-600">
                  {heatmapData.length > 0 ? 
                    ((heatmapData.filter(item => item.change < 0).length / heatmapData.length) * 100).toFixed(1) + '%' 
                    : '0%'
                  } of market
                </div>
              </div>
              
              <div className="bg-secondary-100 border border-secondary-200 rounded-lg p-4">
                <div className="text-secondary-700 font-semibold">Neutral</div>
                <div className="text-2xl font-bold text-secondary-700">
                  {heatmapData.filter(item => item.change === 0).length}
                </div>
                <div className="text-sm text-secondary-600">
                  {heatmapData.length > 0 ? 
                    ((heatmapData.filter(item => item.change === 0).length / heatmapData.length) * 100).toFixed(1) + '%' 
                    : '0%'
                  } of market
                </div>
              </div>
              
              <div className="bg-primary-100 border border-primary-200 rounded-lg p-4">
                <div className="text-primary-700 font-semibold">Total</div>
                <div className="text-2xl font-bold text-primary-700">
                  {heatmapData.length}
                </div>
                <div className="text-sm text-secondary-600">
                  {activeHeatmap === 'stocks' ? 'stocks' : 
                   activeHeatmap === 'crypto' ? 'cryptocurrencies' : 
                   activeHeatmap === 'forex' ? 'currency pairs' : 'assets'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode="login"
        />
      )}
    </div>
  )
}

export default HeatmapsPage

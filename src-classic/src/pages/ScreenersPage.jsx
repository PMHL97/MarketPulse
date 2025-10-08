import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Eye,
  BarChart3,
  Globe,
  Zap,
  Settings,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Plus,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useWatchlistStore from '../store/watchlistStore'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'
import { marketDataService } from '../services/api'

const ScreenersPage = () => {
  const [activeScreener, setActiveScreener] = useState('stocks')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [screenerResults, setScreenerResults] = useState([])
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    marketCap: '',
    volume: '',
    change: [-10, 10],
    sector: '',
    exchange: ''
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

  // Mock screener data
  const mockScreenerData = {
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 178.23, change: 1.67, volume: '52.8M', marketCap: '2.8T', sector: 'Technology', exchange: 'NASDAQ' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.45, change: 2.34, volume: '28.9M', marketCap: '2.8T', sector: 'Technology', exchange: 'NASDAQ' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 145.67, change: -0.45, volume: '31.2M', marketCap: '1.8T', sector: 'Technology', exchange: 'NASDAQ' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 145.89, change: 0.89, volume: '41.3M', marketCap: '1.5T', sector: 'Consumer', exchange: 'NASDAQ' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: 234.56, change: 3.12, volume: '89.7M', marketCap: '745B', sector: 'Automotive', exchange: 'NASDAQ' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 168.45, change: 2.34, volume: '45.2M', marketCap: '415B', sector: 'Technology', exchange: 'NASDAQ' },
      { symbol: 'META', name: 'Meta Platforms, Inc.', price: 312.78, change: -1.23, volume: '22.1M', marketCap: '790B', sector: 'Technology', exchange: 'NASDAQ' },
      { symbol: 'NFLX', name: 'Netflix, Inc.', price: 456.32, change: 0.78, volume: '3.2M', marketCap: '200B', sector: 'Entertainment', exchange: 'NASDAQ' }
    ],
    crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin', price: 43567.89, change: 2.34, volume: '28.5B', marketCap: '852B', sector: 'Cryptocurrency', exchange: 'Crypto' },
      { symbol: 'ETHUSD', name: 'Ethereum', price: 2345.67, change: 1.78, volume: '15.2B', marketCap: '281B', sector: 'Cryptocurrency', exchange: 'Crypto' },
      { symbol: 'BNBUSD', name: 'Binance Coin', price: 234.56, change: 0.89, volume: '2.1B', marketCap: '35B', sector: 'Cryptocurrency', exchange: 'Crypto' },
      { symbol: 'ADAUSD', name: 'Cardano', price: 0.456, change: -1.23, volume: '890M', marketCap: '16B', sector: 'Cryptocurrency', exchange: 'Crypto' },
      { symbol: 'SOLUSD', name: 'Solana', price: 98.45, change: 3.45, volume: '1.2B', marketCap: '42B', sector: 'Cryptocurrency', exchange: 'Crypto' },
      { symbol: 'DOTUSD', name: 'Polkadot', price: 6.78, change: -0.56, volume: '234M', marketCap: '8.5B', sector: 'Cryptocurrency', exchange: 'Crypto' }
    ]
  }

  // Apply filters to screener data
  const applyFilters = (data) => {
    return data.filter(item => {
      const matchesSearch = !searchTerm || 
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      const matchesChange = item.change >= filters.change[0] && item.change <= filters.change[1]
      const matchesSector = !filters.sector || item.sector === filters.sector
      const matchesExchange = !filters.exchange || item.exchange === filters.exchange
      
      return matchesSearch && matchesPrice && matchesChange && matchesSector && matchesExchange
    })
  }

  // Load screener results
  const loadScreenerResults = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = mockScreenerData[activeScreener] || []
      const filteredData = applyFilters(data)
      setScreenerResults(filteredData)
    } catch (error) {
      console.error('Error loading screener results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load results when screener or filters change
  useEffect(() => {
    loadScreenerResults()
  }, [activeScreener, searchTerm, filters])

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

  const screeners = [
    { id: 'stocks', name: 'Stock Screener', icon: TrendingUp, description: 'Screen US stocks by various criteria' },
    { id: 'crypto', name: 'Crypto Screener', icon: Zap, description: 'Screen cryptocurrencies by market data' },
    { id: 'forex', name: 'Forex Screener', icon: Globe, description: 'Screen forex pairs and currencies' },
    { id: 'etf', name: 'ETF Screener', icon: BarChart3, description: 'Screen exchange-traded funds' }
  ]

  const sectors = ['Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer', 'Automotive', 'Entertainment', 'Cryptocurrency']
  const exchanges = ['NASDAQ', 'NYSE', 'Crypto', 'OTC']

  const ScreenerCard = ({ item }) => (
    <div className="bg-white rounded-lg border border-secondary-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleWatchlistToggle(item.symbol)}
            className={`transition-colors ${
              isInWatchlist(item.symbol) 
                ? 'text-warning hover:text-warning-600' 
                : 'text-secondary-400 hover:text-warning'
            }`}
            title={isInWatchlist(item.symbol) ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={`w-4 h-4 ${isInWatchlist(item.symbol) ? 'fill-current' : ''}`} />
          </button>
          <div>
            <div className="font-mono font-semibold text-secondary-900">{item.symbol}</div>
            <div className="text-sm text-secondary-600">{item.name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-secondary-900">
            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
          </div>
          <div className={`text-sm font-medium ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-secondary-600 mb-3">
        <div>
          <span className="text-secondary-500">Volume:</span> {item.volume}
        </div>
        <div>
          <span className="text-secondary-500">Market Cap:</span> {item.marketCap}
        </div>
        <div>
          <span className="text-secondary-500">Sector:</span> {item.sector}
        </div>
        <div>
          <span className="text-secondary-500">Exchange:</span> {item.exchange}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewChart(item.symbol)}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="View chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleViewChart(item.symbol)}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View Details →
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Screeners</h1>
          <p className="text-secondary-600">Screen stocks, crypto, and other assets by various criteria</p>
        </div>

        {/* Screener Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <div className="flex space-x-1">
            {screeners.map((screener) => {
              const Icon = screener.icon
              return (
                <button
                  key={screener.id}
                  onClick={() => setActiveScreener(screener.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeScreener === screener.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{screener.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search symbols or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button 
                onClick={loadScreenerResults}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({...filters, priceRange: [parseFloat(e.target.value) || 0, filters.priceRange[1]]})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseFloat(e.target.value) || 1000]})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Change Range (%)</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.change[0]}
                      onChange={(e) => setFilters({...filters, change: [parseFloat(e.target.value) || -10, filters.change[1]]})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.change[1]}
                      onChange={(e) => setFilters({...filters, change: [filters.change[0], parseFloat(e.target.value) || 10]})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => setFilters({...filters, sector: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Sectors</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Exchange</label>
                  <select
                    value={filters.exchange}
                    onChange={(e) => setFilters({...filters, exchange: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Exchanges</option>
                    {exchanges.map(exchange => (
                      <option key={exchange} value={exchange}>{exchange}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 1000],
                    marketCap: '',
                    volume: '',
                    change: [-10, 10],
                    sector: '',
                    exchange: ''
                  })}
                  className="px-4 py-2 text-sm text-secondary-600 hover:text-secondary-800"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {screeners.find(s => s.id === activeScreener)?.name} Results
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600">
                {screenerResults.length} results
              </span>
              <button className="p-2 text-secondary-400 hover:text-secondary-600">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-secondary-600">Loading screener results...</p>
              </div>
            </div>
          ) : screenerResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {screenerResults.map((item, index) => (
                <ScreenerCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-secondary-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No results found</h3>
              <p className="text-secondary-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
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

export default ScreenersPage


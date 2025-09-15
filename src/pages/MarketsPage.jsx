import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Eye,
  Plus,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useWatchlistStore from '../store/watchlistStore'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const MarketsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [filters, setFilters] = useState({
    sector: '',
    priceRange: [0, 1000],
    changeRange: [-10, 10]
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

  // Filter data based on search term and filters
  useEffect(() => {
    const filtered = {}
    Object.keys(marketData).forEach(key => {
      filtered[key] = marketData[key].filter(item => {
        const matchesSearch = item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSector = !filters.sector || item.sector === filters.sector
        const price = parseFloat(item.price.replace(/[$,]/g, ''))
        const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1]
        const change = parseFloat(item.change.replace(/[+%]/g, ''))
        const matchesChange = change >= filters.changeRange[0] && change <= filters.changeRange[1]
        
        return matchesSearch && matchesSector && matchesPrice && matchesChange
      })
    })
    setFilteredData(filtered)
  }, [searchTerm, filters])

  // Handle watchlist toggle
  const handleToggleWatchlist = async (symbol) => {
    if (!isAuthenticated) {
      // Show login modal or redirect to login
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

  // Handle add to portfolio
  const handleAddToPortfolio = (symbol) => {
    if (!isAuthenticated) {
      // Show login modal or redirect to login
      setShowAuthModal(true)
      return
    }

    // This would open a portfolio management modal
    // For now, we'll show a simple confirmation
    const confirmed = window.confirm(`Add ${symbol} to your portfolio?`)
    if (confirmed) {
      // TODO: Implement portfolio management API call
      console.log('Adding to portfolio:', symbol)
      // Show success message
      alert(`${symbol} added to portfolio successfully!`)
    }
  }

  const marketData = {
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: '178.23', change: '+1.67%', volume: '52.8M', marketCap: '2.8T', sector: 'Technology' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: '378.45', change: '+2.34%', volume: '28.9M', marketCap: '2.8T', sector: 'Technology' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '145.67', change: '-0.45%', volume: '31.2M', marketCap: '1.8T', sector: 'Technology' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '145.89', change: '+0.89%', volume: '41.3M', marketCap: '1.5T', sector: 'Consumer' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: '234.56', change: '+3.12%', volume: '89.7M', marketCap: '745B', sector: 'Automotive' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '168.45', change: '+2.34%', volume: '45.2M', marketCap: '415B', sector: 'Technology' },
    ],
    forex: [
      { symbol: 'EURUSD', name: 'Euro / US Dollar', price: '1.0876', change: '+0.23%', volume: 'High', spread: '0.0001' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: '1.2654', change: '-0.12%', volume: 'High', spread: '0.0002' },
      { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', price: '148.23', change: '+0.45%', volume: 'High', spread: '0.001' },
      { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', price: '0.6543', change: '-0.34%', volume: 'Medium', spread: '0.0003' },
    ],
    crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin', price: '43,567.89', change: '+2.34%', volume: '28.5B', marketCap: '852B' },
      { symbol: 'ETHUSD', name: 'Ethereum', price: '2,345.67', change: '+1.78%', volume: '15.2B', marketCap: '281B' },
      { symbol: 'BNBUSD', name: 'Binance Coin', price: '234.56', change: '+0.89%', volume: '2.1B', marketCap: '35B' },
      { symbol: 'ADAUSD', name: 'Cardano', price: '0.456', change: '-1.23%', volume: '890M', marketCap: '16B' },
    ],
    commodities: [
      { symbol: 'GC1!', name: 'Gold Futures', price: '1,987.65', change: '+0.67%', volume: 'High', contract: 'Feb 2025' },
      { symbol: 'CL1!', name: 'WTI Crude Oil', price: '78.90', change: '-1.23%', volume: 'High', contract: 'Feb 2025' },
      { symbol: 'NG1!', name: 'Natural Gas', price: '2.34', change: '+0.45%', volume: 'Medium', contract: 'Feb 2025' },
      { symbol: 'HG1!', name: 'Copper', price: '3.45', change: '-0.12%', volume: 'Medium', contract: 'Mar 2025' },
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Market Overview', icon: BarChart3 },
    { id: 'stocks', name: 'Stocks', icon: TrendingUp },
    { id: 'forex', name: 'Forex', icon: Globe },
    { id: 'crypto', name: 'Crypto', icon: Zap },
    { id: 'commodities', name: 'Commodities', icon: TrendingUp },
  ]

  const MarketTable = ({ data, type }) => {
    const getChangeColor = (change) => {
      return change.startsWith('+') ? 'text-success' : 'text-danger'
    }

    const getChangeIcon = (change) => {
      return change.startsWith('+') ? 
        <TrendingUp className="w-4 h-4 text-success" /> : 
        <TrendingDown className="w-4 h-4 text-danger" />
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Volume
                </th>
                {type === 'stocks' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                )}
                {type === 'stocks' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Sector
                  </th>
                )}
                <th className="px-6 py-3 text-center text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleToggleWatchlist(item.symbol)}
                        className={`transition-colors ${
                          isInWatchlist(item.symbol) 
                            ? 'text-warning hover:text-warning-600' 
                            : 'text-secondary-400 hover:text-warning'
                        }`}
                        title={isInWatchlist(item.symbol) ? 'Remove from watchlist' : 'Add to watchlist'}
                      >
                        <Star className={`w-4 h-4 ${isInWatchlist(item.symbol) ? 'fill-current' : ''}`} />
                      </button>
                      <span className="font-mono font-medium text-secondary-900">{item.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-semibold text-secondary-900">
                      {type === 'forex' ? item.price : `$${item.price}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end space-x-1 text-sm font-medium ${getChangeColor(item.change)}`}>
                      {getChangeIcon(item.change)}
                      <span>{item.change}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-secondary-600">{item.volume}</div>
                  </td>
                  {type === 'stocks' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-secondary-600">{item.marketCap}</div>
                    </td>
                  )}
                  {type === 'stocks' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-secondary-600">{item.sector}</div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleViewChart(item.symbol)}
                        className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                        title="View chart"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewChart(item.symbol)}
                        className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                        title="Open chart"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAddToPortfolio(item.symbol)}
                        className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                        title="Add to portfolio"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Markets</h1>
          <p className="text-secondary-600">Track global markets, stocks, forex, crypto, and commodities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search symbols, companies, or markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Sector</label>
                <select
                  value={filters.sector}
                  onChange={(e) => setFilters({...filters, sector: e.target.value})}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financials">Financials</option>
                  <option value="Energy">Energy</option>
                  <option value="Consumer">Consumer</option>
                </select>
              </div>
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
                    value={filters.changeRange[0]}
                    onChange={(e) => setFilters({...filters, changeRange: [parseFloat(e.target.value) || -10, filters.changeRange[1]]})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.changeRange[1]}
                    onChange={(e) => setFilters({...filters, changeRange: [filters.changeRange[0], parseFloat(e.target.value) || 10]})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setFilters({sector: '', priceRange: [0, 1000], changeRange: [-10, 10]})}
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

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Market Overview</h2>
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-600">Global Market Cap</span>
                      <span className="font-semibold">$95.2T</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-600">24h Volume</span>
                      <span className="font-semibold">$2.1T</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-600">Active Markets</span>
                      <span className="font-semibold">150+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-600">Trading Pairs</span>
                      <span className="font-semibold">10,000+</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors text-left">
                    <BarChart3 className="w-8 h-8 text-primary-600 mb-2" />
                    <div className="font-medium text-primary-900">Create Chart</div>
                    <div className="text-sm text-primary-600">Start analyzing</div>
                  </button>
                  <button className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg hover:bg-secondary-100 transition-colors text-left">
                    <Star className="w-8 h-8 text-secondary-600 mb-2" />
                    <div className="font-medium text-secondary-900">Watchlist</div>
                    <div className="text-sm text-secondary-600">Manage symbols</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stocks' && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">US Stocks</h2>
              <MarketTable data={filteredData.stocks || []} type="stocks" />
            </div>
          )}

          {activeTab === 'forex' && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Forex Pairs</h2>
              <MarketTable data={filteredData.forex || []} type="forex" />
            </div>
          )}

          {activeTab === 'crypto' && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Cryptocurrencies</h2>
              <MarketTable data={filteredData.crypto || []} type="crypto" />
            </div>
          )}

          {activeTab === 'commodities' && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Commodities</h2>
              <MarketTable data={filteredData.commodities || []} type="commodities" />
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

export default MarketsPage

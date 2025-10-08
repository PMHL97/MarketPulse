import React, { useState } from 'react'
import { X, Plus, Search } from 'lucide-react'

const AddRegionModal = ({ isOpen, onClose, onAddRegion, onAddToWatchlist, onAddToCategory }) => {
  const [modalType, setModalType] = useState('region') // 'region', 'stock', 'category'
  const [regionName, setRegionName] = useState('')
  const [regionSymbols, setRegionSymbols] = useState('')
  const [stockSymbol, setStockSymbol] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('US')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const categories = ['US', 'Currencies', 'Crypto', 'Europe', 'Asia']
  
  // Mock search results for demonstration
  const mockSearchResults = [
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'US' },
    { symbol: 'TSLA', name: 'Tesla Inc.', category: 'US' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', category: 'US' },
    { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto' },
    { symbol: 'ETH', name: 'Ethereum', category: 'Crypto' },
    { symbol: 'EUR/USD', name: 'Euro/USD', category: 'Currencies' },
    { symbol: 'GBP/USD', name: 'Pound/USD', category: 'Currencies' },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', category: 'US' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', category: 'US' }
  ]

  const handleSearch = (query) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }
    
    const filtered = mockSearchResults.filter(item => 
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered.slice(0, 5))
  }

  const handleSubmit = () => {
    if (modalType === 'region') {
      if (regionName && regionSymbols) {
        const symbols = regionSymbols.split(',').map(s => s.trim().toUpperCase())
        onAddRegion({ name: regionName, symbols })
        resetForm()
        onClose()
      }
    } else if (modalType === 'stock') {
      if (stockSymbol) {
        onAddToWatchlist(stockSymbol.toUpperCase())
        resetForm()
        onClose()
      }
    } else if (modalType === 'category') {
      if (stockSymbol && selectedCategory) {
        onAddToCategory(stockSymbol.toUpperCase(), selectedCategory)
        resetForm()
        onClose()
      }
    }
  }

  const resetForm = () => {
    setRegionName('')
    setRegionSymbols('')
    setStockSymbol('')
    setSearchQuery('')
    setSearchResults([])
    setModalType('region')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {modalType === 'region' && 'Add Custom Region'}
            {modalType === 'stock' && 'Add to Watchlist'}
            {modalType === 'category' && 'Add to Category'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Type Selector */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setModalType('region')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                modalType === 'region'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Custom Region
            </button>
            <button
              onClick={() => setModalType('stock')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                modalType === 'stock'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Add Stock
            </button>
            <button
              onClick={() => setModalType('category')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                modalType === 'category'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Add to Category
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {modalType === 'region' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Name
                </label>
                <input
                  type="text"
                  value={regionName}
                  onChange={(e) => setRegionName(e.target.value)}
                  placeholder="e.g., Tech Stocks, Energy Sector"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Symbols (comma-separated)
                </label>
                <input
                  type="text"
                  value={regionSymbols}
                  onChange={(e) => setRegionSymbols(e.target.value)}
                  placeholder="e.g., AAPL, TSLA, NVDA, MSFT"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {modalType === 'stock' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Symbol
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={stockSymbol}
                  onChange={(e) => {
                    setStockSymbol(e.target.value)
                    handleSearch(e.target.value)
                  }}
                  placeholder="e.g., AAPL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setStockSymbol(result.symbol)
                        setSearchResults([])
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{result.symbol}</div>
                      <div className="text-sm text-gray-500">{result.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {modalType === 'category' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Symbol
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={stockSymbol}
                    onChange={(e) => {
                      setStockSymbol(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    placeholder="e.g., AAPL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setStockSymbol(result.symbol)
                          setSearchResults([])
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{result.symbol}</div>
                        <div className="text-sm text-gray-500">{result.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddRegionModal

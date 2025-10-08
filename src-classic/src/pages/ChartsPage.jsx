import React, { useState, useRef, useEffect } from 'react'
import { 
  BarChart3, 
  Search, 
  Bot,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  Bookmark,
  Download,
  Share2
} from 'lucide-react'
import { createChart } from 'lightweight-charts'
import useWatchlistStore from '../store/watchlistStore'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'
import AIChartAssistant from '../components/AIChartAssistant'

const ChartsPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [timeframe, setTimeframe] = useState('1D')
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showAIChartAssistant, setShowAIChartAssistant] = useState(false)

  const chartContainerRef = useRef()
  const chart = useRef()
  const candlestickSeries = useRef()
  
  const { isAuthenticated } = useAuthStore()
  const { 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInWatchlist, 
    fetchWatchlist 
  } = useWatchlistStore()

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M']

  // Generate mock chart data
  const generateMockData = (symbol, timeframe) => {
    const data = []
    const now = Date.now()
    const interval = timeframe === '1D' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000
    const basePrice = 150 + Math.random() * 100
    
    for (let i = 100; i >= 0; i--) {
      const time = now - (i * interval)
      const open = basePrice + (Math.random() - 0.5) * 10
      const close = open + (Math.random() - 0.5) * 8
      const high = Math.max(open, close) + Math.random() * 5
      const low = Math.min(open, close) - Math.random() * 5
      const volume = Math.floor(Math.random() * 1000000) + 100000
      
      data.push({
        time: Math.floor(time / 1000),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: volume
      })
    }
    
    return data
  }

  // Initialize chart
  useEffect(() => {
    if (chartContainerRef.current && !chart.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#000000',
        },
        grid: {
          vertLines: { visible: true },
          horzLines: { visible: true },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
        },
      })

      candlestickSeries.current = chart.current.addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
      })

      loadChartData()
    }

    return () => {
      if (chart.current) {
        chart.current.remove()
        chart.current = null
      }
    }
  }, [])

  // Load chart data
  const loadChartData = async () => {
    setIsLoading(true)
    try {
      const data = generateMockData(selectedSymbol, timeframe)
      setChartData(data)
      
      if (candlestickSeries.current) {
        candlestickSeries.current.setData(data)
      }
    } catch (error) {
      console.error('Error loading chart data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle symbol search
  const handleSymbolSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Mock search results
    const mockResults = [
      { symbol: 'AAPL', name: 'Apple Inc', type: 'Stock' },
      { symbol: 'GOOGL', name: 'Alphabet Inc', type: 'Stock' },
      { symbol: 'MSFT', name: 'Microsoft Corp', type: 'Stock' },
      { symbol: 'TSLA', name: 'Tesla Inc', type: 'Stock' },
      { symbol: 'NVDA', name: 'NVIDIA Corp', type: 'Stock' },
    ].filter(item => 
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults(mockResults.slice(0, 5))
    setShowSearchResults(true)
  }

  // Handle symbol selection
  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol)
    setShowSearchResults(false)
    setSearchResults([])
  }

  // Handle watchlist toggle
  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    try {
      if (isInWatchlist(selectedSymbol)) {
        await removeFromWatchlist(selectedSymbol)
      } else {
        await addToWatchlist(selectedSymbol)
      }
    } catch (error) {
      console.error('Error updating watchlist:', error)
    }
  }

  // Update chart when symbol or timeframe changes
  useEffect(() => {
    if (chart.current) {
      loadChartData()
    }
  }, [selectedSymbol, timeframe])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chart.current && chartContainerRef.current) {
        chart.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest('.search-container')) {
        setShowSearchResults(false)
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSearchResults])

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Chart Toolbar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          {/* Left side - Symbol and Timeframe */}
          <div className="flex items-center space-x-4">
            <div className="relative search-container">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={selectedSymbol}
                  onChange={(e) => {
                    setSelectedSymbol(e.target.value)
                    handleSymbolSearch(e.target.value)
                  }}
                  className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search symbol..."
                />
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSymbolSelect(result.symbol)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">{result.symbol}</div>
                          <div className="text-sm text-slate-500">{result.name}</div>
                        </div>
                        <div className="text-xs text-slate-400">{result.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-lg transition-colors ${
                isInWatchlist(selectedSymbol)
                  ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={isInWatchlist(selectedSymbol) ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <Bookmark className={`w-4 h-4 ${isInWatchlist(selectedSymbol) ? 'fill-current' : ''}`} />
            </button>
            
            {/* AI Chart Assistant Button */}
            <button 
              onClick={() => setShowAIChartAssistant(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">Ask AI</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Chart Area */}
      <div className="flex-1 p-6">
        <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-slate-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <div ref={chartContainerRef} className="h-full w-full" />
          )}
        </div>
      </div>

      {/* AI Chart Assistant Modal */}
      {showAIChartAssistant && (
        <AIChartAssistant
          isOpen={showAIChartAssistant}
          onClose={() => setShowAIChartAssistant(false)}
          symbol={selectedSymbol}
          timeframe={timeframe}
          chartData={chartData}
        />
      )}

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

export default ChartsPage
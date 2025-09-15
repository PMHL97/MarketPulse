import React, { useState, useRef, useEffect, useMemo } from 'react'
import { 
  BarChart3, 
  Search, 
  Settings, 
  Layers, 
  MousePointer,
  Type,
  Minus,
  Plus,
  Download,
  Share2,
  Bookmark,
  TrendingUp,
  TrendingDown,
  Activity,
  Grid,
  Calendar,
  Clock,
  Zap
} from 'lucide-react'
import { createChart } from 'lightweight-charts'
import { marketDataService } from '../services/api'
import useWatchlistStore from '../store/watchlistStore'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const ChartsPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [timeframe, setTimeframe] = useState('1D')
  const [activeTool, setActiveTool] = useState('select')
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [chartStyle, setChartStyle] = useState('candlestick')
  const [chartTheme, setChartTheme] = useState('light')
  const [showGrid, setShowGrid] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  const chartContainerRef = useRef()
  const chart = useRef()
  const candlestickSeries = useRef()
  const lineSeries = useRef()
  
  const { isAuthenticated } = useAuthStore()
  const { 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInWatchlist, 
    fetchWatchlist 
  } = useWatchlistStore()

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M']
  const drawingTools = [
    { id: 'select', name: 'Select', icon: MousePointer },
    { id: 'line', name: 'Line', icon: Minus },
    { id: 'horizontal', name: 'Horizontal', icon: Minus },
    { id: 'vertical', name: 'Vertical', icon: Minus },
    { id: 'fibonacci', name: 'Fibonacci', icon: TrendingUp },
    { id: 'text', name: 'Text', icon: Type },
  ]

  const indicators = [
    { name: 'Moving Average', category: 'Trend', enabled: false },
    { name: 'RSI', category: 'Momentum', enabled: false },
    { name: 'MACD', category: 'Momentum', enabled: false },
    { name: 'Bollinger Bands', category: 'Volatility', enabled: false },
    { name: 'Stochastic', category: 'Momentum', enabled: false },
    { name: 'Volume', category: 'Volume', enabled: true },
    { name: 'ATR', category: 'Volatility', enabled: false },
    { name: 'Williams %R', category: 'Momentum', enabled: false },
  ]

  // Generate mock chart data
  const generateMockData = (symbol, timeframe) => {
    const data = []
    const now = Date.now()
    const interval = timeframe === '1D' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 1 day or 1 hour
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
        height: 400,
        layout: {
          background: { color: chartTheme === 'dark' ? '#1a1a1a' : '#ffffff' },
          textColor: chartTheme === 'dark' ? '#ffffff' : '#000000',
        },
        grid: {
          vertLines: { visible: showGrid },
          horzLines: { visible: showGrid },
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

      // Add candlestick series
      candlestickSeries.current = chart.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })

      // Add line series for moving averages
      lineSeries.current = chart.current.addLineSeries({
        color: '#2196F3',
        lineWidth: 2,
        priceFormat: {
          type: 'price',
          precision: 2,
          minMove: 0.01,
        },
      })

      // Add volume series
      const volumeSeries = chart.current.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })

      // Load initial data
      loadChartData()
    }

    return () => {
      if (chart.current) {
        chart.current.remove()
        chart.current = null
      }
    }
  }, [])

  // Load watchlist on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchWatchlist()
    }
  }, [isAuthenticated, fetchWatchlist])

  // Load chart data
  const loadChartData = async () => {
    setIsLoading(true)
    try {
      // Try to fetch real data first
      let data
      try {
        data = await marketDataService.getHistoricalData(selectedSymbol, timeframe)
        if (!data || data.length === 0) {
          throw new Error('No real data available')
        }
      } catch (error) {
        console.log('Using mock data for', selectedSymbol)
        data = generateMockData(selectedSymbol, timeframe)
      }
      
      setChartData(data)
      
      if (candlestickSeries.current) {
        candlestickSeries.current.setData(data)
      }
      
      // Add moving average
      const maData = data.map((item, index) => {
        if (index < 20) return null
        const sum = data.slice(index - 19, index + 1).reduce((acc, d) => acc + d.close, 0)
        return {
          time: item.time,
          value: sum / 20
        }
      }).filter(Boolean)
      
      if (lineSeries.current) {
        lineSeries.current.setData(maData)
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

    try {
      const results = await marketDataService.searchSymbols(query)
      setSearchResults(results.slice(0, 10)) // Limit to 10 results
      setShowSearchResults(true)
    } catch (error) {
      console.error('Error searching symbols:', error)
      setSearchResults([])
    }
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

  // Update chart theme
  useEffect(() => {
    if (chart.current) {
      chart.current.applyOptions({
        layout: {
          background: { color: chartTheme === 'dark' ? '#1a1a1a' : '#ffffff' },
          textColor: chartTheme === 'dark' ? '#ffffff' : '#000000',
        },
        grid: {
          vertLines: { visible: showGrid },
          horzLines: { visible: showGrid },
        },
      })
    }
  }, [chartTheme, showGrid])

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

  const ChartToolbar = () => (
    <div className="bg-white border-b border-secondary-200 p-4">
      <div className="flex items-center justify-between">
        {/* Left side - Symbol and Timeframe */}
        <div className="flex items-center space-x-4">
          <div className="relative search-container">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-secondary-400" />
              <input
                type="text"
                value={selectedSymbol}
                onChange={(e) => {
                  setSelectedSymbol(e.target.value)
                  handleSymbolSearch(e.target.value)
                }}
                className="w-32 px-3 py-1 border border-secondary-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Search symbol..."
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-secondary-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSymbolSelect(result.symbol)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary-50 border-b border-secondary-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-secondary-900">{result.symbol}</div>
                        <div className="text-sm text-secondary-500">{result.name}</div>
                      </div>
                      <div className="text-xs text-secondary-400">{result.type}</div>
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
                className={`px-3 py-1 text-xs rounded ${
                  timeframe === tf
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Tools and Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleWatchlistToggle}
            className={`p-2 rounded transition-colors ${
              isInWatchlist(selectedSymbol)
                ? 'text-warning bg-warning/10 hover:bg-warning/20'
                : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
            }`}
            title={isInWatchlist(selectedSymbol) ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Bookmark className={`w-4 h-4 ${isInWatchlist(selectedSymbol) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )

  const DrawingToolbar = () => (
    <div className="bg-white border-b border-secondary-200 p-3">
      <div className="flex items-center space-x-2">
        {drawingTools.map((tool) => {
          const Icon = tool.icon
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-2 rounded ${
                activeTool === tool.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
              }`}
              title={tool.name}
            >
              <Icon className="w-4 h-4" />
            </button>
          )
        })}
      </div>
    </div>
  )

  const ChartArea = () => (
    <div className="flex-1 bg-white p-4">
      <div className="h-full rounded-lg border border-secondary-200 relative">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-secondary-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-sm">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <div ref={chartContainerRef} className="h-full w-full" />
        )}
      </div>
    </div>
  )

  const Sidebar = () => (
    <div className="w-80 bg-white border-l border-secondary-200">
      {/* Indicators Panel */}
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-secondary-900">Indicators</h3>
          <button className="p-1 text-secondary-400 hover:text-secondary-600">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-2">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-secondary-50 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={indicator.enabled}
                  onChange={() => {
                    const newIndicators = [...indicators]
                    newIndicators[index].enabled = !newIndicators[index].enabled
                    // Update indicators state here
                  }}
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <div className="text-sm font-medium text-secondary-900">{indicator.name}</div>
                  <div className="text-xs text-secondary-500">{indicator.category}</div>
                </div>
              </div>
              <button className="p-1 text-secondary-400 hover:text-secondary-600">
                <Settings className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Settings */}
      <div className="p-4 border-b border-secondary-200">
        <h3 className="font-medium text-secondary-900 mb-3">Chart Settings</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-secondary-600 uppercase tracking-wider">Style</label>
            <select 
              value={chartStyle}
              onChange={(e) => setChartStyle(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-secondary-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="candlestick">Candlestick</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bars">Bars</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs text-secondary-600 uppercase tracking-wider">Theme</label>
            <select 
              value={chartTheme}
              onChange={(e) => setChartTheme(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-secondary-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs text-secondary-600 uppercase tracking-wider">Grid</label>
            <div className="flex items-center space-x-2 mt-1">
              <button 
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded ${showGrid ? 'bg-primary-100 text-primary-700' : 'text-secondary-400 hover:text-secondary-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-secondary-600 rounded">
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time & Sales */}
      <div className="p-4">
        <h3 className="font-medium text-secondary-900 mb-3">Time & Sales</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-600">Last Price</span>
            <span className="font-medium text-success">
              ${chartData.length > 0 ? chartData[chartData.length - 1].close.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-600">Change</span>
            <span className="font-medium text-success">
              {chartData.length > 1 ? 
                `+$${((chartData[chartData.length - 1].close - chartData[chartData.length - 2].close)).toFixed(2)} (+${(((chartData[chartData.length - 1].close - chartData[chartData.length - 2].close) / chartData[chartData.length - 2].close) * 100).toFixed(2)}%)` 
                : '+$0.00 (+0.00%)'
              }
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-600">Volume</span>
            <span className="font-medium">
              {chartData.length > 0 ? (chartData[chartData.length - 1].volume / 1000000).toFixed(1) + 'M' : '0M'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-600">Symbol</span>
            <span className="font-medium">{selectedSymbol}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-secondary-50 flex flex-col">
      {/* Chart Toolbar */}
      <ChartToolbar />
      
      {/* Drawing Toolbar */}
      <DrawingToolbar />
      
      {/* Main Chart Area */}
      <div className="flex-1 flex">
        <ChartArea />
        <Sidebar />
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

export default ChartsPage

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatPanel from '../components/AIChatPanel'
import StockDetailView from '../components/StockDetailView'
import { getMarketIndices, getMarketMovers, getAllStockSymbols, getStockData } from '../data/mockStockData'
import { Link } from 'react-router-dom'
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  ArrowRight,
  Brain,
  Zap,
  Calendar,
  BarChart
} from 'lucide-react'
import MarketBrief from '../components/MarketBrief'
import AIPortfolioDashboard from '../components/AIPortfolioDashboard'
import Recommendations from '../components/Recommendations'

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('US')
  const [selectedStock, setSelectedStock] = useState(null) // Track selected stock for detail view
  
  // Handle stock selection - no navigation needed
  const handleStockClick = (symbol) => {
    setSelectedStock(symbol);
  };

  const handleCloseStockDetail = () => {
    setSelectedStock(null);
  };

  // Listen for stock clicks from chat messages
  useEffect(() => {
    const handleStockClick = (event) => {
      setSelectedStock(event.detail.symbol);
    };

    window.addEventListener('stock-click', handleStockClick);
    return () => window.removeEventListener('stock-click', handleStockClick);
  }, []);

  const regionTabs = ['US', 'Europe', 'Asia', 'Currencies', 'Crypto', 'Watchlist']

  // Simple watchlist state (frontend-only prototype)
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'NVDA'])
  const [newSymbol, setNewSymbol] = useState('')
  // Search panel state
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [dynamicSuggestions, setDynamicSuggestions] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const searchRef = useRef(null)

  const normalizeSymbol = (s) => s.trim().toUpperCase().replace(/[^A-Z0-9.]/g, '')
  const handleAddSymbol = () => {
    const sym = normalizeSymbol(newSymbol)
    if (!sym) return
    if (!watchlist.includes(sym)) setWatchlist([...watchlist, sym])
    setNewSymbol('')
  }
  const handleRemoveSymbol = (sym) => {
    setWatchlist(watchlist.filter(s => s !== sym))
  }

  // Mock generator for watchlist metrics
  const symbolToIndex = (symbol) => {
    const seed = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const trend = seed % 2 === 0 ? 'up' : 'down'
    const base = 50 + (seed % 300)
    const changeAbs = (seed % 200) / 10 // 0.0 - 19.9
    const percent = (changeAbs / base) * 100
    const value = (base + (trend === 'up' ? changeAbs : -changeAbs)).toFixed(2)
    const change = `${trend === 'up' ? '+' : '-'}${changeAbs.toFixed(2)}`
    const pctStr = `${trend === 'up' ? '+' : '-'}${percent.toFixed(2)}%`
    return { name: symbol, value: value, change: change, percent: pctStr, trend }
  }

  // Simple sparkline helpers (mocked for prototype)
  const getSparkValues = (trend) => {
    if (trend === 'up') {
      return [18, 16, 17, 15, 16, 17, 16, 18, 19, 17, 20]
    }
    return [18, 17, 16, 17, 15, 14, 15, 14, 13, 14, 13]
  }

  const buildPath = (values, width, height, padding = 2) => {
    const w = width - padding * 2
    const h = height - padding * 2
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    const stepX = w / (values.length - 1)
    const points = values.map((v, i) => {
      const x = padding + i * stepX
      const y = padding + h - ((v - min) / range) * h
      return [x, y]
    })
    const d = points.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')
    return { d, points }
  }

  // Close search panel when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const generateAdaptiveSuggestions = (input) => {
    const lowerInput = input.toLowerCase().trim()
    
    // Generate suggestions based on any letter input
    const allSuggestions = {
      All: [
        "What's going on with the markets today?",
        "Analyze AAPL stock",
        "Compare MSFT vs GOOGL",
        "SPY market analysis"
      ],
      Analyze: [
        "Analyze AAPL stock",
        "Analyze TSLA technical indicators", 
        "Analyze NVDA earnings",
        "Analyze market trends",
        "Analyze tech stocks",
        "Analyze S&P 500 performance",
        "Analyze NASDAQ outlook",
        "Analyze market volatility"
      ],
      Compare: [
        "Compare AAPL vs MSFT",
        "Compare TSLA vs NVDA", 
        "Compare tech stocks",
        "Compare S&P 500 vs NASDAQ",
        "Compare AMD vs INTC",
        "Compare GOOGL vs META",
        "Compare SPY vs QQQ",
        "Compare growth vs value stocks"
      ],
      Chart: [
        "Show AAPL chart",
        "TSLA technical indicators",
        "NVDA chart patterns",
        "Market technical analysis",
        "AAPL candlestick chart",
        "TSLA volume analysis",
        "NVDA support resistance",
        "Market trend lines"
      ],
      Earnings: [
        "AAPL earnings report",
        "TSLA financial analysis",
        "NVDA earnings forecast",
        "Market earnings summary",
        "MSFT earnings expectations",
        "GOOGL revenue analysis",
        "META earnings growth",
        "Tech sector earnings"
      ]
    }
    
    // Get suggestions based on selected filter
    const categorySuggestions = allSuggestions[selectedFilter] || allSuggestions.All
    
    // If input is empty or very short, show category suggestions
    if (lowerInput.length < 2) {
      return categorySuggestions.slice(0, 4)
    }
    
    // Filter suggestions based on input
    const filteredSuggestions = categorySuggestions.filter(suggestion => {
      const suggestionLower = suggestion.toLowerCase()
      
      // First priority: suggestions that start with the input
      if (suggestionLower.startsWith(lowerInput)) {
        return true
      }
      
      // Second priority: suggestions that contain the input as a word
      if (suggestionLower.includes(lowerInput)) {
        return true
      }
      
      // Third priority: suggestions that contain any of the input letters
      return lowerInput.split('').some(letter => suggestionLower.includes(letter))
    })
    
    // Sort by relevance (exact matches first, then partial matches)
    const sortedSuggestions = filteredSuggestions.sort((a, b) => {
      const aLower = a.toLowerCase()
      const bLower = b.toLowerCase()
      
      // Prioritize suggestions that start with input
      if (aLower.startsWith(lowerInput) && !bLower.startsWith(lowerInput)) return -1
      if (!aLower.startsWith(lowerInput) && bLower.startsWith(lowerInput)) return 1
      
      // Then prioritize suggestions that contain the input
      if (aLower.includes(lowerInput) && !bLower.includes(lowerInput)) return -1
      if (!aLower.includes(lowerInput) && bLower.includes(lowerInput)) return 1
      
      return 0
    })
    
    // Return top 4 suggestions
    return sortedSuggestions.length > 0 ? sortedSuggestions.slice(0, 4) : [
      "What's going on with the markets today?",
      "Analyze AAPL stock", 
      "Compare MSFT vs GOOGL",
      "SPY market analysis"
    ]
  }

  // Get market data from centralized mock data
  const indicesByRegion = getMarketIndices();
  indicesByRegion.Watchlist = []; // Add empty watchlist
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom CSS for flowing ring animation */}
      <style>{`
        @keyframes flowing-ring {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes flowing-ring-inner {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .flowing-ring {
          background-size: 200% 200%;
          animation: flowing-ring 3s ease-in-out infinite;
        }
        
        .flowing-ring-inner {
          background-size: 200% 200%;
          animation: flowing-ring-inner 2s ease-in-out infinite;
        }
      `}</style>
      {/* Top Navigation Tabs */}
      {/* removed top nav; filters moved above index cards */}

      {/* Main Content Area */}
      <div className="flex h-screen flex-row-reverse">
        {/* Left Panel - Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-6 pb-24 space-y-6">
            {selectedStock ? (
              <StockDetailView symbol={selectedStock} onClose={handleCloseStockDetail} />
            ) : (
              <>
            {/* Region Filters (Pills) */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mt-1">
              {regionTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedRegion(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap h-8 ${
                    tab === selectedRegion
                      ? 'bg-gray-100 text-green-700 border-gray-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  aria-pressed={tab === selectedRegion}
                >
                  {tab === 'Watchlist' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  ) : (
                    tab
                  )}
                </button>
              ))}
            </div>

            {/* Watchlist editor (visible only when Watchlist selected) */}
            {selectedRegion === 'Watchlist' && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={newSymbol}
                      onChange={(e) => setNewSymbol(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddSymbol() }}
                      placeholder="Add symbol (e.g., AAPL)"
                      className="px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddSymbol}
                      className="px-3 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {watchlist.map(sym => (
                      <span key={sym} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                        {sym}
                        <button onClick={() => handleRemoveSymbol(sym)} className="text-gray-500 hover:text-gray-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Market Indexes */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {(selectedRegion === 'Watchlist' ? watchlist.map(symbolToIndex) : indicesByRegion[selectedRegion]).map((index) => (
                <div 
                  key={index.name} 
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0 w-48 min-w-[12rem]"
                  onClick={() => handleStockClick(index.name.replace(/\s+/g, '').toUpperCase())}
                >
                  {/* Title and value */}
                  <div className="text-sm font-semibold text-slate-900 mb-1 leading-snug">{index.name}</div>
                  <div className="text-[13px] text-slate-600 leading-tight">
                    <div className="font-semibold text-slate-800">{index.value}</div>
                    <div className="text-slate-500">({index.change})</div>
                  </div>

                  {/* Percent change prominent */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className={`text-xl font-bold ${index.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{index.percent}</div>
                    <div className={`${index.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} w-6 h-6 rounded-full flex items-center justify-center`}>
                      {index.trend === 'up' ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v9.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 016.707 11.293L9 13.586V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 17a1 1 0 01-1-1V6.414L6.707 8.707a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 01-1 1z" clipRule="evenodd"/></svg>
                      )}
                    </div>
                  </div>

                  {/* Sparkline area */}
                  <div className="mt-2 h-10 relative overflow-hidden rounded-xl">
                    <svg viewBox="0 0 120 48" width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`${index.name.replace(/\s+/g, '-')}-grad`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={index.trend === 'up' ? '#22c55e' : '#ef4444'} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={index.trend === 'up' ? '#22c55e' : '#ef4444'} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {(() => {
                        const vals = getSparkValues(index.trend)
                        const { d, points } = buildPath(vals, 120, 48, 2)
                        const areaPath = `${d} L 118,46 L 2,46 Z`
                        return (
                          <g>
                            <path d={areaPath} fill={`url(#${index.name.replace(/\s+/g, '-')}-grad)`} />
                            <path d={d} fill="none" stroke={index.trend === 'up' ? '#16a34a' : '#dc2626'} strokeWidth="2" strokeLinecap="round" />
                          </g>
                        )
                      })()}
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* News Stories Grid */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Latest Updates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  time: '28m ago', 
                  source: 'CNBC', 
                  headline: 'What you missed in markets Tuesday',
                  author: 'Sean Conlon and Pia Singh',
                  image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&crop=center',
                  logo: 'CNBC'
                },
                { 
                  time: '28m ago', 
                  source: 'Yahoo Finance', 
                  headline: 'A compromise on Affordable Care Act subsidies could end the shutdown. The question is when.',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop&crop=center',
                  logo: 'Yahoo Finance'
                },
                { 
                  time: '28m ago', 
                  source: 'Business Insider', 
                  headline: 'Consumers are spending like there\'s no tomorrow. It may not be enough to stop a recession.',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
                  logo: 'Business Insider'
                },
                { 
                  time: '28m ago', 
                  source: 'Politico', 
                  headline: 'Chicago journalists, protesters sue Trump administration, alleging "extreme brutality"',
                  author: 'Faith Wardwell',
                  image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=200&fit=crop&crop=center',
                  logo: 'Politico'
                },
                { 
                  time: '28m ago', 
                  source: 'The Wall Street Journal', 
                  headline: 'U.S. warehouse vacancies steady as demand rises with less new space',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=200&fit=crop&crop=center',
                  logo: 'WSJ'
                },
                { 
                  time: '28m ago', 
                  source: 'The Washington Post', 
                  headline: 'Americans have become more pessimistic about AI. Why?',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&crop=center',
                  logo: 'WaPo'
                }
              ].map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.headline}
                      className="w-full h-full object-cover"
                    />
                    {/* Source logo overlay */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-800">
                      {story.logo}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-2 line-clamp-3">
                      {story.headline}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{story.time}</span>
                      {story.author && <span>· {story.author}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <button className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span>Show more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Market Movers */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Market Movers</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Most Active */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900">Most Active</h3>
                </div>
                <div className="p-4 space-y-3">
                  {getMarketMovers().mostActive.map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer transition-colors"
                      onClick={() => handleStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{stock.symbol}</span>
                          <span className="text-xs text-gray-600">{stock.name}</span>
                        </div>
                        <div className="text-sm text-gray-700">{stock.price}</div>
                      </div>
                      <div className={`text-sm font-semibold flex items-center ${stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.trend === 'up' ? (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Gainers */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900">Daily Gainers</h3>
                </div>
                <div className="p-4 space-y-3">
                  {getMarketMovers().dailyGainers.map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer transition-colors"
                      onClick={() => handleStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{stock.symbol}</span>
                          <span className="text-xs text-gray-600">{stock.name}</span>
                        </div>
                        <div className="text-sm text-gray-700">{stock.price}</div>
                      </div>
                      <div className={`text-sm font-semibold flex items-center ${stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.trend === 'up' ? (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Losers */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900">Daily Losers</h3>
                </div>
                <div className="p-4 space-y-3">
                  {getMarketMovers().dailyLosers.map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer transition-colors"
                      onClick={() => handleStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{stock.symbol}</span>
                          <span className="text-xs text-gray-600">{stock.name}</span>
                        </div>
                        <div className="text-sm text-gray-700">{stock.price}</div>
                      </div>
                      <div className={`text-sm font-semibold flex items-center ${stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.trend === 'up' ? (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trading Recommendations moved into chat panel */}
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="w-1/3 min-w-[20rem] max-w-[35rem] bg-white border-l border-gray-200 flex flex-col">
          <div className="flex-1 overflow-hidden no-scrollbar">
            <AIChatPanel onStockClick={handleStockClick} onHomeClick={handleCloseStockDetail} />
          </div>
        </div>
      </div>

      {/* Bottom Search Bar acts as Chat Input */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50" ref={searchRef}>
        <div className="relative">
          {/* Flowing Ring Animation - As chatbox border */}
          <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-blue-500 flowing-ring">
            <div className="absolute inset-0.5 rounded-[2rem] bg-white"></div>
          </div>
          <div className="relative rounded-[2rem] w-[36rem] max-w-[90vw] bg-white overflow-hidden transition-all">
          {/* Suggestions content (visible when open) */}
          {isSearchOpen && (
            <div>
              <div className="px-5 pt-4 pb-3">
                <div className="text-sm font-semibold text-gray-700">Trending questions</div>
                <div className="mt-3 space-y-2">
                  {(dynamicSuggestions.length > 0 ? dynamicSuggestions : [
                    "What's going on with the markets today?",
                    "Analyze AAPL stock",
                    "Compare MSFT vs GOOGL",
                    "SPY market analysis"
                  ]).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        // Check if question contains a stock symbol
                        const stockSymbols = getAllStockSymbols();
                        const foundSymbol = stockSymbols.find(symbol => 
                          q.toUpperCase().includes(symbol)
                        );
                        
                        if (foundSymbol) {
                          // Show stock detail view
                          handleStockClick(foundSymbol);
                        } else {
                          // Regular chat interaction
                          window.dispatchEvent(new CustomEvent('mp-chat-submit', { detail: { text: q } }))
                        }
                        setIsSearchOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-3">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Analyze', 'Compare', 'Chart', 'Earnings'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedFilter(c)
                        // Regenerate suggestions with new filter
                        const suggestions = generateAdaptiveSuggestions(searchText)
                        setDynamicSuggestions(suggestions)
                      }}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap h-8 ${
                        c === selectedFilter
                          ? 'bg-gray-100 text-green-700 border-gray-300'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200" />
            </div>
          )}
          {/* Input row (always visible, same width) */}
          <div className="px-4 py-2">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={searchText}
              onChange={(e) => {
                const input = e.target.value
                setSearchText(input)
                
                // Generate adaptive suggestions based on input
                const suggestions = generateAdaptiveSuggestions(input)
                setDynamicSuggestions(suggestions)
              }}
              onFocus={() => setIsSearchOpen(true)}
              type="text"
              placeholder="Search for stocks, advices and more"
              className="flex-1 text-sm px-2 py-2 outline-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const text = searchText
                  if (text && text.trim()) {
                    window.dispatchEvent(new CustomEvent('mp-chat-submit', { detail: { text } }))
                    setSearchText('')
                    setIsSearchOpen(false)
                  }
                }
              }}
            />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
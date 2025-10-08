import React, { useState, useRef, useEffect } from 'react'
import { getAllStockSymbols } from '../data/mockStockData'
import { useChat } from '../contexts/ChatContext'
import { newsService } from '../services/api'
import geminiService from '../services/geminiService'
import useAuthStore from '../store/authStore'
import useWatchlistStore from '../store/watchlistStore'
import useMarketDataStore from '../store/marketDataStore'
import AuthModal from './AuthModal'
import UserProfile from './UserProfile'
import PortfolioTracker from './PortfolioTracker'
import TradingAlerts from './TradingAlerts'
import AdvancedAnalytics from './AdvancedAnalytics'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  BarChart3,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Zap,
  Plus,
  Star
} from 'lucide-react'
import Recommendations from './Recommendations'
import TraceIcon from './TraceIcon'

const AIChatPanel = ({ onStockClick, onHomeClick, marketMovers }) => {
  const { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    showWelcome, 
    setShowWelcome, 
    addMessage, 
    hideWelcome 
  } = useChat();
  
  const { user, isAuthenticated, logout } = useAuthStore()
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMarketMoversCollapsed, setIsMarketMoversCollapsed] = useState(false)
  const [isRecommendationsCollapsed, setIsRecommendationsCollapsed] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showPortfolioTracker, setShowPortfolioTracker] = useState(false)
  const [showTradingAlerts, setShowTradingAlerts] = useState(false)
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [realNews, setRealNews] = useState([])

  // Fetch real news data
  const fetchRealNews = async () => {
    try {
      const newsData = await newsService.getFinancialNews(3)
      setRealNews(newsData || [])
    } catch (error) {
      console.log('Failed to fetch real news:', error)
    }
  }

  // Load news on component mount
  useEffect(() => {
    fetchRealNews()
  }, [])

  // Enhanced AI responses using Gemini API
  const getAIResponse = async (query) => {
    const lowerQuery = query.toLowerCase()
    
    // Try Gemini API first for complex queries
    if (lowerQuery.includes('analyze') || lowerQuery.includes('recommend') || lowerQuery.includes('explain') || lowerQuery.includes('what') || lowerQuery.includes('how')) {
      try {
        const context = {
          user: user,
          watchlist: watchlist,
          marketData: realNews
        };
        
        const geminiResponse = await geminiService.sendMessage(query, context);
        
        if (geminiResponse.success) {
          return {
            content: geminiResponse.content,
            suggestions: ["Tell me more about this", "What are the risks?", "Show me related stocks"],
            isGeminiResponse: true
          };
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        // Fall back to precoded responses
      }
    }
    
    // Fallback to precoded responses for simple queries
    // Tech stocks to watch / recommendations
    if (lowerQuery.includes('tech stocks') || lowerQuery.includes('recommend') || lowerQuery.includes('ideas')) {
      return {
        content: "Here are a few AI/tech names to consider based on momentum and fundamentals:",
        suggestions: ["Explain the risk on NVDA", "Compare AAPL vs MSFT", "Show support levels"],
        stocks: [
          { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 168.45, change: 2.34 },
          { symbol: 'AAPL', name: 'Apple Inc.', price: 0, change: 0 }, // Will be updated with real data
          { symbol: 'MSFT', name: 'Microsoft Corp.', price: 0, change: 0 }, // Will be updated with real data
        ]
      }
    }
    
    // Market analysis queries
    if (lowerQuery.includes('market') || lowerQuery.includes('moving') || lowerQuery.includes('today')) {
      const newsContent = realNews.length > 0 
        ? `\n\nLatest News:\n${realNews.slice(0, 2).map(article => `• ${article.title}`).join('\n')}`
        : ''
      
      return {
        content: `Market Analysis: S&P 500 up 1.2% with tech leading gains. NASDAQ up 1.8% as AI stocks rally on Nvidia earnings. DOW up 0.8% with mixed financials. VIX at 18.5 shows low volatility and bullish sentiment. Key drivers include strong tech earnings, Fed rate cut hints, and stabilizing oil prices. Money is flowing from defensive to growth stocks.${newsContent}`,
        suggestions: ["Show me tech stocks to watch", "Explain the VIX", "What about crypto today?", "Advanced market analytics"],
        analytics: {
          sentiment: 0.72,
          volatility: 0.18,
          trend: 'bullish',
          confidence: 0.85
        },
        news: realNews.slice(0, 2)
      }
    }
    
    // Stock analysis queries
    if (lowerQuery.includes('aapl') || lowerQuery.includes('apple')) {
      return {
        content: "AAPL Analysis: Current price will be updated with real data. Breaking above 50-day moving average. RSI shows neutral momentum. Volume above average. Key support and resistance levels. Recent news shows iPhone 15 sales beating estimates, services revenue up 12% year-over-year, and China market recovery. Bullish short-term outlook.",
        suggestions: ["Show me similar tech stocks", "What's the risk level?", "Set up price alerts"],
        stocks: [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 0, change: 0 } // Will be updated with real data
        ]
      }
    }
    
    // Portfolio building queries
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('$1000') || lowerQuery.includes('invest')) {
      return {
        content: "Portfolio Builder: For conservative growth, allocate 40% to VTI, 30% to BND bonds, 20% to VXUS international, and 10% cash. For aggressive growth, try 30% QQQ tech, 25% individual stocks like AAPL/MSFT/GOOGL, 25% crypto, and 20% cash. Expected returns: 7-9% conservative, 12-15% aggressive with higher volatility. Start conservative and add risk as you learn.",
        suggestions: ["Show me individual stock picks", "What about crypto?", "How to rebalance?"],
        stocks: [
          { symbol: 'VTI', name: 'Vanguard Total Stock Market', price: 230.12, change: 0.45 },
          { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 392.11, change: 0.88 },
        ]
      }
    }
    
    // Technical analysis queries
    if (lowerQuery.includes('oversold') || lowerQuery.includes('oversold tech')) {
      return {
        content: "Oversold Tech Stocks: NVDA with RSI 28 due to AI correction. AMD with RSI 25 from chip sector weakness. META with RSI 29 due to ad revenue concerns. Near oversold: TSLA with RSI 32, NFLX with RSI 34. Strategy: Look for bounces at support levels and consider dollar-cost averaging for long-term fundamentals.",
        suggestions: ["Show me support levels", "What about options?", "Set up alerts for these"],
        stocks: [
          { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 168.45, change: -1.25 },
          { symbol: 'AMD', name: 'Advanced Micro Devices', price: 89.23, change: -0.92 },
          { symbol: 'META', name: 'Meta Platforms', price: 245.67, change: -0.55 },
        ]
      }
    }
    
    // Chart explanation queries
    if (lowerQuery.includes('explain') || lowerQuery.includes('chart') || lowerQuery.includes('pattern')) {
      return {
        content: "Chart Pattern Analysis: Current pattern is an ascending triangle with support at $170-172 tested 3 times and resistance at $185. Volume is increasing on up moves. This is a bullish continuation pattern with buyers getting stronger at support. Breakout above $185 could target $200. Key indicators show MACD bullish crossover, RSI at 58 for healthy momentum, and price above 20/50 moving averages.",
        suggestions: ["Show me other patterns", "What's the risk?", "Set up breakout alerts"]
      }
    }
    
    // Educational queries
    if (lowerQuery.includes('what is') || lowerQuery.includes('explain') || lowerQuery.includes('learn')) {
      return {
        content: "Trading Education: RSI measures momentum on a 0-100 scale. Above 70 is overbought, below 30 is oversold. Moving averages show trends - 20-day for short-term, 50-day for medium-term, 200-day for long-term. Volume analysis helps confirm moves - high volume means strong conviction. Always use multiple indicators for confirmation.",
        suggestions: ["Show me examples", "What about options?", "Practice with paper trading"]
      }
    }
    
    // Default response
    return {
      content: "I can help you with market analysis, stock research, portfolio building, and technical analysis. What would you like to know about?",
      suggestions: ["Market analysis", "Stock research", "Portfolio help", "Learn trading"]
    }
  }

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return
    hideWelcome()
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }
    addMessage(userMessage)
    setIsTyping(true)
    
    try {
      const aiResponse = await getAIResponse(text)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        stocks: aiResponse.stocks,
        graph: aiResponse.graph,
        isGeminiResponse: aiResponse.isGeminiResponse
      }
      addMessage(aiMessage)
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        suggestions: ["Try asking about market trends", "Show me tech stocks", "What's moving today?"]
      }
      addMessage(errorMessage)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    const text = inputValue
    setInputValue('')
    sendMessage(text)
  }

  const handleSuggestionClick = (suggestion) => {
    // Check if suggestion contains a stock symbol using centralized data
    const stockSymbols = getAllStockSymbols();
    const foundSymbol = stockSymbols.find(symbol => 
      suggestion.toUpperCase().includes(symbol)
    );
    
    if (foundSymbol) {
      // Show stock detail view
      onStockClick(foundSymbol);
    } else {
      // Regular chat interaction
      sendMessage(suggestion)
    }
  }

  // Function to make stock symbols clickable in messages
  const renderMessageWithClickableStocks = (content) => {
    const stockSymbols = getAllStockSymbols();
    
    let processedContent = content;
    stockSymbols.forEach(symbol => {
      const regex = new RegExp(`\\b${symbol}\\b`, 'gi');
        processedContent = processedContent.replace(regex, `<span class="text-blue-600 hover:text-blue-800 cursor-pointer underline" onclick="window.dispatchEvent(new CustomEvent('stock-click', { detail: { symbol: '${symbol}' } }))">${symbol}</span>`);
    });
    
    return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  // Listen for external chat submit events
  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.text
      if (typeof text === 'string') {
        setShowWelcome(false)
        sendMessage(text)
      }
    }
    window.addEventListener('mp-chat-submit', handler)
    return () => window.removeEventListener('mp-chat-submit', handler)
  }, [])

  // Initialize auth on component mount
  useEffect(() => {
    const { initializeAuth } = useAuthStore.getState()
    initializeAuth()
  }, [])

  return (
    <div className="h-full flex flex-col bg-white">
        {/* Header - brand */}
        <div className="p-4 relative rounded-t-lg">
          {/* Floating pill: Logo + title (Home button) */}
          <button 
            onClick={onHomeClick}
            className="absolute top-4 left-4 flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm h-8 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Go to Home"
          >
            <img src="/trace.svg" alt="Market Pulse" className="w-5 h-5" />
            <span className="text-xs sm:text-sm font-semibold text-slate-900">Market Pulse</span>
          </button>
          {/* Floating pills: icons (account) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 h-8 w-8"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="py-2">
                    {!isAuthenticated ? (
                      <>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setAuthMode('login')
                            setShowAuthModal(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setAuthMode('register')
                            setShowAuthModal(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-slate-200">
                          <div className="text-sm font-medium text-slate-900">{user?.name || 'User'}</div>
                          <div className="text-xs text-slate-500">{user?.email}</div>
                        </div>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setShowUserProfile(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setShowPortfolioTracker(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Portfolio Tracker
                        </button>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setShowTradingAlerts(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Trading Alerts
                        </button>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            setShowAdvancedAnalytics(true)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Advanced Analytics
                        </button>
                        <div className="border-t border-slate-200 my-2"></div>
                        <button
                          onClick={() => { 
                            setShowUserMenu(false)
                            logout()
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 pt-8 space-y-4">
          {/* Welcome Message */}
          {showWelcome && (
            <div className="mb-4 flex flex-col items-center justify-center text-center py-8">
              <h3 className="text-2xl font-bold text-slate-700/40 mb-1">Welcome to Market Pulse,</h3>
              <p className="text-2xl font-bold text-slate-700/40 leading-relaxed">
                your AI trading agent 
              </p>
            </div>
          )}
          
          {/* What's going on with the markets today? */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">What's going on with the markets today?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The S&P 500 and Nasdaq Composite indices have closed at new record highs. This mixed performance comes as a US government shutdown extends into its sixth day.
            </p>
          </div>

          {/* Trading Recommendations embedded */}
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer mb-3"
              onClick={() => setIsRecommendationsCollapsed(!isRecommendationsCollapsed)}
            >
              <h3 className="text-lg font-semibold text-slate-900">AI Recommendations</h3>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isRecommendationsCollapsed ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {!isRecommendationsCollapsed && (
              <Recommendations onStockClick={onStockClick} />
            )}
          </div>

          {/* Market Movers */}
          {marketMovers && (
            <div className="mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer mb-3"
                onClick={() => setIsMarketMoversCollapsed(!isMarketMoversCollapsed)}
              >
                <h3 className="text-lg font-semibold text-slate-900">Market Movers</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isMarketMoversCollapsed ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {!isMarketMoversCollapsed && (
                <>
                  {/* Most Active */}
                  <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Most Active</h4>
                <div className="space-y-2">
                  {marketMovers.mostActive?.slice(0, 3).map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                      onClick={() => onStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">{stock.symbol}</span>
                          <span className="text-xs text-gray-600 truncate">{stock.name}</span>
                        </div>
                        <div className="text-xs text-gray-700">{stock.price}</div>
                      </div>
                      <div className={`text-xs font-semibold flex items-center ${stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.trend === 'up' ? '↗' : '↘'} {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Gainers */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Daily Gainers</h4>
                <div className="space-y-2">
                  {marketMovers.dailyGainers?.slice(0, 3).map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                      onClick={() => onStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">{stock.symbol}</span>
                          <span className="text-xs text-gray-600 truncate">{stock.name}</span>
                        </div>
                        <div className="text-xs text-gray-700">{stock.price}</div>
                      </div>
                      <div className="text-xs font-semibold text-green-600 flex items-center">
                        ↗ {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Losers */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Daily Losers</h4>
                <div className="space-y-2">
                  {marketMovers.dailyLosers?.slice(0, 3).map((stock, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                      onClick={() => onStockClick(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">{stock.symbol}</span>
                          <span className="text-xs text-gray-600 truncate">{stock.name}</span>
                        </div>
                        <div className="text-xs text-gray-700">{stock.price}</div>
                      </div>
                      <div className="text-xs font-semibold text-red-600 flex items-center">
                        ↘ {stock.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                </>
              )}
            </div>
          )}

          {messages.map((message, index) => (
            <div key={message.id} className="mb-6" data-chat-message>
              {message.type === 'user' ? (
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{message.content}</h3>
                </div>
              ) : (
                <div className="text-left">
                  <div className="text-sm text-slate-600 leading-relaxed mb-3">
                    {renderMessageWithClickableStocks(message.content)}
                  </div>
                  
                  {/* Graph/Chart content */}
                  {message.graph && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-3">{message.graph.title}</div>
                      <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">📊 {message.graph.type} Chart</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Individual stock cards */}
                  {message.stocks && message.stocks.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {message.stocks.map((stock, stockIndex) => (
                        <div 
                          key={stockIndex}
                          className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex-1 cursor-pointer"
                              onClick={() => onStockClick && onStockClick(stock.symbol)}
                            >
                              <div className="font-semibold text-slate-900 text-base">{stock.symbol}</div>
                              <div className="text-sm text-slate-600">{stock.name}</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="font-semibold text-slate-900 text-base">${typeof stock.price === 'number' ? stock.price.toFixed(2) : stock.price}</div>
                                <div className={`text-sm font-medium ${(stock.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(stock.change ?? 0) >= 0 ? '+' : ''}{typeof stock.change === 'number' ? stock.change.toFixed(2) : stock.change}%
                                </div>
                              </div>
                              {isAuthenticated && (
                                <button
                                  onClick={async (e) => {
                                    e.stopPropagation()
                                    const symbol = stock.symbol
                                    if (isInWatchlist(symbol)) {
                                      await removeFromWatchlist(symbol)
                                    } else {
                                      await addToWatchlist(symbol)
                                    }
                                  }}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isInWatchlist(stock.symbol)
                                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                  title={isInWatchlist(stock.symbol) ? 'Remove from watchlist' : 'Add to watchlist'}
                                >
                                  {isInWatchlist(stock.symbol) ? (
                                    <Star className="w-4 h-4 fill-current" />
                                  ) : (
                                    <Plus className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  
                  {/* News */}
                  {message.news && message.news.length > 0 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-green-900">Latest News</span>
                      </div>
                      <div className="space-y-3">
                        {message.news.map((article, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border border-green-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                              {article.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{article.source}</span>
                              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            </div>
                            {article.sentiment && (
                              <div className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                                article.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                                article.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {article.sentiment}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Analytics */}
                  {message.analytics && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">AI Analytics</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Sentiment</div>
                          <div className="text-lg font-bold text-blue-600">
                            {Math.round((message.analytics.sentiment || 0.5) * 100)}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Volatility</div>
                          <div className="text-lg font-bold text-orange-600">
                            {Math.round((message.analytics.volatility || 0.15) * 100)}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Trend</div>
                          <div className={`text-lg font-bold ${
                            message.analytics.trend === 'bullish' ? 'text-green-600' : 
                            message.analytics.trend === 'bearish' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {message.analytics.trend?.toUpperCase() || 'NEUTRAL'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Confidence</div>
                          <div className="text-lg font-bold text-purple-600">
                            {Math.round((message.analytics.confidence || 0.5) * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {message.suggestions.map((suggestion, suggestionIndex) => (
                        <button
                          key={suggestionIndex}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="mb-4 text-left">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input removed: handled by global search bar */}
        
        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
          />
        )}
        
        {/* User Profile Modal */}
        {showUserProfile && (
          <UserProfile
            isOpen={showUserProfile}
            onClose={() => setShowUserProfile(false)}
          />
        )}
        
        {/* Portfolio Tracker Modal */}
        {showPortfolioTracker && (
          <PortfolioTracker
            isOpen={showPortfolioTracker}
            onClose={() => setShowPortfolioTracker(false)}
          />
        )}
        
        {/* Trading Alerts Modal */}
        {showTradingAlerts && (
          <TradingAlerts
            isOpen={showTradingAlerts}
            onClose={() => setShowTradingAlerts(false)}
          />
        )}
        
        {/* Advanced Analytics Modal */}
        {showAdvancedAnalytics && (
          <AdvancedAnalytics
            isOpen={showAdvancedAnalytics}
            onClose={() => setShowAdvancedAnalytics(false)}
          />
        )}
    </div>
  )
}

export default AIChatPanel

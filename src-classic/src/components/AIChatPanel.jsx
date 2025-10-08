import React, { useState, useRef, useEffect } from 'react'
import { getAllStockSymbols } from '../data/mockStockData'
import { useChat } from '../contexts/ChatContext'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Menu,
  TrendingUp, 
  BarChart3,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Zap
} from 'lucide-react'
import Recommendations from './Recommendations'
import TraceIcon from './TraceIcon'

const AIChatPanel = ({ onStockClick, onHomeClick }) => {
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
  
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [showPanelMenu, setShowPanelMenu] = useState(false)

  // Precoded AI responses for different query types
  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    // Market analysis queries
    if (lowerQuery.includes('market') || lowerQuery.includes('moving') || lowerQuery.includes('today')) {
      return {
        content: "Market Analysis: S&P 500 up 1.2% with tech leading gains. NASDAQ up 1.8% as AI stocks rally on Nvidia earnings. DOW up 0.8% with mixed financials. VIX at 18.5 shows low volatility and bullish sentiment. Key drivers include strong tech earnings, Fed rate cut hints, and stabilizing oil prices. Money is flowing from defensive to growth stocks.",
        suggestions: ["Show me tech stocks to watch", "Explain the VIX", "What about crypto today?"]
      }
    }
    
    // Stock analysis queries
    if (lowerQuery.includes('aapl') || lowerQuery.includes('apple')) {
      return {
        content: "AAPL Analysis: Current price $178.23, up 1.67%. Breaking above 50-day moving average at $175.20. RSI at 58 shows neutral momentum. Volume 15% above average. Key support at $170-172, resistance at $185-190. Recent news shows iPhone 15 sales beating estimates, services revenue up 12% year-over-year, and China market recovery. Bullish short-term outlook.",
        suggestions: ["Show me similar tech stocks", "What's the risk level?", "Set up price alerts"]
      }
    }
    
    // Portfolio building queries
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('$1000') || lowerQuery.includes('invest')) {
      return {
        content: "Portfolio Builder: For conservative growth, allocate 40% to VTI, 30% to BND bonds, 20% to VXUS international, and 10% cash. For aggressive growth, try 30% QQQ tech, 25% individual stocks like AAPL/MSFT/GOOGL, 25% crypto, and 20% cash. Expected returns: 7-9% conservative, 12-15% aggressive with higher volatility. Start conservative and add risk as you learn.",
        suggestions: ["Show me individual stock picks", "What about crypto?", "How to rebalance?"]
      }
    }
    
    // Technical analysis queries
    if (lowerQuery.includes('oversold') || lowerQuery.includes('oversold tech')) {
      return {
        content: "Oversold Tech Stocks: NVDA at $168.45 with RSI 28 due to AI correction. AMD at $89.23 with RSI 25 from chip sector weakness. META at $245.67 with RSI 29 due to ad revenue concerns. Near oversold: TSLA at $234.56 with RSI 32, NFLX at $312.45 with RSI 34. Strategy: Look for bounces at support levels and consider dollar-cost averaging for long-term fundamentals.",
        suggestions: ["Show me support levels", "What about options?", "Set up alerts for these"]
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

  const sendMessage = (text) => {
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
    setTimeout(() => {
      const aiResponse = getAIResponse(text)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      }
      addMessage(aiMessage)
      setIsTyping(false)
    }, 1200)
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
          {/* Floating pills: icons (account + menu) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              className="p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 h-8 w-8"
              title="Account"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPanelMenu(!showPanelMenu)}
                className="p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 h-8 w-8"
                title="Menu"
                aria-label="Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              {showPanelMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => { window.location.href = 'http://localhost:3002/' }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      AI Mode
                    </button>
                    <button
                      onClick={() => { window.location.href = 'http://localhost:3001/' }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Classic Mode
                    </button>
                    <div className="border-t border-slate-200 my-2"></div>
                    <button
                      onClick={() => { document.documentElement.classList.toggle('dark') }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Toggle Dark Mode
                    </button>
                    <div className="border-t border-slate-200 my-2"></div>
                    <button
                      onClick={() => { window.location.href = '/intro' }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Learn More
                    </button>
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
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700/40 ">Welcome to Market Pulse,</h3>
              <p className="text-lg font-semibold text-slate-700/40 leading-relaxed">
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
            <Recommendations onStockClick={onStockClick} />

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
                          className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                          onClick={() => onStockClick && onStockClick(stock.symbol)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-slate-900 text-base">{stock.symbol}</div>
                              <div className="text-sm text-slate-600">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-slate-900 text-base">${stock.price}</div>
                              <div className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
    </div>
  )
}

export default AIChatPanel

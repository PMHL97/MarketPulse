import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Bell, 
  Settings, 
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  BookOpen,
  LogOut,
  Clock,
  TrendingDown,
  Star
} from 'lucide-react'
import TraceIcon from './TraceIcon'
import AuthModal from './AuthModal'
import useAuthStore from '../store/authStore'
import { marketDataService } from '../services/api'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showBrokersMenu, setShowBrokersMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef()
  const searchTimeoutRef = useRef()
  const notificationRef = useRef()
  const settingsRef = useRef()
  const userMenuRef = useRef()
  const productsMenuRef = useRef()
  const brokersMenuRef = useRef()
  const moreMenuRef = useRef()
  
  const { user, isAuthenticated, logout } = useAuthStore()

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'price_alert',
      title: 'Price Alert: AAPL',
      message: 'AAPL has reached your target price of $180.00',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      action: { type: 'view_chart', symbol: 'AAPL' }
    },
    {
      id: 2,
      type: 'news',
      title: 'Market News',
      message: 'Tech stocks rally as earnings season begins',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: false,
      action: { type: 'view_news' }
    },
    {
      id: 3,
      type: 'watchlist',
      title: 'Watchlist Update',
      message: 'TSLA added to your watchlist',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      action: { type: 'view_watchlist' }
    },
    {
      id: 4,
      type: 'community',
      title: 'New Trading Idea',
      message: 'PineCoders shared a new idea for NVDA',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      action: { type: 'view_idea', id: 123 }
    }
  ]

  // Initialize notifications
  useEffect(() => {
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))

    // Handle action
    switch (notification.action.type) {
      case 'view_chart':
        navigate(`/charts?symbol=${notification.action.symbol}`)
        break
      case 'view_news':
        navigate('/markets')
        break
      case 'view_watchlist':
        navigate('/markets')
        break
      case 'view_idea':
        navigate('/community')
        break
      default:
        break
    }

    setShowNotifications(false)
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target)) {
        setShowProductsMenu(false)
      }
      if (brokersMenuRef.current && !brokersMenuRef.current.contains(event.target)) {
        setShowBrokersMenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle settings actions
  const handleSettingsAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile')
        break
      case 'preferences':
        navigate('/preferences')
        break
      case 'notifications':
        navigate('/notifications')
        break
      case 'help':
        navigate('/help')
        break
      case 'dark_mode':
        // Toggle dark mode
        document.documentElement.classList.toggle('dark')
        break
      default:
        break
    }
    setShowSettings(false)
  }

  // Handle user menu actions
  const handleUserMenuAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile')
        break
      case 'portfolio':
        navigate('/portfolio')
        break
      case 'watchlist':
        navigate('/markets')
        break
      case 'settings':
        setShowSettings(true)
        break
      case 'help':
        navigate('/help')
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
    setShowUserMenu(false)
  }

  // Mock search data
  const searchData = [
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: '178.23', change: '+1.67%' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock', price: '378.45', change: '+2.34%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', price: '145.67', change: '-0.45%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'stock', price: '234.56', change: '+3.12%' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock', price: '168.45', change: '+2.34%' },
    { symbol: 'BTCUSD', name: 'Bitcoin', type: 'crypto', price: '43,567.89', change: '+2.34%' },
    { symbol: 'ETHUSD', name: 'Ethereum', type: 'crypto', price: '2,345.67', change: '+1.78%' },
    { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'forex', price: '1.0876', change: '+0.23%' },
    { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'forex', price: '1.2654', change: '-0.12%' },
    { symbol: 'GC1!', name: 'Gold Futures', type: 'commodity', price: '1,987.65', change: '+0.67%' },
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Handle search input
  const handleSearchInput = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (query.length > 0) {
      setIsSearching(true)
      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(query)
      }, 300)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  // Perform search
  const performSearch = (query) => {
    const results = searchData.filter(item => 
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8) // Limit to 8 results
    
    setSearchResults(results)
    setIsSearching(false)
  }

  // Handle search result click
  const handleSearchResultClick = (result) => {
    // Add to recent searches
    const newRecent = [result, ...recentSearches.filter(item => item.symbol !== result.symbol)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem('recentSearches', JSON.stringify(newRecent))
    
    // Navigate to chart
    navigate(`/charts?symbol=${result.symbol}`)
    
    // Close search
    setSearchQuery('')
    setSearchResults([])
    setIsSearchOpen(false)
  }

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to markets page with search query
      navigate(`/markets?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigation = [
    { name: 'Products', href: '/products', icon: BarChart3, hasDropdown: true },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Brokers', href: '/brokers', icon: Globe, hasDropdown: true },
    { name: 'More', href: '/more', icon: BookOpen, hasDropdown: true },
  ]

  // Products dropdown items
  const productsItems = [
    { name: 'Supercharts', href: '/charts', description: 'Advanced charting platform' },
    { name: 'Screeners', href: '/screeners', description: 'Stock and crypto screeners' },
    { name: 'Heatmaps', href: '/heatmaps', description: 'Market heatmaps' },
    { name: 'Calendars', href: '/calendars', description: 'Economic calendar' },
    { name: 'Alerts', href: '/alerts', description: 'Price and news alerts' },
    { name: 'Pine Script', href: '/pine-script', description: 'Custom indicators' },
  ]

  // Brokers dropdown items
  const brokersItems = [
    { name: 'Supported Brokers', href: '/brokers', description: 'List of supported brokers' },
    { name: 'Broker Integration', href: '/broker-integration', description: 'Connect your broker' },
    { name: 'Trading Features', href: '/trading-features', description: 'Trading capabilities' },
    { name: 'Paper Trading', href: '/paper-trading', description: 'Practice trading' },
  ]

  // More dropdown items
  const moreItems = [
    { name: 'Education', href: '/education', description: 'Trading education' },
    { name: 'Blog', href: '/blog', description: 'Latest news and insights' },
    { name: 'Help Center', href: '/help', description: 'Support and documentation' },
    { name: 'API', href: '/api', description: 'Developer API' },
    { name: 'Pricing', href: '/pricing', description: 'Subscription plans' },
    { name: 'About Us', href: '/about', description: 'Learn about Market Pulse' },
  ]

  const isActive = (path) => location.pathname === path

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <TraceIcon className="w-6 h-6" />
                <span className="text-xl font-extrabold text-secondary-900">Market Pulse</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div className="relative" ref={
                        item.name === 'Products' ? productsMenuRef :
                        item.name === 'Brokers' ? brokersMenuRef :
                        item.name === 'More' ? moreMenuRef : null
                      }>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (item.name === 'Products') {
                              setShowProductsMenu(!showProductsMenu)
                              setShowBrokersMenu(false)
                              setShowMoreMenu(false)
                            } else if (item.name === 'Brokers') {
                              setShowBrokersMenu(!showBrokersMenu)
                              setShowProductsMenu(false)
                              setShowMoreMenu(false)
                            } else if (item.name === 'More') {
                              setShowMoreMenu(!showMoreMenu)
                              setShowProductsMenu(false)
                              setShowBrokersMenu(false)
                            }
                          }}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-primary-700 bg-primary-100'
                              : 'text-secondary-700 hover:text-secondary-900 hover:bg-primary-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Products Dropdown */}
                        {item.name === 'Products' && showProductsMenu && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                            <div className="p-4">
                              <h3 className="font-semibold text-secondary-900 mb-3">Products</h3>
                              <div className="space-y-2">
                                {productsItems.map((product) => (
                                  <Link
                                    key={product.name}
                                    to={product.href}
                                    className="block p-2 rounded hover:bg-secondary-50 transition-colors"
                                    onClick={() => setShowProductsMenu(false)}
                                  >
                                    <div className="font-medium text-secondary-900">{product.name}</div>
                                    <div className="text-xs text-secondary-500">{product.description}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Brokers Dropdown */}
                        {item.name === 'Brokers' && showBrokersMenu && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                            <div className="p-4">
                              <h3 className="font-semibold text-secondary-900 mb-3">Brokers</h3>
                              <div className="space-y-2">
                                {brokersItems.map((broker) => (
                                  <Link
                                    key={broker.name}
                                    to={broker.href}
                                    className="block p-2 rounded hover:bg-secondary-50 transition-colors"
                                    onClick={() => setShowBrokersMenu(false)}
                                  >
                                    <div className="font-medium text-secondary-900">{broker.name}</div>
                                    <div className="text-xs text-secondary-500">{broker.description}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* More Dropdown */}
                        {item.name === 'More' && showMoreMenu && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                            <div className="p-4">
                              <h3 className="font-semibold text-secondary-900 mb-3">More</h3>
                              <div className="space-y-2">
                                {moreItems.map((more) => (
                                  <Link
                                    key={more.name}
                                    to={more.href}
                                    className="block p-2 rounded hover:bg-secondary-50 transition-colors"
                                    onClick={() => setShowMoreMenu(false)}
                                  >
                                    <div className="font-medium text-secondary-900">{more.name}</div>
                                    <div className="text-xs text-secondary-500">{more.description}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative" ref={searchInputRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-secondary-200 p-4 z-50">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="flex items-center space-x-2">
                        <Search className="w-5 h-5 text-secondary-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search symbols, markets, ideas..."
                          value={searchQuery}
                          onChange={handleSearchInput}
                          className="flex-1 border-none outline-none text-sm"
                          autoFocus
                        />
                        {isSearching && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                        )}
                      </div>
                    </form>
                    
                    {/* Search Results */}
                    {searchQuery && (
                      <div className="mt-3">
                        {searchResults.length > 0 ? (
                          <div className="space-y-1">
                            {searchResults.map((result, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchResultClick(result)}
                                className="w-full flex items-center justify-between p-2 hover:bg-secondary-50 rounded text-left"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary-600">
                                      {result.type === 'stock' ? 'S' : result.type === 'crypto' ? 'C' : result.type === 'forex' ? 'F' : 'M'}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-secondary-900">{result.symbol}</div>
                                    <div className="text-xs text-secondary-500">{result.name}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-secondary-900">
                                    {result.type === 'forex' ? result.price : `$${result.price}`}
                                  </div>
                                  <div className={`text-xs ${result.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                    {result.change}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : !isSearching && (
                          <div className="text-center py-4 text-secondary-500 text-sm">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Recent Searches */}
                    {!searchQuery && recentSearches.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-secondary-600">Recent</span>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-secondary-400 hover:text-secondary-600"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((result, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchResultClick(result)}
                              className="w-full flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded text-left"
                            >
                              <Clock className="w-4 h-4 text-secondary-400" />
                              <div>
                                <div className="font-medium text-secondary-900">{result.symbol}</div>
                                <div className="text-xs text-secondary-500">{result.name}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Popular Searches */}
                    {!searchQuery && recentSearches.length === 0 && (
                      <div className="mt-3">
                        <div className="text-xs font-medium text-secondary-600 mb-2">Popular</div>
                        <div className="flex flex-wrap gap-2">
                          {['AAPL', 'TSLA', 'BTCUSD', 'EURUSD'].map((symbol) => (
                            <button
                              key={symbol}
                              onClick={() => {
                                const result = searchData.find(item => item.symbol === symbol)
                                if (result) handleSearchResultClick(result)
                              }}
                              className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded hover:bg-secondary-200"
                            >
                              {symbol}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                      <div className="p-4 border-b border-secondary-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-secondary-900">Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-secondary-200">
                            {notifications.map((notification) => (
                              <button
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`w-full p-4 text-left hover:bg-secondary-50 transition-colors ${
                                  !notification.read ? 'bg-primary-50' : ''
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.type === 'price_alert' ? 'bg-success' :
                                    notification.type === 'news' ? 'bg-primary-600' :
                                    notification.type === 'watchlist' ? 'bg-warning' :
                                    'bg-secondary-400'
                                  }`} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-sm font-medium text-secondary-900 truncate">
                                        {notification.title}
                                      </h4>
                                      <span className="text-xs text-secondary-500">
                                        {notification.timestamp.toLocaleTimeString([], { 
                                          hour: '2-digit', 
                                          minute: '2-digit' 
                                        })}
                                      </span>
                                    </div>
                                    <p className="text-sm text-secondary-600 mt-1">
                                      {notification.message}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-secondary-500">
                            <Bell className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                            <p className="text-sm">No notifications yet</p>
                          </div>
                        )}
                      </div>
                      
                      {notifications.length > 0 && (
                        <div className="p-3 border-t border-secondary-200">
                          <button className="w-full text-sm text-primary-600 hover:text-primary-700">
                            View all notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Settings */}
                <div className="relative" ref={settingsRef}>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                      <div className="p-4 border-b border-secondary-200">
                        <h3 className="font-semibold text-secondary-900">Settings</h3>
                      </div>
                      
                      <div className="py-2">
                        <button
                          onClick={() => handleSettingsAction('profile')}
                          className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </button>
                        
                        <button
                          onClick={() => handleSettingsAction('preferences')}
                          className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Preferences</span>
                        </button>
                        
                        <button
                          onClick={() => handleSettingsAction('notifications')}
                          className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                        >
                          <Bell className="w-4 h-4" />
                          <span>Notification Settings</span>
                        </button>
                        
                        <div className="border-t border-secondary-200 my-2"></div>
                        
                        <button
                          onClick={() => handleSettingsAction('dark_mode')}
                          className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-secondary-300 rounded"></div>
                            <span>Dark Mode</span>
                          </div>
                          <div className="w-8 h-4 bg-secondary-200 rounded-full relative">
                            <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </button>
                        
                        <div className="border-t border-secondary-200 my-2"></div>
                        
                        <button
                          onClick={() => handleSettingsAction('help')}
                          className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Help & Support</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    {/* User Profile Menu */}
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors"
                        title="User Menu"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-600">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="text-sm text-secondary-700 hidden sm:block">
                          {user?.username || 'User'}
                        </span>
                      </button>
                      
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                          <div className="p-4 border-b border-secondary-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary-600">
                                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-secondary-900">
                                  {user?.username || 'User'}
                                </div>
                                <div className="text-sm text-secondary-500">
                                  {user?.email || 'user@example.com'}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="py-2">
                            <button
                              onClick={() => handleUserMenuAction('profile')}
                              className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                            >
                              <User className="w-4 h-4" />
                              <span>My Profile</span>
                            </button>
                            
                            <button
                              onClick={() => handleUserMenuAction('portfolio')}
                              className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                            >
                              <BarChart3 className="w-4 h-4" />
                              <span>My Portfolio</span>
                            </button>
                            
                            <button
                              onClick={() => handleUserMenuAction('watchlist')}
                              className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                            >
                              <Star className="w-4 h-4" />
                              <span>My Watchlist</span>
                            </button>
                            
                            <div className="border-t border-secondary-200 my-2"></div>
                            
                            <button
                              onClick={() => handleUserMenuAction('settings')}
                              className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </button>
                            
                            <button
                              onClick={() => handleUserMenuAction('help')}
                              className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-secondary-50 flex items-center space-x-3"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Help & Support</span>
                            </button>
                            
                            <div className="border-t border-secondary-200 my-2"></div>
                            
                            <button
                              onClick={() => handleUserMenuAction('logout')}
                              className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 flex items-center space-x-3"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleAuthClick('login')}
                      className="btn-primary text-sm"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => handleAuthClick('register')}
                      className="btn-secondary text-sm"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-secondary-200 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                
                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <div className="pt-4 border-t border-secondary-200 space-y-2">
                    <button 
                      onClick={() => {
                        handleAuthClick('login')
                        setIsMenuOpen(false)
                      }}
                      className="w-full btn-primary text-sm"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => {
                        handleAuthClick('register')
                        setIsMenuOpen(false)
                      }}
                      className="w-full btn-secondary text-sm"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}

export default Header

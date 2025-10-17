import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatPanel from '../components/AIChatPanel'
import StockDetailView from '../components/StockDetailView'
import NewsDetailView from '../components/NewsDetailView'
import { getAllStockSymbols, getStockData } from '../data/mockStockData'
import useMarketDataStore from '../store/marketDataStore'
import { articleService, newsService } from '../services/api'
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
import AddRegionModal from '../components/AddRegionModal'

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchStockPrice, fetchRealtimeMarketData } = useMarketDataStore()
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedStock, setSelectedStock] = useState(null) // Track selected stock for detail view
  const [marketMovers, setMarketMovers] = useState({
    mostActive: [],
    dailyGainers: [],
    dailyLosers: []
  })
  const [marketIndices, setMarketIndices] = useState({
    US: [],
    Europe: [],
    Asia: [],
    Currencies: [],
    Crypto: []
  })
  
  // Load real market data
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        // Load market movers with real data
        const symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMD', 'META', 'NFLX', 'AMZN', 'ADBE', 'CRM']
        const stockData = await Promise.all(
          symbols.map(async (symbol) => {
            try {
              const data = await fetchStockPrice(symbol)
              return {
                symbol,
                name: getStockData(symbol).name,
                price: `$${data.price?.toFixed(2) || '0.00'}`,
                change: `${data.changePercent >= 0 ? '+' : ''}${data.changePercent?.toFixed(2) || '0.00'}%`,
                trend: data.changePercent >= 0 ? 'up' : 'down'
              }
            } catch (error) {
              console.error(`Failed to fetch data for ${symbol}:`, error)
              return {
                symbol,
                name: getStockData(symbol).name,
                price: '$0.00',
                change: '0.00%',
                trend: 'up'
              }
            }
          })
        )

        // Sort by volume/activity (simplified - using price change as proxy)
        const sortedByActivity = [...stockData].sort((a, b) => Math.abs(parseFloat(b.change)) - Math.abs(parseFloat(a.change)))
        const gainers = stockData.filter(stock => stock.trend === 'up').sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
        const losers = stockData.filter(stock => stock.trend === 'down').sort((a, b) => parseFloat(a.change) - parseFloat(b.change))

        setMarketMovers({
          mostActive: sortedByActivity.slice(0, 5),
          dailyGainers: gainers.slice(0, 5),
          dailyLosers: losers.slice(0, 5)
        })

        // Load real market indices from backend
        try {
          const indicesResponse = await fetch('http://localhost:5003/api/indices')
          const indicesData = await indicesResponse.json()
          
          if (indicesData.success && indicesData.data) {
            console.log('✅ Got real market indices data:', indicesData.data)
            setMarketIndices(indicesData.data)
          } else {
            console.error('❌ Failed to get market indices:', indicesData.error)
            // Fallback to mock data
            setMarketIndices({
              US: [
                { name: 'S&P 500', value: '4,567.89', change: '+12.34', percent: '+0.27%', trend: 'up' },
                { name: 'NASDAQ', value: '14,234.56', change: '+45.67', percent: '+0.32%', trend: 'up' },
                { name: 'DOW', value: '34,567.89', change: '-23.45', percent: '-0.07%', trend: 'down' }
              ],
              Europe: [
                { name: 'FTSE 100', value: '7,456.78', change: '+23.45', percent: '+0.32%', trend: 'up' },
                { name: 'DAX', value: '15,678.90', change: '-12.34', percent: '-0.08%', trend: 'down' },
                { name: 'CAC 40', value: '7,234.56', change: '+34.56', percent: '+0.48%', trend: 'up' }
              ],
              Asia: [
                { name: 'Nikkei 225', value: '32,456.78', change: '+123.45', percent: '+0.38%', trend: 'up' },
                { name: 'Hang Seng', value: '18,234.56', change: '-45.67', percent: '-0.25%', trend: 'down' },
                { name: 'Shanghai', value: '3,234.56', change: '+12.34', percent: '+0.38%', trend: 'up' }
              ],
              Currencies: [
                { name: 'EUR/USD', value: '1.0876', change: '+0.0023', percent: '+0.21%', trend: 'up' },
                { name: 'GBP/USD', value: '1.2654', change: '-0.0012', percent: '-0.09%', trend: 'down' },
                { name: 'USD/JPY', value: '149.23', change: '+0.45', percent: '+0.30%', trend: 'up' }
              ],
              Crypto: [
                { name: 'BTC/USD', value: '43,567.89', change: '+1,234.56', percent: '+2.92%', trend: 'up' },
                { name: 'ETH/USD', value: '2,345.67', change: '+45.67', percent: '+1.98%', trend: 'up' },
                { name: 'ADA/USD', value: '0.4567', change: '-0.0123', percent: '-2.63%', trend: 'down' }
              ]
            })
          }
        } catch (error) {
          console.error('❌ Failed to fetch market indices:', error)
          // Fallback to mock data
          setMarketIndices({
            US: [
              { name: 'S&P 500', value: '4,567.89', change: '+12.34', percent: '+0.27%', trend: 'up' },
              { name: 'NASDAQ', value: '14,234.56', change: '+45.67', percent: '+0.32%', trend: 'up' },
              { name: 'DOW', value: '34,567.89', change: '-23.45', percent: '-0.07%', trend: 'down' }
            ],
            Europe: [
              { name: 'FTSE 100', value: '7,456.78', change: '+23.45', percent: '+0.32%', trend: 'up' },
              { name: 'DAX', value: '15,678.90', change: '-12.34', percent: '-0.08%', trend: 'down' },
              { name: 'CAC 40', value: '7,234.56', change: '+34.56', percent: '+0.48%', trend: 'up' }
            ],
            Asia: [
              { name: 'Nikkei 225', value: '32,456.78', change: '+123.45', percent: '+0.38%', trend: 'up' },
              { name: 'Hang Seng', value: '18,234.56', change: '-45.67', percent: '-0.25%', trend: 'down' },
              { name: 'Shanghai', value: '3,234.56', change: '+12.34', percent: '+0.38%', trend: 'up' }
            ],
            Currencies: [
              { name: 'EUR/USD', value: '1.0876', change: '+0.0023', percent: '+0.21%', trend: 'up' },
              { name: 'GBP/USD', value: '1.2654', change: '-0.0012', percent: '-0.09%', trend: 'down' },
              { name: 'USD/JPY', value: '149.23', change: '+0.45', percent: '+0.30%', trend: 'up' }
            ],
            Crypto: [
              { name: 'BTC/USD', value: '43,567.89', change: '+1,234.56', percent: '+2.92%', trend: 'up' },
              { name: 'ETH/USD', value: '2,345.67', change: '+45.67', percent: '+1.98%', trend: 'up' },
              { name: 'ADA/USD', value: '0.4567', change: '-0.0123', percent: '-2.63%', trend: 'down' }
            ]
          })
        }
      } catch (error) {
        console.error('Failed to load market data:', error)
      }
    }

    loadMarketData()
  }, [fetchStockPrice])

  // Handle stock selection - no navigation needed
  const handleStockClick = (symbol) => {
    // Map display names to actual symbols for indices
    const symbolMap = {
      'S&P500': '^GSPC',
      'NASDAQ': '^IXIC', 
      'DOW': '^DJI'
    };
    
    const actualSymbol = symbolMap[symbol] || symbol;
    setSelectedStock(actualSymbol);
  };

  const handleCloseStockDetail = () => {
    setSelectedStock(null);
  };

  const handleNewsClick = (article) => {
    setSelectedNews(article);
  };

  const handleCloseNewsDetail = () => {
    setSelectedNews(null);
  };

  // Listen for stock clicks from chat messages
  useEffect(() => {
    const handleStockClick = (event) => {
      setSelectedStock(event.detail.symbol);
    };

    window.addEventListener('stock-click', handleStockClick);
    return () => window.removeEventListener('stock-click', handleStockClick);
  }, []);

  const regionTabs = ['All', 'US', 'Currencies', 'Crypto', 'Watchlist']

  // Simple watchlist state (frontend-only prototype)
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'NVDA'])
  const [newSymbol, setNewSymbol] = useState('')
  // Custom regions and plus button state
  const [customRegions, setCustomRegions] = useState([])
  const [showAddRegionModal, setShowAddRegionModal] = useState(false)
  const [newRegionName, setNewRegionName] = useState('')
  const [newRegionSymbols, setNewRegionSymbols] = useState('')
  // Search panel state
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [dynamicSuggestions, setDynamicSuggestions] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [realNews, setRealNews] = useState([])
  const [isLoadingNews, setIsLoadingNews] = useState(false)
  const [showAllNews, setShowAllNews] = useState(false)
  const [displayedNewsCount, setDisplayedNewsCount] = useState(9)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState(null)
  const searchRef = useRef(null)

  // Mock financial news function
  const getMockFinancialNews = () => [
    {
      title: 'Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty',
      description: 'The Federal Reserve hints at possible interest rate reductions as inflation shows signs of cooling and economic growth slows.',
      content: 'The Federal Reserve has indicated that it may consider reducing interest rates in the coming months as economic indicators show signs of cooling inflation and slowing growth. This development comes after months of aggressive monetary tightening aimed at curbing inflation. Market analysts are closely watching the Fed\'s next moves, as any rate cuts could have significant implications for investors and the broader economy. The central bank\'s decision will likely depend on upcoming economic data, including employment figures and inflation reports.',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'Reuters',
      author: 'Financial Reporter',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center',
      sentiment: 'neutral'
    },
    {
      title: 'Tech Stocks Rally as AI Companies Report Strong Earnings',
      description: 'Major technology companies see significant gains following positive earnings reports and increased AI investment.',
      content: 'Technology stocks experienced a significant rally today as major AI companies reported stronger-than-expected earnings for the quarter. The surge was led by companies investing heavily in artificial intelligence technologies, with many reporting double-digit revenue growth. Investors are showing renewed confidence in the tech sector as AI adoption continues to accelerate across various industries. The positive earnings reports have also boosted sentiment in related sectors, including cloud computing and semiconductor companies.',
      url: '#',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'Bloomberg',
      author: 'Tech Analyst',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop&crop=center',
      sentiment: 'positive'
    },
    {
      title: 'Oil Prices Surge on Supply Concerns and Geopolitical Tensions',
      description: 'Crude oil prices jump 3% as supply disruptions and international tensions create market volatility.',
      url: '#',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: 'CNBC',
      author: 'Energy Reporter',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      sentiment: 'negative'
    },
    {
      title: 'Cryptocurrency Market Shows Signs of Recovery',
      description: 'Bitcoin and other major cryptocurrencies gain momentum as institutional adoption increases.',
      url: '#',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: 'CoinDesk',
      author: 'Crypto Analyst',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&crop=center',
      sentiment: 'positive'
    },
    {
      title: 'Apple Reports Strong iPhone Sales Despite Market Headwinds',
      description: 'Apple Inc. shows resilience with better-than-expected iPhone sales and services revenue growth.',
      url: '#',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: 'Apple Insider',
      author: 'Tech Reporter',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center',
      sentiment: 'positive'
    },
    {
      title: 'Tesla Stock Volatility Continues Amid Production Challenges',
      description: 'Tesla faces ongoing production issues while maintaining strong demand for electric vehicles.',
      url: '#',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: 'Electrek',
      author: 'EV Analyst',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&crop=center',
      sentiment: 'negative'
    }
  ]

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

  // Add region modal handlers
  const handleAddRegion = (regionData) => {
    setCustomRegions([...customRegions, regionData])
  }

  const handleAddToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol])
    }
  }

  const handleAddToCategory = (symbol, category) => {
    // For now, just add to watchlist as a simple implementation
    // In a real app, this would add to the specific category's data
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol])
    }
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

  // Fetch real news articles
  const fetchRealNews = async () => {
    setIsLoadingNews(true)
    try {
      console.log('🔍 Fetching news...')
      
      // Try direct API call first to test
      try {
        const directResponse = await fetch(
          'https://newsapi.org/v2/everything?q=finance&apiKey=d9c309a09f2f4500bf7ebb143ab76a25&pageSize=12'
        )
        if (directResponse.ok) {
          const directData = await directResponse.json()
          console.log('🎯 Direct API call successful:', directData.articles?.length, 'articles')
          if (directData.articles && directData.articles.length > 0) {
            const formattedNews = directData.articles.map(article => ({
              title: article.title,
              description: article.description,
              content: article.content || article.description,
              url: article.url,
              publishedAt: article.publishedAt,
              source: article.source.name,
              author: article.author,
              image: article.urlToImage,
              sentiment: 'neutral'
            }))
            setRealNews(formattedNews)
            console.log('✅ Loaded REAL news via direct API:', formattedNews.length, 'articles')
            setIsLoadingNews(false)
            return
          }
        }
      } catch (directError) {
        console.log('❌ Direct API call failed:', directError.message)
      }
      
      // Fallback to news service
      const newsData = await newsService.getFinancialNews(12)
      console.log('📰 News service returned:', newsData)
      if (newsData && newsData.length > 0) {
        setRealNews(newsData)
        console.log('✅ Loaded news data:', newsData.length, 'articles')
        console.log('First article:', newsData[0]?.title)
      } else {
        console.log('❌ No news data received, using fallback')
        // Use mock data as fallback
        setRealNews(getMockFinancialNews().slice(0, 12))
      }
    } catch (error) {
      console.log('❌ News service error:', error.message)
      // Use mock data as fallback
      setRealNews(getMockFinancialNews().slice(0, 12))
    } finally {
      setIsLoadingNews(false)
    }
  }

  // Load more news function
  const loadMoreNews = async () => {
    setIsLoadingNews(true)
    try {
      const nextPage = currentPage + 1
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=finance&apiKey=d9c309a09f2f4500bf7ebb143ab76a25&page=${nextPage}&pageSize=6`
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.articles && data.articles.length > 0) {
          const newArticles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            content: article.content || article.description,
            url: article.url,
            publishedAt: article.publishedAt,
            source: article.source.name,
            author: article.author,
            image: article.urlToImage,
            sentiment: 'neutral'
          }))
          
          setRealNews(prev => [...prev, ...newArticles])
          setCurrentPage(nextPage)
          setDisplayedNewsCount(prev => prev + 6)
        } else {
          // If no articles, add mock data as fallback
          console.log('No more articles available, adding mock data')
          addMockNewsData()
        }
      } else if (response.status === 429) {
        // Rate limit hit, add mock data as fallback
        console.log('Rate limit hit, adding mock data')
        addMockNewsData()
      } else {
        console.log('API request failed, adding mock data')
        addMockNewsData()
      }
    } catch (error) {
      console.error('Failed to load more news:', error)
      // Add mock data as fallback
      addMockNewsData()
    } finally {
      setIsLoadingNews(false)
    }
  }

  // Add mock news data as fallback
  const addMockNewsData = () => {
    const mockArticles = [
      {
        title: 'Federal Reserve Maintains Interest Rates Amid Economic Uncertainty',
        description: 'The Federal Reserve keeps interest rates steady as inflation concerns persist and economic growth shows mixed signals.',
        content: 'The Federal Reserve has decided to maintain current interest rates as economic indicators show mixed signals. This decision comes amid ongoing concerns about inflation and the need to balance economic growth with price stability.',
        url: '#',
        publishedAt: new Date().toISOString(),
        source: 'Financial Times',
        author: 'Economic Reporter',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center',
        sentiment: 'neutral'
      },
      {
        title: 'Tech Stocks Rally on Strong Earnings Reports',
        description: 'Major technology companies report better-than-expected earnings, driving stock prices higher across the sector.',
        content: 'Technology stocks experienced significant gains following positive earnings reports from major companies. The rally was led by strong performance in cloud computing and artificial intelligence sectors.',
        url: '#',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: 'TechCrunch',
        author: 'Tech Analyst',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop&crop=center',
        sentiment: 'positive'
      },
      {
        title: 'Energy Sector Faces Volatility as Oil Prices Fluctuate',
        description: 'Oil prices show significant volatility as supply concerns and demand forecasts create market uncertainty.',
        content: 'The energy sector is experiencing increased volatility as oil prices fluctuate due to changing supply and demand dynamics. Market analysts are closely watching for signs of stabilization.',
        url: '#',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: 'Energy Weekly',
        author: 'Energy Reporter',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
        sentiment: 'negative'
      },
      {
        title: 'Cryptocurrency Market Shows Signs of Recovery',
        description: 'Bitcoin and other major cryptocurrencies gain momentum as institutional adoption increases.',
        content: 'The cryptocurrency market is showing signs of recovery with Bitcoin and other major digital currencies posting gains. Institutional adoption continues to drive interest in the sector.',
        url: '#',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: 'CoinDesk',
        author: 'Crypto Analyst',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&crop=center',
        sentiment: 'positive'
      },
      {
        title: 'Healthcare Stocks Rise on Drug Approval News',
        description: 'Several pharmaceutical companies see stock price increases following FDA drug approvals.',
        content: 'Healthcare stocks are experiencing gains as multiple pharmaceutical companies receive FDA approvals for new drugs. This development is expected to drive sector growth.',
        url: '#',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        source: 'Healthcare News',
        author: 'Medical Reporter',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
        sentiment: 'positive'
      },
      {
        title: 'Banking Sector Faces Regulatory Challenges',
        description: 'Major banks navigate new regulatory requirements while maintaining profitability.',
        content: 'The banking sector is adapting to new regulatory requirements while working to maintain profitability. Industry leaders are focusing on compliance and operational efficiency.',
        url: '#',
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        source: 'Banking Today',
        author: 'Financial Reporter',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
        sentiment: 'neutral'
      }
    ]
    
    setRealNews(prev => [...prev, ...mockArticles])
    setCurrentPage(prev => prev + 1)
    setDisplayedNewsCount(prev => prev + 6)
  }

  // Load real news on component mount
  useEffect(() => {
    fetchRealNews()
  }, [])

  const generateAdaptiveSuggestions = (input, filter = selectedFilter) => {
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
    const categorySuggestions = allSuggestions[filter] || allSuggestions.All
    
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

  // Get market data from state
  const indicesByRegion = marketIndices;
  indicesByRegion.Watchlist = []; // Add empty watchlist
  
  // Function to get indices based on selected region
  const getIndicesForRegion = (region) => {
    if (region === 'All') {
      // Show all indices from all regions
      return [
        ...(marketIndices.US || []),
        ...(marketIndices.Europe || []),
        ...(marketIndices.Asia || []),
        ...(marketIndices.Currencies || []),
        ...(marketIndices.Crypto || [])
      ];
    } else if (region === 'Currencies') {
      // Show only currencies
      return marketIndices.Currencies || [];
    } else if (region === 'Crypto') {
      // Show only crypto
      return marketIndices.Crypto || [];
    } else if (region === 'Watchlist') {
      return watchlist.map(symbolToIndex);
    } else if (customRegions.find(cr => cr.name === region)) {
      // Handle custom regions
      const customRegion = customRegions.find(cr => cr.name === region);
      return customRegion.symbols.map(symbolToIndex);
    } else {
      // Default to existing region logic
      return marketIndices[region] || [];
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Custom CSS for flowing ring animation */}
      <style>{`
        @keyframes flowing-gradient {
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
        
        .flowing-gradient {
          background-size: 200% 200%;
          animation: flowing-gradient 8s ease-in-out infinite;
        }
        
        /* Moving and color-shifting glow */
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes spin-angle {
          to { --angle: 360deg; }
        }
        @keyframes hue-shift {
          0% { filter: hue-rotate(0deg) blur(8px); }
          100% { filter: hue-rotate(360deg) blur(8px); }
        }

        .rainbow-glow {
          position: absolute;
          inset: -3px; /* thinner glow spread */
          border-radius: 2.2rem;
          --angle: 0deg;
          background: conic-gradient(
            from var(--angle),
            #ff3b30 0deg,
            #ff9500 60deg,
            #ffcc00 120deg,
            #34c759 180deg,
            #00c7ff 240deg,
            #007aff 300deg,
            #af52de 360deg
          );
          filter: blur(8px); /* thinner glow */
          opacity: 0.6;
          animation: hue-shift 12s linear infinite, spin-angle 10s linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Top Navigation Tabs */}
      {/* removed top nav; filters moved above index cards */}

      {/* Main Content Area */}
      <div className="flex h-screen flex-row-reverse">
        {/* Left Panel - Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-5xl mx-auto p-6 pb-24 space-y-6 text-slate-900 dark:text-slate-100">
            {/* Data Source Status Indicator */}
            
            {selectedStock ? (
              <StockDetailView symbol={selectedStock} onClose={handleCloseStockDetail} />
            ) : selectedNews ? (
              <NewsDetailView article={selectedNews} onClose={handleCloseNewsDetail} />
            ) : (
              <>
            {/* Region Filters (Pills) */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mt-1">
              {[...regionTabs, ...customRegions.map(cr => cr.name)].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedRegion(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap h-8 ${
                    tab === selectedRegion
                      ? 'bg-gray-100 dark:bg-slate-800 text-green-700 dark:text-green-300 border-gray-300 dark:border-slate-700'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                  aria-pressed={tab === selectedRegion}
                >
                  {tab}
                </button>
              ))}
              {/* Plus button to add new regions */}
              <button
                onClick={() => setShowAddRegionModal(true)}
                className="px-3 py-1.5 text-sm font-medium rounded-full border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-200 h-8 flex items-center gap-1"
                title="Add custom region or individual stocks"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {/* Watchlist display (visible only when Watchlist selected) */}
            {selectedRegion === 'Watchlist' && (
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-600">
                    Use the + button above to add stocks to your watchlist
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
            <div className="relative">
              {/* Fade overlay for scroll indication */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {getIndicesForRegion(selectedRegion).map((index) => (
                <div 
                  key={index.name} 
                  className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0 w-48 min-w-[12rem]"
                  onClick={() => handleStockClick(index.name.replace(/\s+/g, '').toUpperCase())}
                >
                  {/* Title and value */}
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1 leading-snug">{index.name}</div>
                  <div className="text-[13px] text-slate-600 dark:text-slate-400 leading-tight">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{index.value}</div>
                    <div className="text-slate-500 dark:text-slate-500">({index.change})</div>
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
            </div>
            
            {/* News Stories Grid */}
              <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Latest Updates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingNews ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : realNews.length > 0 ? (
                // Real news data (shows based on displayedNewsCount)
                realNews.slice(0, displayedNewsCount).map((story, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleNewsClick(story)}
                    className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={story.image || '/placeholder-news.jpg'} 
                        alt={story.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-news.jpg'
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-800 dark:text-slate-100">
                        {story.source || 'News'}
                      </div>
                      {story.sentiment && (
                        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold ${
                          story.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          story.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {story.sentiment}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-2 line-clamp-3">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{new Date(story.publishedAt).toLocaleDateString()}</span>
                        {story.author && <span>· {story.author}</span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback to mock data
                [
                { 
                  time: '28m ago', 
                  source: 'CNBC', 
                  headline: 'What you missed in markets Tuesday',
                  author: 'Sean Conlon and Pia Singh',
                  image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center',
                  logo: 'CNBC'
                },
                { 
                  time: '28m ago', 
                  source: 'Yahoo Finance', 
                  headline: 'A compromise on Affordable Care Act subsidies could end the shutdown. The question is when.',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop&crop=center',
                  logo: 'Yahoo Finance'
                },
                { 
                  time: '28m ago', 
                  source: 'Business Insider', 
                  headline: 'Consumers are spending like there\'s no tomorrow. It may not be enough to stop a recession.',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
                  logo: 'Business Insider'
                },
                { 
                  time: '28m ago', 
                  source: 'Politico', 
                  headline: 'Chicago journalists, protesters sue Trump administration, alleging "extreme brutality"',
                  author: 'Faith Wardwell',
                  image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center',
                  logo: 'Politico'
                },
                { 
                  time: '28m ago', 
                  source: 'The Wall Street Journal', 
                  headline: 'U.S. warehouse vacancies steady as demand rises with less new space',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
                  logo: 'WSJ'
                },
                { 
                  time: '28m ago', 
                  source: 'The Washington Post', 
                  headline: 'Americans have become more pessimistic about AI. Why?',
                  author: '',
                  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center',
                  logo: 'WaPo'
                }
              ].map((story, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-200">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={story.image} 
                      alt={story.headline}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE1MCAxMDBIMjUwVjIwMEgxNTBWMTIwWiIgZmlsbD0iI0U1RTdFQiIvPgo8L3N2Zz4K'
                      }}
                    />
                    {/* Source logo overlay */}
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-800 dark:text-slate-100">
                      {story.logo}
                    </div>
                  </div>
                  
                  {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-2 line-clamp-3">
                      {story.headline}
                    </h3>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{story.time}</span>
                      {story.author && <span>· {story.author}</span>}
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
            
            {/* View More Button */}
            <div className="text-center mt-6">
              <button 
                onClick={loadMoreNews}
                disabled={isLoadingNews}
                className="inline-flex items-center space-x-2 px-6 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoadingNews ? 'Loading...' : 'View More'}</span>
                {!isLoadingNews && (
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>
            
            
            {/* Trading Recommendations moved into chat panel */}
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="w-1/3 min-w-[20rem] max-w-[35rem] flex flex-col m-2">
          <div className="flex-1 overflow-hidden no-scrollbar">
            <AIChatPanel 
              onStockClick={handleStockClick} 
              onHomeClick={handleCloseStockDetail}
              marketMovers={marketMovers}
            />
          </div>
        </div>
      </div>

      {/* Bottom Search Bar acts as Chat Input */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50" ref={searchRef}>
        <div className="relative">
          {/* Search Bar Container with Glowing Rainbow Ring */}
          <div className="relative rounded-[2rem] w-[36rem] max-w-[90vw]">
            <div className="rainbow-glow"></div>
            <div className="relative z-10 rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden border border-gray-200 dark:border-slate-800">
          {/* Suggestions content (visible when open) */}
          {isSearchOpen && (
            <div className="relative z-10">
              <div className="px-5 pt-4 pb-3">
                <div className="text-sm font-semibold text-gray-700 dark:text-slate-200">Trending questions</div>
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
                      className="w-full text-left px-3 py-2 hover:bg-white/20 dark:hover:bg-white/10 text-gray-700 dark:text-slate-200 bg-transparent border-0 outline-none"
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
                        const suggestions = generateAdaptiveSuggestions(searchText, c)
                        setDynamicSuggestions(suggestions)
                      }}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap h-8 ${
                        c === selectedFilter
                          ? 'bg-white/80 text-gray-700 border-gray-300'
                          : 'bg-white/50 text-gray-700 border-gray-200 hover:bg-white/70 hover:border-gray-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
        </div>
          </div>
              <div className="border-t border-gray-300 dark:border-slate-700" />
        </div>
          )}
          {/* Input row (always visible, same width) */}
          <div className="px-4 py-2 relative z-10">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex-1 text-sm px-2 py-2 outline-none focus:outline-none focus:ring-0 text-gray-700 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 bg-transparent"
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

      {/* Add Region Modal */}
      <AddRegionModal
        isOpen={showAddRegionModal}
        onClose={() => setShowAddRegionModal(false)}
        onAddRegion={handleAddRegion}
        onAddToWatchlist={handleAddToWatchlist}
        onAddToCategory={handleAddToCategory}
      />

    </div>
  )
}

export default HomePage
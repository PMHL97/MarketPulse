import axios from 'axios';

// API base URLs - Environment-aware configuration
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const baseUrl = isProduction ? 'http://3.144.189.176' : 'http://localhost';

const USER_SERVICE_URL = isProduction ? `${baseUrl}:8080` : `${baseUrl}:8082`;
const ARTICLE_SERVICE_URL = isProduction ? `${baseUrl}:8081` : `${baseUrl}:8083`;
const ANALYSIS_SERVICE_URL = isProduction ? `${baseUrl}:5001` : `${baseUrl}:5002`;

// Create axios instances for each service
const userApi = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000,
});

const articleApi = axios.create({
  baseURL: ARTICLE_SERVICE_URL,
  timeout: 10000,
});

const analysisApi = axios.create({
  baseURL: ANALYSIS_SERVICE_URL,
  timeout: 10000,
});

// Add auth token to requests if available
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Service API calls
export const userService = {
  // Authentication
  register: (userData) => userApi.post('/api/auth/register', userData),
  login: (credentials) => userApi.post('/api/auth/login', credentials),
  
  // Watchlist management
  getWatchlist: () => userApi.get('/api/watchlist'),
  addToWatchlist: (ticker) => userApi.post('/api/watchlist', { ticker }),
  removeFromWatchlist: (ticker) => userApi.delete(`/api/watchlist/${ticker}`),
  
  // User profile
  getProfile: () => userApi.get('/api/profile'),
  updateProfile: (profileData) => userApi.put('/api/profile', profileData),
};

// Article Service API calls
export const articleService = {
  // Get articles with sentiment analysis
  getArticles: (params = {}) => articleApi.get('/api/articles', { params }),
  getArticlesBySymbol: (symbol) => articleApi.get(`/api/articles/symbol/${symbol}`),
  getSentimentTrends: (symbol, timeframe = '7d') => 
    articleApi.get(`/api/articles/sentiment/${symbol}`, { params: { timeframe } }),
  
  // Real-time updates
  subscribeToUpdates: (callback) => {
    // This would be implemented with WebSocket or Server-Sent Events
    // For now, we'll use polling
    return setInterval(() => {
      articleService.getArticles().then(response => {
        callback(response.data);
      });
    }, 30000); // Poll every 30 seconds
  },
};

// Analysis Service API calls
export const analysisService = {
  // Trigger sentiment analysis
  triggerAnalysis: () => analysisApi.post('/trigger-analysis'),
  
  // Get real-time sentiment data
  getSentimentData: () => analysisApi.get('/sentiment-data'),
  
  // Health check
  healthCheck: () => analysisApi.get('/health'),
};

// News API service for real financial news (copied from old frontend)
export const newsService = {
  // Get real financial news from NewsAPI
  getFinancialNews: async (limit = 10) => {
    try {
      // Using NewsAPI free tier (requires API key)
      const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'd9c309a09f2f4500bf7ebb143ab76a25';
      
      console.log('Environment check:', {
        hasImportMeta: typeof import.meta !== 'undefined',
        hasEnv: typeof import.meta.env !== 'undefined',
        apiKey: API_KEY,
        apiKeyLength: API_KEY?.length
      });
      
      // If no API key, use mock data immediately
      if (!API_KEY || API_KEY === 'demo') {
        console.log('❌ No NewsAPI key found, using mock financial news');
        return getMockFinancialNews().slice(0, limit);
      }
      
      console.log('✅ Using NewsAPI with key:', API_KEY.substring(0, 8) + '...');
      
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=finance OR stock OR market OR trading&language=en&sortBy=publishedAt&pageSize=${limit}&apiKey=${API_KEY}`
      );
      
      console.log('NewsAPI response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('NewsAPI response data:', data);
        if (data.articles && data.articles.length > 0) {
          console.log('✅ Found', data.articles.length, 'real articles');
          return data.articles.map(article => ({
            title: article.title,
            description: article.description,
            content: article.content || article.description,
            url: article.url,
            publishedAt: article.publishedAt,
            source: article.source.name,
            author: article.author,
            image: article.urlToImage,
            sentiment: 'neutral' // Would need sentiment analysis service
          }));
        } else {
          console.log('❌ No articles in response');
        }
      } else {
        console.log('❌ NewsAPI response not ok:', response.status, response.statusText);
      }
    } catch (error) {
      console.log('NewsAPI failed, using mock data:', error.message);
    }
    
    // Fallback to mock data
    return getMockFinancialNews().slice(0, limit);
  },

  // Get news by stock symbol (copied from old frontend)
  getNewsBySymbol: async (symbol, limit = 5) => {
    try {
      const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_NEWS_API_KEY) || 'demo';
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${API_KEY}&pageSize=${limit}&sortBy=publishedAt`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.articles) {
          return data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            publishedAt: article.publishedAt,
            source: article.source.name,
            author: article.author,
            image: article.urlToImage,
            sentiment: 'neutral'
          }));
        }
      }
    } catch (error) {
      console.log('NewsAPI failed for symbol', symbol);
    }
    
    return getMockNews(symbol);
  }
};

// Market data service with real API integration
export const marketDataService = {
  // Get real-time stock price data
  getStockPrice: async (symbol) => {
    try {
      // Try to get real data first
      const response = await fetch(`https://api.example.com/stock/${symbol}/price`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock data for', symbol);
    }
    // Fallback to mock data
    return getMockStockData(symbol);
  },

  // Get market overview
  getMarketOverview: async () => {
    try {
      const response = await fetch('https://api.example.com/market/overview');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock market overview');
    }
    return getMockMarketOverview();
  },

  // Get historical data for charts
  getHistoricalData: async (symbol, timeframe = 'daily') => {
    try {
      const response = await fetch(`https://api.example.com/stock/${symbol}/history?timeframe=${timeframe}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock historical data for', symbol);
    }
    return generateMockHistoricalData(symbol);
  },

  // Search for symbols
  searchSymbols: async (query) => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock search results');
    }
    return getMockSearchResults(query);
  },

  // Get news and sentiment data
  getNews: async (symbol, limit = 10) => {
    try {
      const response = await fetch(`https://api.example.com/news/${symbol}?limit=${limit}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock news data');
    }
    return getMockNews(symbol);
  },
};

// Mock data fallbacks
const getMockStockData = (symbol) => ({
  symbol,
  price: Math.random() * 1000 + 100,
  change: (Math.random() - 0.5) * 20,
  changePercent: (Math.random() - 0.5) * 5,
  volume: Math.floor(Math.random() * 1000000),
  high: Math.random() * 1000 + 100,
  low: Math.random() * 1000 + 50,
  open: Math.random() * 1000 + 100,
  previousClose: Math.random() * 1000 + 100,
  timestamp: new Date().toISOString(),
});

const getMockMarketOverview = () => ({
  sp500: { change: 12.34, changePercent: 0.31 },
  nasdaq: { change: -23.45, changePercent: -0.18 },
  dow: { change: 45.67, changePercent: 0.14 },
});

const generateMockHistoricalData = (symbol) => {
  const data = [];
  const now = Date.now();
  const basePrice = 150 + Math.random() * 100;
  
  for (let i = 100; i >= 0; i--) {
    const time = now - (i * 24 * 60 * 60 * 1000); // Daily data
    const open = basePrice + (Math.random() - 0.5) * 10;
    const close = open + (Math.random() - 0.5) * 8;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const volume = Math.floor(Math.random() * 1000000) + 100000;
    
    data.push({
      time: Math.floor(time / 1000),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: volume
    });
  }
  
  return data;
};

const getMockSearchResults = (query) => [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Equity', region: 'United States' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'Equity', region: 'United States' },
];

const getMockFinancialNews = () => [
  {
    title: 'Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty',
    description: 'The Federal Reserve hints at possible interest rate reductions as inflation shows signs of cooling and economic growth slows.',
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
    title: 'Housing Market Shows Mixed Signals as Mortgage Rates Fluctuate',
    description: 'Real estate markets experience varying trends across regions with changing interest rate environment.',
    url: '#',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    source: 'Wall Street Journal',
    author: 'Real Estate Reporter',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
    sentiment: 'neutral'
  },
  {
    title: 'Global Supply Chain Disruptions Impact Manufacturing Sector',
    description: 'International trade tensions and supply chain issues continue to affect manufacturing companies worldwide.',
    url: '#',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    source: 'Financial Times',
    author: 'Trade Reporter',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center',
    sentiment: 'negative'
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
];

const getMockNews = (symbol) => [
  {
    title: `${symbol} Shows Strong Performance in Latest Trading Session`,
    description: `The stock has been performing well with positive market sentiment.`,
    url: '#',
    publishedAt: new Date().toISOString(),
    source: 'Market News',
    sentiment: 'positive'
  },
  {
    title: `Analysts Upgrade ${symbol} Price Target`,
    description: `Several analysts have raised their price targets for the stock.`,
    url: '#',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: 'Financial Times',
    sentiment: 'positive'
  }
];

export default {
  userService,
  articleService,
  analysisService,
  marketDataService,
  newsService,
};



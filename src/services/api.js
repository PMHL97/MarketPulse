import axios from 'axios';

// API base URLs
const USER_SERVICE_URL = 'http://localhost:8082';
const ARTICLE_SERVICE_URL = 'http://localhost:8083';
const ANALYSIS_SERVICE_URL = 'http://localhost:5002';

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

// Market data service with real API integration
export const marketDataService = {
  // Get real-time stock price data
  getStockPrice: async (symbol) => {
    try {
      // Using Alpha Vantage API (free tier)
      const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ALPHA_VANTAGE_API_KEY) || 'demo';
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          high: parseFloat(quote['03. high']),
          low: parseFloat(quote['04. low']),
          open: parseFloat(quote['02. open']),
          previousClose: parseFloat(quote['08. previous close']),
          timestamp: new Date().toISOString(),
        };
      } else {
        // Fallback to mock data if API fails
        return getMockStockData(symbol);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return getMockStockData(symbol);
    }
  },

  // Get market overview with real indices data
  getMarketOverview: async () => {
    try {
      const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ALPHA_VANTAGE_API_KEY) || 'demo';
      const indices = ['SPY', 'QQQ', 'DIA']; // ETFs that track major indices
      const promises = indices.map(async (symbol) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();
        return { symbol, data };
      });

      const results = await Promise.all(promises);
      const overview = {};

      results.forEach(({ symbol, data }) => {
        if (data['Global Quote']) {
          const quote = data['Global Quote'];
          const change = parseFloat(quote['09. change']);
          const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
          
          if (symbol === 'SPY') {
            overview.sp500 = { change, changePercent };
          } else if (symbol === 'QQQ') {
            overview.nasdaq = { change, changePercent };
          } else if (symbol === 'DIA') {
            overview.dow = { change, changePercent };
          }
        }
      });

      // Fallback to mock data if any API calls fail
      if (Object.keys(overview).length === 0) {
        return getMockMarketOverview();
      }

      return overview;
    } catch (error) {
      console.error('Error fetching market overview:', error);
      return getMockMarketOverview();
    }
  },

  // Get historical data for charts
  getHistoricalData: async (symbol, timeframe = 'daily') => {
    try {
      const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ALPHA_VANTAGE_API_KEY) || 'demo';
      const function_name = timeframe === 'daily' ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_INTRADAY';
      const interval = timeframe === '1min' ? '&interval=1min' : '';
      
      const response = await fetch(
        `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol}&apikey=${API_KEY}${interval}`
      );
      const data = await response.json();
      
      const timeSeriesKey = timeframe === 'daily' ? 'Time Series (Daily)' : 'Time Series (1min)';
      
      if (data[timeSeriesKey]) {
        const timeSeries = data[timeSeriesKey];
        const chartData = Object.entries(timeSeries).map(([date, values]) => ({
          time: Math.floor(new Date(date).getTime() / 1000),
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
          volume: parseInt(values['5. volume']),
        })).sort((a, b) => a.time - b.time);
        
        return chartData;
      } else {
        return generateMockHistoricalData(symbol);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return generateMockHistoricalData(symbol);
    }
  },

  // Search for symbols
  searchSymbols: async (query) => {
    try {
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'demo';
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.bestMatches) {
        return data.bestMatches.map(match => ({
          symbol: match['1. symbol'],
          name: match['2. name'],
          type: match['3. type'],
          region: match['4. region'],
          marketOpen: match['5. marketOpen'],
          marketClose: match['6. marketClose'],
          timezone: match['7. timezone'],
          currency: match['8. currency'],
        }));
      } else {
        return getMockSearchResults(query);
      }
    } catch (error) {
      console.error('Error searching symbols:', error);
      return getMockSearchResults(query);
    }
  },

  // Get news and sentiment data
  getNews: async (symbol, limit = 10) => {
    try {
      const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_NEWS_API_KEY) || 'demo';
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${API_KEY}&pageSize=${limit}&sortBy=publishedAt`
      );
      const data = await response.json();
      
      if (data.articles) {
        return data.articles.map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          sentiment: 'neutral', // Would be calculated by sentiment analysis service
        }));
      } else {
        return getMockNews(symbol);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      return getMockNews(symbol);
    }
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
};

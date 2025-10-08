import { create } from 'zustand';

const useMarketDataStore = create((set, get) => ({
  // State
  stockPrices: {},
  marketOverview: null,
  historicalData: {},
  realTimeUpdates: {},
  isLoading: false,
  error: null,
  subscriptions: new Set(),

  // Actions
  fetchStockPrice: async (symbol) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate real-time data with realistic fluctuations
      const basePrice = getBasePrice(symbol);
      const volatility = getVolatility(symbol);
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = basePrice + change;
      const changePercent = (change / basePrice) * 100;

      const data = {
        symbol,
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        high: parseFloat((newPrice + Math.random() * 2).toFixed(2)),
        low: parseFloat((newPrice - Math.random() * 2).toFixed(2)),
        open: parseFloat(basePrice.toFixed(2)),
        previousClose: parseFloat(basePrice.toFixed(2)),
        timestamp: new Date().toISOString(),
        trend: change >= 0 ? 'up' : 'down'
      };

      set(state => ({
        stockPrices: {
          ...state.stockPrices,
          [symbol]: data
        },
        isLoading: false,
        error: null,
      }));
      return data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch stock price',
      });
      throw error;
    }
  },

  fetchMarketOverview: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRealtimeMarketData();
      set({
        marketOverview: data,
        isLoading: false,
        error: null,
      });
      return data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch market overview',
      });
      throw error;
    }
  },

  fetchHistoricalData: async (symbol, timeframe = 'daily') => {
    set({ isLoading: true, error: null });
    try {
      const data = generateMockHistoricalData(symbol, timeframe);
      set(state => ({
        historicalData: {
          ...state.historicalData,
          [`${symbol}_${timeframe}`]: data
        },
        isLoading: false,
        error: null,
      }));
      return data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch historical data',
      });
      throw error;
    }
  },

  subscribeToRealTimeUpdates: (symbol, callback) => {
    const subscription = {
      symbol,
      callback,
      id: Date.now() + Math.random()
    };
    
    set(state => ({
      subscriptions: new Set([...state.subscriptions, subscription])
    }));

    // Start real-time updates
    const interval = setInterval(async () => {
      try {
        const data = await get().fetchStockPrice(symbol);
        callback(data);
      } catch (error) {
        console.error('Real-time update failed:', error);
      }
    }, 3000); // Update every 3 seconds

    // Return unsubscribe function
    return () => {
      clearInterval(interval);
      set(state => {
        const newSubscriptions = new Set(state.subscriptions);
        newSubscriptions.delete(subscription);
        return { subscriptions: newSubscriptions };
      });
    };
  },

  getStockPrice: (symbol) => {
    return get().stockPrices[symbol] || null;
  },

  getHistoricalData: (symbol, timeframe = 'daily') => {
    return get().historicalData[`${symbol}_${timeframe}`] || null;
  },

  clearError: () => set({ error: null }),
}));

// Helper functions
const getBasePrice = (symbol) => {
  const basePrices = {
    'AAPL': 178.23, 'MSFT': 378.45, 'GOOGL': 145.67, 'TSLA': 234.56, 'NVDA': 168.45,
    'AMZN': 156.78, 'META': 345.67, 'NFLX': 456.78, 'AMD': 89.23, 'INTC': 45.67,
    'SPY': 4567.89, 'QQQ': 14234.56, 'DIA': 34567.89, 'BTC-USD': 43567.89, 'ETH-USD': 2345.67,
    'EURUSD': 1.0876, 'GBPUSD': 1.2654, 'USDJPY': 149.23, 'CL=F': 78.90, 'GC=F': 1987.65
  };
  return basePrices[symbol] || 100 + Math.random() * 200;
};

const getVolatility = (symbol) => {
  const volatilities = {
    'AAPL': 2.5, 'MSFT': 2.0, 'GOOGL': 2.8, 'TSLA': 8.0, 'NVDA': 5.0,
    'AMZN': 3.5, 'META': 4.0, 'NFLX': 3.0, 'AMD': 4.5, 'INTC': 2.5,
    'SPY': 15.0, 'QQQ': 25.0, 'DIA': 50.0, 'BTC-USD': 500.0, 'ETH-USD': 50.0,
    'EURUSD': 0.01, 'GBPUSD': 0.01, 'USDJPY': 0.5, 'CL=F': 2.0, 'GC=F': 20.0
  };
  return volatilities[symbol] || 2.0;
};

const getRealtimeMarketData = async () => {
  const indices = [
    { name: 'S&P 500', symbol: 'SPY', price: (4567.89 + (Math.random() - 0.5) * 50).toFixed(2), change: ((Math.random() - 0.5) * 20).toFixed(2), percent: ((Math.random() - 0.5) * 2).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'NASDAQ', symbol: 'QQQ', price: (14234.56 + (Math.random() - 0.5) * 100).toFixed(2), change: ((Math.random() - 0.5) * 50).toFixed(2), percent: ((Math.random() - 0.5) * 2).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'DOW', symbol: 'DIA', price: (34567.89 + (Math.random() - 0.5) * 200).toFixed(2), change: ((Math.random() - 0.5) * 100).toFixed(2), percent: ((Math.random() - 0.5) * 1).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'Nikkei 225', symbol: 'NI225', price: (32456.78 + (Math.random() - 0.5) * 300).toFixed(2), change: ((Math.random() - 0.5) * 150).toFixed(2), percent: ((Math.random() - 0.5) * 1.5).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'FTSE 100', symbol: 'UKX', price: (7456.78 + (Math.random() - 0.5) * 50).toFixed(2), change: ((Math.random() - 0.5) * 25).toFixed(2), percent: ((Math.random() - 0.5) * 1).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'DAX', symbol: 'DAX', price: (15678.90 + (Math.random() - 0.5) * 100).toFixed(2), change: ((Math.random() - 0.5) * 50).toFixed(2), percent: ((Math.random() - 0.5) * 1.5).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' }
  ];

  const crypto = [
    { name: 'Bitcoin', symbol: 'BTCUSD', price: (43567.89 + (Math.random() - 0.5) * 2000).toFixed(2), change: ((Math.random() - 0.5) * 1000).toFixed(2), percent: ((Math.random() - 0.5) * 5).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'Ethereum', symbol: 'ETHUSD', price: (2345.67 + (Math.random() - 0.5) * 200).toFixed(2), change: ((Math.random() - 0.5) * 100).toFixed(2), percent: ((Math.random() - 0.5) * 5).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' }
  ];

  const commodities = [
    { name: 'WTI Crude Oil', symbol: 'CL1!', price: (78.90 + (Math.random() - 0.5) * 5).toFixed(2), change: ((Math.random() - 0.5) * 2).toFixed(2), percent: ((Math.random() - 0.5) * 3).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'Gold', symbol: 'GC1!', price: (1987.65 + (Math.random() - 0.5) * 50).toFixed(2), change: ((Math.random() - 0.5) * 25).toFixed(2), percent: ((Math.random() - 0.5) * 2).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'Gas', symbol: 'NG1!', price: (2.34 + (Math.random() - 0.5) * 0.5).toFixed(2), change: ((Math.random() - 0.5) * 0.2).toFixed(2), percent: ((Math.random() - 0.5) * 5).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' },
    { name: 'Copper', symbol: 'HG1!', price: (3.45 + (Math.random() - 0.5) * 0.3).toFixed(2), change: ((Math.random() - 0.5) * 0.15).toFixed(2), percent: ((Math.random() - 0.5) * 3).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' }
  ];

  const forex = [
    { name: 'U.S. Dollar', symbol: 'DXY', price: (102.34 + (Math.random() - 0.5) * 2).toFixed(2), change: ((Math.random() - 0.5) * 1).toFixed(2), percent: ((Math.random() - 0.5) * 1).toFixed(2) + '%', trend: Math.random() > 0.5 ? 'up' : 'down' }
  ];

  return {
    indices,
    crypto,
    commodities,
    forex,
    lastUpdated: new Date().toISOString()
  };
};

const generateMockHistoricalData = (symbol, timeframe) => {
  const data = [];
  const now = Date.now();
  const basePrice = getBasePrice(symbol);
  const points = timeframe === 'daily' ? 100 : 50;
  
  for (let i = points; i >= 0; i--) {
    const time = now - (i * (timeframe === 'daily' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000));
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

export default useMarketDataStore;

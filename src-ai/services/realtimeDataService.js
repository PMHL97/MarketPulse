// Real-time Data Service for Market Pulse - Backend Proxy Only
import realStockDataService from './realStockDataService';

class RealtimeDataService {
  constructor() {
    // No direct API calls - all data comes through backend proxy
    console.log('🚀 Real-time Data Service initialized (backend proxy only)');
  }

  // Real-time stock price updates - Uses backend proxy only
  async getRealtimeStockPrice(symbol) {
    try {
      console.log(`🔍 Fetching real-time data for ${symbol}...`);
      
      // Use backend proxy service only (no direct API calls to avoid CORS)
      const realData = await realStockDataService.getRealStockPrice(symbol);
      console.log(`📊 Backend response for ${symbol}:`, realData);
      
      if (realData && realData.price && realData.price > 0) {
        if (realData.isRealTime) {
          console.log(`✅ Got REAL data for ${symbol}: $${realData.price} (${realData.dataSource})`);
        } else {
          console.log(`⚠️ Enhanced mock data for ${symbol}: $${realData.price} (${realData.dataSource})`);
        }
        return this.formatStockData(symbol, realData);
      }

      // If backend proxy fails, use enhanced mock data
      console.log(`⚠️ Backend proxy failed for ${symbol}, using enhanced mock data`);
      return this.getEnhancedMockData(symbol);
    } catch (error) {
      console.error(`❌ Real-time price fetch failed for ${symbol}:`, error);
      return this.getEnhancedMockData(symbol);
    }
  }

  // Get real-time market overview
  async getRealtimeMarketOverview() {
    try {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX'];
      const results = await realStockDataService.getMultipleStockPrices(symbols);
      
      if (Object.keys(results).length > 0) {
        console.log(`✅ Got market overview for ${Object.keys(results).length} stocks from backend proxy`);
        return results;
      }

      // Fallback to enhanced mock data
      console.log(`⚠️ Backend proxy failed for market overview, using enhanced mock data`);
      return this.getEnhancedMockMarketOverview();
    } catch (error) {
      console.error('Market overview fetch failed:', error);
      return this.getEnhancedMockMarketOverview();
    }
  }

  // Format stock data consistently
  formatStockData(symbol, data) {
    return {
      symbol,
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.volume,
      high: data.high,
      low: data.low,
      open: data.open,
      previousClose: data.previousClose,
      timestamp: data.timestamp,
      trend: data.change >= 0 ? 'up' : 'down',
      isRealTime: data.isRealTime || false,
      dataSource: data.dataSource || 'enhanced-mock'
    };
  }

  // Enhanced mock data with realistic fluctuations
  getEnhancedMockData(symbol) {
    const basePrice = this.getBasePrice(symbol);
    const volatility = this.getVolatility(symbol);
    
    // Create more realistic price movements
    const timeOfDay = new Date().getHours();
    const marketOpen = timeOfDay >= 9 && timeOfDay <= 16; // Market hours simulation
    
    // Higher volatility during market hours
    const adjustedVolatility = marketOpen ? volatility * 1.5 : volatility * 0.3;
    
    // Add some trending behavior (not completely random)
    const trendFactor = Math.sin(Date.now() / 100000) * 0.5; // Slow trending
    const change = (Math.random() - 0.5 + trendFactor) * adjustedVolatility;
    const newPrice = Math.max(0.01, basePrice + change); // Ensure positive price
    const changePercent = (change / basePrice) * 100;

    return {
      symbol,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(this.getBaseVolume(symbol) * (marketOpen ? 1.5 : 0.3) * (1 + Math.random() * 0.5)),
      high: parseFloat((newPrice + Math.random() * 3).toFixed(2)),
      low: parseFloat((newPrice - Math.random() * 3).toFixed(2)),
      open: parseFloat(basePrice.toFixed(2)),
      previousClose: parseFloat(basePrice.toFixed(2)),
      timestamp: new Date().toISOString(),
      trend: change >= 0 ? 'up' : 'down',
      isRealTime: false,
      dataSource: 'enhanced-mock'
    };
  }

  // Enhanced mock market overview
  getEnhancedMockMarketOverview() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX'];
    const results = {};
    
    symbols.forEach(symbol => {
      results[symbol] = this.getEnhancedMockData(symbol);
    });
    
    return results;
  }

  // Get base price for symbol
  getBasePrice(symbol) {
    const basePrices = {
      'AAPL': 178.23, 'MSFT': 378.45, 'GOOGL': 145.67, 'TSLA': 234.56, 'NVDA': 168.45,
      'AMZN': 145.32, 'META': 320.15, 'NFLX': 425.67, 'AMD': 98.45, 'INTC': 45.67,
      'SPY': 415.23, 'QQQ': 365.45, 'DIA': 340.12, 'BTC-USD': 45000.00, 'ETH-USD': 3200.00,
      'EURUSD': 1.0876, 'GBPUSD': 1.2654, 'USDJPY': 149.23, 'CL=F': 78.90, 'GC=F': 1987.65
    };
    return basePrices[symbol] || 100 + Math.random() * 200;
  }

  // Get volatility for symbol
  getVolatility(symbol) {
    const volatilities = {
      'AAPL': 2.5, 'MSFT': 2.0, 'GOOGL': 2.8, 'TSLA': 8.0, 'NVDA': 5.0,
      'AMZN': 3.5, 'META': 4.0, 'NFLX': 3.0, 'AMD': 4.5, 'INTC': 2.5,
      'SPY': 15.0, 'QQQ': 25.0, 'DIA': 50.0, 'BTC-USD': 500.0, 'ETH-USD': 50.0,
      'EURUSD': 0.01, 'GBPUSD': 0.01, 'USDJPY': 0.5, 'CL=F': 2.0, 'GC=F': 20.0
    };
    return volatilities[symbol] || 2.0;
  }

  // Get base volume for symbol
  getBaseVolume(symbol) {
    const baseVolumes = {
      'AAPL': 50000000, 'MSFT': 30000000, 'GOOGL': 25000000, 'TSLA': 80000000,
      'NVDA': 40000000, 'AMZN': 35000000, 'META': 20000000, 'NFLX': 15000000,
      'AMD': 25000000, 'INTC': 20000000, 'SPY': 100000000, 'QQQ': 50000000,
      'DIA': 30000000, 'BTC-USD': 1000000, 'ETH-USD': 2000000
    };
    return baseVolumes[symbol] || 1000000;
  }

  // Subscribe to real-time updates (simulated with polling)
  subscribe(symbol, callback) {
    console.log(`📡 Subscribing to real-time updates for ${symbol}`);
    
    // Simulate real-time updates with polling
    const intervalId = setInterval(async () => {
      try {
        const data = await this.getRealtimeStockPrice(symbol);
        callback(data);
      } catch (error) {
        console.error(`Error in subscription for ${symbol}:`, error);
      }
    }, 5000); // Update every 5 seconds

    // Return unsubscribe function
    return () => {
      console.log(`📡 Unsubscribing from real-time updates for ${symbol}`);
      clearInterval(intervalId);
    };
  }
}

// Export singleton instance
export default new RealtimeDataService();
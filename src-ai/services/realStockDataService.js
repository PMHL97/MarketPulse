// Real Stock Data Service - Uses backend proxy to avoid CORS issues
import axios from 'axios';

class RealStockDataService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds cache
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const envUrl = import.meta.env.VITE_STOCK_DATA_API_URL;
    if (!isLocal && !envUrl) {
      throw new Error('VITE_STOCK_DATA_API_URL must be set in production build');
    }
    this.backendUrl = isLocal ? (envUrl || 'http://localhost:5003') : envUrl; // Backend proxy service
  }

  // Get real stock data from backend proxy
  async getRealStockPrice(symbol) {
    try {
      console.log(`🔍 Requesting data for ${symbol} from backend...`);
      
      // Check cache first (reduced cache time for debugging)
      const cached = this.cache.get(symbol);
      if (cached && Date.now() - cached.timestamp < 5000) { // 5 seconds cache for debugging
        console.log(`📦 Using cached data for ${symbol}`);
        return cached.data;
      }

      // Use backend proxy to avoid CORS issues (with cache busting)
      const response = await axios.get(`${this.backendUrl}/api/stock/${symbol}?t=${Date.now()}`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log(`📊 Backend response for ${symbol}:`, response.data);

      if (response.data && response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Cache the result
        this.cache.set(symbol, {
          data: data,
          timestamp: Date.now()
        });
        
        if (data.isRealTime) {
          console.log(`✅ Real data for ${symbol}: $${data.price} (${data.dataSource})`);
        } else {
          console.log(`⚠️ Enhanced mock data for ${symbol}: $${data.price} (${data.dataSource})`);
        }
        
        return data;
      }

      // If backend fails, return null to indicate no real data
      console.log(`❌ Backend proxy failed for ${symbol} - invalid response structure`);
      return null;
    } catch (error) {
      console.error(`❌ Backend proxy failed for ${symbol}:`, error.message);
      if (error.response) {
        console.error(`❌ Backend error response:`, error.response.data);
      }
      return null;
    }
  }

  // Get multiple stock prices at once
  async getMultipleStockPrices(symbols) {
    try {
      const response = await axios.post(`${this.backendUrl}/api/stocks`, {
        symbols: symbols
      }, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.success && response.data.data) {
        const results = response.data.data;
        
        // Cache the results
        Object.entries(results).forEach(([symbol, data]) => {
          this.cache.set(symbol, {
            data: data,
            timestamp: Date.now()
          });
        });
        
        console.log(`✅ Got data for ${Object.keys(results).length} stocks from backend proxy`);
        return results;
      }

      return {};
    } catch (error) {
      console.error('Backend proxy failed for multiple stocks:', error.message);
      return {};
    }
  }

  // Get market overview with real data
  async getRealMarketOverview() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX'];
    const results = {};
    
    for (const symbol of symbols) {
      try {
        const data = await this.getRealStockPrice(symbol);
        if (data) {
          results[symbol] = data;
        }
      } catch (error) {
        console.log(`Failed to get real data for ${symbol}:`, error.message);
      }
    }
    
    return results;
  }
}

export default new RealStockDataService();

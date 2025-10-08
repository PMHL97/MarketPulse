import { create } from 'zustand';
import { marketDataService } from '../services/api';
import realtimeDataService from '../services/realtimeDataService';

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
      const data = await realtimeDataService.getRealtimeStockPrice(symbol);
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

  // Real-time market data
  fetchRealtimeMarketData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [indices, crypto, forex, commodities] = await Promise.all([
        realtimeDataService.getRealtimeMarketIndices(),
        realtimeDataService.getRealtimeCryptoPrices(),
        realtimeDataService.getRealtimeForexRates(),
        realtimeDataService.getRealtimeCommodities()
      ]);

      const marketData = {
        indices,
        crypto,
        forex,
        commodities,
        lastUpdated: new Date().toISOString()
      };

      set({
        marketOverview: marketData,
        isLoading: false,
        error: null,
      });
      return marketData;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch real-time market data',
      });
      throw error;
    }
  },

  fetchMarketOverview: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await marketDataService.getMarketOverview();
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
      const data = await marketDataService.getHistoricalData(symbol, timeframe);
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
    // Use the real-time data service for better performance
    const unsubscribe = realtimeDataService.subscribe(symbol, (data) => {
      callback(data);
      
      // Update store
      set(state => ({
        stockPrices: {
          ...state.stockPrices,
          [symbol]: data
        }
      }));
    });

    return unsubscribe;
  },

  // Subscribe to market-wide real-time updates
  subscribeToMarketUpdates: (callback) => {
    const interval = setInterval(async () => {
      try {
        const marketData = await get().fetchRealtimeMarketData();
        callback(marketData);
      } catch (error) {
        console.error('Market update failed:', error);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  },

  getStockPrice: (symbol) => {
    return get().stockPrices[symbol] || null;
  },

  getHistoricalData: (symbol, timeframe = 'daily') => {
    return get().historicalData[`${symbol}_${timeframe}`] || null;
  },

  clearError: () => set({ error: null }),
}));

export default useMarketDataStore;

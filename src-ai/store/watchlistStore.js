import { create } from 'zustand';
import { userService } from '../services/api';

const useWatchlistStore = create((set, get) => ({
  // State
  watchlist: [],
  isLoading: false,
  error: null,

  // Actions
  fetchWatchlist: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getWatchlist();
      set({
        watchlist: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to fetch watchlist',
      });
    }
  },

  addToWatchlist: async (ticker) => {
    try {
      await userService.addToWatchlist(ticker);
      // Refresh the watchlist
      get().fetchWatchlist();
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add to watchlist';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  removeFromWatchlist: async (ticker) => {
    try {
      await userService.removeFromWatchlist(ticker);
      // Refresh the watchlist
      get().fetchWatchlist();
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove from watchlist';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  isInWatchlist: (ticker) => {
    return get().watchlist.some(item => item.ticker === ticker);
  },

  clearError: () => set({ error: null }),
}));

export default useWatchlistStore;

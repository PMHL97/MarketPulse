import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userService } from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userService.login(credentials);
          const { token, user } = response.data;
          
          // Store token in localStorage
          localStorage.setItem('authToken', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userService.register(userData);
          const { token, user } = response.data;
          
          // Store token in localStorage
          localStorage.setItem('authToken', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userService.updateProfile(profileData);
          set({
            user: response.data,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Profile update failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      initializeAuth: () => {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, you'd validate the token with the server
          set({
            token,
            isAuthenticated: true,
            user: JSON.parse(localStorage.getItem('user') || 'null'),
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

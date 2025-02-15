import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  actions: {
    async login(credentials) {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await axios.post('http://localhost:3000/api/login', credentials);
        
        this.user = response.data.user;
        this.token = response.data.token;
        this.isAuthenticated = true;
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },

    async checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data.user;
          this.token = token;
          this.isAuthenticated = true;
        } catch (error) {
          this.logout();
        }
      }
    }
  }
});

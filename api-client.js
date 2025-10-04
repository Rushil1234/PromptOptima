/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

const API_CONFIG = {
  // Base URL - change this in production
  baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api',
  
  // Endpoints
  endpoints: {
    optimize: '/optimize',
    analyze: '/optimize/analyze',
    pricing: '/optimize/pricing',
    symbols: '/symbols',
    symbolsByCategory: (category) => `/symbols/${category}`,
    symbolUsage: (category) => `/symbols/${category}/usage`,
    metrics: '/metrics',
    metricsRecord: '/metrics/record',
    metricsHistory: '/metrics/history',
    metricsSummary: '/metrics/summary',
    health: '/health'
  },
  
  // Request timeout
  timeout: 30000,
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000
  }
};

/**
 * API Client for making requests
 */
class APIClient {
  constructor(config) {
    this.config = config;
  }

  /**
   * Make API request with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.config.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || error.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      
      // Provide helpful error messages
      if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please ensure the server is running (npm start)');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // --- Optimization API ---
  
  async optimizePrompt(prompt, strategy = 'auto', model = 'gpt4', targetReduction = null) {
    return this.post(this.config.endpoints.optimize, {
      prompt,
      strategy,
      model,
      targetReduction
    });
  }

  async analyzePrompt(prompt) {
    return this.post(this.config.endpoints.analyze, { prompt });
  }

  async getPricing() {
    return this.get(this.config.endpoints.pricing);
  }

  // --- Symbol Library API ---
  
  async getAllSymbols() {
    return this.get(this.config.endpoints.symbols);
  }

  async getSymbolsByCategory(category) {
    return this.get(this.config.endpoints.symbolsByCategory(category));
  }

  async addCustomSymbol(category, concept, symbol) {
    return this.post(this.config.endpoints.symbolsByCategory(category), {
      concept,
      symbol
    });
  }

  async getSymbolUsage(category) {
    return this.get(this.config.endpoints.symbolUsage(category));
  }

  // --- Metrics API ---
  
  async getMetrics() {
    return this.get(this.config.endpoints.metrics);
  }

  async recordMetrics(data) {
    return this.post(this.config.endpoints.metricsRecord, data);
  }

  async getMetricsHistory(limit = 50) {
    return this.get(`${this.config.endpoints.metricsHistory}?limit=${limit}`);
  }

  async getMetricsSummary() {
    return this.get(this.config.endpoints.metricsSummary);
  }

  async resetMetrics() {
    return this.delete(`${this.config.endpoints.metrics}/reset`);
  }

  // --- Health Check ---
  
  async healthCheck() {
    return this.get(this.config.endpoints.health);
  }
}

// Create and export singleton instance
const apiClient = new APIClient(API_CONFIG);

// Make available globally
window.apiClient = apiClient;
window.API_CONFIG = API_CONFIG;

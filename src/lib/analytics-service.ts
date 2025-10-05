/**
 * Analytics Service
 * Collects and aggregates metrics from all compression strategies
 * Provides real-time performance tracking and cost analytics
 */

export interface CompressionMetric {
  timestamp: number;
  strategy: 'synthlang' | 'llmlingua' | 'hybrid' | 'language-switch';
  originalTokens: number;
  compressedTokens: number;
  compressionRatio: number;
  tokensSaved: number;
  processingTime: number;
  semanticScore: number;
  promptCategory: string;
  success: boolean;
  errorType?: string;
}

export interface CostMetric {
  timestamp: number;
  strategy: string;
  costSaved: number;
  tokensProcessed: number;
  provider: 'gemini' | 'gpt4' | 'claude';
}

export interface SymbolUsage {
  symbol: string;
  concept: string;
  usageCount: number;
  lastUsed: number;
}

export interface AnalyticsData {
  // Core metrics
  totalCompressions: number;
  totalTokensSaved: number;
  averageCompressionRatio: number;
  totalCostSaved: number;
  
  // Strategy breakdown
  strategyStats: {
    [key: string]: {
      count: number;
      totalTokensSaved: number;
      avgCompressionRatio: number;
      avgProcessingTime: number;
      successRate: number;
    };
  };
  
  // Time-based metrics
  daily: TimeBasedMetric;
  weekly: TimeBasedMetric;
  monthly: TimeBasedMetric;
  
  // Quality metrics
  avgSemanticScore: number;
  errorRate: number;
  
  // Symbol analytics
  topSymbols: SymbolUsage[];
  symbolUtilizationRate: number;
  
  // Cost analytics
  costByProvider: {
    [provider: string]: {
      baseline: number;
      optimized: number;
      saved: number;
    };
  };
  
  // Usage patterns
  peakHours: number[];
  popularCategories: { category: string; count: number; avgCompression: number }[];
  
  // Recent activity
  recentCompressions: CompressionMetric[];
}

export interface TimeBasedMetric {
  compressions: number;
  tokensSaved: number;
  avgCompressionRatio: number;
  costSaved: number;
}

class AnalyticsService {
  private metrics: CompressionMetric[] = [];
  private costMetrics: CostMetric[] = [];
  private symbolUsage: Map<string, SymbolUsage> = new Map();
  
  // Cost per 1M tokens for different providers
  private readonly COST_PER_MILLION = {
    gemini: 0.075, // Gemini 2.0 Flash
    gpt4: 15.0,    // GPT-4 baseline
    claude: 15.0,  // Claude 3 baseline
  };
  
  /**
   * Track a compression event
   */
  trackCompression(metric: CompressionMetric): void {
    this.metrics.push(metric);
    
    // Calculate cost saved
    const tokensInMillions = metric.tokensSaved / 1_000_000;
    const costSaved = tokensInMillions * this.COST_PER_MILLION.gpt4; // Using GPT-4 as baseline
    
    this.costMetrics.push({
      timestamp: metric.timestamp,
      strategy: metric.strategy,
      costSaved,
      tokensProcessed: metric.originalTokens,
      provider: 'gpt4'
    });
    
    // Keep only last 10,000 metrics to prevent memory issues
    if (this.metrics.length > 10000) {
      this.metrics = this.metrics.slice(-10000);
    }
  }
  
  /**
   * Track symbol usage
   */
  trackSymbolUsage(symbol: string, concept: string): void {
    const existing = this.symbolUsage.get(symbol);
    
    if (existing) {
      existing.usageCount++;
      existing.lastUsed = Date.now();
    } else {
      this.symbolUsage.set(symbol, {
        symbol,
        concept,
        usageCount: 1,
        lastUsed: Date.now()
      });
    }
  }
  
  /**
   * Get comprehensive analytics data
   */
  getAnalytics(): AnalyticsData {
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    // Filter metrics by time
    const dailyMetrics = this.metrics.filter(m => m.timestamp >= oneDayAgo);
    const weeklyMetrics = this.metrics.filter(m => m.timestamp >= oneWeekAgo);
    const monthlyMetrics = this.metrics.filter(m => m.timestamp >= oneMonthAgo);
    
    // Calculate strategy stats
    const strategyStats: any = {};
    const strategies = ['synthlang', 'llmlingua', 'hybrid', 'language-switch'];
    
    for (const strategy of strategies) {
      const strategyMetrics = this.metrics.filter(m => m.strategy === strategy);
      const successfulMetrics = strategyMetrics.filter(m => m.success);
      
      strategyStats[strategy] = {
        count: strategyMetrics.length,
        totalTokensSaved: strategyMetrics.reduce((sum, m) => sum + m.tokensSaved, 0),
        avgCompressionRatio: strategyMetrics.length > 0
          ? strategyMetrics.reduce((sum, m) => sum + m.compressionRatio, 0) / strategyMetrics.length
          : 0,
        avgProcessingTime: strategyMetrics.length > 0
          ? strategyMetrics.reduce((sum, m) => sum + m.processingTime, 0) / strategyMetrics.length
          : 0,
        successRate: strategyMetrics.length > 0
          ? (successfulMetrics.length / strategyMetrics.length) * 100
          : 0
      };
    }
    
    // Calculate peak hours
    const hourCounts = new Array(24).fill(0);
    this.metrics.forEach(m => {
      const hour = new Date(m.timestamp).getHours();
      hourCounts[hour]++;
    });
    const peakHours = hourCounts
      .map((count, hour) => ({ hour, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(h => h.hour);
    
    // Calculate popular categories
    const categoryMap = new Map<string, { count: number; totalCompression: number }>();
    this.metrics.forEach(m => {
      const existing = categoryMap.get(m.promptCategory);
      if (existing) {
        existing.count++;
        existing.totalCompression += m.compressionRatio;
      } else {
        categoryMap.set(m.promptCategory, {
          count: 1,
          totalCompression: m.compressionRatio
        });
      }
    });
    
    const popularCategories = Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        count: data.count,
        avgCompression: data.totalCompression / data.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Top symbols
    const topSymbols = Array.from(this.symbolUsage.values())
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 20);
    
    // Total symbols available (753 from SynthLang)
    const totalSymbols = 753;
    const symbolUtilizationRate = (this.symbolUsage.size / totalSymbols) * 100;
    
    // Cost by provider
    const totalTokensSaved = this.metrics.reduce((sum, m) => sum + m.tokensSaved, 0);
    const costByProvider: any = {};
    
    for (const [provider, costPerMillion] of Object.entries(this.COST_PER_MILLION)) {
      const baseline = (totalTokensSaved / 1_000_000) * this.COST_PER_MILLION.gpt4;
      const optimized = (totalTokensSaved / 1_000_000) * costPerMillion;
      costByProvider[provider] = {
        baseline,
        optimized,
        saved: baseline - optimized
      };
    }
    
    return {
      totalCompressions: this.metrics.length,
      totalTokensSaved,
      averageCompressionRatio: this.metrics.length > 0
        ? this.metrics.reduce((sum, m) => sum + m.compressionRatio, 0) / this.metrics.length
        : 0,
      totalCostSaved: this.costMetrics.reduce((sum, m) => sum + m.costSaved, 0),
      
      strategyStats,
      
      daily: this.calculateTimeBasedMetric(dailyMetrics),
      weekly: this.calculateTimeBasedMetric(weeklyMetrics),
      monthly: this.calculateTimeBasedMetric(monthlyMetrics),
      
      avgSemanticScore: this.metrics.length > 0
        ? this.metrics.reduce((sum, m) => sum + m.semanticScore, 0) / this.metrics.length
        : 0,
      errorRate: this.metrics.length > 0
        ? (this.metrics.filter(m => !m.success).length / this.metrics.length) * 100
        : 0,
      
      topSymbols,
      symbolUtilizationRate,
      
      costByProvider,
      
      peakHours,
      popularCategories,
      
      recentCompressions: this.metrics.slice(-50).reverse()
    };
  }
  
  /**
   * Calculate time-based metrics
   */
  private calculateTimeBasedMetric(metrics: CompressionMetric[]): TimeBasedMetric {
    const costMetrics = this.costMetrics.filter(cm =>
      metrics.some(m => m.timestamp === cm.timestamp)
    );
    
    return {
      compressions: metrics.length,
      tokensSaved: metrics.reduce((sum, m) => sum + m.tokensSaved, 0),
      avgCompressionRatio: metrics.length > 0
        ? metrics.reduce((sum, m) => sum + m.compressionRatio, 0) / metrics.length
        : 0,
      costSaved: costMetrics.reduce((sum, cm) => sum + cm.costSaved, 0)
    };
  }
  
  /**
   * Get time series data for charts
   */
  getTimeSeriesData(hours: number = 24): Array<{
    timestamp: number;
    compressions: number;
    tokensSaved: number;
    avgCompressionRatio: number;
  }> {
    const now = Date.now();
    const startTime = now - hours * 60 * 60 * 1000;
    const interval = (hours * 60 * 60 * 1000) / 20; // 20 data points
    
    const dataPoints: any[] = [];
    
    for (let i = 0; i < 20; i++) {
      const bucketStart = startTime + i * interval;
      const bucketEnd = bucketStart + interval;
      
      const bucketMetrics = this.metrics.filter(
        m => m.timestamp >= bucketStart && m.timestamp < bucketEnd
      );
      
      dataPoints.push({
        timestamp: bucketStart,
        compressions: bucketMetrics.length,
        tokensSaved: bucketMetrics.reduce((sum, m) => sum + m.tokensSaved, 0),
        avgCompressionRatio: bucketMetrics.length > 0
          ? bucketMetrics.reduce((sum, m) => sum + m.compressionRatio, 0) / bucketMetrics.length
          : 0
      });
    }
    
    return dataPoints;
  }
  
  /**
   * Reset all analytics data
   */
  reset(): void {
    this.metrics = [];
    this.costMetrics = [];
    this.symbolUsage.clear();
  }
  
  /**
   * Generate mock data for testing/demo
   */
  generateMockData(count: number = 100): void {
    const now = Date.now();
    const strategies: Array<'synthlang' | 'llmlingua' | 'hybrid' | 'language-switch'> = 
      ['synthlang', 'llmlingua', 'hybrid', 'language-switch'];
    const categories = ['technical', 'creative', 'mathematical', 'general', 'documentation'];
    
    for (let i = 0; i < count; i++) {
      const strategy = strategies[Math.floor(Math.random() * strategies.length)];
      const originalTokens = Math.floor(Math.random() * 500) + 100;
      const compressionRatio = strategy === 'synthlang' 
        ? Math.random() * 20 + 70  // 70-90%
        : strategy === 'llmlingua'
        ? Math.random() * 20 + 60  // 60-80%
        : strategy === 'hybrid'
        ? Math.random() * 40 + 20  // 20-60%
        : Math.random() * 25 + 15; // 15-40%
      
      const compressedTokens = Math.floor(originalTokens * (1 - compressionRatio / 100));
      const tokensSaved = originalTokens - compressedTokens;
      
      this.trackCompression({
        timestamp: now - Math.random() * 7 * 24 * 60 * 60 * 1000, // Last 7 days
        strategy,
        originalTokens,
        compressedTokens,
        compressionRatio,
        tokensSaved,
        processingTime: Math.random() * 2000 + 100,
        semanticScore: Math.random() * 5 + 95,
        promptCategory: categories[Math.floor(Math.random() * categories.length)],
        success: Math.random() > 0.05 // 95% success rate
      });
    }
    
    // Generate mock symbol usage
    const commonSymbols = [
      { symbol: '作', concept: 'CREATE' },
      { symbol: '庫', concept: 'DATABASE' },
      { symbol: '選', concept: 'SELECT' },
      { symbol: '新', concept: 'FRESH' },
      { symbol: '全', concept: 'GLOBAL' }
    ];
    
    commonSymbols.forEach(s => {
      for (let i = 0; i < Math.floor(Math.random() * 50) + 10; i++) {
        this.trackSymbolUsage(s.symbol, s.concept);
      }
    });
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// NO FAKE DATA - Dashboard will only show real compression data
// Analytics will be empty until you compress prompts


const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// In-memory storage for metrics (in production, use a database)
const metricsStore = {
  totalOptimizations: 0,
  totalTokensSaved: 0,
  totalCostSavings: 0,
  averageCompressionRate: 0,
  averageSemanticPreservation: 0,
  strategyUsage: {
    llmlingua: 0,
    synthlang: 0
  },
  categoryBreakdown: {
    financial: 0,
    technical: 0,
    research: 0,
    creative: 0,
    general: 0
  },
  history: []
};

/**
 * GET /api/metrics
 * Get overall performance metrics
 */
router.get('/', (req, res) => {
  try {
    res.json({
      ...metricsStore,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error fetching metrics:', error);
    res.status(500).json({
      error: 'Failed to fetch metrics',
      message: error.message
    });
  }
});

/**
 * POST /api/metrics/record
 * Record a new optimization operation
 */
router.post('/record', (req, res) => {
  try {
    const { 
      strategy, 
      category, 
      originalTokens, 
      compressedTokens, 
      compressionRate,
      semanticScore,
      costSavings 
    } = req.body;

    // Update metrics
    metricsStore.totalOptimizations++;
    metricsStore.totalTokensSaved += (originalTokens - compressedTokens);
    metricsStore.totalCostSavings += parseFloat(costSavings) || 0;
    
    // Calculate running average for compression rate
    const prevTotal = metricsStore.averageCompressionRate * (metricsStore.totalOptimizations - 1);
    metricsStore.averageCompressionRate = (prevTotal + parseFloat(compressionRate)) / metricsStore.totalOptimizations;
    
    // Calculate running average for semantic preservation
    const prevSemanticTotal = metricsStore.averageSemanticPreservation * (metricsStore.totalOptimizations - 1);
    metricsStore.averageSemanticPreservation = (prevSemanticTotal + parseFloat(semanticScore)) / metricsStore.totalOptimizations;
    
    // Update strategy usage
    if (strategy === 'llmlingua' || strategy === 'synthlang') {
      metricsStore.strategyUsage[strategy]++;
    }
    
    // Update category breakdown
    if (metricsStore.categoryBreakdown.hasOwnProperty(category)) {
      metricsStore.categoryBreakdown[category]++;
    }
    
    // Add to history (keep last 100)
    metricsStore.history.push({
      timestamp: new Date().toISOString(),
      strategy,
      category,
      compressionRate: parseFloat(compressionRate),
      semanticScore: parseFloat(semanticScore),
      tokensSaved: originalTokens - compressedTokens,
      costSavings: parseFloat(costSavings) || 0
    });
    
    if (metricsStore.history.length > 100) {
      metricsStore.history.shift();
    }
    
    logger.info(`Metrics recorded - Strategy: ${strategy}, Compression: ${compressionRate}%`);
    
    res.json({
      message: 'Metrics recorded successfully',
      currentMetrics: {
        totalOptimizations: metricsStore.totalOptimizations,
        totalTokensSaved: metricsStore.totalTokensSaved,
        totalCostSavings: metricsStore.totalCostSavings.toFixed(2)
      }
    });
    
  } catch (error) {
    logger.error('Error recording metrics:', error);
    res.status(500).json({
      error: 'Failed to record metrics',
      message: error.message
    });
  }
});

/**
 * GET /api/metrics/history
 * Get optimization history
 */
router.get('/history', (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const history = metricsStore.history.slice(-parseInt(limit));
    
    res.json({
      history,
      count: history.length,
      total: metricsStore.history.length
    });
  } catch (error) {
    logger.error('Error fetching history:', error);
    res.status(500).json({
      error: 'Failed to fetch history',
      message: error.message
    });
  }
});

/**
 * GET /api/metrics/summary
 * Get summarized metrics for dashboard
 */
router.get('/summary', (req, res) => {
  try {
    const summary = {
      totalPrompts: metricsStore.totalOptimizations,
      averageCompression: metricsStore.averageCompressionRate.toFixed(1),
      totalCostSavings: metricsStore.totalCostSavings.toFixed(2),
      semanticPreservation: metricsStore.averageSemanticPreservation.toFixed(1),
      strategyDistribution: metricsStore.strategyUsage,
      categoryBreakdown: metricsStore.categoryBreakdown,
      timestamp: new Date().toISOString()
    };
    
    res.json(summary);
  } catch (error) {
    logger.error('Error fetching summary:', error);
    res.status(500).json({
      error: 'Failed to fetch summary',
      message: error.message
    });
  }
});

/**
 * DELETE /api/metrics/reset
 * Reset all metrics (for testing/demo purposes)
 */
router.delete('/reset', (req, res) => {
  try {
    metricsStore.totalOptimizations = 0;
    metricsStore.totalTokensSaved = 0;
    metricsStore.totalCostSavings = 0;
    metricsStore.averageCompressionRate = 0;
    metricsStore.averageSemanticPreservation = 0;
    metricsStore.strategyUsage = { llmlingua: 0, synthlang: 0 };
    metricsStore.categoryBreakdown = {
      financial: 0,
      technical: 0,
      research: 0,
      creative: 0,
      general: 0
    };
    metricsStore.history = [];
    
    logger.info('Metrics reset');
    
    res.json({ message: 'Metrics reset successfully' });
  } catch (error) {
    logger.error('Error resetting metrics:', error);
    res.status(500).json({
      error: 'Failed to reset metrics',
      message: error.message
    });
  }
});

module.exports = router;

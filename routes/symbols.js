const express = require('express');
const router = express.Router();
const synthlang = require('../services/synthlang');
const logger = require('../utils/logger');

/**
 * GET /api/symbols
 * Get all symbol libraries
 */
router.get('/', (req, res) => {
  try {
    const libraries = synthlang.getSymbolLibrary();
    res.json(libraries);
  } catch (error) {
    logger.error('Error fetching symbol libraries:', error);
    res.status(500).json({
      error: 'Failed to fetch symbol libraries',
      message: error.message
    });
  }
});

/**
 * GET /api/symbols/:category
 * Get symbol library for specific category
 */
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const library = synthlang.getSymbolLibrary(category);
    
    if (!library) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }
    
    res.json({
      category,
      symbols: library
    });
  } catch (error) {
    logger.error('Error fetching symbol library:', error);
    res.status(500).json({
      error: 'Failed to fetch symbol library',
      message: error.message
    });
  }
});

/**
 * POST /api/symbols/:category
 * Add custom symbol to category
 */
router.post('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const { concept, symbol } = req.body;
    
    if (!concept || !symbol) {
      return res.status(400).json({
        error: 'Concept and symbol are required'
      });
    }
    
    if (typeof concept !== 'string' || typeof symbol !== 'string') {
      return res.status(400).json({
        error: 'Concept and symbol must be strings'
      });
    }
    
    if (symbol.length > 5) {
      return res.status(400).json({
        error: 'Symbol should be a short character (1-5 characters)'
      });
    }
    
    const success = synthlang.addCustomSymbol(category, concept, symbol);
    
    if (success) {
      logger.info(`Custom symbol added - Category: ${category}, Concept: ${concept}, Symbol: ${symbol}`);
      res.json({
        message: 'Symbol added successfully',
        category,
        concept,
        symbol
      });
    } else {
      res.status(500).json({
        error: 'Failed to add symbol'
      });
    }
  } catch (error) {
    logger.error('Error adding custom symbol:', error);
    res.status(500).json({
      error: 'Failed to add custom symbol',
      message: error.message
    });
  }
});

/**
 * GET /api/symbols/:category/usage
 * Get usage statistics for symbol category
 */
router.get('/:category/usage', (req, res) => {
  try {
    const { category } = req.params;
    const stats = synthlang.getUsageStats(category);
    
    res.json({
      category,
      usage: stats,
      total: stats.reduce((sum, s) => sum + s.count, 0)
    });
  } catch (error) {
    logger.error('Error fetching usage stats:', error);
    res.status(500).json({
      error: 'Failed to fetch usage statistics',
      message: error.message
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const llmlingua = require('../services/llmlingua');
const synthlang = require('../services/synthlang');
const strategySelector = require('../services/strategySelector');
const logger = require('../utils/logger');

/**
 * POST /api/optimize
 * Main optimization endpoint - analyzes prompt and returns compressed versions
 */
router.post('/', async (req, res) => {
  try {
    const { prompt, strategy = 'auto', model = 'gpt4', targetReduction } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'Prompt is required and must be a string'
      });
    }

    if (prompt.length < 10) {
      return res.status(400).json({
        error: 'Prompt must be at least 10 characters long'
      });
    }

    logger.info(`Optimization request received - Strategy: ${strategy}, Model: ${model}`);

    // Step 1: Analyze and get strategy recommendation
    const recommendation = strategySelector.analyzeAndRecommend(prompt, strategy);

    // Step 2: Run both compressions in parallel
    const [llmlinguaResult, synthlangResult] = await Promise.all([
      llmlingua.compress(prompt, targetReduction || 70),
      synthlang.compress(prompt, recommendation.characteristics.category, targetReduction || 80)
    ]);

    // Step 3: Calculate cost savings
    const pricing = {
      gpt4: { input: 0.03, output: 0.06 },
      gpt35: { input: 0.001, output: 0.002 },
      claude: { input: 0.015, output: 0.075 }
    };

    const modelPricing = pricing[model] || pricing.gpt4;

    const calculateCostSavings = (result) => {
      const originalCost = (result.originalTokens / 1000) * modelPricing.input;
      const compressedCost = (result.compressedTokens / 1000) * modelPricing.input;
      return {
        originalCost: originalCost.toFixed(4),
        compressedCost: compressedCost.toFixed(4),
        savings: (originalCost - compressedCost).toFixed(4),
        savingsPercent: result.compressionRate
      };
    };

    // Step 4: Format and return results
    const response = {
      recommendation,
      results: {
        llmlingua: {
          ...llmlinguaResult,
          costAnalysis: calculateCostSavings(llmlinguaResult)
        },
        synthlang: {
          ...synthlangResult,
          costAnalysis: calculateCostSavings(synthlangResult)
        }
      },
      model,
      timestamp: new Date().toISOString()
    };

    logger.info(`Optimization completed - LLMLingua: ${llmlinguaResult.compressionRate}%, SynthLang: ${synthlangResult.compressionRate}%`);

    res.json(response);

  } catch (error) {
    logger.error('Optimization error:', error);
    res.status(500).json({
      error: 'Failed to optimize prompt',
      message: error.message
    });
  }
});

/**
 * POST /api/optimize/analyze
 * Analyze prompt without compression
 */
router.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'Prompt is required and must be a string'
      });
    }

    const recommendation = strategySelector.analyzeAndRecommend(prompt, 'auto');

    res.json({
      analysis: recommendation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze prompt',
      message: error.message
    });
  }
});

/**
 * GET /api/optimize/pricing
 * Get current API pricing information
 */
router.get('/pricing', (req, res) => {
  res.json({
    gpt4: { input: 0.03, output: 0.06, per: '1K tokens' },
    gpt35: { input: 0.001, output: 0.002, per: '1K tokens' },
    claude: { input: 0.015, output: 0.075, per: '1K tokens' }
  });
});

module.exports = router;

// Application Data
const appData = {
  "compression_strategies": {
    "llmlingua": {
      "name": "LLMLingua General Engine",
      "description": "Smart editor using fine-tuned language model",
      "max_reduction": 80,
      "best_for": ["general_purpose", "varied_content", "one_off_prompts"],
      "processing_steps": [
        "Input Analysis",
        "Non-essential Word Identification", 
        "Redundant Phrase Removal",
        "Semantic Verification"
      ],
      "color": "#4F46E5"
    },
    "synthlang": {
      "name": "SynthLang Symbolic System", 
      "description": "Kanji-inspired symbolic compression for domain-specific tasks",
      "max_reduction": 90,
      "best_for": ["high_frequency", "domain_specific", "repetitive_tasks"],
      "processing_steps": [
        "Domain Analysis",
        "Concept Mapping",
        "Symbol Assignment", 
        "Compression Encoding"
      ],
      "color": "#EF4444"
    }
  },
  "sample_prompts": [
    {
      "id": 1,
      "title": "Financial Analysis Request",
      "text": "Please analyze the quarterly financial performance of our technology portfolio, focusing specifically on revenue growth, profit margins, and risk exposure across different market segments. Provide detailed recommendations for portfolio optimization and risk mitigation strategies that align with our long-term investment objectives.",
      "category": "financial",
      "frequency": "high",
      "recommended_strategy": "synthlang",
      "tokens": 48
    },
    {
      "id": 2, 
      "title": "Creative Writing Task",
      "text": "Write a compelling narrative about a young entrepreneur who discovers an innovative solution to climate change while working in their garage. The story should inspire readers and demonstrate how individual creativity can lead to global impact.",
      "category": "creative",
      "frequency": "low",
      "recommended_strategy": "llmlingua", 
      "tokens": 38
    },
    {
      "id": 3,
      "title": "Code Review Request",
      "text": "Review this Python function for potential security vulnerabilities, performance optimizations, and code quality improvements. Please provide specific suggestions for refactoring and identify any potential issues with memory management or error handling.",
      "category": "technical",
      "frequency": "high", 
      "recommended_strategy": "synthlang",
      "tokens": 35
    },
    {
      "id": 4,
      "title": "Market Research Query",
      "text": "Conduct a comprehensive market analysis for electric vehicle adoption in the European market, including consumer preferences, regulatory impacts, competitive landscape, and growth projections for the next five years.",
      "category": "research",
      "frequency": "medium",
      "recommended_strategy": "llmlingua",
      "tokens": 32
    }
  ],
  "symbol_library": {
    "financial": {
      "analyze": "↹",
      "portfolio": "⊞",
      "performance": "⚡",
      "revenue": "$",
      "profit": "△",
      "risk": "⚠",
      "recommend": "→",
      "optimize": "⚙"
    },
    "technical": {
      "review": "🔍",
      "function": "ƒ",
      "security": "🔒", 
      "performance": "⚡",
      "optimize": "⚙",
      "refactor": "🔄",
      "error": "⚠",
      "memory": "💾"
    },
    "general": {
      "provide": "⊕",
      "specific": "●",
      "detailed": "▣",
      "comprehensive": "◊",
      "identify": "⊙",
      "suggest": "→",
      "include": "⊃",
      "focus": "◎"
    }
  },
  "api_pricing": {
    "gpt4": {"input": 0.03, "output": 0.06},
    "gpt35": {"input": 0.001, "output": 0.002},
    "claude": {"input": 0.015, "output": 0.075}
  },
  "performance_metrics": {
    "total_prompts": 2847,
    "average_compression": 72,
    "total_cost_savings": 8429.33,
    "average_processing_time": 0.3,
    "semantic_preservation": 96.8
  }
};

// Global variables
let currentTab = 'overview';
let optimizationResults = null;
let charts = {};
let currentSymbolCategory = 'financial';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupPromptInput();
    setupSymbolLibrary();
    setupAPITester();
    setupROICalculator();
    animateMetrics();
    
    // Initialize symbol library on page load
    setTimeout(() => {
        renderSymbolGrid();
    }, 100);
}

// Tab Navigation
function setupTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('nav-btn--active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('nav-btn--active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('tab-content--active');
    });
    document.getElementById(tabName).classList.add('tab-content--active');
    
    currentTab = tabName;
    
    // Initialize tab-specific content
    if (tabName === 'metrics') {
        initializeMetricsCharts();
    } else if (tabName === 'symbols') {
        initializeSymbolCharts();
        renderSymbolGrid(); // Re-render symbols when tab is opened
    } else if (tabName === 'api') {
        setupSDKTabs();
    }
}

// Prompt Input and Optimization
function setupPromptInput() {
    const promptInput = document.getElementById('promptInput');
    const optimizeBtn = document.getElementById('optimizeBtn');
    
    if (promptInput) {
        promptInput.addEventListener('input', handlePromptInput);
    }
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', handleOptimization);
    }
}

function handlePromptInput() {
    const prompt = document.getElementById('promptInput').value.trim();
    const tokenCount = Math.ceil(prompt.length / 4); // Rough token estimation
    const optimizeBtn = document.getElementById('optimizeBtn');
    
    // Update token count
    const tokenCountElement = document.getElementById('inputTokenCount');
    if (tokenCountElement) {
        tokenCountElement.textContent = tokenCount;
    }
    
    // Detect category
    const category = detectPromptCategory(prompt);
    const categoryElement = document.getElementById('detectedCategory');
    if (categoryElement) {
        categoryElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Enable/disable optimize button
    if (optimizeBtn) {
        optimizeBtn.disabled = !prompt;
    }
    
    if (prompt) {
        showStrategyRecommendation(prompt, category);
    } else {
        hideStrategyRecommendation();
    }
}

function detectPromptCategory(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('financial') || lowerPrompt.includes('revenue') || lowerPrompt.includes('profit') || lowerPrompt.includes('portfolio')) {
        return 'financial';
    } else if (lowerPrompt.includes('code') || lowerPrompt.includes('function') || lowerPrompt.includes('security') || lowerPrompt.includes('performance')) {
        return 'technical';
    } else if (lowerPrompt.includes('creative') || lowerPrompt.includes('story') || lowerPrompt.includes('write') || lowerPrompt.includes('narrative')) {
        return 'creative';
    } else if (lowerPrompt.includes('analyze') || lowerPrompt.includes('research') || lowerPrompt.includes('market') || lowerPrompt.includes('study')) {
        return 'research';
    }
    return 'general';
}

function showStrategyRecommendation(prompt, category) {
    const recommendationSection = document.getElementById('strategyRecommendation');
    const recommendedStrategy = document.querySelector('.recommended-strategy');
    const confidenceScore = document.querySelector('.confidence-score');
    const reasoningContent = document.querySelector('.recommendation-reasoning');
    
    if (!recommendationSection) return;
    
    // Determine recommended strategy
    let strategy, confidence, reasoning;
    
    if (category === 'financial' || category === 'technical') {
        strategy = 'SynthLang Symbolic System';
        confidence = '92%';
        reasoning = `High-frequency domain-specific content detected. SynthLang's symbolic compression can achieve up to 90% token reduction for ${category} prompts while maintaining semantic integrity through established symbol mappings.`;
    } else {
        strategy = 'LLMLingua General Engine';
        confidence = '87%';
        reasoning = `General-purpose content detected. LLMLingua's intelligent editing approach is optimal for varied content, providing up to 80% compression while preserving natural language semantics.`;
    }
    
    if (recommendedStrategy) recommendedStrategy.textContent = `Recommended: ${strategy}`;
    if (confidenceScore) confidenceScore.textContent = confidence;
    if (reasoningContent) reasoningContent.textContent = reasoning;
    
    recommendationSection.classList.remove('hidden');
}

function hideStrategyRecommendation() {
    const recommendationSection = document.getElementById('strategyRecommendation');
    if (recommendationSection) {
        recommendationSection.classList.add('hidden');
    }
}

async function handleOptimization() {
    const prompt = document.getElementById('promptInput').value.trim();
    const modelSelect = document.getElementById('modelSelect');
    const strategyOverrideSelect = document.getElementById('strategyOverride');
    
    const model = modelSelect ? modelSelect.value : 'gpt4';
    const strategyOverride = strategyOverrideSelect ? strategyOverrideSelect.value : 'auto';
    
    if (!prompt) return;
    
    showOptimizationLoading(true);
    
    try {
        // Animate processing steps
        animateProcessingSteps();
        
        // Call real backend API
        const response = await apiClient.optimizePrompt(prompt, strategyOverride, model);
        
        // Process and display results
        processOptimizationResponse(response, model);
        
        showOptimizationLoading(false);
        
        // Show results section
        const resultsSection = document.getElementById('optimizationResults');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Optimization error:', error);
        showOptimizationLoading(false);
        showToast('Error: ' + (error.message || 'Failed to optimize prompt. Please try again.'));
    }
}

function showOptimizationLoading(show) {
    const btn = document.getElementById('optimizeBtn');
    if (!btn) return;
    
    const spinner = btn.querySelector('.loading-spinner');
    const text = btn.querySelector('.btn-text');
    
    if (show) {
        btn.disabled = true;
        if (spinner) spinner.classList.remove('hidden');
        if (text) text.textContent = 'Processing...';
        
        // Animate processing steps
        animateProcessingSteps();
    } else {
        btn.disabled = false;
        if (spinner) spinner.classList.add('hidden');
        if (text) text.textContent = 'Analyze & Optimize Prompt';
    }
}

function animateProcessingSteps() {
    const llmlinguaSteps = document.querySelectorAll('.llmlingua-result .step');
    const synthlangSteps = document.querySelectorAll('.synthlang-result .step');
    
    // Reset all steps
    [...llmlinguaSteps, ...synthlangSteps].forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Animate LLMLingua steps
    llmlinguaSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            setTimeout(() => {
                step.classList.remove('active');
                step.classList.add('completed');
            }, 400);
        }, index * 500);
    });
    
    // Animate SynthLang steps with slight delay
    synthlangSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            setTimeout(() => {
                step.classList.remove('active');
                step.classList.add('completed');
            }, 400);
        }, (index * 500) + 200);
    });
}

function processOptimizationResponse(response, model) {
    const { recommendation, results } = response;
    
    // Update recommendation display if present
    if (recommendation) {
        updateRecommendationDisplay(recommendation);
    }
    
    // Format results for display
    const llmlinguaResult = {
        strategy: 'llmlingua',
        originalTokens: results.llmlingua.originalTokens,
        compressedTokens: results.llmlingua.compressedTokens,
        compressionRate: results.llmlingua.compressionRate,
        semanticScore: results.llmlingua.semanticScore,
        compressedPrompt: results.llmlingua.compressedText,
        processingTime: results.llmlingua.processingTime,
        costAnalysis: results.llmlingua.costAnalysis
    };
    
    const synthlangResult = {
        strategy: 'synthlang',
        originalTokens: results.synthlang.originalTokens,
        compressedTokens: results.synthlang.compressedTokens,
        compressionRate: results.synthlang.compressionRate,
        semanticScore: results.synthlang.semanticScore,
        compressedPrompt: results.synthlang.compressedText,
        processingTime: results.synthlang.processingTime,
        costAnalysis: results.synthlang.costAnalysis,
        symbolMapping: results.synthlang.symbolMapping
    };
    
    // Display results
    displayOptimizationResults(llmlinguaResult, synthlangResult, model);
    
    // Store results
    optimizationResults = { llmlingua: llmlinguaResult, synthlang: synthlangResult, model };
    
    // Record metrics
    recordOptimizationMetrics(recommendation.recommended, llmlinguaResult, synthlangResult);
}

function updateRecommendationDisplay(recommendation) {
    const recommendationSection = document.getElementById('strategyRecommendation');
    const recommendedStrategy = document.querySelector('.recommended-strategy');
    const confidenceScore = document.querySelector('.confidence-score');
    const reasoningContent = document.querySelector('.recommendation-reasoning');
    
    if (recommendedStrategy) {
        recommendedStrategy.textContent = recommendation.recommended === 'synthlang' 
            ? 'SynthLang Symbolic System' 
            : 'LLMLingua General Engine';
    }
    
    if (confidenceScore) {
        confidenceScore.textContent = `${recommendation.confidence}% confidence`;
    }
    
    if (reasoningContent) {
        reasoningContent.textContent = recommendation.reasoning;
    }
    
    if (recommendationSection) {
        recommendationSection.classList.remove('hidden');
    }
}

async function recordOptimizationMetrics(recommendedStrategy, llmlinguaResult, synthlangResult) {
    try {
        const bestResult = recommendedStrategy === 'synthlang' ? synthlangResult : llmlinguaResult;
        
        await apiClient.recordMetrics({
            strategy: recommendedStrategy,
            category: detectPromptCategory(document.getElementById('promptInput').value),
            originalTokens: bestResult.originalTokens,
            compressedTokens: bestResult.compressedTokens,
            compressionRate: bestResult.compressionRate,
            semanticScore: bestResult.semanticScore,
            costSavings: bestResult.costAnalysis.savings
        });
        
        // Refresh metrics if on metrics tab
        if (currentTab === 'metrics') {
            loadMetrics();
        }
    } catch (error) {
        console.error('Failed to record metrics:', error);
    }
}

function simulateCompression(prompt, strategy, originalTokens, category) {
    const strategyData = appData.compression_strategies[strategy];
    
    let compressionRate, semanticScore, compressedPrompt;
    
    if (strategy === 'llmlingua') {
        compressionRate = Math.random() * 30 + 50; // 50-80% reduction
        semanticScore = Math.random() * 8 + 92; // 92-100% semantic preservation
        compressedPrompt = generateLLMLinguaCompression(prompt, compressionRate);
    } else {
        compressionRate = Math.random() * 20 + 70; // 70-90% reduction
        semanticScore = Math.random() * 12 + 88; // 88-100% semantic preservation
        compressedPrompt = generateSynthLangCompression(prompt, category, compressionRate);
    }
    
    const compressedTokens = Math.ceil(originalTokens * (100 - compressionRate) / 100);
    
    return {
        strategy,
        originalTokens,
        compressedTokens,
        compressionRate: compressionRate.toFixed(1),
        semanticScore: semanticScore.toFixed(1),
        compressedPrompt,
        processingTime: Math.random() * 300 + 150
    };
}

function generateLLMLinguaCompression(prompt, compressionRate) {
    const words = prompt.split(' ');
    const targetLength = Math.ceil(words.length * (100 - compressionRate) / 100);
    
    // Simulate intelligent word removal
    const essentialWords = words.filter(word => {
        const essential = ['analyze', 'review', 'provide', 'specific', 'detailed', 'recommendations'];
        return essential.some(e => word.toLowerCase().includes(e)) || 
               word.length > 6 || 
               /^[A-Z]/.test(word);
    });
    
    const result = essentialWords.slice(0, targetLength);
    return result.length > 0 ? result.join(' ') + '...' : prompt.substring(0, Math.ceil(prompt.length * 0.5)) + '...';
}

function generateSynthLangCompression(prompt, category, compressionRate) {
    const symbols = appData.symbol_library[category] || appData.symbol_library.general;
    let compressed = prompt.toLowerCase();
    
    // Replace words with symbols
    Object.entries(symbols).forEach(([word, symbol]) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        compressed = compressed.replace(regex, symbol);
    });
    
    // Simulate additional compression
    const words = compressed.split(' ');
    const targetLength = Math.ceil(words.length * (100 - compressionRate) / 100);
    
    return words.slice(0, targetLength).join(' ');
}

function displayOptimizationResults(llmlinguaResult, synthlangResult, model) {
    // Display LLMLingua results
    const llmlinguaPromptEl = document.getElementById('llmlinguaPrompt');
    const llmlinguaTokensEl = document.getElementById('llmlinguaTokens');
    const llmlinguaReductionEl = document.getElementById('llmlinguaReduction');
    const llmlinguaScoreEl = document.getElementById('llmlinguaScore');
    
    if (llmlinguaPromptEl) llmlinguaPromptEl.textContent = llmlinguaResult.compressedPrompt;
    if (llmlinguaTokensEl) llmlinguaTokensEl.textContent = llmlinguaResult.compressedTokens;
    if (llmlinguaReductionEl) llmlinguaReductionEl.textContent = llmlinguaResult.compressionRate + '%';
    if (llmlinguaScoreEl) llmlinguaScoreEl.textContent = llmlinguaResult.semanticScore;
    
    // Display SynthLang results
    const synthlangPromptEl = document.getElementById('synthlangPrompt');
    const synthlangTokensEl = document.getElementById('synthlangTokens');
    const synthlangReductionEl = document.getElementById('synthlangReduction');
    const synthlangScoreEl = document.getElementById('synthlangScore');
    
    if (synthlangPromptEl) synthlangPromptEl.textContent = synthlangResult.compressedPrompt;
    if (synthlangTokensEl) synthlangTokensEl.textContent = synthlangResult.compressedTokens;
    if (synthlangReductionEl) synthlangReductionEl.textContent = synthlangResult.compressionRate + '%';
    if (synthlangScoreEl) synthlangScoreEl.textContent = synthlangResult.semanticScore;
    
    // Show symbol mapping for SynthLang
    const symbolMapping = document.getElementById('symbolMapping');
    if (symbolMapping) {
        const category = detectPromptCategory(document.getElementById('promptInput').value);
        const symbols = appData.symbol_library[category] || appData.symbol_library.general;
        
        symbolMapping.innerHTML = Object.entries(symbols).map(([word, symbol]) => 
            `<span style="margin-right: 12px;">${symbol} = ${word}</span>`
        ).join('');
    }
    
    // Determine best strategy and display summary
    const bestStrategy = parseFloat(synthlangResult.compressionRate) > parseFloat(llmlinguaResult.compressionRate) ? 
                        'SynthLang' : 'LLMLingua';
    const bestCompression = Math.max(parseFloat(synthlangResult.compressionRate), parseFloat(llmlinguaResult.compressionRate));
    
    // Calculate cost savings
    const pricing = appData.api_pricing[model];
    const originalCost = (llmlinguaResult.originalTokens / 1000) * pricing.input;
    const optimizedTokens = bestStrategy === 'SynthLang' ? synthlangResult.compressedTokens : llmlinguaResult.compressedTokens;
    const optimizedCost = (optimizedTokens / 1000) * pricing.input;
    const costSavings = originalCost - optimizedCost;
    
    const recommendedStrategyEl = document.getElementById('recommendedStrategy');
    const bestCompressionEl = document.getElementById('bestCompression');
    const costSavingsEl = document.getElementById('costSavings');
    const processingTimeEl = document.getElementById('processingTime');
    
    if (recommendedStrategyEl) recommendedStrategyEl.textContent = bestStrategy;
    if (bestCompressionEl) bestCompressionEl.textContent = bestCompression.toFixed(1) + '%';
    if (costSavingsEl) costSavingsEl.textContent = '$' + costSavings.toFixed(4);
    if (processingTimeEl) processingTimeEl.textContent = Math.round((llmlinguaResult.processingTime + synthlangResult.processingTime) / 2) + 'ms';
}

// Symbol Library Management
function setupSymbolLibrary() {
    setupCategoryTabs();
    // Initial render will be called from initializeApp
}

function setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            switchSymbolCategory(category);
        });
    });
}

function switchSymbolCategory(category) {
    currentSymbolCategory = category;
    
    // Update tab appearance
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('category-tab--active');
    });
    const activeTab = document.querySelector(`[data-category="${category}"]`);
    if (activeTab) {
        activeTab.classList.add('category-tab--active');
    }
    
    // Re-render symbol grid
    renderSymbolGrid();
}

function renderSymbolGrid() {
    const symbolGrid = document.getElementById('symbolGrid');
    if (!symbolGrid) return;
    
    const symbols = appData.symbol_library[currentSymbolCategory];
    
    if (!symbols) {
        symbolGrid.innerHTML = '<p>No symbols found for this category.</p>';
        return;
    }
    
    symbolGrid.innerHTML = Object.entries(symbols).map(([concept, glyph]) => `
        <div class="symbol-item">
            <div class="symbol-glyph">${glyph}</div>
            <div class="symbol-text">
                <div class="symbol-concept">${concept}</div>
                <div class="symbol-usage">Used ${Math.floor(Math.random() * 100 + 10)} times</div>
            </div>
        </div>
    `).join('');
}

function addCustomSymbol() {
    const conceptInput = document.getElementById('conceptInput');
    const symbolInput = document.getElementById('symbolInput');
    const categoryInput = document.getElementById('categoryInput');
    
    if (!conceptInput || !symbolInput || !categoryInput) {
        showToast('Form elements not found');
        return;
    }
    
    const concept = conceptInput.value.trim();
    const symbol = symbolInput.value.trim();
    const category = categoryInput.value;
    
    if (!concept || !symbol) {
        showToast('Please enter both concept and symbol');
        return;
    }
    
    // Add to symbol library
    if (!appData.symbol_library[category]) {
        appData.symbol_library[category] = {};
    }
    appData.symbol_library[category][concept.toLowerCase()] = symbol;
    
    // Clear inputs
    conceptInput.value = '';
    symbolInput.value = '';
    
    // Re-render if current category
    if (category === currentSymbolCategory) {
        renderSymbolGrid();
    }
    
    showToast('Symbol added successfully!');
}

// API Integration
function setupAPITester() {
    // API testing will be handled by testAPI function
}

function setupSDKTabs() {
    const sdkTabs = document.querySelectorAll('.sdk-tab');
    
    sdkTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.getAttribute('data-lang');
            switchSDKExample(lang);
        });
    });
}

function switchSDKExample(lang) {
    // Update tab appearance
    document.querySelectorAll('.sdk-tab').forEach(tab => {
        tab.classList.remove('sdk-tab--active');
    });
    const activeTab = document.querySelector(`[data-lang="${lang}"]`);
    if (activeTab) {
        activeTab.classList.add('sdk-tab--active');
    }
    
    // Update content
    document.querySelectorAll('.sdk-example').forEach(example => {
        example.classList.remove('sdk-example--active');
    });
    const activeExample = document.querySelector(`.sdk-example[data-lang="${lang}"]`);
    if (activeExample) {
        activeExample.classList.add('sdk-example--active');
    }
}

async function testAPI() {
    const promptInput = document.getElementById('apiTestPrompt');
    const strategySelect = document.getElementById('apiStrategy');
    const modelSelect = document.getElementById('apiModel');
    
    if (!promptInput) {
        showToast('API test form not found');
        return;
    }
    
    const prompt = promptInput.value.trim();
    const strategy = strategySelect ? strategySelect.value : 'auto';
    const model = modelSelect ? modelSelect.value : 'gpt4';
    
    if (!prompt) {
        showToast('Please enter a test prompt');
        return;
    }
    
    const apiResponse = document.getElementById('apiResponse');
    const apiResponseCode = document.getElementById('apiResponseCode');
    
    if (!apiResponse || !apiResponseCode) {
        showToast('API response elements not found');
        return;
    }
    
    // Show loading state
    apiResponseCode.textContent = 'Making API request...';
    apiResponse.classList.remove('hidden');
    
    try {
        // Make real API call
        const response = await apiClient.optimizePrompt(prompt, strategy, model);
        
        // Format response for display
        const formattedResponse = {
            success: true,
            strategy_used: response.recommendation.recommended,
            recommendation: {
                confidence: response.recommendation.confidence,
                reasoning: response.recommendation.reasoning
            },
            results: {
                llmlingua: {
                    original_tokens: response.results.llmlingua.originalTokens,
                    compressed_tokens: response.results.llmlingua.compressedTokens,
                    compression_rate: response.results.llmlingua.compressionRate + '%',
                    semantic_score: response.results.llmlingua.semanticScore + '%',
                    cost_analysis: response.results.llmlingua.costAnalysis,
                    processing_time_ms: response.results.llmlingua.processingTime
                },
                synthlang: {
                    original_tokens: response.results.synthlang.originalTokens,
                    compressed_tokens: response.results.synthlang.compressedTokens,
                    compression_rate: response.results.synthlang.compressionRate + '%',
                    semantic_score: response.results.synthlang.semanticScore + '%',
                    cost_analysis: response.results.synthlang.costAnalysis,
                    processing_time_ms: response.results.synthlang.processingTime
                }
            },
            timestamp: response.timestamp
        };
        
        apiResponseCode.textContent = JSON.stringify(formattedResponse, null, 2);
        showToast('API test successful!');
    } catch (error) {
        apiResponseCode.textContent = JSON.stringify({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        }, null, 2);
        showToast('API test failed: ' + error.message);
    }
}

function generateMockAPIResponse(prompt, strategy, model) {
    const originalTokens = Math.ceil(prompt.length / 4);
    const compressionRate = strategy === 'synthlang' ? Math.random() * 20 + 70 : Math.random() * 30 + 50;
    const optimizedTokens = Math.ceil(originalTokens * (100 - compressionRate) / 100);
    const semanticScore = Math.random() * 10 + 90;
    const pricing = appData.api_pricing[model];
    const costSavings = ((originalTokens - optimizedTokens) / 1000) * pricing.input;
    
    return {
        success: true,
        strategy_used: strategy === 'auto' ? (Math.random() > 0.5 ? 'synthlang' : 'llmlingua') : strategy,
        original_tokens: originalTokens,
        optimized_tokens: optimizedTokens,
        compression_ratio: compressionRate.toFixed(1),
        semantic_preservation: semanticScore.toFixed(1),
        cost_savings: costSavings.toFixed(4),
        processing_time_ms: Math.floor(Math.random() * 300 + 100),
        optimized_prompt: strategy === 'synthlang' ? '↹⊞ quarterly ⚡ → △⚠ optimization' : prompt.substring(0, Math.ceil(prompt.length * 0.6)),
        symbol_mapping: strategy === 'synthlang' ? {
            "↹": "analyze",
            "⊞": "portfolio", 
            "⚡": "performance",
            "→": "recommend",
            "△": "profit",
            "⚠": "risk"
        } : null
    };
}

// ROI Calculator
function setupROICalculator() {
    const monthlyVolumeInput = document.getElementById('monthlyVolume');
    const avgTokensInput = document.getElementById('avgTokens');
    
    if (monthlyVolumeInput && avgTokensInput) {
        monthlyVolumeInput.addEventListener('input', updateROICalculation);
        avgTokensInput.addEventListener('input', updateROICalculation);
        updateROICalculation(); // Initial calculation
    }
}

function updateROICalculation() {
    const monthlyVolumeInput = document.getElementById('monthlyVolume');
    const avgTokensInput = document.getElementById('avgTokens');
    const breakEvenElement = document.getElementById('breakEvenPoint');
    
    if (!monthlyVolumeInput || !avgTokensInput || !breakEvenElement) return;
    
    const monthlyVolume = parseInt(monthlyVolumeInput.value) || 100;
    const avgTokens = parseInt(avgTokensInput.value) || 50;
    
    // Simple ROI calculation
    const monthlySavings = (monthlyVolume * avgTokens * 0.9 * 0.03) / 1000; // 90% reduction, GPT-4 pricing
    const implementationCost = 500; // Hypothetical implementation cost
    const breakEvenMonths = (implementationCost / monthlySavings);
    
    breakEvenElement.textContent = breakEvenMonths.toFixed(1) + ' months';
}

// Performance Metrics and Charts
async function animateMetrics() {
    try {
        // Load metrics from backend
        const response = await apiClient.getMetricsSummary();
        
        const metrics = [
            { id: 'totalProcessed', value: parseInt(response.totalPrompts) || 0, format: 'number' },
            { id: 'avgCompression', value: parseFloat(response.averageCompression) || 72, format: 'percentage' },
            { id: 'costSavings', value: parseFloat(response.totalCostSavings) || 0, format: 'currency' },
            { id: 'semanticPreservation', value: parseFloat(response.semanticPreservation) || 96.8, format: 'percentage' }
        ];
        
        metrics.forEach(metric => {
            animateCounter(metric.id, metric.value, metric.format);
        });
    } catch (error) {
        console.error('Failed to load metrics:', error);
        // Fallback to hardcoded values
        const metrics = [
            { id: 'totalProcessed', value: appData.performance_metrics.total_prompts, format: 'number' },
            { id: 'avgCompression', value: appData.performance_metrics.average_compression, format: 'percentage' },
            { id: 'costSavings', value: appData.performance_metrics.total_cost_savings, format: 'currency' },
            { id: 'semanticPreservation', value: appData.performance_metrics.semantic_preservation, format: 'percentage' }
        ];
        
        metrics.forEach(metric => {
            animateCounter(metric.id, metric.value, metric.format);
        });
    }
}

async function loadMetrics() {
    await animateMetrics();
    if (currentTab === 'metrics') {
        await initializeMetricsCharts();
    }
}

function animateCounter(elementId, targetValue, format) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const start = 0;
    const increment = targetValue / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        
        element.textContent = formatValue(current, format);
    }, 16);
}

function formatValue(value, format) {
    switch (format) {
        case 'currency':
            return '$' + value.toFixed(0).toLocaleString();
        case 'percentage':
            return value.toFixed(1) + '%';
        case 'decimal':
            return value.toFixed(1);
        case 'number':
        default:
            return Math.floor(value).toLocaleString();
    }
}

function initializeMetricsCharts() {
    if (charts.strategyComparison) return; // Already initialized
    
    // Strategy Performance Comparison
    const strategyCtx = document.getElementById('strategyComparisonChart');
    if (strategyCtx) {
        charts.strategyComparison = new Chart(strategyCtx, {
            type: 'radar',
            data: {
                labels: ['Compression Rate', 'Semantic Quality', 'Processing Speed', 'Versatility', 'Cost Efficiency'],
                datasets: [{
                    label: 'LLMLingua',
                    data: [75, 95, 85, 90, 80],
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderColor: '#1FB8CD',
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#1FB8CD'
                }, {
                    label: 'SynthLang',
                    data: [90, 88, 70, 60, 95],
                    backgroundColor: 'rgba(255, 193, 133, 0.2)',
                    borderColor: '#FFC185',
                    pointBackgroundColor: '#FFC185',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FFC185'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Cost Savings Over Time
    const costCtx = document.getElementById('costSavingsChart');
    if (costCtx) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const costData = [1200, 2100, 3400, 4800, 6500, 8429];
        
        charts.costSavings = new Chart(costCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Cumulative Savings ($)',
                    data: costData,
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderColor: '#1FB8CD',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Token Reduction Distribution
    const tokenCtx = document.getElementById('tokenReductionChart');
    if (tokenCtx) {
        charts.tokenReduction = new Chart(tokenCtx, {
            type: 'doughnut',
            data: {
                labels: ['40-60% Reduction', '60-80% Reduction', '80-90% Reduction', '90%+ Reduction'],
                datasets: [{
                    data: [25, 45, 25, 5],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Quality Chart
    const qualityCtx = document.getElementById('qualityChart');
    if (qualityCtx) {
        const qualityData = Array.from({length: 30}, (_, i) => 94 + Math.random() * 6);
        
        charts.quality = new Chart(qualityCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => i + 1),
                datasets: [{
                    label: 'Semantic Preservation %',
                    data: qualityData,
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderColor: '#B4413C',
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 90,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Last 30 Operations'
                        }
                    }
                }
            }
        });
    }
}

function initializeSymbolCharts() {
    if (charts.symbolUsage) return;
    
    const symbolCtx = document.getElementById('symbolUsageChart');
    if (symbolCtx) {
        const symbolData = {
            labels: ['Financial', 'Technical', 'General', 'Custom'],
            datasets: [{
                label: 'Usage Count',
                data: [847, 623, 1205, 172],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        };
        
        charts.symbolUsage = new Chart(symbolCtx, {
            type: 'bar',
            data: symbolData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

function copyCode(elementOrId) {
    let element;
    if (typeof elementOrId === 'string') {
        element = document.getElementById(elementOrId);
    } else {
        element = elementOrId.tagName === 'CODE' ? elementOrId : elementOrId.querySelector('code');
    }
    
    if (element) {
        copyToClipboard(element.textContent);
    }
}

function copyOptimizedPrompt() {
    if (!optimizationResults) {
        showToast('No optimization results available');
        return;
    }
    
    // Determine best result
    const llmlingua = optimizationResults.llmlingua;
    const synthlang = optimizationResults.synthlang;
    const bestResult = parseFloat(synthlang.compressionRate) > parseFloat(llmlingua.compressionRate) ? 
                      synthlang : llmlingua;
    
    copyToClipboard(bestResult.compressedPrompt);
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Make functions globally available
window.switchTab = switchTab;
window.addCustomSymbol = addCustomSymbol;
window.testAPI = testAPI;
window.copyToClipboard = copyToClipboard;
window.copyCode = copyCode;
window.copyOptimizedPrompt = copyOptimizedPrompt;

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
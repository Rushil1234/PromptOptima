// ============================================
// LLM Optimizer - Chrome Extension Popup Logic
// ============================================

// Get API endpoint from storage or use default
let API_ENDPOINT = 'http://localhost:3001';

// DOM Elements
const promptInput = document.getElementById('promptInput');
const compressButton = document.getElementById('compressButton');
const clearButton = document.getElementById('clearButton');
const resultsDiv = document.getElementById('results');
const loadingState = document.getElementById('loadingState');
const errorMessages = document.getElementById('errorMessages');
const charCounter = document.getElementById('charCounter');

// Stats elements
const compressionRatio = document.getElementById('compressionRatio');
const tokensSaved = document.getElementById('tokensSaved');
const originalLength = document.getElementById('originalLength');
const compressedLength = document.getElementById('compressedLength');
const costSavings = document.getElementById('costSavings');

// Output elements
const compressedPromptOutput = document.getElementById('compressedPromptOutput');
const copyButton = document.getElementById('copyButton');
const exportButton = document.getElementById('exportButton');

// Comparison elements
const originalPromptDisplay = document.getElementById('originalPromptDisplay');
const compressedPromptDisplay = document.getElementById('compressedPromptDisplay');
const originalMeta = document.getElementById('originalMeta');
const compressedMeta = document.getElementById('compressedMeta');

// Symbol reference
const symbolReference = document.getElementById('symbolReference');
const symbolsList = document.getElementById('symbolsList');

// Strategy selection
const llmlinguaCard = document.getElementById('llmlingua-card');
const synthlangCard = document.getElementById('synthlang-card');
let selectedStrategy = 'llmlingua';

// Store last compression result
let lastResult = null;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Load API endpoint from storage
  chrome.storage.sync.get(['apiEndpoint'], (result) => {
    if (result.apiEndpoint) {
      API_ENDPOINT = result.apiEndpoint;
    }
  });

  // Load last prompt from storage
  chrome.storage.local.get(['lastPrompt', 'lastStrategy'], (result) => {
    if (result.lastPrompt) {
      promptInput.value = result.lastPrompt;
      updateCharCounter();
    }
    if (result.lastStrategy) {
      selectedStrategy = result.lastStrategy;
      updateStrategySelection();
    }
  });

  // Setup event listeners
  setupEventListeners();
});

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
  // Strategy selection
  llmlinguaCard.addEventListener('click', () => selectStrategy('llmlingua'));
  synthlangCard.addEventListener('click', () => selectStrategy('synthlang'));
  
  // Keyboard navigation for strategy cards
  llmlinguaCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectStrategy('llmlingua');
    }
  });
  
  synthlangCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectStrategy('synthlang');
    }
  });

  // Input events
  promptInput.addEventListener('input', () => {
    updateCharCounter();
    // Save to storage
    chrome.storage.local.set({ lastPrompt: promptInput.value });
  });

  // Keyboard shortcuts
  promptInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCompress();
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  });

  // Button events
  compressButton.addEventListener('click', handleCompress);
  clearButton.addEventListener('click', handleClear);
  copyButton.addEventListener('click', handleCopy);
  exportButton.addEventListener('click', handleExport);
}

// ============================================
// Strategy Selection
// ============================================

function selectStrategy(strategy) {
  selectedStrategy = strategy;
  updateStrategySelection();
  
  // Save to storage
  chrome.storage.local.set({ lastStrategy: strategy });
}

function updateStrategySelection() {
  if (selectedStrategy === 'llmlingua') {
    llmlinguaCard.classList.add('active');
    synthlangCard.classList.remove('active');
    llmlinguaCard.setAttribute('aria-checked', 'true');
    synthlangCard.setAttribute('aria-checked', 'false');
  } else {
    synthlangCard.classList.add('active');
    llmlinguaCard.classList.remove('active');
    synthlangCard.setAttribute('aria-checked', 'true');
    llmlinguaCard.setAttribute('aria-checked', 'false');
  }
}

// ============================================
// Character Counter
// ============================================

function updateCharCounter() {
  const text = promptInput.value;
  const charCount = text.length;
  const estimatedTokens = Math.ceil(charCount / 4);
  charCounter.textContent = `${charCount} characters (~${estimatedTokens} tokens)`;
}

// ============================================
// Compress Handler
// ============================================

async function handleCompress() {
  const originalPrompt = promptInput.value.trim();
  
  // Reset error state
  hideError();
  
  // Validation
  if (!originalPrompt) {
    showError('⚠️ Please enter a prompt to compress.');
    return;
  }

  if (originalPrompt.length < 10) {
    showError('⚠️ Prompt is too short. Please enter at least 10 characters.');
    return;
  }

  // Show loading state
  showLoading();
  resultsDiv.style.display = 'none';
  
  // Disable button
  compressButton.disabled = true;
  compressButton.innerHTML = '<span class="btn-icon">⏳</span> Compressing...';

  try {
    // Determine endpoint based on strategy
    const endpoint = selectedStrategy === 'llmlingua' 
      ? `${API_ENDPOINT}/api/compress/llmlingua`
      : `${API_ENDPOINT}/api/compress/synthlang`;

    console.log('Calling API:', endpoint);

    // Make API call
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: originalPrompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Store result
    lastResult = {
      original: originalPrompt,
      compressed: data.compressed_prompt || data.compressedPrompt,
      strategy: selectedStrategy,
      metrics: data,
      timestamp: new Date().toISOString()
    };

    // Display results
    displayResults(data, originalPrompt);

    // Save to history
    saveToHistory(lastResult);

  } catch (error) {
    console.error('Compression error:', error);
    showError(`❌ Compression failed: ${error.message}. Make sure the dev server is running on ${API_ENDPOINT}`);
  } finally {
    hideLoading();
    compressButton.disabled = false;
    compressButton.innerHTML = '<span class="btn-icon">⚡</span> Compress Prompt';
  }
}

// ============================================
// Display Results
// ============================================

function displayResults(data, originalPrompt) {
  // Extract data (handle both naming conventions)
  const compressedText = data.compressed || data.compressed_prompt || data.compressedPrompt || '';
  const ratio = data.compressionRatio || data.compression_ratio || 0;
  const tokens = data.estimatedTokenSavings || data.tokens_saved || data.tokensSaved || 0;
  const origLen = originalPrompt.length;
  const compLen = compressedText.length;
  
  // Calculate cost savings (assuming $0.01 per 1000 tokens)
  const cost = (tokens / 1000) * 0.01;

  // Update stats
  compressionRatio.textContent = `${ratio.toFixed(1)}%`;
  tokensSaved.textContent = tokens;
  originalLength.textContent = origLen;
  compressedLength.textContent = compLen;
  costSavings.textContent = `$${cost.toFixed(4)}`;

  // Update outputs
  compressedPromptOutput.value = compressedText;
  originalPromptDisplay.value = originalPrompt;
  compressedPromptDisplay.value = compressedText;
  originalMeta.textContent = `${origLen} chars`;
  compressedMeta.textContent = `${compLen} chars`;

  // Handle symbol reference for SynthLang
  if (selectedStrategy === 'synthlang' && (data.symbols || data.usedSymbols)) {
    displaySymbols(data.symbols || data.usedSymbols);
    symbolReference.style.display = 'block';
  } else {
    symbolReference.style.display = 'none';
  }

  // Show results
  resultsDiv.style.display = 'block';

  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Display Symbols (for SynthLang)
// ============================================

function displaySymbols(symbols) {
  symbolsList.innerHTML = '';
  
  if (!symbols || symbols.length === 0) {
    symbolsList.innerHTML = '<p style="color: #a0a0b0; text-align: center;">No symbols used</p>';
    return;
  }

  symbols.forEach(symbol => {
    const symbolItem = document.createElement('div');
    symbolItem.className = 'symbol-item';
    // Handle different field names: concept/meaning, symbol/character
    const meaning = symbol.concept || symbol.meaning || '';
    const char = symbol.symbol || symbol.character || '';
    symbolItem.title = meaning;
    symbolItem.innerHTML = `
      <span class="symbol-char">${char}</span>
      <span class="symbol-meaning">${meaning.substring(0, 10)}...</span>
    `;
    symbolsList.appendChild(symbolItem);
  });
}

// ============================================
// Copy Handler
// ============================================

async function handleCopy() {
  const textToCopy = compressedPromptOutput.value;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    
    // Visual feedback
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '✅ Copied!';
    copyButton.style.background = 'rgba(34, 197, 94, 0.6)';
    
    setTimeout(() => {
      copyButton.innerHTML = originalText;
      copyButton.style.background = '';
    }, 2000);
    
  } catch (err) {
    console.error('Could not copy text:', err);
    showError('❌ Failed to copy to clipboard');
  }
}

// ============================================
// Export Handler
// ============================================

function handleExport() {
  if (!lastResult) {
    showError('⚠️ No results to export');
    return;
  }

  const exportData = {
    ...lastResult,
    exportedAt: new Date().toISOString()
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `llm-optimizer-${selectedStrategy}-${timestamp}.json`;
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Visual feedback
  const originalText = exportButton.innerHTML;
  exportButton.innerHTML = '✅ Exported!';
  exportButton.style.background = 'rgba(34, 197, 94, 0.6)';
  
  setTimeout(() => {
    exportButton.innerHTML = originalText;
    exportButton.style.background = '';
  }, 2000);
}

// ============================================
// Clear Handler
// ============================================

function handleClear() {
  promptInput.value = '';
  updateCharCounter();
  resultsDiv.style.display = 'none';
  hideError();
  lastResult = null;
  
  // Clear from storage
  chrome.storage.local.remove('lastPrompt');
  
  // Focus input
  promptInput.focus();
}

// ============================================
// History Management
// ============================================

function saveToHistory(result) {
  chrome.storage.local.get(['compressionHistory'], (data) => {
    let history = data.compressionHistory || [];
    
    // Add new result
    history.unshift(result);
    
    // Keep only last 10
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    chrome.storage.local.set({ compressionHistory: history });
  });
}

// ============================================
// UI Helper Functions
// ============================================

function showLoading() {
  loadingState.style.display = 'block';
}

function hideLoading() {
  loadingState.style.display = 'none';
}

function showError(message) {
  errorMessages.textContent = message;
  errorMessages.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideError();
  }, 5000);
}

function hideError() {
  errorMessages.style.display = 'none';
  errorMessages.textContent = '';
}

// ============================================
// Analytics (optional)
// ============================================

function trackUsage(strategy, compressionRatio) {
  chrome.storage.local.get(['usageStats'], (data) => {
    let stats = data.usageStats || {
      totalCompressions: 0,
      llmlinguaCount: 0,
      synthlangCount: 0,
      averageCompression: 0
    };
    
    stats.totalCompressions++;
    if (strategy === 'llmlingua') stats.llmlinguaCount++;
    else stats.synthlangCount++;
    
    stats.averageCompression = 
      ((stats.averageCompression * (stats.totalCompressions - 1)) + compressionRatio) / 
      stats.totalCompressions;
    
    chrome.storage.local.set({ usageStats: stats });
  });
}

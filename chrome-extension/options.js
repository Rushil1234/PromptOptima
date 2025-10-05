// ============================================
// LLM Optimizer - Options Page Logic
// ============================================

// DOM Elements
const apiEndpointInput = document.getElementById('apiEndpoint');
const defaultStrategySelect = document.getElementById('defaultStrategy');
const autoSaveCheckbox = document.getElementById('autoSave');
const autoCopyCheckbox = document.getElementById('autoCopy');
const showSymbolsCheckbox = document.getElementById('showSymbols');

// Stats elements
const totalCompressionsEl = document.getElementById('totalCompressions');
const llmlinguaCountEl = document.getElementById('llmlinguaCount');
const synthlangCountEl = document.getElementById('synthlangCount');
const avgCompressionEl = document.getElementById('avgCompression');

// Buttons
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const testConnectionBtn = document.getElementById('testConnectionBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// Status message
const statusMessage = document.getElementById('statusMessage');

// Default settings
const DEFAULT_SETTINGS = {
  apiEndpoint: 'http://localhost:3001',
  defaultStrategy: 'llmlingua',
  autoSave: true,
  autoCopy: false,
  showSymbols: true
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadStatistics();
  setupEventListeners();
});

// ============================================
// Load Settings from Storage
// ============================================

function loadSettings() {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    apiEndpointInput.value = settings.apiEndpoint;
    defaultStrategySelect.value = settings.defaultStrategy;
    autoSaveCheckbox.checked = settings.autoSave;
    autoCopyCheckbox.checked = settings.autoCopy;
    showSymbolsCheckbox.checked = settings.showSymbols;
  });
}

// ============================================
// Load Statistics
// ============================================

function loadStatistics() {
  chrome.storage.local.get(['usageStats'], (data) => {
    const stats = data.usageStats || {
      totalCompressions: 0,
      llmlinguaCount: 0,
      synthlangCount: 0,
      averageCompression: 0
    };

    totalCompressionsEl.textContent = stats.totalCompressions;
    llmlinguaCountEl.textContent = stats.llmlinguaCount;
    synthlangCountEl.textContent = stats.synthlangCount;
    avgCompressionEl.textContent = stats.averageCompression 
      ? `${stats.averageCompression.toFixed(1)}%` 
      : '0%';
  });
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
  saveBtn.addEventListener('click', saveSettings);
  resetBtn.addEventListener('click', resetToDefaults);
  testConnectionBtn.addEventListener('click', testConnection);
  clearHistoryBtn.addEventListener('click', clearHistory);
  clearAllBtn.addEventListener('click', clearAllData);

  // Real-time validation for API endpoint
  apiEndpointInput.addEventListener('input', () => {
    validateURL(apiEndpointInput.value);
  });
}

// ============================================
// Save Settings
// ============================================

function saveSettings() {
  const settings = {
    apiEndpoint: apiEndpointInput.value.trim(),
    defaultStrategy: defaultStrategySelect.value,
    autoSave: autoSaveCheckbox.checked,
    autoCopy: autoCopyCheckbox.checked,
    showSymbols: showSymbolsCheckbox.checked
  };

  // Validate API endpoint
  if (!validateURL(settings.apiEndpoint)) {
    showStatus('Please enter a valid URL for the API endpoint', 'error');
    return;
  }

  // Save to storage
  chrome.storage.sync.set(settings, () => {
    showStatus('✅ Settings saved successfully!', 'success');
    
    // Animate save button
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '✅ Saved!';
    saveBtn.style.background = 'rgba(34, 197, 94, 0.8)';
    
    setTimeout(() => {
      saveBtn.innerHTML = originalText;
      saveBtn.style.background = '';
    }, 2000);
  });
}

// ============================================
// Reset to Defaults
// ============================================

function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    chrome.storage.sync.set(DEFAULT_SETTINGS, () => {
      loadSettings();
      showStatus('🔄 Settings reset to defaults', 'success');
    });
  }
}

// ============================================
// Test API Connection
// ============================================

async function testConnection() {
  const apiEndpoint = apiEndpointInput.value.trim();
  
  if (!validateURL(apiEndpoint)) {
    showStatus('❌ Invalid API endpoint URL', 'error');
    return;
  }

  testConnectionBtn.disabled = true;
  testConnectionBtn.innerHTML = '⏳ Testing...';

  try {
    // Try to fetch the symbols endpoint as a health check
    const response = await fetch(`${apiEndpoint}/api/symbols`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      showStatus(`✅ Connection successful! Found ${data.count || 0} symbols.`, 'success');
    } else {
      showStatus(`⚠️ Server responded with status ${response.status}. Please check your backend.`, 'error');
    }
  } catch (error) {
    console.error('Connection test error:', error);
    showStatus(`❌ Connection failed: ${error.message}. Make sure your dev server is running.`, 'error');
  } finally {
    testConnectionBtn.disabled = false;
    testConnectionBtn.innerHTML = '🔗 Test Connection';
  }
}

// ============================================
// Clear History
// ============================================

function clearHistory() {
  if (confirm('Are you sure you want to clear your compression history?')) {
    chrome.storage.local.remove('compressionHistory', () => {
      showStatus('🗑️ History cleared successfully', 'success');
    });
  }
}

// ============================================
// Clear All Data
// ============================================

function clearAllData() {
  if (confirm('⚠️ WARNING: This will delete ALL your data including history, statistics, and cached prompts. This cannot be undone. Are you sure?')) {
    chrome.storage.local.clear(() => {
      // Reset stats display
      totalCompressionsEl.textContent = '0';
      llmlinguaCountEl.textContent = '0';
      synthlangCountEl.textContent = '0';
      avgCompressionEl.textContent = '0%';
      
      showStatus('⚠️ All local data has been cleared', 'success');
    });
  }
}

// ============================================
// URL Validation
// ============================================

function validateURL(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

// ============================================
// Status Messages
// ============================================

function showStatus(message, type = 'success') {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
}

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveSettings();
  }
  
  // Ctrl/Cmd + T to test connection
  if ((e.ctrlKey || e.metaKey) && e.key === 't') {
    e.preventDefault();
    testConnection();
  }
});

// ============================================
// Auto-refresh stats every 10 seconds
// ============================================

setInterval(() => {
  loadStatistics();
}, 10000);

console.log('LLM Optimizer options page loaded');

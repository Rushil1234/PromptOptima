// ============================================
// LLM Optimizer - Background Service Worker
// Handles extension lifecycle and message passing
// ============================================

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  console.log('LLM Optimizer extension installed/updated', details);
  
  if (details.reason === 'install') {
    // First-time installation
    console.log('First-time installation detected');
    
    // Set default settings
    chrome.storage.sync.set({
      apiEndpoint: 'http://localhost:3001',
      defaultStrategy: 'llmlingua',
      autoSave: true
    });
    
    // Open options page
    chrome.runtime.openOptionsPage();
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// Message handling from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.action === 'compressPrompt') {
    // Handle compression request
    handleCompression(request.data, sendResponse);
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'getHistory') {
    // Retrieve compression history
    chrome.storage.local.get(['compressionHistory'], (data) => {
      sendResponse({ history: data.compressionHistory || [] });
    });
    return true;
  }
  
  if (request.action === 'clearHistory') {
    // Clear compression history
    chrome.storage.local.set({ compressionHistory: [] }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getStats') {
    // Get usage statistics
    chrome.storage.local.get(['usageStats'], (data) => {
      sendResponse({ stats: data.usageStats || null });
    });
    return true;
  }
});

// Compression handler (can be called from multiple places)
async function handleCompression(data, sendResponse) {
  const { prompt, strategy, apiEndpoint } = data;
  
  try {
    const endpoint = strategy === 'llmlingua'
      ? `${apiEndpoint}/api/compress/llmlingua`
      : `${apiEndpoint}/api/compress/synthlang`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Track usage
    updateUsageStats(strategy, result.compression_ratio || result.compressionRatio || 0);
    
    sendResponse({ success: true, data: result });
  } catch (error) {
    console.error('Compression error in background:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Update usage statistics
function updateUsageStats(strategy, compressionRatio) {
  chrome.storage.local.get(['usageStats'], (data) => {
    let stats = data.usageStats || {
      totalCompressions: 0,
      llmlinguaCount: 0,
      synthlangCount: 0,
      averageCompression: 0,
      lastUsed: null
    };
    
    stats.totalCompressions++;
    if (strategy === 'llmlingua') stats.llmlinguaCount++;
    else stats.synthlangCount++;
    
    stats.averageCompression = 
      ((stats.averageCompression * (stats.totalCompressions - 1)) + compressionRatio) / 
      stats.totalCompressions;
    
    stats.lastUsed = new Date().toISOString();
    
    chrome.storage.local.set({ usageStats: stats });
  });
}

// Context menu integration (optional)
try {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'compressWithLLM',
      title: 'Compress with LLM Optimizer',
      contexts: ['selection']
    }, () => {
      if (chrome.runtime.lastError) {
        console.log('Context menu creation error (can be ignored):', chrome.runtime.lastError);
      }
    });
  });

  // Handle context menu clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'compressWithLLM' && info.selectionText) {
      // Open popup with selected text
      chrome.storage.local.set({ 
        lastPrompt: info.selectionText,
        fromContextMenu: true 
      });
      
      // Note: chrome.action.openPopup() only works in some contexts
      // Alternative: Could inject content script or show notification
    }
  });
} catch (error) {
  console.log('Context menu setup error (optional feature):', error);
}

// Keyboard shortcut handler
try {
  if (chrome.commands) {
    chrome.commands.onCommand.addListener((command) => {
      console.log('Command received:', command);
      
      if (command === 'open-popup') {
        chrome.action.openPopup();
      }
    });
  }
} catch (error) {
  console.log('Keyboard commands setup error (optional feature):', error);
}

// Alarm for periodic cleanup (optional)
try {
  chrome.alarms.create('cleanup', { periodInMinutes: 1440 }); // Once per day

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'cleanup') {
      // Clean up old history items (keep last 30 days)
      chrome.storage.local.get(['compressionHistory'], (data) => {
        if (data.compressionHistory) {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const filtered = data.compressionHistory.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate > thirtyDaysAgo;
          });
          
          chrome.storage.local.set({ compressionHistory: filtered });
          console.log('Cleaned up old history items');
        }
      });
    }
  });
} catch (error) {
  console.log('Alarms setup error (optional feature):', error);
}

// Network status monitoring (optional)
let isOnline = true;

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
  checkNetworkStatus();
});

function checkNetworkStatus() {
  fetch('http://localhost:3001/api/symbols')
    .then(() => {
      isOnline = true;
      console.log('API server is reachable');
    })
    .catch(() => {
      isOnline = false;
      console.warn('API server is not reachable');
    });
}

// Periodic network check
setInterval(checkNetworkStatus, 60000); // Every minute

// Export status for popup to query
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkStatus') {
    sendResponse({ online: isOnline });
    return true;
  }
});

console.log('LLM Optimizer background service worker loaded');

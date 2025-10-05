# 🚀 LLM Optimizer - Chrome Extension

A powerful Chrome extension for intelligent prompt compression using dual-strategy optimization (LLMLingua & SynthLang).

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

---

## ✨ Features

### 🎯 **Dual Compression Strategies**
- **LLMLingua**: AI-powered semantic analysis (60-80% compression)
- **SynthLang**: Symbol-based ultra-dense encoding (60-93% compression)

### 🎨 **Rich User Interface**
- Beautiful dark-themed design matching the web app
- Real-time character and token counter
- Before/after comparison view
- Comprehensive compression statistics
- Symbol reference for SynthLang compressions

### 💾 **Data Management**
- Automatic prompt history (last 10 compressions)
- Export results as JSON
- Usage statistics tracking
- Local storage persistence

### ⚡ **Productivity Features**
- One-click copy to clipboard
- Keyboard shortcuts (Ctrl+Enter to compress, Escape to clear)
- Context menu integration (right-click selected text)
- Auto-save preferences

### 🔧 **Customization**
- Configurable API endpoint
- Default strategy selection
- Behavior preferences
- Theme customization ready

---

## 📦 Installation

### Prerequisites

1. **Backend Server Running**
   - Make sure your Next.js dev server is running:
     ```bash
     cd c:\Users\sdevp\harvardhackdesgin1
     npm run dev
     ```
   - Server should be accessible at `http://localhost:3001`

2. **Chrome Browser**
   - Chrome version 88+ (for Manifest V3 support)

### Step-by-Step Installation

#### Step 1: Prepare Icon Files

The extension requires PNG format icons. You have two options:

**Option A: Convert SVG to PNG (Recommended)**

Using an online converter like [CloudConvert](https://cloudconvert.com/svg-to-png):
1. Navigate to `chrome-extension/icons/`
2. Upload `icon16.svg`, `icon48.svg`, `icon128.svg`
3. Convert to PNG with exact dimensions (16x16, 48x48, 128x128)
4. Download and save as `icon16.png`, `icon48.png`, `icon128.png`

**Option B: Use SVG Temporarily (Quick Testing)**

1. Open `chrome-extension/manifest.json`
2. Change all `.png` extensions to `.svg`:
   ```json
   "icons": {
     "16": "icons/icon16.svg",
     "48": "icons/icon48.svg",
     "128": "icons/icon128.svg"
   }
   ```

#### Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions`
   - Or click Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to `c:\Users\sdevp\harvardhackdesgin1\chrome-extension`
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - You should see "LLM Optimizer" in your extensions list
   - The extension icon (⚡) should appear in your Chrome toolbar
   - Click the icon to open the popup

#### Step 3: Configure Settings

1. Click the extension icon
2. Click "⚙️ Settings" at the bottom
3. Verify API endpoint: `http://localhost:3001`
4. Click "🔗 Test Connection" to ensure backend is reachable
5. Save settings

---

## 🎮 Usage

### Basic Compression

1. **Open the Extension**
   - Click the ⚡ icon in your Chrome toolbar

2. **Select Strategy**
   - Choose between **LLMLingua** or **SynthLang**
   - LLMLingua: Best for general-purpose prompts
   - SynthLang: Best for technical content, higher compression

3. **Enter Your Prompt**
   - Type or paste your prompt in the text area
   - Watch the character counter update in real-time

4. **Compress**
   - Click "⚡ Compress Prompt" button
   - Or press **Ctrl+Enter** (Cmd+Enter on Mac)

5. **View Results**
   - See compression statistics
   - Compare original vs. compressed side-by-side
   - View symbol reference (for SynthLang)

6. **Copy or Export**
   - Click "📋 Copy" to copy compressed text
   - Click "💾 Export" to download as JSON

### Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Compress prompt
- **Escape**: Clear input
- **Ctrl/Cmd + S** (in Settings): Save settings
- **Ctrl/Cmd + T** (in Settings): Test connection

### Context Menu Integration

1. Select any text on a webpage
2. Right-click → "Compress with LLM Optimizer"
3. Extension opens with selected text pre-filled

---

## ⚙️ Configuration

### API Endpoint

**Default**: `http://localhost:3001`

To change:
1. Click extension icon → Settings
2. Update "API Endpoint URL"
3. Click "Test Connection" to verify
4. Save settings

### Behavior Settings

- **Auto-save prompt history**: Saves last 10 compressions locally
- **Auto-copy results**: Automatically copies compressed text to clipboard
- **Show symbol reference**: Displays symbol breakdown for SynthLang

### Usage Statistics

View your compression stats in Settings:
- Total compressions
- Strategy usage breakdown
- Average compression ratio
- Last used timestamp

### Data Management

**Clear History**: Remove compression history only
**Clear All Data**: Reset everything (⚠️ cannot be undone)

---

## 🔧 Troubleshooting

### Extension Icon Not Showing

**Solution**: Pin the extension
1. Click the puzzle piece icon (Extensions) in Chrome toolbar
2. Find "LLM Optimizer"
3. Click the pin icon

### "Connection Failed" Error

**Possible Causes & Solutions**:

1. **Backend not running**
   ```bash
   cd c:\Users\sdevp\harvardhackdesgin1
   npm run dev
   ```

2. **Wrong API endpoint**
   - Go to Settings
   - Verify URL is `http://localhost:3001`
   - Click "Test Connection"

3. **Port conflict**
   - Check if port 3001 is in use
   - Update `next.config.mjs` to use different port
   - Update extension settings accordingly

4. **CORS issues**
   - The Next.js API routes should handle CORS automatically
   - If issues persist, check browser console (F12)

### Icons Not Loading

**Solution**: Convert SVG to PNG or use SVG temporarily
- See [Installation Step 1](#step-1-prepare-icon-files)

### "Compressed prompt is empty" Error

**Possible Causes**:

1. **LLMLingua API key missing**
   - Check `.env.local` file exists
   - Verify `GOOGLE_GENAI_API_KEY` is set

2. **Prompt too short**
   - Enter at least 10 characters

3. **Backend error**
   - Check terminal running `npm run dev`
   - Look for error messages

### Extension Crashing or Freezing

**Solutions**:

1. **Reload extension**
   - Go to `chrome://extensions`
   - Click refresh icon on LLM Optimizer

2. **Check browser console**
   - Right-click extension icon → Inspect popup
   - Check Console tab for errors

3. **Clear extension data**
   - Go to Settings → Clear All Data
   - Reload extension

---

## 🛠️ Development

### File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.css             # Styles
├── popup.js              # UI logic
├── background.js         # Service worker
├── options.html          # Settings page
├── options.js            # Settings logic
└── icons/
    ├── icon16.svg/png    # Toolbar icon
    ├── icon48.svg/png    # Extension manager
    └── icon128.svg/png   # Chrome Web Store
```

### Making Changes

1. **Edit files** in `chrome-extension/` folder

2. **Reload extension**:
   - Go to `chrome://extensions`
   - Click refresh icon on LLM Optimizer
   - Or press Ctrl+R on the extensions page

3. **Test changes**:
   - Click extension icon
   - Check browser console (F12) for errors

### Debugging

**Popup Debugging**:
- Right-click extension icon → "Inspect popup"
- Console shows popup.js logs

**Background Script Debugging**:
- Go to `chrome://extensions`
- Find LLM Optimizer
- Click "Inspect views: service worker"
- Console shows background.js logs

**Check Storage**:
```javascript
// In popup or background console
chrome.storage.local.get(null, (data) => console.log(data));
chrome.storage.sync.get(null, (data) => console.log(data));
```

### API Endpoints Used

- `POST /api/compress/llmlingua` - LLMLingua compression
- `POST /api/compress/synthlang` - SynthLang compression
- `GET /api/symbols` - Symbol list (for health check)

### Chrome Storage

**Sync Storage** (synced across devices):
- `apiEndpoint`: API base URL
- `defaultStrategy`: Default compression strategy
- `autoSave`, `autoCopy`, `showSymbols`: Behavior flags

**Local Storage** (device-specific):
- `lastPrompt`: Last entered prompt
- `lastStrategy`: Last selected strategy
- `compressionHistory`: Array of last 10 compressions
- `usageStats`: Usage statistics object

---

## 📝 Notes

### Permissions Explained

- **activeTab**: Access current tab for context menu
- **storage**: Save settings and history
- **clipboardWrite**: Copy compressed text
- **host_permissions**: Connect to localhost:3001

### Privacy

- **All data is stored locally** on your device
- **No data is sent to external servers** except your configured API endpoint
- **No tracking or analytics** (optional usage stats are local only)

### Performance

- Popup loads instantly (<100ms)
- Compression time depends on backend (~1-3 seconds)
- History limited to 10 items for performance
- Auto-cleanup runs daily to remove old data

---

## 🚀 Next Steps

### Ready to Use!

Your extension is now installed and ready. Try compressing a prompt!

### Optional Enhancements

1. **Custom Icons**: Replace SVG icons with branded PNG icons
2. **Keyboard Shortcut**: Add custom Chrome keyboard shortcut in `chrome://extensions/shortcuts`
3. **Theme Customization**: Edit `popup.css` for different colors
4. **Additional Strategies**: Add more compression strategies to the backend

### Publish to Chrome Web Store

If you want to share this extension:

1. Create developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Prepare store listing (screenshots, description)
3. Zip the `chrome-extension` folder
4. Upload and publish

---

## 🐛 Report Issues

If you encounter any issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Check browser console for errors (F12)
3. Check extension console (right-click icon → Inspect)
4. Check backend terminal for API errors

---

## 📚 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

---

## ✅ Checklist

Before using the extension, make sure:

- [ ] Backend server is running (`npm run dev`)
- [ ] Server is accessible at `http://localhost:3001`
- [ ] Extension is loaded in Chrome (`chrome://extensions`)
- [ ] Icons are converted to PNG (or SVG temporarily)
- [ ] Test connection passes in Settings
- [ ] API key is configured in `.env.local`

---

**Enjoy compressing your prompts! 🎉**

# 🚀 Quick Start: Chrome Extension

## 3-Step Installation

### Step 1: Make Sure Backend is Running
```bash
cd c:\Users\sdevp\harvardhackdesgin1
npm run dev
```
✅ Verify server running at http://localhost:3001

### Step 2: Load Extension in Chrome

1. Open Chrome and go to: `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select folder: `c:\Users\sdevp\harvardhackdesgin1\chrome-extension`

### Step 3: Test It!

1. Click the ⚡ extension icon in your Chrome toolbar
2. Enter a prompt
3. Click "Compress Prompt"
4. See your compressed result!

---

## 📖 Full Documentation

For detailed instructions, troubleshooting, and advanced features, see:
- **Extension Documentation**: [`chrome-extension/README.md`](chrome-extension/README.md)

---

## ⚡ Quick Tips

- **Keyboard Shortcut**: Press `Ctrl+Enter` to compress
- **Copy Result**: Click the 📋 Copy button
- **Export Data**: Click 💾 Export to save as JSON
- **Settings**: Click ⚙️ Settings at bottom of popup
- **Test Connection**: In Settings, click "🔗 Test Connection"

---

## 🐛 Troubleshooting

### "Connection Failed" Error
→ Make sure `npm run dev` is running on port 3001

### Extension Icon Not Showing
→ Click the puzzle piece (🧩) in Chrome toolbar and pin the extension

### Icons Not Loading
→ They're using SVG (works fine). To use PNG, see `chrome-extension/icons/README.md`

---

## 📁 What Was Created

```
chrome-extension/
├── manifest.json          # Extension config (Manifest V3)
├── popup.html            # Main popup UI
├── popup.css             # Beautiful dark theme
├── popup.js              # Compression logic
├── background.js         # Service worker
├── options.html          # Settings page
├── options.js            # Settings logic
├── icons/                # Extension icons (SVG)
└── README.md             # Full documentation
```

---

## 🎯 Features Included

✅ **Dual Compression Strategies** (LLMLingua & SynthLang)
✅ **Real-time Character Counter**
✅ **Before/After Comparison**
✅ **Copy to Clipboard**
✅ **Export as JSON**
✅ **Compression History** (last 10)
✅ **Usage Statistics**
✅ **Keyboard Shortcuts**
✅ **Dark Theme** (matches web app)
✅ **Settings Page**
✅ **Context Menu** (right-click text)

---

## 🎉 You're All Set!

The extension is ready to use. Start compressing your prompts!

**Need help?** Check the full documentation in `chrome-extension/README.md`

# 🔧 Troubleshooting Guide - "Failed to optimize prompt"

## Quick Fix (Most Common Issue)

### Is the server running?

```bash
# Check if server is running
lsof -ti:3000

# If it returns a number, server is running ✅
# If it returns nothing, start the server:
npm start
```

## Step-by-Step Troubleshooting

### Step 1: Verify Server is Running

Open a terminal and run:

```bash
curl http://localhost:3000/api/health
```

**Expected output:**
```json
{"status":"healthy","timestamp":"...","uptime":...}
```

**If you get an error:**
- Server is not running
- Run `npm start` in the project directory

### Step 2: Test the API Directly

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Please analyze the financial performance","strategy":"auto","model":"gpt4"}'
```

**If this works but the web interface doesn't:**
- Clear your browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check browser console (F12) for JavaScript errors

### Step 3: Use the Test Page

Open this in your browser:
```
http://localhost:3000/test.html
```

This page will automatically test all API endpoints and show you what's working.

## Common Issues and Solutions

### 1. "Cannot connect to server"

**Problem:** Server is not running

**Solution:**
```bash
cd /Users/rushilkakkad/Downloads/dual-strategy-optimizer
npm start
```

### 2. "Port 3000 is already in use"

**Problem:** Another process is using port 3000

**Solution Option A:**
```bash
# Kill the process
kill -9 $(lsof -ti:3000)

# Start server again
npm start
```

**Solution Option B:**
```bash
# Use a different port
PORT=3001 npm start

# Then access at http://localhost:3001
```

### 3. "Prompt must be at least 10 characters long"

**Problem:** Your prompt is too short

**Solution:** Enter a longer prompt (minimum 10 characters)

### 4. Browser shows old/cached version

**Problem:** Browser is using cached files

**Solution:**
```bash
# Hard refresh
Mac: Cmd + Shift + R
Windows: Ctrl + Shift + R

# Or clear cache in browser settings
```

### 5. "Failed to fetch" or Network Error

**Problem:** CORS or connection issue

**Solution:**
```bash
# Make sure you're accessing via http://localhost:3000
# NOT file:// or 127.0.0.1

# Restart server
kill -9 $(lsof -ti:3000)
npm start
```

### 6. Server starts but API doesn't work

**Problem:** Dependencies not installed properly

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start server
npm start
```

## Testing Checklist

Run through this checklist:

- [ ] **Server Running:** `lsof -ti:3000` shows a process ID
- [ ] **Health Check Works:** `curl http://localhost:3000/api/health` returns healthy
- [ ] **Can Access Web Interface:** http://localhost:3000 loads
- [ ] **API Test Page Works:** http://localhost:3000/test.html shows all green
- [ ] **No Browser Console Errors:** Press F12, check Console tab
- [ ] **Dependencies Installed:** `node_modules` folder exists

## Diagnostic Commands

```bash
# Check Node.js version (need v16+)
node --version

# Check if server is running
lsof -ti:3000

# Test health endpoint
curl http://localhost:3000/api/health

# Test optimization endpoint
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test prompt for analysis","strategy":"auto","model":"gpt4"}'

# View server logs
# Look at terminal where you ran npm start

# Check for errors in browser
# Press F12, go to Console tab
```

## Using the Startup Script

We've created a helpful startup script:

```bash
./start.sh
```

This script will:
- ✅ Check Node.js is installed
- ✅ Install dependencies if needed
- ✅ Check if port 3000 is available
- ✅ Create .env file if missing
- ✅ Start the server with helpful information

## API Keys (You DON'T Need Them!)

**Important:** The system works WITHOUT any API keys!

You might think you need API keys, but you don't. See `API_KEYS_GUIDE.md` for details.

The system uses local NLP processing - no external API calls needed.

## Still Having Issues?

### Check Server Logs

Look at the terminal where you ran `npm start`. You should see:

```
🚀 Dual Strategy Optimizer Server running on port 3000
Environment: development
API available at http://localhost:3000/api
```

If you see errors, read them carefully - they'll tell you what's wrong.

### Check Browser Console

1. Open the web interface
2. Press F12 (or right-click → Inspect)
3. Go to Console tab
4. Look for red error messages

Common errors:
- `Failed to fetch` → Server not running
- `CORS error` → Using wrong URL (use localhost, not 127.0.0.1)
- `Unexpected token` → API returned HTML instead of JSON (wrong endpoint)

### Use the Test Page

Navigate to: http://localhost:3000/test.html

This will automatically test all endpoints and show you exactly what's working and what's not.

## Complete Fresh Start

If nothing works, try a complete fresh start:

```bash
# 1. Stop any running servers
kill -9 $(lsof -ti:3000)

# 2. Clean installation
cd /Users/rushilkakkad/Downloads/dual-strategy-optimizer
rm -rf node_modules package-lock.json
npm install

# 3. Start server
npm start

# 4. In a new terminal, test
curl http://localhost:3000/api/health

# 5. Open browser
open http://localhost:3000
```

## Success Indicators

You'll know everything is working when:

✅ Server terminal shows: "Dual Strategy Optimizer Server running on port 3000"
✅ `curl http://localhost:3000/api/health` returns `{"status":"healthy"}`
✅ http://localhost:3000 loads the web interface
✅ http://localhost:3000/test.html shows all green checkmarks
✅ You can enter a prompt and see compression results

## Example Working Request

This should work if everything is set up correctly:

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Please analyze the quarterly financial performance of our technology portfolio, focusing specifically on revenue growth, profit margins, and risk exposure across different market segments.",
    "strategy": "auto",
    "model": "gpt4"
  }'
```

You should get back a JSON response with:
- `recommendation` object
- `results` with `llmlingua` and `synthlang`
- Compression rates
- Cost savings

## Need More Help?

1. **Check the logs:** Look at terminal where `npm start` is running
2. **Use test page:** http://localhost:3000/test.html
3. **Run demo:** `node demo.js` should work if API works
4. **Browser console:** Press F12 and check for errors
5. **Restart everything:** Kill server, reinstall, restart

## Quick Commands Reference

```bash
# Start server
npm start

# Start with startup script
./start.sh

# Check if running
lsof -ti:3000

# Kill server
kill -9 $(lsof -ti:3000)

# Test API
curl http://localhost:3000/api/health

# Run demo
node demo.js

# Reinstall
rm -rf node_modules && npm install

# Use different port
PORT=3001 npm start
```

---

**Remember:** The API is working (we tested it with curl). If the web interface shows "Failed to optimize prompt", it's usually:
1. Server not running → Start it with `npm start`
2. Browser cache → Hard refresh (Cmd+Shift+R)
3. Wrong URL → Use http://localhost:3000 not file:// or 127.0.0.1

**The system does NOT require API keys to work!** ✅

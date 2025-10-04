# 🚀 Quick Start Guide

## Get Your Dual-Strategy Optimizer Running in 3 Minutes

### Step 1: Install Dependencies ⚡

```bash
npm install
```

This will install all required packages including:
- Express (web server)
- Natural & Compromise (NLP engines)
- Winston (logging)
- And other essential dependencies

### Step 2: Start the Server 🎯

```bash
npm start
```

You should see:
```
🚀 Dual Strategy Optimizer Server running on port 3000
Environment: development
API available at http://localhost:3000/api
```

### Step 3: Open the Web Interface 🌐

Open your browser and go to:
```
http://localhost:3000
```

## 🎮 Try It Out

### Using the Web Interface

1. Click on **"Optimize Prompt"** tab
2. Enter or select a sample prompt
3. Choose a model (GPT-4, GPT-3.5, Claude)
4. Click **"Analyze & Optimize Prompt"**
5. View the results showing:
   - Recommended strategy
   - Compression rates for both engines
   - Token savings
   - Cost savings
   - Semantic preservation scores

### Using the API

Test with curl:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Optimize a prompt
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Please analyze the quarterly financial performance of our technology portfolio",
    "strategy": "auto",
    "model": "gpt4"
  }'
```

## 📊 Features You Can Test

### 1. **System Overview Tab**
- View the middleware architecture
- See strategy comparisons
- Understand the flow

### 2. **Optimize Prompt Tab**
- Test real-time compression
- Compare both strategies
- See cost savings

### 3. **Strategy Details Tab**
- Learn about LLMLingua engine
- Learn about SynthLang system
- View processing steps

### 4. **Symbol Library Tab**
- Browse domain-specific symbols
- Add custom symbols
- See usage statistics

### 5. **API Integration Tab**
- Test API endpoints interactively
- View SDK examples (Python, Node.js, cURL)
- See real API responses

### 6. **Performance Tab**
- View optimization metrics
- See compression trends
- Track cost savings

## 🧪 Test Sample Prompts

### Financial (Best for SynthLang)
```
Please analyze the quarterly financial performance of our technology portfolio, focusing specifically on revenue growth, profit margins, and risk exposure across different market segments. Provide detailed recommendations for portfolio optimization and risk mitigation strategies.
```

### Technical (Best for SynthLang)
```
Review this Python function for potential security vulnerabilities, performance optimizations, and code quality improvements. Please provide specific suggestions for refactoring and identify any potential issues with memory management or error handling.
```

### Creative (Best for LLMLingua)
```
Write a compelling narrative about a young entrepreneur who discovers an innovative solution to climate change while working in their garage. The story should inspire readers and demonstrate how individual creativity can lead to global impact.
```

### General (Best for LLMLingua)
```
Conduct a comprehensive market analysis for electric vehicle adoption in the European market, including consumer preferences, regulatory impacts, competitive landscape, and growth projections for the next five years.
```

## 🔧 Configuration (Optional)

### Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` to customize:
```env
PORT=3000                    # Change server port
NODE_ENV=development         # production or development
RATE_LIMIT_MAX_REQUESTS=100  # API rate limit
```

### For Development

Run with auto-reload:
```bash
npm run dev
```

This uses nodemon to automatically restart when you make changes.

## 📝 API Quick Reference

### Base URL
```
http://localhost:3000/api
```

### Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/optimize` | Compress a prompt |
| POST | `/optimize/analyze` | Analyze without compressing |
| GET | `/symbols` | Get symbol libraries |
| POST | `/symbols/:category` | Add custom symbol |
| GET | `/metrics` | Get performance metrics |
| GET | `/health` | Server health check |

## 💡 Tips

1. **Use 'auto' strategy** - Let AI choose the best compression method
2. **Try different prompts** - See how each strategy performs on different content types
3. **Check the metrics** - Monitor your savings in the Performance tab
4. **Add custom symbols** - Extend SynthLang with your domain-specific terms
5. **Use the API tester** - Try the interactive API tester before integrating

## 🎯 What's Next?

- ✅ Test different prompt types
- ✅ Compare strategies side-by-side
- ✅ View your cost savings
- ✅ Integrate the API into your application
- ✅ Add custom symbols for your domain
- ✅ Monitor performance metrics

## ⚠️ Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":

```bash
# Find the process using port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm start
```

### Server Won't Start

1. Make sure Node.js v16+ is installed: `node --version`
2. Make sure dependencies are installed: `npm install`
3. Check for errors in the console output

### API Returns Errors

1. Check the server is running: `curl http://localhost:3000/api/health`
2. Verify your request format matches the examples
3. Check server logs for error messages

## 📚 Learn More

- **README.md** - Full documentation
- **API Integration Tab** - Interactive API examples
- **Strategy Details Tab** - Deep dive into compression engines

## 🎉 You're Ready!

Your Dual-Strategy Optimizer is now running and ready to:
- Reduce token usage by up to 90%
- Save API costs significantly
- Maintain >95% semantic preservation
- Provide intelligent strategy selection

Start optimizing your prompts and saving money! 💰

---

Need help? Check the full README.md or the web interface help sections.

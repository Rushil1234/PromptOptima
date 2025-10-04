# Dual-Strategy Prompt Optimization Middleware

A sophisticated, intelligent middleware system that optimizes LLM prompts using two complementary strategies: **LLMLingua** (general-purpose compression) and **SynthLang** (symbolic domain-specific compression). Achieve up to 90% token reduction while maintaining >95% semantic preservation.

## 🚀 Features

### Two Powerful Compression Engines

1. **LLMLingua General Engine**
   - Smart NLP-based word removal
   - Removes non-essential words while preserving meaning
   - Up to 80% token reduction
   - Best for: varied content, one-off prompts, creative writing

2. **SynthLang Symbolic System**
   - Kanji-inspired symbolic compression
   - Domain-specific symbol libraries
   - Up to 90% token reduction
   - Best for: high-frequency tasks, domain-specific content (financial, technical)

### Intelligent Features

- ✅ **Automatic Strategy Selection** - AI-powered routing based on prompt characteristics
- ✅ **Semantic Preservation** - Maintains >95% semantic similarity
- ✅ **Cost Tracking** - Real-time API cost savings calculation
- ✅ **Performance Metrics** - Comprehensive analytics dashboard
- ✅ **Custom Symbol Libraries** - Extensible domain-specific compression
- ✅ **RESTful API** - Easy integration with any application
- ✅ **Real-time Processing** - Sub-second compression times

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher

## 🛠️ Installation

1. **Clone or navigate to the project directory**

```bash
cd dual-strategy-optimizer
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PORT=3000
NODE_ENV=development

# Optional: For future LLM integration
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: For MongoDB persistence
MONGODB_URI=mongodb://localhost:27017/optimizer
```

## 🚀 Quick Start

### Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Open the Web Interface

Open your browser and navigate to:

```
http://localhost:3000
```

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. Optimize Prompt

**POST** `/api/optimize`

Compresses a prompt using both strategies and returns recommendations.

**Request Body:**
```json
{
  "prompt": "Your long prompt text here...",
  "strategy": "auto",  // "auto", "llmlingua", or "synthlang"
  "model": "gpt4",     // "gpt4", "gpt35", or "claude"
  "targetReduction": 70 // Optional: target compression percentage
}
```

**Response:**
```json
{
  "recommendation": {
    "recommended": "synthlang",
    "confidence": "89.5",
    "reasoning": "High domain specificity allows effective symbolic compression",
    "scores": {
      "synthlang": "89.5",
      "llmlingua": "72.3"
    }
  },
  "results": {
    "llmlingua": {
      "originalTokens": 48,
      "compressedTokens": 15,
      "compressionRate": "68.8",
      "semanticScore": "96.2",
      "compressedText": "analyze quarterly financial performance...",
      "processingTime": 234,
      "costAnalysis": {
        "originalCost": "0.0014",
        "compressedCost": "0.0004",
        "savings": "0.0010",
        "savingsPercent": "68.8"
      }
    },
    "synthlang": {
      "originalTokens": 48,
      "compressedTokens": 7,
      "compressionRate": "85.4",
      "semanticScore": "94.8",
      "compressedText": "↹ Q ₣ ⚡ ⊞ $ △ ⚠",
      "processingTime": 189,
      "symbolMapping": {
        "↹": "analyze",
        "Q": "quarterly",
        "₣": "financial"
      },
      "costAnalysis": {
        "originalCost": "0.0014",
        "compressedCost": "0.0002",
        "savings": "0.0012",
        "savingsPercent": "85.4"
      }
    }
  }
}
```

#### 2. Analyze Prompt

**POST** `/api/optimize/analyze`

Analyzes prompt characteristics without compression.

**Request Body:**
```json
{
  "prompt": "Your prompt text here..."
}
```

#### 3. Get Symbol Library

**GET** `/api/symbols` - Get all symbol libraries

**GET** `/api/symbols/:category` - Get symbols for specific category

**POST** `/api/symbols/:category` - Add custom symbol

```json
{
  "concept": "analyze",
  "symbol": "↹"
}
```

#### 4. Get Metrics

**GET** `/api/metrics` - Get overall performance metrics

**GET** `/api/metrics/summary` - Get summarized metrics for dashboard

**GET** `/api/metrics/history?limit=50` - Get optimization history

**POST** `/api/metrics/record` - Record optimization operation

#### 5. Health Check

**GET** `/api/health` - Server health status

## 💻 Usage Examples

### JavaScript/Node.js

```javascript
const response = await fetch('http://localhost:3000/api/optimize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Please analyze the quarterly financial performance...',
    strategy: 'auto',
    model: 'gpt4'
  })
});

const data = await response.json();
console.log('Recommended strategy:', data.recommendation.recommended);
console.log('Compressed text:', data.results[data.recommendation.recommended].compressedText);
console.log('Token savings:', data.results[data.recommendation.recommended].compressionRate + '%');
```

### Python

```python
import requests

response = requests.post('http://localhost:3000/api/optimize', json={
    'prompt': 'Please analyze the quarterly financial performance...',
    'strategy': 'auto',
    'model': 'gpt4'
})

data = response.json()
print(f"Recommended: {data['recommendation']['recommended']}")
print(f"Savings: {data['results'][data['recommendation']['recommended']]['compressionRate']}%")
```

### cURL

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Please analyze the quarterly financial performance...",
    "strategy": "auto",
    "model": "gpt4"
  }'
```

## 🎯 Strategy Selection Guide

### Use **SynthLang** when:
- ✅ Domain-specific content (financial, technical, research)
- ✅ High-frequency, repetitive tasks
- ✅ Formal, structured prompts
- ✅ Maximum compression needed (up to 90%)

### Use **LLMLingua** when:
- ✅ General-purpose content
- ✅ Creative or varied language
- ✅ One-off prompts
- ✅ Natural language preservation important

### Use **Auto** when:
- ✅ Unsure which strategy is best
- ✅ Let AI decide based on content analysis

## 📊 Performance Metrics

The system tracks and displays:

- Total prompts optimized
- Average compression rate
- Total cost savings
- Semantic preservation score
- Strategy usage distribution
- Category breakdown

Access the metrics dashboard at: `http://localhost:3000` → **Performance** tab

## 🔧 Architecture

```
┌─────────────────┐
│  Your App       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Middleware API │  ← Smart routing & compression
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌──────────┐
│LLMLingua│ │SynthLang │
└────────┘ └──────────┘
    │         │
    └────┬────┘
         ↓
┌─────────────────┐
│  LLM Provider   │  ← Reduced tokens = Lower cost
│  (GPT-4, etc.)  │
└─────────────────┘
```

## 🧪 Testing

### Run the Web Interface Tests

1. Start the server
2. Open `http://localhost:3000`
3. Navigate to **Optimize Prompt** tab
4. Try sample prompts or enter your own
5. View compression results and cost savings

### API Testing

Use the **API Integration** tab in the web interface for interactive API testing.

## 📈 Cost Savings Example

**Original Prompt:** 200 tokens
**After Compression:** 30 tokens (85% reduction)

For GPT-4 at $0.03/1K tokens:
- Original cost: $0.006
- Compressed cost: $0.0009
- **Savings: $0.0051 (85%)**

At 1,000 requests/month:
- **Monthly savings: $5.10**
- **Annual savings: $61.20**

For high-volume applications with millions of requests, savings can reach thousands of dollars monthly.

## 🛡️ Security

- Rate limiting enabled (100 requests per 15 minutes)
- CORS configured for security
- Helmet.js for security headers
- Input validation on all endpoints

## 🔮 Future Enhancements

- [ ] MongoDB persistence for history and custom symbols
- [ ] Direct LLM API integration (OpenAI, Anthropic)
- [ ] User authentication and API keys
- [ ] Batch optimization endpoints
- [ ] WebSocket support for real-time streaming
- [ ] Docker containerization
- [ ] Kubernetes deployment configs
- [ ] Advanced analytics and A/B testing
- [ ] Machine learning-powered strategy optimization

## 📝 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions welcome! Please feel free to submit pull requests or open issues.

## 💡 Tips

1. **Start with 'auto' strategy** - Let the system choose the best approach
2. **Use symbol libraries** - Extend with domain-specific symbols for better compression
3. **Monitor metrics** - Track performance and cost savings
4. **Adjust target reduction** - Balance between compression and semantic preservation
5. **Cache compressed prompts** - Store frequently used compressed prompts for reuse

## 📞 Support

For issues or questions:
- Check the web interface help sections
- Review API documentation
- Open a GitHub issue

## 🎉 Getting Started

Ready to optimize your LLM costs?

```bash
npm install
npm start
# Open http://localhost:3000
```

Start compressing prompts and saving money today! 🚀

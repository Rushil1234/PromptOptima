# Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies ✅
```bash
npm install
```

### 2. Configure Google Gemini API Key 🔑

You need a Google AI API key to use the LLM compression features.

1. **Get your API key**: Visit https://aistudio.google.com/app/apikey
2. **Create a `.env` file** in the root directory
3. **Add your key**:
   ```
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ```

### 3. Run the Development Server 🏃

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 What You'll See

1. **Beautiful Glassmorphic UI** with animated gradients and floating panels
2. **Strategy Selector** - Choose between LLMLingua or SynthLang
3. **Prompt Input Area** - Enter your long prompts
4. **AI Strategy Recommendation** - Get smart suggestions
5. **Real-time Metrics** - Compression ratio, token savings, semantic score
6. **Symbol Reference** - Browse SynthLang's symbolic language
7. **Side-by-side Comparison** - See before and after

## 🎯 Usage Examples

### Example 1: Compress a Long Prompt
```
Input: "Please analyze this document carefully and provide me with a comprehensive summary that includes all the key points, main themes, and any important insights you can discover."

LLMLingua Output: "Analyze document, provide comprehensive summary key points main themes important insights."

Result: 70% compression, 96% semantic preservation
```

### Example 2: SynthLang Symbolic Compression
```
Input: "Create a function that validates user input"

SynthLang Output: "⟐ ☰ ✧ ☴ ◆"

Result: 85% compression, 98% semantic preservation
```

## 🎨 Key Features

- **Dual Strategy**: Choose between LLMLingua (general) or SynthLang (symbolic)
- **AI Recommendations**: Let AI suggest the best strategy for your prompt
- **Real-time Metrics**: See compression stats instantly
- **Beautiful UI**: Frosted glass design with smooth animations
- **Symbol Library**: Browse 40+ SynthLang symbols
- **Copy to Clipboard**: One-click copy for compressed prompts

## 🔧 Troubleshooting

### Dependencies Issue
If you see any warnings, run:
```bash
npm audit fix
```

### Missing API Key
If you see errors about API key:
1. Make sure `.env` file exists in root
2. Check that `GOOGLE_GENAI_API_KEY` is set correctly
3. Restart the dev server after adding the key

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

## 📁 Project Structure

```
tuff/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page
│   ├── components/       # React components
│   │   ├── GlassPanel.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── MetricCard.tsx
│   │   ├── StrategyCard.tsx
│   │   └── SymbolReference.tsx
│   └── lib/              # Core logic
│       ├── genkit.ts     # Gemini config
│       ├── llmlingua.ts  # LLMLingua engine
│       └── synthlang.ts  # SynthLang engine
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .env                  # Your API key (create this!)
```

## 🎓 How It Works

### LLMLingua Engine
1. Sends prompt to Google Gemini
2. AI removes non-essential words
3. Preserves semantic meaning
4. Returns compressed version
5. Calculates similarity score

### SynthLang Engine
1. Analyzes prompt for concepts
2. Replaces words with symbols
3. Uses 40+ custom glyphs
4. Instant compression (no API call)
5. High preservation rate

## 🌟 Next Steps

1. **Add your API key** to `.env`
2. **Start the dev server**
3. **Try compressing a prompt**
4. **Explore the symbol reference**
5. **Test different strategies**

## 💡 Tips

- Use **LLMLingua** for varied, natural language prompts
- Use **SynthLang** for repetitive, structured tasks
- Try **AI Suggest** if you're unsure which to use
- Check the **metrics** to verify compression quality
- Browse **symbols** to learn the symbolic language

## 🚀 Ready to Optimize!

Your LLM Optimizer is ready to reduce API costs by up to 90% while maintaining semantic accuracy. Start compressing prompts now!

---

Need help? Check the README.md for detailed documentation.

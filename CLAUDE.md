# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LLM Optimizer** is a production-ready dual-strategy prompt compression system that reduces LLM token usage by 60-95% while maintaining semantic fidelity. The system uses:
- **LLMLingua**: AI-powered compression via Google Gemini (60-80% reduction)
- **SynthLang**: Symbol-based compression using 700+ Japanese Kanji mappings (80-90% reduction)
- **Hybrid**: Multi-layer semantic compression with structural, semantic, contextual, and format optimization (70-85% reduction)
- **Ultra**: Chained compression pipeline combining all three strategies (90-95% reduction)

The project includes a Next.js web application, analytics dashboard, chatbot interface, Chrome extension, and comprehensive testing framework.

## Development Commands

### Running the Application
```bash
# Development server (runs on port 3001)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm lint
```

### Testing & CLI Tools
```bash
# Run all automated tests
npm run test

# Run performance benchmarks
npm run benchmark

# SynthLang CLI commands
npm run synthlang -- export-vocab json          # Export vocabulary
npm run synthlang -- training-dataset 10000     # Generate training data
npm run synthlang -- translate "text" to-kanji  # Test compression
npm run synthlang -- stats                      # View statistics

# Test specific systems
node scripts/test-systems.js      # Validate all systems
node scripts/verify-ultra.js      # Test ultra compression
node scripts/quick-test-ultra.js  # Quick ultra validation
```

## Architecture

### Core Compression Engines

**File**: `src/lib/llmlingua.ts`
- **Class**: `LLMLinguaEngine`
- **Method**: `compress(prompt: string, targetRatio: number = 0.5)`
- AI-powered compression using Google Gemini
- Fallback to `simpleCompress()` when API unavailable or prompt too long
- Max input: 3000 tokens
- Includes artifact removal and validation

**File**: `src/lib/synthlang.ts`
- **Constants**: `SYNTHLANG_SYMBOLS` (700+ Kanji symbols with categories)
- **Class**: `SynthLangEngine`
- **Method**: `compress(prompt: string)`
- Symbol-based compression using Kanji character mappings
- Categories: common words, CRUD, control flow, data types, API, ML operations
- Completely offline, no API required

**File**: `src/lib/hybrid-compressor.ts`
- **Class**: `HybridSemanticCompressor`
- **Method**: `compress(prompt: string, deepLearning: boolean = false)`
- Multi-layer compression pipeline:
  1. **Structural**: Filler word removal, pattern optimization
  2. **Semantic**: Concept merging and deduplication
  3. **Contextual**: Entity recognition and relationship preservation
  4. **Format**: Verbose-to-concise transformation
  5. **Deep Learning** (optional): AI-powered final pass
- Returns detailed layer-by-layer compression metrics

**File**: `src/lib/ultra-compressor.ts`
- **Class**: `UltraCompressor`
- **Method**: `compress(prompt: string)`
- Chains all three strategies: Hybrid → LLMLingua → SynthLang
- Returns compression journey with per-layer metrics
- Target: 90-95% total compression

### Production-Ready Components

**File**: `src/lib/tokenizer.ts`
- **Class**: `CustomTokenizer` (singleton pattern)
- Manages 266+ Kanji symbols with unique token IDs (50000-50265)
- **Methods**:
  - `tokenize(text: string)`: Convert text to tokens
  - `exportVocabulary()`: Export for LLM training
  - `generateTrainingPairs(count: number)`: Create training datasets
- Export formats: JSON, HuggingFace, SentencePiece

**File**: `src/lib/mapping-engine.ts`
- **Class**: `BidirectionalMappingEngine` (singleton pattern)
- **Methods**:
  - `translateToKanji(text: string, context?: object)`: English → Kanji
  - `translateToEnglish(kanji: string)`: Kanji → English
- Features:
  - Context-aware disambiguation
  - Multi-word phrase pattern matching (150+ patterns)
  - Confidence scoring
  - Fallback handling for unknown terms

**File**: `src/lib/testing-framework.ts`
- **Class**: `TestingFramework` (singleton pattern)
- 30+ automated test cases across difficulty levels
- **Methods**:
  - `runAllTests()`: Execute full test suite
  - `runPerformanceBenchmark(iterations: number)`: Measure throughput
  - `generateReport()`: Create Markdown/JSON reports
- Validates compression ratios and semantic preservation

**File**: `src/lib/analytics-service.ts`
- **Class**: `AnalyticsService` (singleton pattern)
- In-memory analytics tracking (file-based persistence)
- Tracks: compression events, strategy performance, time-series data
- **Methods**:
  - `trackCompression(data)`: Record compression event
  - `getOverview()`: Get aggregate statistics
  - `getTimeSeries(hours)`: Get historical data

### API Routes

All API routes follow Next.js App Router conventions (`src/app/api/**/route.ts`):

**Compression Endpoints**:
- `POST /api/compress/llmlingua` - LLMLingua compression
- `POST /api/compress/synthlang` - SynthLang compression
- `POST /api/compress/hybrid` - Hybrid compression
- `POST /api/compress/ultra` - Ultra compression

**Utility Endpoints**:
- `POST /api/analyze` - AI strategy recommendation
- `GET /api/symbols` - Get all SynthLang symbols
- `POST /api/chat` - Chatbot (uses Gemini)
- `GET /api/analytics` - Analytics data (overview/timeseries)
- `POST /api/spell-check` - Spell checking
- `POST /api/language-switch` - Language detection/routing
- `POST /api/decode` - SynthLang decompression

**Advanced Endpoints**:
- `GET /api/tokenizer?format=json|stats` - Export vocabulary
- `POST /api/tokenizer` - Generate training datasets
- `POST /api/translate` - Bidirectional translation (English ↔ Kanji)
- `POST /api/test` - Run automated tests

### Frontend Architecture

**Main Application** (`src/app/page.tsx`):
- Tab-based interface: Compression + Chatbot
- State management for compression results and UI feedback
- Toast notification system
- Parallax scrolling effects
- Strategy selection with AI recommendations

**Components** (`src/components/`):
- `GlassPanel.tsx` - Glassmorphic container with backdrop blur
- `LoadingSpinner.tsx` - Shimmer animation loader
- `MetricCard.tsx` - Display compression metrics
- `StrategyCard.tsx` - Strategy selector cards
- `SymbolReference.tsx` - Kanji symbol browser with category filters
- `Chatbot.tsx` - AI chat interface with markdown rendering
- `CopyButton.tsx` - Clipboard copy with feedback
- `Toast.tsx` - Toast notification system
- `FaultyTerminal.tsx` - WebGL terminal visualization
- `Threads.tsx` - Thread management UI

**Analytics Dashboard** (`src/app/analytics/page.tsx`):
- Real-time analytics with auto-refresh
- Charts: Line, Bar, Radar, Pie, Area (using Recharts)
- Time range selection (24h/7d/30d)
- Strategy comparison and cost savings visualization

### Chrome Extension

**Location**: `chrome-extension/`
- **manifest.json**: Chrome extension configuration (Manifest V3)
- **popup.html/js**: Extension popup interface
- **background.js**: Background service worker
- **options.html/js**: Extension settings page
- Provides quick compression access from browser toolbar

## Key Design Patterns

### Singleton Pattern
All major services (Tokenizer, MappingEngine, TestingFramework, AnalyticsService) use singleton pattern with `getInstance()` method for consistency and performance.

### Fallback Strategy
LLMLingua engine includes comprehensive fallback mechanisms:
1. Check if API key configured
2. Validate prompt length (max 3000 tokens)
3. Fall back to `simpleCompress()` if API fails or unavailable
4. Clean artifacts from AI responses
5. Validate compression quality

### Layer Composition
Hybrid and Ultra compressors use layer composition:
- Each layer is independently testable
- Compression journey tracked through all stages
- Per-layer metrics returned for transparency
- Optional deep learning pass for maximum compression

### Environment Variables
- `GOOGLE_GENAI_API_KEY` - Required for LLMLingua and Chatbot
- Check availability before API calls
- Graceful degradation to offline methods when unavailable

## Common Development Patterns

### Adding a New Compression Strategy

1. Create engine in `src/lib/your-strategy.ts`:
```typescript
export class YourEngine {
  async compress(prompt: string): Promise<CompressionResult> {
    // Implementation
  }
}
```

2. Add API route in `src/app/api/compress/your-strategy/route.ts`:
```typescript
import { YourEngine } from '@/lib/your-strategy';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const engine = new YourEngine();
  const result = await engine.compress(prompt);
  return Response.json(result);
}
```

3. Update UI to include new strategy option in `src/app/page.tsx`

### Adding New Kanji Symbols

Edit `src/lib/synthlang.ts` and add to `SYNTHLANG_SYMBOLS` array:
```typescript
{
  symbol: '新',
  concept: 'CONCEPT',
  description: 'detailed description',
  category: 'category'
}
```

Categories: common, crud, control-flow, data-types, api, database, ml-operations

### Testing New Features

1. Add test cases to `src/lib/testing-framework.ts`:
```typescript
{
  id: 'test_001',
  input: 'test input',
  expectedOutput: 'expected compressed output',
  category: 'category',
  difficulty: 'easy|medium|hard',
  description: 'what this tests'
}
```

2. Run tests: `npm run test`
3. Check reports in `exports/test-report.md`

## Important Implementation Notes

### Token Estimation
Token estimation uses approximation: `text.split(/\s+/).length * 1.3`
- Rough estimate, not exact
- Works for most use cases
- For precise counts, integrate tiktoken or similar

### Gemini API Integration
- Uses Firebase Genkit SDK (`@genkit-ai/googleai`)
- Model: `gemini15Flash` (defined in `src/lib/genkit.ts`)
- Temperature: 0.3 for compression tasks
- Max output tokens: Dynamic based on input size
- Always handle rate limits and errors gracefully

### Analytics Persistence
- Analytics stored in `analytics.json` (gitignored)
- In-memory cache with periodic file writes
- Time-series data with configurable retention
- Clear analytics by deleting the file

### Styling System
- **Tailwind CSS** with custom config in `tailwind.config.ts`
- Custom colors: dark-950, dark-900, dark-800, etc.
- Animations: gradient-x, pulse-glow, shimmer, float, slide-up
- Glassmorphic design: `backdrop-blur-xl` with rgba overlays
- Fonts: Roboto (UI), Fira Code (code)

### State Management
- No Redux/external state management
- Component-level useState for UI state
- Server-side for data fetching
- Toast system for global notifications

## Troubleshooting

### API Key Issues
- Check `.env` file has `GOOGLE_GENAI_API_KEY=your_key_here`
- Get key from: https://aistudio.google.com/app/apikey
- LLMLingua will use simple compression fallback if key missing
- Chatbot will return error if key not configured

### Build Errors
- Run `npm install` to ensure all dependencies installed
- Check Node.js version (recommend v18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Port Conflicts
- Default port: 3001 (configured in `package.json`)
- Change port: `next dev --port XXXX`
- Check if port in use: `lsof -i :3001`

### Extension Loading
- Chrome extension location: `chrome-extension/`
- Load unpacked from Chrome Extensions page
- Enable Developer mode first
- Reload extension after code changes

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (compression, analytics, chat)
│   ├── analytics/         # Analytics dashboard page
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main compression interface
│   └── globals.css        # Global styles + animations
├── components/            # React components
│   ├── GlassPanel.tsx    # Reusable glassmorphic panels
│   ├── Chatbot.tsx       # AI chatbot interface
│   └── ...
└── lib/                   # Core business logic
    ├── synthlang.ts      # SynthLang engine + 700+ symbols
    ├── llmlingua.ts      # LLMLingua AI compression
    ├── hybrid-compressor.ts    # Multi-layer compression
    ├── ultra-compressor.ts     # Chained compression
    ├── tokenizer.ts      # Custom tokenizer (266+ symbols)
    ├── mapping-engine.ts # Bidirectional translation
    ├── testing-framework.ts    # Automated testing
    ├── analytics-service.ts    # Analytics tracking
    └── genkit.ts         # Gemini AI configuration

scripts/
├── synthlang-cli.js      # CLI tool for SynthLang operations
├── test-systems.js       # System validation
└── verify-ultra.js       # Ultra compression testing

chrome-extension/         # Chrome extension files
├── manifest.json         # Extension config (Manifest V3)
├── popup.html/js         # Extension popup
├── background.js         # Service worker
└── options.html/js       # Settings page
```

## Performance Expectations

- **Throughput**: 127,000+ ops/sec (translation/tokenization)
- **Compression Ratios**:
  - LLMLingua: 60-80%
  - SynthLang: 80-90%
  - Hybrid: 70-85%
  - Ultra: 90-95%
- **Semantic Preservation**: 95%+ across all strategies
- **API Response Time**: <100ms (excluding Gemini API latency)

## Version Information

- **Version**: 2.0.0
- **Next.js**: 14.2.0 (App Router)
- **React**: 18.3.0
- **TypeScript**: 5.4.5
- **Node.js**: Recommended v18+

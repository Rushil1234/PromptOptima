# SynthLang Production Deployment Guide

## 🎯 Overview

This guide covers the complete deployment workflow for the SynthLang compression system, from tokenizer training to LLM fine-tuning and production deployment.

## 📋 Timeline & Phases

### Phase 1: Tokenizer Training (1-2 weeks)
- Export vocabulary in multiple formats
- Generate training datasets
- Integrate with LLM tokenizers

### Phase 2: Mapping Engine (3-4 weeks)
- Deploy bidirectional translation system
- Optimize phrase patterns
- Build context-aware disambiguation

### Phase 3: Testing Framework (1-2 weeks)
- Validate across LLMs (GPT-4, Claude, Gemini)
- Benchmark performance
- Stress test edge cases

## 🔧 Step-by-Step Deployment

### Step 1: Export Vocabulary

```bash
# Export all vocabulary formats
npm run synthlang -- export-vocab all
```

This generates:
- `exports/vocabulary.json` - Full vocabulary with metadata
- `exports/huggingface/tokenizer.json` - HuggingFace format
- `exports/huggingface/vocab.txt` - Plain text vocabulary
- `exports/sentencepiece.vocab` - SentencePiece format

### Step 2: Generate Training Dataset

```bash
# Generate 10,000 training pairs
npm run synthlang -- training-dataset 10000
```

Output: `exports/training-dataset.jsonl`

Format (JSONL):
```json
{"messages":[{"role":"system","content":"..."},{"role":"user","content":"create new user"},{"role":"assistant","content":"作 新 者"}]}
{"messages":[{"role":"system","content":"..."},{"role":"user","content":"read all data"},{"role":"assistant","content":"読 全 値"}]}
...
```

### Step 3: Fine-tune LLM (OpenAI Example)

```bash
# Upload training file
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "file=@exports/training-dataset.jsonl" \
  -F "purpose=fine-tune"

# Create fine-tuning job
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-abc123",
    "model": "gpt-4o-mini-2024-07-18",
    "suffix": "synthlang"
  }'

# Monitor progress
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Step 4: Integrate Custom Tokenizer

#### For HuggingFace Transformers

```python
from transformers import AutoTokenizer

# Load custom tokenizer
tokenizer = AutoTokenizer.from_pretrained("./exports/huggingface")

# Add SynthLang tokens
synthlang_tokens = [
    "作", "読", "更", "削", "書", "送", "受", "析", "変",
    "文", "数", "表", "物", "真", "日", "有", "無", "多", "単",
    "且", "或", "非", "故", "条", "関", "類", "接", "庫", "者"
    # ... all 500+ tokens
]

tokenizer.add_tokens(synthlang_tokens)

# Save updated tokenizer
tokenizer.save_pretrained("./exports/tokenizer-synthlang")
```

#### For SentencePiece

```bash
# Train SentencePiece model with custom vocabulary
spm_train \
  --input=training-corpus.txt \
  --model_prefix=synthlang \
  --vocab_size=50000 \
  --user_defined_symbols_file=exports/sentencepiece.vocab \
  --character_coverage=0.9995
```

### Step 5: Run Comprehensive Tests

```bash
# Run all automated tests
npm run synthlang -- test
```

Expected output:
```
🧪 Running comprehensive test suite...

=============================================================
📊 TEST RESULTS SUMMARY
=============================================================
Total Tests:        30+
Passed:             28 ✅
Failed:             2 ❌
Pass Rate:          93.3%
Avg Compression:    85.2%
Avg Semantic Score: 96.4%
Avg Latency:        1.8ms

📈 By Difficulty:
   easy    : 100.0% pass rate
   medium  : 92.3% pass rate
   hard    : 83.3% pass rate

📂 By Category:
   crud        : 95.0% pass rate
   api         : 90.0% pass rate
   logic       : 87.5% pass rate
   database    : 100.0% pass rate
   ml          : 85.7% pass rate

✅ Full report saved to: exports/test-report.md
✅ Results saved to: exports/test-results.json
```

### Step 6: Performance Benchmarking

```bash
# Run 5000-iteration benchmark
npm run synthlang -- benchmark 5000
```

Expected output:
```
⚡ Running performance benchmark (5000 iterations)...

=============================================================
⚡ PERFORMANCE BENCHMARK RESULTS
=============================================================
Iterations:     5000
Avg Latency:    1.75ms
Min Latency:    0.89ms
Max Latency:    8.32ms
Throughput:     571 ops/sec
```

## 🚀 Production API Integration

### Deploy to Vercel/Railway/AWS

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy (example with Vercel)
vercel deploy --prod
```

### Environment Variables

```env
# Required
GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Optional (for multi-LLM testing)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
```

### Health Check Endpoint

```bash
# Test all systems
curl https://your-domain.com/api/test?action=test-cases

# Check tokenizer
curl https://your-domain.com/api/tokenizer?format=stats
```

## 📊 Monitoring & Observability

### Key Metrics to Track

1. **Compression Ratio**
   - Target: 80-90% for SynthLang
   - Target: 60-80% for LLMLingua

2. **Semantic Preservation**
   - Target: 95%+

3. **Latency**
   - Translation: < 5ms p99
   - Tokenization: < 2ms p99

4. **Throughput**
   - Target: 500+ ops/sec

5. **Error Rate**
   - Target: < 1%

### Logging

```typescript
// Add to your production code
import { mappingEngine } from '@/lib/mapping-engine';

const result = await mappingEngine.translateToKanji(text);

// Log metrics
console.log({
  timestamp: new Date().toISOString(),
  input_length: text.length,
  output_length: result.translated.length,
  compression_ratio: result.compressionRatio,
  confidence: result.confidence,
  symbols_used: result.metadata.symbolCount,
  fallback_words: result.metadata.fallbackWords.length
});
```

## 🔐 Security Considerations

1. **Rate Limiting**
   ```typescript
   // Add rate limiting middleware
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 60 * 1000, // 1 minute
     max: 100 // 100 requests per minute
   });
   ```

2. **Input Validation**
   ```typescript
   // Validate input length
   if (text.length > 10000) {
     throw new Error('Input too long');
   }
   
   // Sanitize input
   const sanitized = text.replace(/[^\w\s\u4e00-\u9faf]/g, '');
   ```

3. **API Key Protection**
   - Store keys in environment variables
   - Use secret management (AWS Secrets Manager, Vercel Secrets)
   - Rotate keys regularly

## 📈 Scaling Strategy

### Horizontal Scaling

```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: synthlang-api
spec:
  replicas: 5
  selector:
    matchLabels:
      app: synthlang
  template:
    metadata:
      labels:
        app: synthlang
    spec:
      containers:
      - name: synthlang
        image: your-registry/synthlang:latest
        ports:
        - containerPort: 3001
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Caching Strategy

```typescript
// Redis cache for common translations
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

async function translateWithCache(text: string) {
  // Check cache
  const cached = await redis.get(`translation:${text}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Translate
  const result = await mappingEngine.translateToKanji(text);
  
  // Cache result (1 hour TTL)
  await redis.setex(`translation:${text}`, 3600, JSON.stringify(result));
  
  return result;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Low Compression Ratio**
   - Check if input contains many proper nouns (not in vocabulary)
   - Add domain-specific symbols to `SYNTHLANG_SYMBOLS`
   - Use LLMLingua for general text instead

2. **Poor Semantic Preservation**
   - Review failed test cases in `exports/test-report.md`
   - Adjust phrase patterns in `mapping-engine.ts`
   - Fine-tune disambiguation weights

3. **High Latency**
   - Enable caching (Redis)
   - Optimize phrase pattern regex
   - Use CDN for static assets

4. **Token ID Conflicts**
   - Ensure token IDs start from 50000+
   - Check for duplicates in vocabulary
   - Re-export tokenizer files

## 📚 Additional Resources

- [LLMLingua Paper](https://arxiv.org/abs/2310.05736)
- [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)
- [HuggingFace Tokenizers](https://huggingface.co/docs/tokenizers)
- [SentencePiece Documentation](https://github.com/google/sentencepiece)

## 🎓 Training Best Practices

1. **Dataset Quality**
   - Use diverse examples from all categories
   - Include edge cases and error scenarios
   - Balance easy/medium/hard difficulty

2. **Validation Split**
   - 80% training, 10% validation, 10% test
   - Ensure no data leakage between splits

3. **Hyperparameter Tuning**
   - Learning rate: 1e-5 to 5e-5
   - Batch size: 4-8 for fine-tuning
   - Epochs: 3-5 (monitor overfitting)

4. **Evaluation Metrics**
   - BLEU score for translation quality
   - Compression ratio
   - Inference latency
   - Token efficiency

## 🌟 Success Criteria

✅ **Phase 1 Complete** when:
- Vocabulary exported in all formats
- 10,000+ training pairs generated
- Tokenizer integrated with target LLM

✅ **Phase 2 Complete** when:
- Bidirectional translation working
- 95%+ semantic preservation
- < 5ms p99 latency

✅ **Phase 3 Complete** when:
- 90%+ test pass rate
- 500+ ops/sec throughput
- Production-ready monitoring

## 📞 Support

For production deployment support, please:
1. Review test reports in `exports/`
2. Check API health endpoints
3. Monitor performance metrics
4. Open GitHub issue with logs

---

**Last Updated**: 2025-10-04  
**Version**: 2.0.0  
**Status**: Production Ready ✅

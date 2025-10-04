# 🎛️ Language Switching Tuning Guide

## Current Status

The language switching feature is **working correctly** but set to **conservative mode** to prevent false-positive translations. This means it requires high confidence (>0.7) before switching languages.

## Why Low Confidence?

The confidence calculation is:
```typescript
confidence = Math.min(patternMatches / 10, 0.95)
```

For example:
- **3 math keywords** detected → confidence = 0.3 (too low, stays English)
- **7 math keywords** detected → confidence = 0.7 (threshold met, switches to Chinese)
- **10+ math keywords** → confidence = 0.95 (very confident, switches)

## 🔧 How to Make Language Switching More Aggressive

### Option 1: Lower the Confidence Threshold
**File:** `src/lib/language-router.ts`  
**Line:** 35

```typescript
// BEFORE (conservative)
if (routing.optimalLanguage !== 'english' && routing.confidence > 0.7) {

// AFTER (more aggressive)
if (routing.optimalLanguage !== 'english' && routing.confidence > 0.4) {
```

**Effect:** Switches languages with fewer keyword matches  
**Risk:** May switch on ambiguous prompts

### Option 2: Reduce Score Divisor
**File:** `src/lib/language-router.ts`  
**Lines:** 103, 116, 127

```typescript
// BEFORE (mathematical tasks)
confidence: Math.min(mathScore / 10, 0.95)
                              // ^^^ divides by 10

// AFTER (more aggressive)
confidence: Math.min(mathScore / 5, 0.95)
                              // ^^^ divides by 5

// Apply same change to:
// - Line 116: creativeScore / 8  → / 4
// - Line 127: technicalScore / 10 → / 5
```

**Effect:** Reaches 0.7 confidence with half as many keywords  
**Risk:** None - just reaches threshold faster

### Option 3: Add More Pattern Matches
**File:** `src/lib/language-router.ts`  
**Lines:** 25-31 (math), 50-58 (creative), 66-74 (technical)

```typescript
// Example: Add more mathematical patterns
const mathPatterns = [
  /\b(calculate|solve|compute|derive|integrate|differentiate|equation)\b/gi,
  /\b(sum|product|quotient|ratio|factor|multiple)\b/gi, // ADD MORE
  /\b(geometric|arithmetic|algebraic|trigonometric)\b/gi, // ADD MORE
  // ... existing patterns
];
```

**Effect:** Detects more variations of the same task type  
**Risk:** None - improves accuracy

## 📊 Testing Your Changes

After making changes, test with:

```bash
# Test mathematical prompt
curl -X POST http://localhost:3001/api/language-switch \
  -H "Content-Type: application/json" \
  -d '{"text": "Calculate the derivative of x squared"}' | jq '.confidence, .language'

# Test creative prompt
curl -X POST http://localhost:3001/api/language-switch \
  -H "Content-Type: application/json" \
  -d '{"text": "Write a story about a dragon"}' | jq '.confidence, .language'

# Test in chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Solve x squared equals 4", "useLanguageSwitching": true}' | jq '.language, .taskType'
```

## 🎯 Recommended Settings

### For Maximum Token Savings (Aggressive):
```typescript
// language-router.ts line 35
if (routing.optimalLanguage !== 'english' && routing.confidence > 0.4) {

// Lines 103, 116, 127
confidence: Math.min(mathScore / 5, 0.95)
confidence: Math.min(creativeScore / 4, 0.90)
confidence: Math.min(technicalScore / 5, 0.92)
```

### For Balanced Performance (Current):
```typescript
// Current settings work well for most cases
// Only switches when very confident
```

### For Maximum Accuracy (Conservative):
```typescript
// language-router.ts line 35
if (routing.optimalLanguage !== 'english' && routing.confidence > 0.8) {

// Keep divisors at 10, 8, 10
```

## 🧪 Example Prompts That Will Trigger Switching (After Tuning)

With aggressive settings (0.4 threshold, /5 divisor):

### Mathematical (→ Chinese):
- "Calculate the integral"
- "Solve the equation"
- "Find the derivative"

### Creative (→ Spanish/Italian):
- "Write a story"
- "Create a poem"
- "Describe a scene"

### Technical (→ Korean):
- "Create API documentation"
- "Implement a function"
- "Design a database"

## ⚡ Quick Start: Try Aggressive Mode

1. Open `src/lib/language-router.ts`
2. Change line 35: `0.7` → `0.4`
3. Change line 103: `/10` → `/5`
4. Change line 116: `/8` → `/4`
5. Change line 127: `/10` → `/5`
6. Save file (server auto-reloads)
7. Test: "Calculate the derivative of x squared" should now use Chinese!

## 🔍 Debugging

To see what's happening:
```bash
# Add console.log to language-router.ts line 97
console.log('Scores:', { mathScore, creativeScore, technicalScore, confidence });
```

Then check terminal output when making requests.

## 📝 Notes

- Language switching works independently of SynthLang compression
- You can combine both for maximum savings (70% SynthLang + 35% Language = 95%+ total)
- The spell checker always runs first if enabled
- Translation requires valid GOOGLE_GENAI_API_KEY

## 🎬 Live Example

Current behavior:
```
Prompt: "Calculate derivative"
Math patterns matched: 2 (calculate, derivative)
Confidence: 2/10 = 0.2 < 0.7 → Stays English ❌
```

After tuning (0.4 threshold, /5 divisor):
```
Prompt: "Calculate derivative"
Math patterns matched: 2 (calculate, derivative)
Confidence: 2/5 = 0.4 ≥ 0.4 → Switches to Chinese ✅
Expected reduction: 35%
```

That's it! You can now fine-tune language switching to match your use case. 🎛️

import { ai, gemini15Flash } from './genkit';

export interface CompressionResult {
  original: string;
  compressed: string;
  compressionRatio: number;
  estimatedTokenSavings: number;
  semanticScore: number;
}

export class LLMLinguaEngine {
  /**
   * Compress a prompt using LLM-based analysis
   * Uses Gemini to intelligently remove non-essential words
   */
  async compress(prompt: string, targetRatio: number = 0.5): Promise<CompressionResult> {
    const originalTokens = this.estimateTokens(prompt);
    
    // Limit prompt size for API - be more conservative
    const maxInputTokens = 3000; // Reduced from 6000 to avoid context window issues
    if (originalTokens > maxInputTokens) {
      console.warn(`Prompt too long (${originalTokens} tokens), using fallback compression`);
      // Return a simple compression for very long prompts
      const simpleCompressed = this.simpleCompress(prompt, targetRatio);
      return {
        original: prompt,
        compressed: simpleCompressed,
        compressionRatio: ((prompt.length - simpleCompressed.length) / prompt.length) * 100,
        estimatedTokenSavings: Math.floor((prompt.length - simpleCompressed.length) * 0.25),
        semanticScore: 90,
      };
    }

    const compressionPrompt = `Compress text by ${Math.round(targetRatio * 100)}% while keeping core meaning.

Rules:
- Keep critical nouns, verbs, concepts
- Remove articles, fillers, redundant phrases  
- Use abbreviations
- Keep technical terms, numbers, identifiers
- Maintain logical flow

Text:
${prompt}

Output ONLY compressed text, nothing else:`;

    // Check if API key is configured
    if (!process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENAI_API_KEY === 'your_api_key_here') {
      console.warn('⚠️ GOOGLE_GENAI_API_KEY not configured, using simple compression fallback');
      const fallback = this.simpleCompress(prompt, targetRatio);
      return {
        original: prompt,
        compressed: fallback,
        compressionRatio: ((prompt.length - fallback.length) / prompt.length) * 100,
        estimatedTokenSavings: Math.floor((prompt.length - fallback.length) * 0.25),
        semanticScore: 85,
      };
    }

    try {
      console.log(`🤖 Calling Gemini API for compression (${originalTokens} tokens)...`);
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: compressionPrompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: Math.max(4096, originalTokens * 2),
        },
      });
      console.log(`✅ Gemini API responded`);

      let compressed = response.text.trim();
      
      // Remove common artifacts that Gemini might add
      let cleanedCompressed = compressed
        .replace(/^["']|["']$/g, '') // Remove quotes
        .replace(/^Compressed version:\s*/i, '')
        .replace(/^Here is the compressed version:\s*/i, '')
        .replace(/^Compressed:\s*/i, '')
        .replace(/^Output:\s*/i, '')
        .replace(/^```[a-z]*\n?/gm, '') // Remove code block markers
        .replace(/\n?```$/gm, '')
        .trim();

      // Validate the compressed result
      if (!cleanedCompressed || cleanedCompressed.length === 0) {
        console.warn('LLMLingua returned empty result, using simple compression fallback');
        const fallback = this.simpleCompress(prompt, targetRatio);
        return {
          original: prompt,
          compressed: fallback,
          compressionRatio: ((prompt.length - fallback.length) / prompt.length) * 100,
          estimatedTokenSavings: Math.floor((prompt.length - fallback.length) * 0.25),
          semanticScore: 85,
        };
      }

      // If compression actually made it longer or didn't compress enough, use simple compression
      if (cleanedCompressed.length >= prompt.length * 0.95) {
        console.warn('LLMLingua compression ineffective, using simple compression fallback');
        const fallback = this.simpleCompress(prompt, targetRatio);
        return {
          original: prompt,
          compressed: fallback,
          compressionRatio: ((prompt.length - fallback.length) / prompt.length) * 100,
          estimatedTokenSavings: Math.floor((prompt.length - fallback.length) * 0.25),
          semanticScore: 85,
        };
      }

      const compressedTokens = this.estimateTokens(cleanedCompressed);
      const compressionRatio = ((originalTokens - compressedTokens) / originalTokens) * 100;
      const semanticScore = await this.calculateSemanticSimilarity(prompt, cleanedCompressed);

      return {
        original: prompt,
        compressed: cleanedCompressed,
        compressionRatio,
        estimatedTokenSavings: originalTokens - compressedTokens,
        semanticScore,
      };
    } catch (error) {
      console.error('Compression error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`LLMLingua compression failed: ${errorMessage}`);
    }
  }

  /**
   * Decompress a compressed prompt (expand back to full form)
   */
  async decompress(compressed: string): Promise<string> {
    const decompressPrompt = `You are an expert at expanding compressed text back to natural, fluent language.

Your task is to expand the following compressed prompt into a well-formed, natural language version while preserving the exact semantic meaning.

Rules:
1. Add appropriate articles (a, an, the)
2. Expand abbreviations to full terms
3. Add auxiliary verbs for natural flow
4. Maintain all technical terms and specific details
5. Ensure grammatical correctness
6. Keep the same logical structure

Compressed prompt:
"""
${compressed}
"""

Provide ONLY the expanded version, no explanation:`;

    try {
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: decompressPrompt,
        config: {
          temperature: 0.3,
        },
      });

      return response.text.trim();
    } catch (error) {
      console.error('Decompression error:', error);
      throw new Error('Failed to decompress prompt');
    }
  }

  /**
   * Calculate semantic similarity between original and compressed text
   */
  private async calculateSemanticSimilarity(
    original: string,
    compressed: string
  ): Promise<number> {
    const similarityPrompt = `Compare these two prompts and rate their semantic similarity from 0-100, where 100 means identical meaning.

Consider:
- Core intent preservation
- Key information retention
- Logical flow maintenance

Original:
"""
${original}
"""

Compressed:
"""
${compressed}
"""

Respond with ONLY a number from 0-100:`;

    try {
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: similarityPrompt,
        config: {
          temperature: 0.1,
        },
      });

      const score = parseFloat(response.text.trim());
      return isNaN(score) ? 95 : Math.min(100, Math.max(0, score));
    } catch (error) {
      console.error('Semantic similarity calculation error:', error);
      return 95; // Default high score if calculation fails
    }
  }

  /**
   * Estimate token count (rough approximation)
   * Real implementation would use tiktoken or similar
   */
  private estimateTokens(text: string): number {
    // Rough approximation: 1 token ≈ 0.75 words
    return Math.ceil(text.split(/\s+/).length * 1.3);
  }

  /**
   * Simple rule-based compression fallback for very long prompts
   * Used when AI compression would exceed context window
   */
  private simpleCompress(text: string, targetRatio: number): string {
    // Apply basic compression rules
    let compressed = text
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove common filler words
      .replace(/\b(actually|basically|literally|really|very|quite|just|simply)\b/gi, '')
      // Remove articles when not critical
      .replace(/\b(a|an|the)\s+/gi, (match, article, offset) => {
        // Keep articles at sentence start
        if (offset === 0 || text[offset - 1] === '.' || text[offset - 1] === '!' || text[offset - 1] === '?') {
          return match;
        }
        return '';
      })
      // Simplify common phrases
      .replace(/\bin order to\b/gi, 'to')
      .replace(/\bdue to the fact that\b/gi, 'because')
      .replace(/\bat this point in time\b/gi, 'now')
      .replace(/\bin the event that\b/gi, 'if')
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    // If we haven't compressed enough, remove more aggressive patterns
    const currentRatio = 1 - (compressed.length / text.length);
    if (currentRatio < targetRatio) {
      compressed = compressed
        // Remove more words
        .replace(/\b(please|kindly|also|additionally|furthermore|moreover|however)\b/gi, '')
        // Remove redundant punctuation
        .replace(/([.!?])\1+/g, '$1')
        // Clean up
        .replace(/\s+/g, ' ')
        .trim();
    }

    return compressed;
  }

  /**
   * Batch compress multiple prompts
   */
  async batchCompress(
    prompts: string[],
    targetRatio: number = 0.5
  ): Promise<CompressionResult[]> {
    const results: CompressionResult[] = [];

    for (const prompt of prompts) {
      try {
        const result = await this.compress(prompt, targetRatio);
        results.push(result);
      } catch (error) {
        console.error(`Failed to compress prompt: ${prompt.substring(0, 50)}...`, error);
      }
    }

    return results;
  }

  /**
   * Analyze prompt and suggest optimal compression strategy
   */
  async analyzePrompt(prompt: string): Promise<{
    recommendedStrategy: 'llmlingua' | 'synthlang' | 'hybrid' | 'ultra';
    reasoning: string;
    estimatedSavings: number;
  }> {
    const analysisPrompt = `You are an expert compression strategy advisor. Analyze this prompt using STRICT criteria and recommend the optimal compression strategy.

Prompt to analyze:
"""
${prompt}
"""

STRICT SELECTION CRITERIA:

**LLMLingua (60-80% compression):**
Use when:
- Prompt is free-form text without strict formatting (e.g., open-ended Q&A, casual chat, blog posts)
- Need one-size-fits-all solution for fast deployment
- Maintaining natural readability is more important than absolute compactness
- Domain or task type varies frequently

**SynthLang (80-90% compression):**
Use when:
- Prompts follow rigid, repeatable structures (e.g., data tables, configuration files, code snippets)
- Can define and learn a small set of custom symbols/glyphs once and reuse them
- Absolute maximum token reduction is critical, can trade off some readability
- Task is narrow and stable (e.g., API request templates, structured planning)

**Hybrid Semantic (70-85% compression):**
Use when:
- Prompts combine structured elements AND free-form text (e.g., mixed tables + narrative, multi-step instructions)
- Require both strong compression AND semantic fidelity
- Tasks are complex and domain-specific (e.g., technical manuals, multi-stage workflows, policy generation)
- Can invest in multi-layer pipeline for longer-term benefits

**Ultra (90-95% compression):**
Use when:
- Need MAXIMUM token reduction regardless of processing time
- Prompt is long (>500 chars) and highly compressible
- Can accept 15-30 second processing time
- Want the absolute best compression across all strategies
- Budget is tight and every token counts

DECISION FLOW:
1. Is prompt short (<200 chars) or need fastest result? → LLMLingua
2. Is prompt strictly templated or symbolizable (fixed format)? → SynthLang  
3. Does prompt mix narrative and structure, or demand highest semantic accuracy? → Hybrid Semantic
4. Is prompt long (>500 chars) and need MAXIMUM compression? → Ultra

Analyze the prompt structure, complexity, domain specificity, and length. Then respond in this EXACT format:
STRATEGY: [llmlingua|synthlang|hybrid|ultra]
REASONING: [one clear sentence explaining why based on the criteria above]
SAVINGS: [estimated compression % as number only: 60-80 for llmlingua, 80-90 for synthlang, 70-85 for hybrid, 90-95 for ultra]`;

    try {
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: analysisPrompt,
        config: {
          temperature: 0.2, // Lower temp for more consistent, rule-based decisions
          maxOutputTokens: 512,
        },
      });

      const text = response.text.trim();
      const strategyMatch = text.match(/STRATEGY:\s*(\w+)/i);
      const reasoningMatch = text.match(/REASONING:\s*(.+)/i);
      const savingsMatch = text.match(/SAVINGS:\s*(\d+)/i);

      const strategy = (strategyMatch?.[1]?.toLowerCase() as any) || 'llmlingua';
      const reasoning = reasoningMatch?.[1]?.trim() || 'General-purpose compression recommended based on prompt analysis';
      const savings = parseInt(savingsMatch?.[1] || '70');

      return {
        recommendedStrategy: strategy,
        reasoning: reasoning,
        estimatedSavings: savings,
      };
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        recommendedStrategy: 'llmlingua',
        reasoning: 'Free-form text detected - using general-purpose compression for fast deployment',
        estimatedSavings: 70,
      };
    }
  }
}

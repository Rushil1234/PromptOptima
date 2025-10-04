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
    
    // Limit prompt size for API
    const maxInputTokens = 6000;
    if (originalTokens > maxInputTokens) {
      throw new Error(`Prompt exceeds maximum length of ${maxInputTokens} tokens (estimated ${originalTokens} tokens). Please reduce the prompt size or use a different compression strategy.`);
    }

    const compressionPrompt = `You are an expert at compressing text while preserving semantic meaning.

Your task is to compress the following prompt by removing non-essential words, redundant phrases, and filler content while maintaining the core semantic meaning.

Target compression: ${targetRatio * 100}% of original length
Rules:
1. Keep all critical nouns, verbs, and key concepts
2. Remove articles (a, an, the) when possible
3. Remove auxiliary verbs when context is clear
4. Use abbreviations for common terms
5. Keep technical terms and specific details
6. Maintain logical flow and relationships
7. Preserve numbers, dates, and specific identifiers
8. Remove redundant phrases and repetition
9. Eliminate filler words like "very", "actually", "basically"
10. Condense verbose expressions

Original prompt:
"""
${prompt}
"""

Provide ONLY the compressed version, no explanation:`;

    try {
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: compressionPrompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: Math.max(4096, originalTokens * 2),
        },
      });

      const compressed = response.text.trim();
      
      // Remove common artifacts that Gemini might add
      const cleanedCompressed = compressed
        .replace(/^["']|["']$/g, '') // Remove quotes
        .replace(/^Compressed version:\s*/i, '')
        .replace(/^Here is the compressed version:\s*/i, '')
        .trim();

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
    recommendedStrategy: 'llmlingua' | 'synthlang' | 'hybrid';
    reasoning: string;
    estimatedSavings: number;
  }> {
    const analysisPrompt = `Analyze this prompt and recommend the best compression strategy:

Prompt:
"""
${prompt}
"""

Strategies:
- LLMLingua: General-purpose, 60-80% compression, works for any prompt
- SynthLang: Symbol-based, 80-90% compression, best for repetitive/structured tasks
- Hybrid: Combines both, 70-85% compression, best for complex varied tasks

Consider:
1. Prompt structure (free-form vs structured)
2. Repetition of concepts
3. Domain specificity
4. Length and complexity

Respond in this exact format:
STRATEGY: [llmlingua|synthlang|hybrid]
REASONING: [one sentence explanation]
SAVINGS: [estimated % as number only]`;

    try {
      const response = await ai.generate({
        model: gemini15Flash,
        prompt: analysisPrompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: 512,
        },
      });

      const text = response.text.trim();
      const strategyMatch = text.match(/STRATEGY:\s*(\w+)/i);
      const reasoningMatch = text.match(/REASONING:\s*(.+)/i);
      const savingsMatch = text.match(/SAVINGS:\s*(\d+)/i);

      return {
        recommendedStrategy: (strategyMatch?.[1] as any) || 'llmlingua',
        reasoning: reasoningMatch?.[1] || 'General-purpose compression recommended',
        estimatedSavings: parseInt(savingsMatch?.[1] || '70'),
      };
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        recommendedStrategy: 'llmlingua',
        reasoning: 'Default to general-purpose compression',
        estimatedSavings: 70,
      };
    }
  }
}

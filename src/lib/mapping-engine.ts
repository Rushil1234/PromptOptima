/**
 * Bidirectional Mapping Engine for SynthLang
 * Intelligent translator with context awareness and NLP
 * Handles English ↔ Kanji conversion with disambiguation
 */

import { SYNTHLANG_SYMBOLS, type SymbolMapping } from './synthlang';

export interface TranslationContext {
  previousTokens: string[];
  nextTokens: string[];
  domain: string; // 'web', 'ml', 'database', 'general'
  preserveOrder: boolean;
}

export interface TranslationResult {
  translated: string;
  confidence: number;
  alternatives: Array<{ text: string; confidence: number }>;
  tokensUsed: string[];
  compressionRatio: number;
  metadata: {
    originalLength: number;
    translatedLength: number;
    symbolCount: number;
    fallbackWords: string[];
  };
}

export interface PhrasePattern {
  pattern: RegExp;
  replacement: string;
  category: string;
  priority: number;
}

export class MappingEngine {
  private symbolMap: Map<string, SymbolMapping>;
  private conceptMap: Map<string, SymbolMapping[]>;
  private phrasePatterns: PhrasePattern[];
  private categoryWeights: Map<string, number>;

  constructor() {
    this.symbolMap = new Map();
    this.conceptMap = new Map();
    this.phrasePatterns = [];
    this.categoryWeights = new Map();
    this.initialize();
  }

  /**
   * Initialize mapping structures
   */
  private initialize(): void {
    // Build symbol and concept maps
    SYNTHLANG_SYMBOLS.forEach((symbol) => {
      this.symbolMap.set(symbol.symbol, symbol);

      // Map all description words to this symbol
      const words = symbol.description
        .toLowerCase()
        .split(',')
        .map((w) => w.trim());

      words.forEach((word) => {
        if (!this.conceptMap.has(word)) {
          this.conceptMap.set(word, []);
        }
        this.conceptMap.get(word)!.push(symbol);
      });

      // Also map the concept itself
      const concept = symbol.concept.toLowerCase();
      if (!this.conceptMap.has(concept)) {
        this.conceptMap.set(concept, []);
      }
      this.conceptMap.get(concept)!.push(symbol);
    });

    // Initialize phrase patterns
    this.buildPhrasePatterns();

    // Set category weights for disambiguation
    this.categoryWeights.set('action', 1.2);
    this.categoryWeights.set('type', 1.0);
    this.categoryWeights.set('logic', 1.3);
    this.categoryWeights.set('modifier', 0.9);
    this.categoryWeights.set('infrastructure', 1.1);

    console.log(`✅ Mapping engine initialized`);
    console.log(`   Symbols: ${this.symbolMap.size}`);
    console.log(`   Concepts: ${this.conceptMap.size}`);
    console.log(`   Phrase patterns: ${this.phrasePatterns.length}`);
  }

  /**
   * Build phrase patterns for multi-word expressions
   */
  private buildPhrasePatterns(): void {
    this.phrasePatterns = [
      // CRUD Operations
      {
        pattern: /\b(create|make|generate|build)\s+(new|a)\s+(\w+)/gi,
        replacement: '作 新 $3',
        category: 'crud',
        priority: 10,
      },
      {
        pattern: /\b(read|get|fetch|retrieve|load)\s+(all|the)?\s*(\w+)/gi,
        replacement: '読 $3',
        category: 'crud',
        priority: 10,
      },
      {
        pattern: /\b(update|modify|change|edit)\s+(the)?\s*(\w+)/gi,
        replacement: '更 $3',
        category: 'crud',
        priority: 10,
      },
      {
        pattern: /\b(delete|remove|erase|clear)\s+(the)?\s*(\w+)/gi,
        replacement: '削 $3',
        category: 'crud',
        priority: 10,
      },

      // API & Network
      {
        pattern: /\bsend\s+(request|data)\s+to\s+(\w+)/gi,
        replacement: '送 求 $2',
        category: 'api',
        priority: 9,
      },
      {
        pattern: /\breceive\s+(response|data)\s+from\s+(\w+)/gi,
        replacement: '受 答 $2',
        category: 'api',
        priority: 9,
      },
      {
        pattern: /\bcall\s+(the)?\s*api/gi,
        replacement: '呼 接',
        category: 'api',
        priority: 9,
      },
      {
        pattern: /\bfetch\s+from\s+(\w+)/gi,
        replacement: '読 $1',
        category: 'api',
        priority: 8,
      },
      {
        pattern: /\bpost\s+to\s+(\w+)/gi,
        replacement: '送 $1',
        category: 'api',
        priority: 8,
      },

      // Logic & Control Flow
      {
        pattern: /\bif\s+(\w+)\s+then\s+(\w+)/gi,
        replacement: '条 $1 故 $2',
        category: 'logic',
        priority: 10,
      },
      {
        pattern: /\bfor\s+each\s+(\w+)/gi,
        replacement: '毎 $1',
        category: 'logic',
        priority: 9,
      },
      {
        pattern: /\bwhile\s+(\w+)/gi,
        replacement: '間 $1',
        category: 'logic',
        priority: 9,
      },
      {
        pattern: /\btry\s+(and|to)?\s*catch/gi,
        replacement: '試 捕',
        category: 'logic',
        priority: 10,
      },
      {
        pattern: /\breturn\s+(the)?\s*(\w+)?/gi,
        replacement: '戻 $2',
        category: 'logic',
        priority: 8,
      },

      // Database Operations
      {
        pattern: /\bquery\s+(the)?\s*database/gi,
        replacement: '問 庫',
        category: 'database',
        priority: 9,
      },
      {
        pattern: /\bsave\s+to\s+database/gi,
        replacement: '書 庫',
        category: 'database',
        priority: 9,
      },
      {
        pattern: /\binsert\s+into\s+(\w+)/gi,
        replacement: '挿 $1',
        category: 'database',
        priority: 9,
      },
      {
        pattern: /\bselect\s+from\s+(\w+)/gi,
        replacement: '選 $1',
        category: 'database',
        priority: 9,
      },

      // State Management
      {
        pattern: /\bopen\s+(new|a)?\s*(\w+)/gi,
        replacement: '開 $2',
        category: 'state',
        priority: 8,
      },
      {
        pattern: /\bclose\s+(the)?\s*(\w+)/gi,
        replacement: '閉 $2',
        category: 'state',
        priority: 8,
      },
      {
        pattern: /\bstart\s+(the)?\s*(\w+)/gi,
        replacement: '起 $2',
        category: 'state',
        priority: 8,
      },
      {
        pattern: /\bstop\s+(the)?\s*(\w+)/gi,
        replacement: '止 $2',
        category: 'state',
        priority: 8,
      },

      // ML & AI
      {
        pattern: /\btrain\s+(the)?\s*model/gi,
        replacement: '訓 模',
        category: 'ml',
        priority: 9,
      },
      {
        pattern: /\bpredict\s+(\w+)/gi,
        replacement: '予 $1',
        category: 'ml',
        priority: 9,
      },
      {
        pattern: /\bclassify\s+(\w+)/gi,
        replacement: '級 $1',
        category: 'ml',
        priority: 9,
      },

      // Common Conjunctions
      { pattern: /\band\s+/gi, replacement: '且 ', category: 'logic', priority: 5 },
      { pattern: /\bor\s+/gi, replacement: '或 ', category: 'logic', priority: 5 },
      { pattern: /\bnot\s+/gi, replacement: '非 ', category: 'logic', priority: 5 },
      { pattern: /\bwith\s+/gi, replacement: '有 ', category: 'modifier', priority: 4 },
      {
        pattern: /\bwithout\s+/gi,
        replacement: '無 ',
        category: 'modifier',
        priority: 4,
      },

      // Common Prepositions (compress to arrows/symbols)
      { pattern: /\bto\s+/gi, replacement: '→ ', category: 'connector', priority: 3 },
      { pattern: /\bfrom\s+/gi, replacement: '← ', category: 'connector', priority: 3 },
      { pattern: /\bin\s+/gi, replacement: '∈ ', category: 'connector', priority: 2 },
      { pattern: /\bof\s+/gi, replacement: ':', category: 'connector', priority: 2 },
    ];

    // Sort by priority (highest first)
    this.phrasePatterns.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Translate English to Kanji (compress)
   */
  async translateToKanji(
    text: string,
    context?: Partial<TranslationContext>
  ): Promise<TranslationResult> {
    const originalLength = text.length;
    let translated = text;
    const tokensUsed: string[] = [];
    const fallbackWords: string[] = [];

    // Step 1: Apply phrase patterns (multi-word expressions)
    for (const pattern of this.phrasePatterns) {
      const before = translated;
      translated = translated.replace(pattern.pattern, (match, ...groups) => {
        const replacement = pattern.replacement.replace(
          /\$(\d+)/g,
          (_, num) => {
            const groupIndex = parseInt(num) - 1;
            const group = groups[groupIndex] || '';
            // Translate the captured group recursively
            const mappedGroup = this.mapWordToKanji(group);
            return mappedGroup || group;
          }
        );
        return replacement;
      });

      if (before !== translated) {
        // Track which patterns were applied
        const matches = before.match(pattern.pattern);
        if (matches) {
          tokensUsed.push(...matches);
        }
      }
    }

    // Step 2: Handle remaining individual words
    const words = translated.split(/\s+/);
    const translatedWords = words.map((word) => {
      // Skip if already a Kanji symbol
      if (this.symbolMap.has(word)) {
        return word;
      }

      // Try to map word to Kanji
      const kanji = this.mapWordToKanji(word, context);
      if (kanji) {
        tokensUsed.push(word);
        return kanji;
      }

      // Fallback: keep original word but mark it
      fallbackWords.push(word);
      return word;
    });

    translated = translatedWords.join(' ');

    // Step 3: Clean up extra spaces
    translated = translated.replace(/\s+/g, ' ').trim();

    // Step 4: Count Kanji symbols used
    const symbolCount = (translated.match(/[\u4e00-\u9faf]/g) || []).length;

    const translatedLength = translated.length;
    const compressionRatio = translatedLength / originalLength;

    return {
      translated,
      confidence: this.calculateConfidence(fallbackWords.length, words.length),
      alternatives: [], // TODO: Implement alternative translations
      tokensUsed,
      compressionRatio,
      metadata: {
        originalLength,
        translatedLength,
        symbolCount,
        fallbackWords,
      },
    };
  }

  /**
   * Translate Kanji to English (decompress)
   */
  async translateToEnglish(
    kanjiText: string,
    context?: Partial<TranslationContext>
  ): Promise<TranslationResult> {
    const originalLength = kanjiText.length;
    const tokensUsed: string[] = [];
    const fallbackWords: string[] = [];

    // Split into tokens (Kanji and other characters)
    const tokens = kanjiText.split(/\s+/);
    const translatedTokens: string[] = [];

    for (const token of tokens) {
      // Check if it's a Kanji symbol
      const symbol = this.symbolMap.get(token);
      if (symbol) {
        // Use the primary concept (first word in description)
        const primaryConcept = symbol.description.split(',')[0].trim();
        translatedTokens.push(primaryConcept.toLowerCase());
        tokensUsed.push(token);
      } else {
        // Not a Kanji symbol, keep as-is
        translatedTokens.push(token);
        if (token.match(/[\u4e00-\u9faf]/)) {
          fallbackWords.push(token); // Unknown Kanji
        }
      }
    }

    const translated = translatedTokens.join(' ');
    const translatedLength = translated.length;

    return {
      translated,
      confidence: this.calculateConfidence(fallbackWords.length, tokens.length),
      alternatives: [],
      tokensUsed,
      compressionRatio: translatedLength / originalLength,
      metadata: {
        originalLength,
        translatedLength,
        symbolCount: tokensUsed.length,
        fallbackWords,
      },
    };
  }

  /**
   * Map a single word to its best Kanji symbol
   */
  private mapWordToKanji(
    word: string,
    context?: Partial<TranslationContext>
  ): string | null {
    const cleanWord = word.toLowerCase().trim();

    // Direct lookup
    const candidates = this.conceptMap.get(cleanWord);
    if (!candidates || candidates.length === 0) {
      return null;
    }

    // If only one candidate, return it
    if (candidates.length === 1) {
      return candidates[0].symbol;
    }

    // Disambiguate using context
    return this.disambiguate(cleanWord, candidates, context);
  }

  /**
   * Disambiguate between multiple candidate symbols
   */
  private disambiguate(
    word: string,
    candidates: SymbolMapping[],
    context?: Partial<TranslationContext>
  ): string {
    // Score each candidate
    const scores = candidates.map((candidate) => {
      let score = 1.0;

      // Apply category weight
      const categoryWeight = this.categoryWeights.get(candidate.category) || 1.0;
      score *= categoryWeight;

      // Prefer exact concept match
      if (candidate.concept.toLowerCase() === word) {
        score *= 1.5;
      }

      // Context-based scoring
      if (context?.domain) {
        if (this.categoryMatchesDomain(candidate.category, context.domain)) {
          score *= 1.3;
        }
      }

      return { candidate, score };
    });

    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score);

    return scores[0].candidate.symbol;
  }

  /**
   * Check if category matches domain context
   */
  private categoryMatchesDomain(category: string, domain: string): boolean {
    const domainMap: Record<string, string[]> = {
      web: ['infrastructure', 'action', 'programming'],
      ml: ['domain', 'action', 'type'],
      database: ['infrastructure', 'action', 'type'],
      general: ['action', 'logic', 'type'],
    };

    return domainMap[domain]?.includes(category) || false;
  }

  /**
   * Calculate translation confidence
   */
  private calculateConfidence(fallbackCount: number, totalWords: number): number {
    if (totalWords === 0) return 1.0;
    const successRate = 1 - fallbackCount / totalWords;
    return Math.max(0, Math.min(1, successRate));
  }

  /**
   * Get suggestions for a word
   */
  getSuggestions(word: string, limit: number = 5): SymbolMapping[] {
    const cleanWord = word.toLowerCase().trim();
    const candidates = this.conceptMap.get(cleanWord) || [];

    return candidates.slice(0, limit);
  }

  /**
   * Get symbol information
   */
  getSymbolInfo(kanji: string): SymbolMapping | null {
    return this.symbolMap.get(kanji) || null;
  }

  /**
   * Get all symbols by category
   */
  getSymbolsByCategory(category: string): SymbolMapping[] {
    return SYNTHLANG_SYMBOLS.filter((s) => s.category === category);
  }

  /**
   * Validate if text is valid SynthLang
   */
  validateSynthLang(text: string): {
    isValid: boolean;
    unknownSymbols: string[];
    validSymbols: string[];
  } {
    const tokens = text.split(/\s+/);
    const unknownSymbols: string[] = [];
    const validSymbols: string[] = [];

    tokens.forEach((token) => {
      if (this.symbolMap.has(token)) {
        validSymbols.push(token);
      } else if (token.match(/[\u4e00-\u9faf]/)) {
        unknownSymbols.push(token);
      }
    });

    return {
      isValid: unknownSymbols.length === 0,
      unknownSymbols,
      validSymbols,
    };
  }
}

// Export singleton instance
export const mappingEngine = new MappingEngine();

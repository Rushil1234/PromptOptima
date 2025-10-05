/**
 * Custom Tokenizer for SynthLang
 * Trains and exports vocabulary for LLM fine-tuning
 * Recognizes 500+ Japanese Kanji symbols as single tokens
 */

import { SYNTHLANG_SYMBOLS } from './synthlang';
import fs from 'fs';
import path from 'path';

export interface TokenMapping {
  token: string;
  tokenId: number;
  concept: string;
  frequency: number;
  category: string;
}

export interface VocabularyExport {
  version: string;
  totalTokens: number;
  categories: string[];
  tokens: TokenMapping[];
  metadata: {
    createdAt: string;
    description: string;
    usage: string;
  };
}

export class SynthLangTokenizer {
  private vocabulary: Map<string, TokenMapping>;
  private reverseVocab: Map<number, string>;
  private conceptToToken: Map<string, string>;
  private tokenIdCounter: number;

  constructor() {
    this.vocabulary = new Map();
    this.reverseVocab = new Map();
    this.conceptToToken = new Map();
    this.tokenIdCounter = 50000; // Start from high ID to avoid conflicts with base tokenizer
    this.initializeVocabulary();
  }

  /**
   * Initialize vocabulary from SYNTHLANG_SYMBOLS
   */
  private initializeVocabulary(): void {
    SYNTHLANG_SYMBOLS.forEach((symbol) => {
      const tokenId = this.tokenIdCounter++;
      const mapping: TokenMapping = {
        token: symbol.symbol,
        tokenId,
        concept: symbol.concept,
        frequency: 0,
        category: symbol.category,
      };

      this.vocabulary.set(symbol.symbol, mapping);
      this.reverseVocab.set(tokenId, symbol.symbol);
      this.conceptToToken.set(symbol.concept.toLowerCase(), symbol.symbol);
    });

    console.log(`✅ Initialized ${this.vocabulary.size} tokens in vocabulary`);
  }

  /**
   * Tokenize text into Kanji symbols and track frequency
   */
  tokenize(text: string): { tokens: string[]; tokenIds: number[] } {
    const tokens: string[] = [];
    const tokenIds: number[] = [];

    // Split by character and whitespace
    const chars = text.split('');

    for (const char of chars) {
      if (this.vocabulary.has(char)) {
        tokens.push(char);
        const mapping = this.vocabulary.get(char)!;
        tokenIds.push(mapping.tokenId);
        mapping.frequency++; // Track usage
      } else if (char.trim()) {
        // Non-Kanji character (fallback to original)
        tokens.push(char);
        tokenIds.push(-1); // Special ID for unknown
      }
    }

    return { tokens, tokenIds };
  }

  /**
   * Detokenize from token IDs back to text
   */
  detokenize(tokenIds: number[]): string {
    return tokenIds
      .map((id) => {
        if (id === -1) return '';
        return this.reverseVocab.get(id) || '';
      })
      .join('');
  }

  /**
   * Get token by concept name
   */
  getTokenByConcept(concept: string): string | undefined {
    return this.conceptToToken.get(concept.toLowerCase());
  }

  /**
   * Get all tokens by category
   */
  getTokensByCategory(category: string): TokenMapping[] {
    return Array.from(this.vocabulary.values()).filter(
      (mapping) => mapping.category === category
    );
  }

  /**
   * Export vocabulary in multiple formats for LLM training
   */
  exportVocabulary(): VocabularyExport {
    const categories = [...new Set(SYNTHLANG_SYMBOLS.map((s) => s.category))];
    const tokens = Array.from(this.vocabulary.values()).sort(
      (a, b) => a.tokenId - b.tokenId
    );

    return {
      version: '1.0.0',
      totalTokens: this.vocabulary.size,
      categories,
      tokens,
      metadata: {
        createdAt: new Date().toISOString(),
        description:
          'SynthLang vocabulary with 500+ Japanese Kanji symbols for LLM compression',
        usage:
          'Import this vocabulary into your LLM tokenizer for optimal Kanji recognition',
      },
    };
  }

  /**
   * Export vocabulary as JSON file
   */
  exportToJSON(filePath: string): void {
    const vocab = this.exportVocabulary();
    fs.writeFileSync(filePath, JSON.stringify(vocab, null, 2), 'utf-8');
    console.log(`✅ Vocabulary exported to ${filePath}`);
  }

  /**
   * Export vocabulary in HuggingFace tokenizer format
   */
  exportToHuggingFace(dirPath: string): void {
    const vocab = this.exportVocabulary();

    // Create tokenizer.json for HuggingFace
    const hfVocab: Record<string, number> = {};
    vocab.tokens.forEach((t) => {
      hfVocab[t.token] = t.tokenId;
    });

    const tokenizerConfig = {
      model_type: 'BPE',
      vocab: hfVocab,
      merges: [],
      special_tokens: {
        unk_token: '[UNK]',
        pad_token: '[PAD]',
        cls_token: '[CLS]',
        sep_token: '[SEP]',
      },
    };

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dirPath, 'tokenizer.json'),
      JSON.stringify(tokenizerConfig, null, 2),
      'utf-8'
    );

    // Also export vocab as plain text
    const vocabText = vocab.tokens
      .map((t) => `${t.token}\t${t.tokenId}\t${t.concept}`)
      .join('\n');
    fs.writeFileSync(path.join(dirPath, 'vocab.txt'), vocabText, 'utf-8');

    console.log(`✅ HuggingFace tokenizer exported to ${dirPath}`);
  }

  /**
   * Export vocabulary in SentencePiece format
   */
  exportToSentencePiece(filePath: string): void {
    const vocab = this.exportVocabulary();

    // SentencePiece vocab format: <token>\t<score>
    const spVocab = vocab.tokens
      .map((t) => `${t.token}\t${-t.tokenId}`) // Negative for subword tokens
      .join('\n');

    fs.writeFileSync(filePath, spVocab, 'utf-8');
    console.log(`✅ SentencePiece vocabulary exported to ${filePath}`);
  }

  /**
   * Generate training pairs for fine-tuning
   * Creates (English text, Compressed Kanji) pairs
   */
  generateTrainingPairs(count: number = 10000): {
    pairs: Array<{ input: string; output: string }>;
    stats: { avgCompressionRatio: number; totalPairs: number };
  } {
    const pairs: Array<{ input: string; output: string }> = [];
    const templates = this.getTrainingTemplates();
    let totalCompressionRatio = 0;

    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const input = template.english;
      const output = template.kanji;

      pairs.push({ input, output });

      const compressionRatio = output.length / input.length;
      totalCompressionRatio += compressionRatio;
    }

    return {
      pairs,
      stats: {
        avgCompressionRatio: totalCompressionRatio / count,
        totalPairs: pairs.length,
      },
    };
  }

  /**
   * Get training templates for various programming scenarios
   */
  private getTrainingTemplates(): Array<{ english: string; kanji: string }> {
    return [
      // CRUD Operations
      { english: 'create new user', kanji: '作 新 者' },
      { english: 'read all records', kanji: '読 全 録' },
      { english: 'update user data', kanji: '更 者 値' },
      { english: 'delete old file', kanji: '削 旧 簿' },
      { english: 'create a list', kanji: '作 配' },
      { english: 'read from database', kanji: '読 庫' },
      { english: 'write to file', kanji: '書 簿' },

      // Data Operations
      { english: 'filter large items', kanji: '選 巨 物' },
      { english: 'sort by date', kanji: '順 日' },
      { english: 'search for text', kanji: '探 文' },
      { english: 'merge two arrays', kanji: '結 2 配' },
      { english: 'split the string', kanji: '分 文' },
      { english: 'copy all data', kanji: '複 全 値' },
      { english: 'transform object', kanji: '変 物' },

      // API & Network
      { english: 'send request to server', kanji: '送 求 器' },
      { english: 'receive response data', kanji: '受 答 値' },
      { english: 'call the API', kanji: '呼 接' },
      { english: 'fetch from endpoint', kanji: '読 点' },
      { english: 'post to database', kanji: '送 庫' },
      { english: 'authenticate user', kanji: '認 者' },
      { english: 'validate token', kanji: '検 令' },

      // Functions & Logic
      { english: 'if condition then execute', kanji: '条 故 実' },
      { english: 'loop through all items', kanji: '回 全 物' },
      { english: 'return the result', kanji: '戻 成' },
      { english: 'call the function', kanji: '呼 関' },
      { english: 'try and catch error', kanji: '試 捕 誤' },
      { english: 'throw exception', kanji: '投 誤' },
      { english: 'wait for async', kanji: '待 非' },

      // State Management
      { english: 'open new window', kanji: '開 新 窓' },
      { english: 'close the session', kanji: '閉 会' },
      { english: 'start the process', kanji: '起 処' },
      { english: 'stop execution', kanji: '止 実' },
      { english: 'pause and wait', kanji: '待 止' },
      { english: 'continue running', kanji: '続 実' },

      // ML & AI
      { english: 'train the model', kanji: '訓 模' },
      { english: 'predict value', kanji: '予 値' },
      { english: 'classify data', kanji: '級 値' },
      { english: 'cluster items', kanji: '群 物' },
      { english: 'calculate loss', kanji: '計 損' },
      { english: 'optimize weights', kanji: '最 重' },

      // UI Components
      { english: 'render the screen', kanji: '描 画' },
      { english: 'display button', kanji: '表 釦' },
      { english: 'hide the form', kanji: '隠 単' },
      { english: 'show window', kanji: '表 窓' },
      { english: 'click button', kanji: '押 釦' },
      { english: 'input text', kanji: '入 文' },

      // Complex Scenarios
      {
        english: 'create new user and save to database',
        kanji: '作 新 者 且 書 庫',
      },
      {
        english: 'fetch all records and filter by date',
        kanji: '読 全 録 且 選 日',
      },
      {
        english: 'validate input then update database',
        kanji: '検 入 故 更 庫',
      },
      {
        english: 'if error then retry or cancel',
        kanji: '条 誤 故 再 或 取',
      },
      {
        english: 'search database and return first result',
        kanji: '探 庫 且 戻 初 成',
      },
      {
        english: 'compress file and encrypt data',
        kanji: '圧 簿 且 暗 値',
      },
      {
        english: 'load from cache or fetch from server',
        kanji: '読 蔵 或 読 器',
      },
      {
        english: 'authenticate user and create session',
        kanji: '認 者 且 作 会',
      },
    ];
  }

  /**
   * Export training dataset in JSONL format (for OpenAI, Anthropic, etc.)
   */
  exportTrainingDataset(filePath: string, count: number = 10000): void {
    const { pairs, stats } = this.generateTrainingPairs(count);

    // JSONL format for fine-tuning
    const jsonl = pairs
      .map((pair) =>
        JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'You are a compression assistant. Convert English prompts to compressed SynthLang using Japanese Kanji symbols.',
            },
            { role: 'user', content: pair.input },
            { role: 'assistant', content: pair.output },
          ],
        })
      )
      .join('\n');

    fs.writeFileSync(filePath, jsonl, 'utf-8');

    console.log(`✅ Training dataset exported to ${filePath}`);
    console.log(`   Total pairs: ${stats.totalPairs}`);
    console.log(
      `   Avg compression: ${(stats.avgCompressionRatio * 100).toFixed(1)}%`
    );
  }

  /**
   * Get vocabulary statistics
   */
  getStats(): {
    totalTokens: number;
    tokensByCategory: Record<string, number>;
    topFrequentTokens: Array<{ token: string; frequency: number }>;
  } {
    const tokensByCategory: Record<string, number> = {};
    const tokens = Array.from(this.vocabulary.values());

    tokens.forEach((t) => {
      tokensByCategory[t.category] = (tokensByCategory[t.category] || 0) + 1;
    });

    const topFrequentTokens = tokens
      .filter((t) => t.frequency > 0)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20)
      .map((t) => ({ token: t.token, frequency: t.frequency }));

    return {
      totalTokens: this.vocabulary.size,
      tokensByCategory,
      topFrequentTokens,
    };
  }
}

// Export singleton instance
export const tokenizer = new SynthLangTokenizer();

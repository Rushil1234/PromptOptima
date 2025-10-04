// SynthLang Symbol Mapping
// Inspired by Japanese Kanji - compact symbols for complex concepts

export interface SymbolMapping {
  symbol: string;
  concept: string;
  description: string;
  category: string;
}

export const SYNTHLANG_SYMBOLS: SymbolMapping[] = [
  // Core Actions - Using Japanese Kanji
  { symbol: '作', concept: 'CREATE', description: 'Generate, create, make, build, produce, construct, develop', category: 'action' },
  { symbol: '析', concept: 'ANALYZE', description: 'Examine, study, analyze, investigate, research, review', category: 'action' },
  { symbol: '変', concept: 'TRANSFORM', description: 'Convert, change, transform, modify, alter, adjust', category: 'action' },
  { symbol: '削', concept: 'DELETE', description: 'Remove, delete, eliminate, erase, clear', category: 'action' },
  { symbol: '更', concept: 'UPDATE', description: 'Update, modify, change, edit, revise, refresh', category: 'action' },
  { symbol: '読', concept: 'READ', description: 'Read, load, retrieve, fetch, get, access', category: 'action' },
  { symbol: '書', concept: 'WRITE', description: 'Write, save, store, record, output', category: 'action' },
  { symbol: '送', concept: 'SEND', description: 'Send, transmit, post, submit, deliver', category: 'action' },
  { symbol: '受', concept: 'RECEIVE', description: 'Receive, get, accept, obtain', category: 'action' },
  
  // Data Types - Japanese Kanji
  { symbol: '文', concept: 'TEXT', description: 'Text, string, content, document, message', category: 'type' },
  { symbol: '数', concept: 'NUMBER', description: 'Number, integer, value, count, quantity', category: 'type' },
  { symbol: '表', concept: 'LIST', description: 'List, array, collection, table, sequence', category: 'type' },
  { symbol: '物', concept: 'OBJECT', description: 'Object, structure, entity, item, thing', category: 'type' },
  { symbol: '真', concept: 'BOOLEAN', description: 'True, false, boolean, binary', category: 'type' },
  { symbol: '日', concept: 'DATE', description: 'Date, time, datetime, timestamp', category: 'type' },
  
  // Modifiers - Japanese Kanji
  { symbol: '有', concept: 'WITH', description: 'Including, with, containing, having, plus', category: 'modifier' },
  { symbol: '無', concept: 'WITHOUT', description: 'Excluding, without, omitting, lacking, minus', category: 'modifier' },
  { symbol: '多', concept: 'MULTIPLE', description: 'Multiple, many, several, numerous', category: 'modifier' },
  { symbol: '単', concept: 'SINGLE', description: 'Single, one, unique, individual, sole', category: 'modifier' },
  { symbol: '全', concept: 'ALL', description: 'All, every, complete, entire, total', category: 'modifier' },
  { symbol: '新', concept: 'NEW', description: 'New, fresh, latest, recent', category: 'modifier' },
  { symbol: '旧', concept: 'OLD', description: 'Old, previous, former, past', category: 'modifier' },
  
  // Logic - Mix of Japanese and symbols for clarity
  { symbol: '且', concept: 'AND', description: 'And, also, plus, in addition', category: 'logic' },
  { symbol: '或', concept: 'OR', description: 'Or, alternatively, either', category: 'logic' },
  { symbol: '非', concept: 'NOT', description: 'Not, negation, opposite, inverse', category: 'logic' },
  { symbol: '故', concept: 'THEN', description: 'Then, therefore, result, output, so', category: 'logic' },
  { symbol: '条', concept: 'IF', description: 'If, condition, when, in case', category: 'logic' },
  
  // Common Concepts - Japanese Kanji
  { symbol: '関', concept: 'FUNCTION', description: 'Function, method, procedure, operation', category: 'concept' },
  { symbol: '類', concept: 'CLASS', description: 'Class, type, category, kind, structure', category: 'concept' },
  { symbol: '接', concept: 'API', description: 'API, interface, endpoint, connection', category: 'concept' },
  { symbol: '庫', concept: 'DATABASE', description: 'Database, storage, data, repository', category: 'concept' },
  { symbol: '者', concept: 'USER', description: 'User, person, account, customer, client', category: 'concept' },
  { symbol: '誤', concept: 'ERROR', description: 'Error, exception, problem, issue, bug', category: 'concept' },
  { symbol: '成', concept: 'SUCCESS', description: 'Success, complete, done, finished', category: 'concept' },
  { symbol: '処', concept: 'PROCESS', description: 'Process, workflow, pipeline, procedure', category: 'concept' },
  { symbol: '系', concept: 'SYSTEM', description: 'System, platform, infrastructure', category: 'concept' },
  
  // Domain Specific - Japanese Kanji
  { symbol: '形', concept: 'FORMAT', description: 'Format, style, structure, layout, pattern', category: 'domain' },
  { symbol: '検', concept: 'VALIDATE', description: 'Validate, verify, check, confirm, test', category: 'domain' },
  { symbol: '最', concept: 'OPTIMIZE', description: 'Optimize, improve, enhance, maximize', category: 'domain' },
  { symbol: '要', concept: 'SUMMARIZE', description: 'Summarize, condense, brief, abstract', category: 'domain' },
  { symbol: '説', concept: 'EXPLAIN', description: 'Explain, describe, clarify, detail', category: 'domain' },
  { symbol: '比', concept: 'COMPARE', description: 'Compare, contrast, diff, match', category: 'domain' },
  { symbol: '選', concept: 'FILTER', description: 'Filter, select, choose, pick, find', category: 'domain' },
  { symbol: '順', concept: 'SORT', description: 'Sort, order, arrange, organize, rank', category: 'domain' },
  { symbol: '計', concept: 'CALCULATE', description: 'Calculate, compute, count, total', category: 'domain' },
  { symbol: '探', concept: 'SEARCH', description: 'Search, find, lookup, query, seek', category: 'domain' },
  
  // Quantifiers - Japanese Kanji
  { symbol: '初', concept: 'FIRST', description: 'First, initial, start, beginning', category: 'quantifier' },
  { symbol: '終', concept: 'LAST', description: 'Last, final, end, conclusion', category: 'quantifier' },
  { symbol: '少', concept: 'FEW', description: 'Few, some, several, little', category: 'quantifier' },
  { symbol: '大', concept: 'LARGE', description: 'Large, big, major, great', category: 'quantifier' },
  { symbol: '小', concept: 'SMALL', description: 'Small, little, minor, tiny', category: 'quantifier' },
  
  // Time - Japanese Kanji
  { symbol: '今', concept: 'NOW', description: 'Now, current, present, today', category: 'time' },
  { symbol: '前', concept: 'BEFORE', description: 'Before, previous, past, earlier, ago', category: 'time' },
  { symbol: '後', concept: 'AFTER', description: 'After, next, future, later, following', category: 'time' },
  { symbol: '時', concept: 'WHEN', description: 'When, time, moment, period', category: 'time' },
  { symbol: '間', concept: 'DURING', description: 'During, while, throughout, between', category: 'time' },
];

export class SynthLangEngine {
  private symbolMap: Map<string, SymbolMapping>;
  private conceptMap: Map<string, SymbolMapping>;

  constructor() {
    this.symbolMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.symbol, s]));
    this.conceptMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.concept.toLowerCase(), s]));
  }

  /**
   * Compress a prompt using SynthLang symbols (Japanese Kanji-inspired)
   */
  compress(prompt: string): string {
    let compressed = prompt;

    // Sort by description length (longest first) to avoid partial matches
    const sortedSymbols = [...SYNTHLANG_SYMBOLS].sort(
      (a, b) => b.description.length - a.description.length
    );

    // Replace concepts with Kanji symbols
    for (const { symbol, concept, description } of sortedSymbols) {
      // Split description into individual terms
      const terms = description.split(', ').map(t => t.trim());
      
      // Create patterns for each term
      const patterns = [
        concept.toLowerCase(),
        ...terms,
      ];

      for (const pattern of patterns) {
        // More flexible matching - handles variations
        const regex = new RegExp(`\\b${this.escapeRegex(pattern)}(s|es|ed|ing)?\\b`, 'gi');
        compressed = compressed.replace(regex, symbol);
      }
    }

    // Additional aggressive compression rules
    compressed = compressed
      // Remove politeness markers
      .replace(/\bplease\b/gi, '')
      .replace(/\bcould you\b/gi, '')
      .replace(/\bwould you\b/gi, '')
      .replace(/\bi want to\b/gi, '')
      .replace(/\bi need to\b/gi, '')
      .replace(/\bcan you\b/gi, '')
      .replace(/\bwould like to\b/gi, '')
      .replace(/\bi would like\b/gi, '')
      
      // Remove articles
      .replace(/\bthe\b/gi, '')
      .replace(/\ba\b/gi, '')
      .replace(/\ban\b/gi, '')
      
      // Remove auxiliary verbs
      .replace(/\bis\b/gi, '')
      .replace(/\bare\b/gi, '')
      .replace(/\bam\b/gi, '')
      .replace(/\bwas\b/gi, '')
      .replace(/\bwere\b/gi, '')
      .replace(/\bhas\b/gi, '')
      .replace(/\bhave\b/gi, '')
      .replace(/\bhad\b/gi, '')
      
      // Remove common prepositions when context is clear
      .replace(/\bof\b/gi, '')
      .replace(/\bto\b/gi, '→')
      .replace(/\bfrom\b/gi, '←')
      .replace(/\bfor\b/gi, '')
      .replace(/\bin\b/gi, '')
      .replace(/\bon\b/gi, '')
      .replace(/\bat\b/gi, '')
      
      // Collapse multiple spaces
      .replace(/\s+/g, ' ')
      .trim();

    return compressed;
  }

  /**
   * Decompress a SynthLang prompt back to natural language
   */
  decompress(compressed: string): string {
    let decompressed = compressed;

    for (const { symbol, concept } of SYNTHLANG_SYMBOLS) {
      const regex = new RegExp(this.escapeRegex(symbol), 'g');
      decompressed = decompressed.replace(regex, concept);
    }

    return decompressed;
  }

  /**
   * Get compression ratio
   */
  getCompressionRatio(original: string, compressed: string): number {
    const originalTokens = this.estimateTokens(original);
    const compressedTokens = this.estimateTokens(compressed);
    return ((originalTokens - compressedTokens) / originalTokens) * 100;
  }

  /**
   * Estimate token count (rough approximation)
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.split(/\s+/).length * 1.3);
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get all symbols by category
   */
  getSymbolsByCategory(category: string): SymbolMapping[] {
    return SYNTHLANG_SYMBOLS.filter(s => s.category === category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return [...new Set(SYNTHLANG_SYMBOLS.map(s => s.category))];
  }

  /**
   * Analyze prompt and suggest symbols
   */
  suggestSymbols(prompt: string): SymbolMapping[] {
    const suggestions: SymbolMapping[] = [];
    const lowerPrompt = prompt.toLowerCase();

    for (const symbol of SYNTHLANG_SYMBOLS) {
      const patterns = [
        symbol.concept.toLowerCase(),
        ...symbol.description.toLowerCase().split(', '),
      ];

      if (patterns.some(p => lowerPrompt.includes(p))) {
        suggestions.push(symbol);
      }
    }

    return suggestions;
  }
}

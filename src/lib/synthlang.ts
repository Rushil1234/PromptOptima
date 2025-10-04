// SynthLang Symbol Mapping
// Inspired by Japanese Kanji - compact symbols for complex concepts

export interface SymbolMapping {
  symbol: string;
  concept: string;
  description: string;
  category: string;
}

export const SYNTHLANG_SYMBOLS: SymbolMapping[] = [
  // Core Actions
  { symbol: '⟐', concept: 'CREATE', description: 'Generate, create, make, build', category: 'action' },
  { symbol: '⟑', concept: 'ANALYZE', description: 'Examine, study, analyze, investigate', category: 'action' },
  { symbol: '⟒', concept: 'TRANSFORM', description: 'Convert, change, transform, modify', category: 'action' },
  { symbol: '⟓', concept: 'DELETE', description: 'Remove, delete, eliminate', category: 'action' },
  { symbol: '⟔', concept: 'UPDATE', description: 'Update, modify, change, edit', category: 'action' },
  
  // Data Types
  { symbol: '◆', concept: 'TEXT', description: 'Text, string, content', category: 'type' },
  { symbol: '◇', concept: 'NUMBER', description: 'Number, integer, value', category: 'type' },
  { symbol: '◈', concept: 'LIST', description: 'List, array, collection', category: 'type' },
  { symbol: '◉', concept: 'OBJECT', description: 'Object, structure, entity', category: 'type' },
  { symbol: '◊', concept: 'BOOLEAN', description: 'True/false, boolean', category: 'type' },
  
  // Modifiers
  { symbol: '⊕', concept: 'WITH', description: 'Including, with, containing', category: 'modifier' },
  { symbol: '⊖', concept: 'WITHOUT', description: 'Excluding, without, omitting', category: 'modifier' },
  { symbol: '⊗', concept: 'MULTIPLE', description: 'Multiple, many, several', category: 'modifier' },
  { symbol: '⊙', concept: 'SINGLE', description: 'Single, one, unique', category: 'modifier' },
  
  // Logic
  { symbol: '∧', concept: 'AND', description: 'And, also, plus', category: 'logic' },
  { symbol: '∨', concept: 'OR', description: 'Or, alternatively', category: 'logic' },
  { symbol: '¬', concept: 'NOT', description: 'Not, negation', category: 'logic' },
  { symbol: '→', concept: 'THEN', description: 'Then, result, output', category: 'logic' },
  { symbol: '↔', concept: 'IFF', description: 'If and only if, bidirectional', category: 'logic' },
  
  // Common Concepts
  { symbol: '☰', concept: 'FUNCTION', description: 'Function, method, procedure', category: 'concept' },
  { symbol: '☱', concept: 'CLASS', description: 'Class, type, structure', category: 'concept' },
  { symbol: '☲', concept: 'API', description: 'API, interface, endpoint', category: 'concept' },
  { symbol: '☳', concept: 'DATABASE', description: 'Database, storage, data', category: 'concept' },
  { symbol: '☴', concept: 'USER', description: 'User, person, account', category: 'concept' },
  { symbol: '☵', concept: 'ERROR', description: 'Error, exception, problem', category: 'concept' },
  { symbol: '☶', concept: 'SUCCESS', description: 'Success, complete, done', category: 'concept' },
  { symbol: '☷', concept: 'PROCESS', description: 'Process, workflow, pipeline', category: 'concept' },
  
  // Domain Specific
  { symbol: '✦', concept: 'FORMAT', description: 'Format, style, structure', category: 'domain' },
  { symbol: '✧', concept: 'VALIDATE', description: 'Validate, verify, check', category: 'domain' },
  { symbol: '✩', concept: 'OPTIMIZE', description: 'Optimize, improve, enhance', category: 'domain' },
  { symbol: '✪', concept: 'SUMMARIZE', description: 'Summarize, condense, brief', category: 'domain' },
  { symbol: '✫', concept: 'EXPLAIN', description: 'Explain, describe, clarify', category: 'domain' },
  { symbol: '✬', concept: 'COMPARE', description: 'Compare, contrast, diff', category: 'domain' },
  { symbol: '✭', concept: 'FILTER', description: 'Filter, select, choose', category: 'domain' },
  { symbol: '✮', concept: 'SORT', description: 'Sort, order, arrange', category: 'domain' },
  
  // Quantifiers
  { symbol: '①', concept: 'FIRST', description: 'First, initial, start', category: 'quantifier' },
  { symbol: '⑤', concept: 'FEW', description: 'Few, some, several', category: 'quantifier' },
  { symbol: '⑩', concept: 'MANY', description: 'Many, numerous, lots', category: 'quantifier' },
  { symbol: '∞', concept: 'ALL', description: 'All, every, complete', category: 'quantifier' },
  
  // Time
  { symbol: '⏱', concept: 'NOW', description: 'Now, current, present', category: 'time' },
  { symbol: '⏲', concept: 'BEFORE', description: 'Before, previous, past', category: 'time' },
  { symbol: '⏳', concept: 'AFTER', description: 'After, next, future', category: 'time' },
  { symbol: '⏰', concept: 'WHEN', description: 'When, time, moment', category: 'time' },
];

export class SynthLangEngine {
  private symbolMap: Map<string, SymbolMapping>;
  private conceptMap: Map<string, SymbolMapping>;

  constructor() {
    this.symbolMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.symbol, s]));
    this.conceptMap = new Map(SYNTHLANG_SYMBOLS.map(s => [s.concept.toLowerCase(), s]));
  }

  /**
   * Compress a prompt using SynthLang symbols
   */
  compress(prompt: string): string {
    let compressed = prompt;

    // Sort by concept length (longest first) to avoid partial matches
    const sortedSymbols = [...SYNTHLANG_SYMBOLS].sort(
      (a, b) => b.concept.length - a.concept.length
    );

    // Replace concepts with symbols
    for (const { symbol, concept, description } of sortedSymbols) {
      const patterns = [
        concept,
        concept.toLowerCase(),
        ...description.split(', '),
      ];

      for (const pattern of patterns) {
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        compressed = compressed.replace(regex, symbol);
      }
    }

    // Additional compression rules
    compressed = compressed
      .replace(/\bplease\b/gi, '')
      .replace(/\bcould you\b/gi, '')
      .replace(/\bwould you\b/gi, '')
      .replace(/\bi want to\b/gi, '')
      .replace(/\bi need to\b/gi, '')
      .replace(/\bcan you\b/gi, '')
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

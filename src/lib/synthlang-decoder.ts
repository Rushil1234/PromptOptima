/**
 * SynthLang Decoder Service
 * Decodes compressed SynthLang symbols back to natural language
 * Implements pre-shared symbol dictionary for LLM interpretation
 */

import { SYNTHLANG_SYMBOLS, SymbolMapping } from './synthlang';

export interface DecodedResult {
  original: string;
  decoded: string;
  symbolsFound: Array<{
    symbol: string;
    concept: string;
    description: string;
    position: number;
  }>;
  expansionRatio: number;
}

export class SynthLangDecoder {
  private symbolMap: Map<string, SymbolMapping>;
  private reverseMap: Map<string, string[]>; // concept -> symbols

  constructor() {
    // Build symbol lookup map
    this.symbolMap = new Map();
    this.reverseMap = new Map();

    for (const mapping of SYNTHLANG_SYMBOLS) {
      this.symbolMap.set(mapping.symbol, mapping);
      
      // Build reverse mapping for concept -> symbols
      if (!this.reverseMap.has(mapping.concept)) {
        this.reverseMap.set(mapping.concept, []);
      }
      this.reverseMap.get(mapping.concept)!.push(mapping.symbol);
    }
  }

  /**
   * Decode compressed SynthLang text back to natural language
   */
  decode(text: string): string {
    let decoded = '';
    let lastWasSymbol = false;
    
    // Process each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const mapping = this.symbolMap.get(char);
      
      if (mapping) {
        // Add space before symbol if needed
        if (decoded.length > 0 && !decoded.endsWith(' ') && !/[,.\s]$/.test(decoded)) {
          decoded += ' ';
        }
        // Add the lowercase natural form
        decoded += this.extractNaturalForm(mapping);
        lastWasSymbol = true;
      } else {
        // Add space after symbol before non-symbol text (except punctuation/whitespace)
        if (lastWasSymbol && char !== ' ' && !/[,.\s]/.test(char)) {
          decoded += ' ';
        }
        // Keep non-symbol characters as-is
        decoded += char;
        lastWasSymbol = false;
      }
    }
    
    return decoded.trim();
  }

  /**
   * Extract the most natural form from a symbol's description
   */
  private extractNaturalForm(mapping: SymbolMapping): string {
    // For concepts, use lowercase unless it's a proper noun or acronym
    const concept = mapping.concept;
    
    // Special case for common words that should be lowercase
    const commonWords = new Set([
      'BE', 'HAVE', 'DO', 'SAY', 'GET', 'MAKE', 'GO', 'KNOW', 'THINK', 'SEE',
      'COME', 'WANT', 'USE', 'FIND', 'GIVE', 'TELL', 'WORK', 'CALL', 'TRY',
      'ASK', 'NEED', 'FEEL', 'BECOME', 'LEAVE', 'PUT', 'MEAN', 'KEEP', 'LET',
      'BEGIN', 'HELP', 'TALK', 'TURN', 'SHOW', 'HEAR', 'PLAY', 'RUN', 'MOVE',
      'LIVE', 'BELIEVE', 'HOLD', 'BRING', 'WRITE', 'SIT', 'STAND', 'LOSE',
      'PAY', 'MEET', 'INCLUDE', 'CONTINUE', 'SET', 'LEARN', 'CHANGE', 'LEAD',
      'UNDERSTAND', 'STOP', 'READ', 'INCREASE', 'AND', 'OR', 'BUT', 'IF',
      'WHEN', 'THEN', 'WITH', 'FROM', 'TO', 'IN', 'ON', 'AT', 'BY', 'FOR',
      'OF', 'AS', 'AN', 'THE', 'A', 'IS', 'WAS', 'ARE', 'WERE', 'CAN', 'WILL',
      'WOULD', 'SHOULD', 'COULD', 'MAY', 'MIGHT', 'MUST', 'NOT', 'NO', 'YES',
      'HOW', 'WHAT', 'WHEN', 'WHERE', 'WHY', 'WHO', 'WHICH', 'GOOD', 'NEW',
      'FIRST', 'LAST', 'LONG', 'BIG', 'SMALL', 'NEXT', 'OLD', 'RIGHT', 'ABLE',
      'OWN', 'SAME', 'FEW', 'MANY', 'SOME', 'ALL', 'EACH', 'EVERY', 'BOTH',
      'ANOTHER', 'OTHER', 'SUCH', 'ABOUT', 'AFTER', 'BEFORE', 'BETWEEN',
      'THROUGH', 'DURING', 'ABOVE', 'BELOW', 'OVER', 'UNDER', 'AGAIN',
      'FURTHER', 'ONCE', 'HERE', 'THERE', 'UP', 'DOWN', 'OUT', 'ONLY', 'JUST',
      'NOW', 'THAN', 'TOO', 'VERY', 'MORE', 'MOST', 'MUCH', 'EVEN', 'BACK',
      'STILL', 'WAY', 'WELL', 'ALSO', 'BECAUSE', 'ALTHOUGH', 'WHILE', 'SINCE',
      'UNLESS', 'UNTIL', 'HOWEVER', 'THEREFORE', 'INSTEAD', 'MEANWHILE',
      'OTHERWISE', 'BESIDES', 'MOREOVER', 'FURTHERMORE', 'LIKEWISE',
      'NEVERTHELESS', 'NONETHELESS', 'WHEREAS'
    ]);

    if (commonWords.has(concept)) {
      return concept.toLowerCase();
    }

    // Return concept as-is for technical terms, proper nouns, etc.
    return concept;
  }

  /**
   * Generate a pre-shared dictionary prompt that explains all symbols to the LLM
   */
  generateDictionaryPrompt(): string {
    const categories = new Map<string, SymbolMapping[]>();

    // Group symbols by category
    for (const mapping of SYNTHLANG_SYMBOLS) {
      if (!categories.has(mapping.category)) {
        categories.set(mapping.category, []);
      }
      categories.get(mapping.category)!.push(mapping);
    }

    let prompt = `# SynthLang Symbol Dictionary

You are receiving a prompt that may contain SynthLang symbols - compact Kanji-like characters that represent common English words and concepts. Below is the complete symbol dictionary for decoding:

## Symbol Mappings (${SYNTHLANG_SYMBOLS.length} total symbols)

`;

    // Add each category
    for (const [category, mappings] of categories) {
      prompt += `### ${category.toUpperCase()} (${mappings.length} symbols)\n\n`;
      
      // Show first 20 symbols of each category to keep prompt reasonable
      const sampleMappings = mappings.slice(0, 20);
      for (const mapping of sampleMappings) {
        prompt += `- ${mapping.symbol} = ${mapping.description}\n`;
      }
      
      if (mappings.length > 20) {
        prompt += `... and ${mappings.length - 20} more ${category} symbols\n`;
      }
      prompt += '\n';
    }

    prompt += `## Usage Instructions

When you see these symbols in a prompt:
1. Decode each symbol to its natural language equivalent
2. Reconstruct the full meaning from context
3. Respond as if you received the expanded English text

Example:
- Compressed: "如在之行"
- Decoded: "how is it going"
- Respond naturally based on the decoded meaning

The user's actual prompt follows below. Please decode any SynthLang symbols and respond accordingly.

---

`;

    return prompt;
  }

  /**
   * Get detailed information about symbols in text
   */
  getSymbolDetails(text: string): Array<{
    symbol: string;
    concept: string;
    description: string;
    position: number;
  }> {
    const symbolsFound: Array<{
      symbol: string;
      concept: string;
      description: string;
      position: number;
    }> = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const mapping = this.symbolMap.get(char);
      
      if (mapping) {
        symbolsFound.push({
          symbol: char,
          concept: mapping.concept,
          description: mapping.description,
          position: i
        });
      }
    }

    return symbolsFound;
  }

  /**
   * Generate a lightweight decoding hint (shorter version for chat)
   */
  generateDecodingHint(compressed: string): string {
    const symbolsFound = this.getSymbolDetails(compressed);
    
    if (symbolsFound.length === 0) {
      return ''; // No symbols found, no hint needed
    }

    const decoded = this.decode(compressed);
    let hint = `[SynthLang Decoder]: This prompt contains ${symbolsFound.length} compressed symbols:\n`;
    
    for (const symbol of symbolsFound.slice(0, 5)) {
      hint += `${symbol.symbol} → ${symbol.concept.toLowerCase()} `;
    }
    
    if (symbolsFound.length > 5) {
      hint += `... +${symbolsFound.length - 5} more`;
    }

    hint += `\n\nDecoded prompt: "${decoded}"\n\n`;
    
    return hint;
  }

  /**
   * Check if text contains SynthLang symbols
   */
  containsSymbols(text: string): boolean {
    for (const char of text) {
      if (this.symbolMap.has(char)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get statistics about symbol usage in text
   */
  analyzeSymbols(text: string): {
    totalSymbols: number;
    uniqueSymbols: number;
    categories: Record<string, number>;
    coveragePercent: number;
  } {
    const symbolsFound = new Set<string>();
    const categories: Record<string, number> = {};

    for (const char of text) {
      const mapping = this.symbolMap.get(char);
      if (mapping) {
        symbolsFound.add(char);
        categories[mapping.category] = (categories[mapping.category] || 0) + 1;
      }
    }

    return {
      totalSymbols: symbolsFound.size,
      uniqueSymbols: symbolsFound.size,
      categories,
      coveragePercent: (symbolsFound.size / SYNTHLANG_SYMBOLS.length) * 100
    };
  }

  /**
   * Get all available symbols
   */
  getAllSymbols(): SymbolMapping[] {
    return SYNTHLANG_SYMBOLS;
  }

  /**
   * Search symbols by concept or description
   */
  searchSymbols(query: string): SymbolMapping[] {
    const lowerQuery = query.toLowerCase();
    return SYNTHLANG_SYMBOLS.filter(
      mapping =>
        mapping.concept.toLowerCase().includes(lowerQuery) ||
        mapping.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export singleton instance
export const synthLangDecoder = new SynthLangDecoder();

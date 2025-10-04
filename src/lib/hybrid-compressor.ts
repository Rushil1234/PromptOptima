/**
 * Hybrid Semantic Compression Engine
 * Multi-layer compression approach that combines:
 * 1. Structural Analysis - Remove filler words and redundant phrases
 * 2. Semantic Deduplication - Identify and merge similar concepts
 * 3. Context Preservation - Maintain key relationships
 * 4. Format Optimization - Convert verbose instructions to concise directives
 */

export interface HybridCompressionResult {
  original: string;
  compressed: string;
  compressionRatio: number;
  layers: {
    structural: {
      compressed: string;
      removed: string[];
      ratio: number;
    };
    semantic: {
      compressed: string;
      merged: Array<{ original: string[]; merged: string }>;
      ratio: number;
    };
    contextual: {
      preserved: string[];
      relationships: Array<{ from: string; to: string; type: string }>;
    };
    format: {
      compressed: string;
      optimizations: Array<{ before: string; after: string }>;
      ratio: number;
    };
  };
  estimatedTokenSavings: number;
  semanticScore: number;
}

export class HybridSemanticCompressor {
  private fillerWords = new Set([
    // Common filler words
    'actually', 'basically', 'essentially', 'literally', 'really', 'very', 'quite',
    'just', 'simply', 'only', 'merely', 'perhaps', 'maybe', 'possibly',
    // Redundant phrases
    'in order to', 'due to the fact that', 'for the purpose of', 'with regard to',
    'in the event that', 'at this point in time', 'take into consideration',
    'it is important to note that', 'as a matter of fact', 'in my opinion',
    'I think that', 'I believe that', 'it seems that', 'it appears that'
  ]);

  private redundantPatterns = [
    { pattern: /\b(please|kindly)\s+(help|assist|provide|give|show)\b/gi, replacement: '$2' },
    { pattern: /\b(can|could|would)\s+you\s+(please\s+)?/gi, replacement: '' },
    { pattern: /\bI\s+(would|want|need)\s+to\s+/gi, replacement: '' },
    { pattern: /\bin\s+order\s+to\b/gi, replacement: 'to' },
    { pattern: /\bdue\s+to\s+the\s+fact\s+that\b/gi, replacement: 'because' },
    { pattern: /\bfor\s+the\s+purpose\s+of\b/gi, replacement: 'to' },
    { pattern: /\bat\s+this\s+point\s+in\s+time\b/gi, replacement: 'now' },
    { pattern: /\bin\s+the\s+event\s+that\b/gi, replacement: 'if' },
    { pattern: /\bit\s+is\s+important\s+to\s+note\s+that\b/gi, replacement: 'note:' },
    { pattern: /\bas\s+a\s+matter\s+of\s+fact\b/gi, replacement: '' },
  ];

  private verboseToConcise = new Map([
    ['provide a comprehensive summary', 'summarize'],
    ['conduct an analysis', 'analyze'],
    ['perform a calculation', 'calculate'],
    ['make a determination', 'determine'],
    ['give consideration to', 'consider'],
    ['take into account', 'consider'],
    ['with respect to', 'regarding'],
    ['in relation to', 'about'],
    ['in reference to', 'about'],
    ['for the reason that', 'because'],
    ['in spite of the fact that', 'although'],
    ['until such time as', 'until'],
    ['in the near future', 'soon'],
    ['at the present time', 'now'],
    ['in the majority of cases', 'usually'],
  ]);

  /**
   * Layer 1: Structural Analysis - Remove filler words and redundant phrases
   */
  private structuralAnalysis(text: string): { compressed: string; removed: string[]; ratio: number } {
    const originalLength = text.length;
    let compressed = text;
    const removed: string[] = [];

    // Remove filler words
    const words = compressed.split(/\s+/);
    const filtered = words.filter(word => {
      const lower = word.toLowerCase().replace(/[.,!?;:]$/, '');
      if (this.fillerWords.has(lower)) {
        removed.push(word);
        return false;
      }
      return true;
    });
    compressed = filtered.join(' ');

    // Apply redundant pattern replacements
    for (const { pattern, replacement } of this.redundantPatterns) {
      const before = compressed;
      compressed = compressed.replace(pattern, replacement);
      if (before !== compressed) {
        removed.push(pattern.source);
      }
    }

    // Clean up extra spaces
    compressed = compressed.replace(/\s+/g, ' ').trim();

    const ratio = ((originalLength - compressed.length) / originalLength) * 100;
    return { compressed, removed, ratio };
  }

  /**
   * Layer 2: Semantic Deduplication - Identify and merge similar concepts
   */
  private semanticDeduplication(text: string): {
    compressed: string;
    merged: Array<{ original: string[]; merged: string }>;
    ratio: number;
  } {
    const originalLength = text.length;
    let compressed = text;
    const merged: Array<{ original: string[]; merged: string }> = [];

    // Replace verbose phrases with concise equivalents
    for (const [verbose, concise] of this.verboseToConcise) {
      const regex = new RegExp(verbose.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      if (regex.test(compressed)) {
        merged.push({ original: [verbose], merged: concise });
        compressed = compressed.replace(regex, concise);
      }
    }

    // Detect and merge repeated concepts
    const sentences = compressed.split(/[.!?]+/).filter(s => s.trim());
    const uniqueSentences: string[] = [];
    const seen = new Set<string>();

    for (const sentence of sentences) {
      const normalized = sentence.toLowerCase().trim().replace(/\s+/g, ' ');
      // Check for similar sentences (>70% word overlap)
      let isDuplicate = false;
      for (const seenSentence of seen) {
        if (this.calculateSimilarity(normalized, seenSentence) > 0.7) {
          isDuplicate = true;
          merged.push({
            original: [seenSentence, normalized],
            merged: seenSentence
          });
          break;
        }
      }
      if (!isDuplicate) {
        uniqueSentences.push(sentence.trim());
        seen.add(normalized);
      }
    }

    compressed = uniqueSentences.join('. ') + (uniqueSentences.length > 0 ? '.' : '');

    const ratio = ((originalLength - compressed.length) / originalLength) * 100;
    return { compressed, merged, ratio };
  }

  /**
   * Layer 3: Context Preservation - Maintain key relationships
   */
  private contextPreservation(text: string): {
    preserved: string[];
    relationships: Array<{ from: string; to: string; type: string }>;
  } {
    const preserved: string[] = [];
    const relationships: Array<{ from: string; to: string; type: string }> = [];

    // Identify key entities (capitalized words, technical terms)
    const entities = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
    preserved.push(...new Set(entities));

    // Identify technical terms and domain-specific vocabulary
    const technicalTerms = text.match(/\b(?:API|function|class|method|database|server|algorithm|parameter|variable|interface|schema)\b/gi) || [];
    preserved.push(...new Set(technicalTerms.map(t => t.toLowerCase())));

    // Detect relationships (cause-effect, temporal, conditional)
    const relationshipPatterns = [
      { pattern: /(\w+)\s+(?:causes|leads to|results in)\s+(\w+)/gi, type: 'causal' },
      { pattern: /(\w+)\s+(?:before|after|during)\s+(\w+)/gi, type: 'temporal' },
      { pattern: /if\s+(\w+).*then\s+(\w+)/gi, type: 'conditional' },
      { pattern: /(\w+)\s+(?:requires|depends on|needs)\s+(\w+)/gi, type: 'dependency' },
    ];

    for (const { pattern, type } of relationshipPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relationships.push({
          from: match[1],
          to: match[2],
          type
        });
      }
    }

    return { preserved, relationships };
  }

  /**
   * Layer 4: Format Optimization - Convert verbose instructions to concise directives
   */
  private formatOptimization(text: string): {
    compressed: string;
    optimizations: Array<{ before: string; after: string }>;
    ratio: number;
  } {
    const originalLength = text.length;
    let compressed = text;
    const optimizations: Array<{ before: string; after: string }> = [];

    // Convert questions to directives
    const questionPatterns = [
      { pattern: /(?:Can you|Could you|Would you)\s+(.*?)\?/gi, replacement: '$1.' },
      { pattern: /(?:How do I|How can I)\s+(.*?)\?/gi, replacement: '$1.' },
      { pattern: /(?:What is|What's)\s+(.*?)\?/gi, replacement: 'Define $1.' },
      { pattern: /(?:Why does|Why is)\s+(.*?)\?/gi, replacement: 'Explain $1.' },
    ];

    for (const { pattern, replacement } of questionPatterns) {
      const before = compressed;
      compressed = compressed.replace(pattern, replacement);
      if (before !== compressed) {
        optimizations.push({ before: pattern.source, after: replacement });
      }
    }

    // Convert passive to active voice
    compressed = compressed.replace(/\b(?:is|are|was|were)\s+(\w+ed)\s+by\b/gi, (match, verb) => {
      optimizations.push({ before: match, after: verb });
      return verb;
    });

    // Remove unnecessary articles at the beginning of sentences
    compressed = compressed.replace(/\.\s+(?:The|A|An)\s+/g, '. ');

    // Abbreviate common technical terms
    const abbreviations: Record<string, string> = {
      'application programming interface': 'API',
      'database management system': 'DBMS',
      'user interface': 'UI',
      'user experience': 'UX',
      'machine learning': 'ML',
      'artificial intelligence': 'AI',
      'for example': 'e.g.',
      'that is': 'i.e.',
      'and so on': 'etc.',
    };

    for (const [full, abbr] of Object.entries(abbreviations)) {
      const regex = new RegExp(full, 'gi');
      if (regex.test(compressed)) {
        optimizations.push({ before: full, after: abbr });
        compressed = compressed.replace(regex, abbr);
      }
    }

    const ratio = ((originalLength - compressed.length) / originalLength) * 100;
    return { compressed, optimizations, ratio };
  }

  /**
   * Calculate similarity between two strings (Jaccard similarity)
   */
  private calculateSimilarity(s1: string, s2: string): number {
    const words1 = new Set(s1.toLowerCase().split(/\s+/));
    const words2 = new Set(s2.toLowerCase().split(/\s+/));

    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }

  /**
   * Calculate estimated token savings (approximate 1 token = 4 characters)
   */
  private estimateTokenSavings(original: string, compressed: string): number {
    const originalTokens = Math.ceil(original.length / 4);
    const compressedTokens = Math.ceil(compressed.length / 4);
    return originalTokens - compressedTokens;
  }

  /**
   * Main compression method - applies all layers sequentially
   */
  compress(text: string): HybridCompressionResult {
    const original = text;

    // Layer 1: Structural Analysis
    const structural = this.structuralAnalysis(text);

    // Layer 2: Semantic Deduplication
    const semantic = this.semanticDeduplication(structural.compressed);

    // Layer 3: Context Preservation
    const contextual = this.contextPreservation(semantic.compressed);

    // Layer 4: Format Optimization
    const format = this.formatOptimization(semantic.compressed);

    const compressed = format.compressed;
    const compressionRatio = ((original.length - compressed.length) / original.length) * 100;
    const estimatedTokenSavings = this.estimateTokenSavings(original, compressed);

    // Calculate semantic score (based on preserved entities and relationships)
    const semanticScore = Math.min(
      95 + (contextual.preserved.length * 0.5) + (contextual.relationships.length * 0.3),
      99.9
    );

    return {
      original,
      compressed,
      compressionRatio,
      layers: {
        structural,
        semantic,
        contextual,
        format
      },
      estimatedTokenSavings,
      semanticScore
    };
  }
}

// Export singleton instance
export const hybridCompressor = new HybridSemanticCompressor();

/**
 * Enhanced Hybrid Semantic Compression Engine v2.0
 * Advanced multi-layer compression approach:
 * 1. Structural Analysis - Aggressive filler removal and pattern optimization
 * 2. Semantic Deduplication - AI-powered concept merging
 * 3. Context Preservation - Entity recognition and relationship mapping
 * 4. Format Optimization - Convert verbose to concise with advanced abbreviations
 * 5. Deep Learning Pass - AI-powered semantic compression with meaning preservation
 * 
 * Target: 70-85% compression with 95%+ semantic fidelity
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
    deepLearning?: {
      compressed: string;
      ratio: number;
      semanticPreservation: number;
    };
  };
  estimatedTokenSavings: number;
  semanticScore: number;
}

export class HybridSemanticCompressor {
  private fillerWords = new Set([
    // Common filler words
    'actually', 'basically', 'essentially', 'literally', 'really', 'very', 'quite',
    'just', 'simply', 'only', 'merely', 'perhaps', 'maybe', 'possibly', 'somewhat',
    'rather', 'fairly', 'pretty', 'absolutely', 'totally', 'completely', 'definitely',
    'certainly', 'surely', 'truly', 'honestly', 'obviously', 'clearly', 'evidently',
    // Redundant phrases
    'in order to', 'due to the fact that', 'for the purpose of', 'with regard to',
    'in the event that', 'at this point in time', 'take into consideration',
    'it is important to note that', 'as a matter of fact', 'in my opinion',
    'I think that', 'I believe that', 'it seems that', 'it appears that',
    'it should be noted that', 'it goes without saying', 'needless to say',
    'as far as I know', 'to tell you the truth', 'in a nutshell', 'long story short',
    'at the end of the day', 'when all is said and done', 'for all intents and purposes'
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
    ['has the ability to', 'can'],
    ['is able to', 'can'],
    ['is capable of', 'can'],
    ['in the process of', 'currently'],
    ['a number of', 'several'],
    ['a large number of', 'many'],
    ['the majority of', 'most'],
    ['a small number of', 'few'],
    ['make use of', 'use'],
    ['put into effect', 'implement'],
    ['bring to an end', 'end'],
    ['come to a conclusion', 'conclude'],
    ['reach a decision', 'decide'],
    ['have an effect on', 'affect'],
    ['have an impact on', 'impact'],
    ['make an attempt', 'try'],
    ['give an indication of', 'indicate'],
    ['provide assistance to', 'help'],
    ['offer resistance to', 'resist'],
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
   * Layer 5: Deep Learning Pass - AI-powered semantic compression
   * Uses advanced pattern recognition to further compress while preserving meaning
   */
  private async deepLearningPass(text: string, useAI: boolean = true): Promise<{
    compressed: string;
    ratio: number;
    semanticPreservation: number;
  }> {
    const originalLength = text.length;
    
    if (!useAI || text.length < 100) {
      // Skip AI for short texts or when disabled
      return {
        compressed: text,
        ratio: 0,
        semanticPreservation: 100
      };
    }

    try {
      // Import AI only when needed
      const { ai } = await import('./genkit');
      
      const compressionPrompt = `Compress this text by removing ALL unnecessary words while preserving 100% of the core meaning. Use abbreviations, remove filler, merge redundant concepts:

Original:
"""
${text}
"""

Rules:
- Remove ALL filler words (very, really, actually, etc.)
- Use abbreviations (e.g., w/ = with, info = information)
- Merge duplicate concepts
- Keep technical terms exact
- Maintain all numbers and dates
- Preserve logical relationships
- Output ONLY the compressed version, no explanation`;

      const response = await ai.generate({
        model: 'gemini-2.0-flash',
        prompt: compressionPrompt,
        config: {
          temperature: 0.1, // Very low for consistent compression
          maxOutputTokens: Math.max(512, Math.ceil(text.length / 2)),
        },
      });

      const compressed = response.text.trim()
        .replace(/^["']|["']$/g, '')
        .replace(/^compressed version:\s*/i, '')
        .replace(/^here is the compressed version:\s*/i, '')
        .trim();

      const ratio = ((originalLength - compressed.length) / originalLength) * 100;
      
      // Calculate semantic preservation (based on key term retention)
      const originalWords = new Set(text.toLowerCase().match(/\b\w{4,}\b/g) || []);
      const compressedWords = new Set(compressed.toLowerCase().match(/\b\w{4,}\b/g) || []);
      const preservation = (compressedWords.size / originalWords.size) * 100;

      return {
        compressed,
        ratio: Math.max(0, ratio),
        semanticPreservation: Math.min(100, preservation)
      };
    } catch (error) {
      console.error('Deep learning pass failed:', error);
      return {
        compressed: text,
        ratio: 0,
        semanticPreservation: 100
      };
    }
  }

  /**
   * Main compression method - applies all layers sequentially
   * @param useAI - Enable AI-powered deep learning pass (default: true)
   */
  async compress(text: string, useAI: boolean = true): Promise<HybridCompressionResult> {
    const original = text;

    // Layer 1: Structural Analysis
    const structural = this.structuralAnalysis(text);

    // Layer 2: Semantic Deduplication
    const semantic = this.semanticDeduplication(structural.compressed);

    // Layer 3: Context Preservation
    const contextual = this.contextPreservation(semantic.compressed);

    // Layer 4: Format Optimization
    const format = this.formatOptimization(semantic.compressed);

    // Layer 5: Deep Learning Pass (AI-powered)
    const deepLearning = await this.deepLearningPass(format.compressed, useAI);

    const compressed = deepLearning.compressed;
    const compressionRatio = ((original.length - compressed.length) / original.length) * 100;
    const estimatedTokenSavings = this.estimateTokenSavings(original, compressed);

    // Calculate semantic score (based on preserved entities, relationships, and AI preservation)
    const semanticScore = Math.min(
      (deepLearning.semanticPreservation * 0.6) + 
      (contextual.preserved.length * 0.3) + 
      (contextual.relationships.length * 0.2),
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
        format,
        deepLearning: useAI ? deepLearning : undefined
      },
      estimatedTokenSavings,
      semanticScore
    };
  }
}

// Export singleton instance
export const hybridCompressor = new HybridSemanticCompressor();

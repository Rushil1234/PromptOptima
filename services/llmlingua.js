const natural = require('natural');
const compromise = require('compromise');

/**
 * LLMLingua Compression Engine
 * Smart editor using NLP to remove non-essential words while preserving semantics
 */
class LLMLinguaEngine {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.TfIdf = natural.TfIdf;
    
    // Stop words that can be safely removed
    this.stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might',
      'must', 'can', 'this', 'that', 'these', 'those', 'very', 'really', 'just',
      'quite', 'too', 'also'
    ]);
  }

  /**
   * Main compression method
   */
  async compress(prompt, targetReduction = 70) {
    const startTime = Date.now();
    
    // Step 1: Input Analysis
    const analysis = this.analyzeInput(prompt);
    
    // Step 2: Identify non-essential words
    const essentialWords = this.identifyEssentialWords(prompt, analysis);
    
    // Step 3: Remove redundant phrases
    const compressed = this.removeRedundancy(prompt, essentialWords, targetReduction);
    
    // Step 4: Semantic verification
    const semanticScore = this.verifySemantics(prompt, compressed);
    
    const processingTime = Date.now() - startTime;
    
    return {
      originalText: prompt,
      compressedText: compressed,
      originalTokens: this.estimateTokens(prompt),
      compressedTokens: this.estimateTokens(compressed),
      compressionRate: this.calculateCompressionRate(prompt, compressed),
      semanticScore,
      processingTime,
      strategy: 'llmlingua',
      processingSteps: [
        'Input Analysis',
        'Non-essential Word Identification',
        'Redundant Phrase Removal',
        'Semantic Verification'
      ]
    };
  }

  /**
   * Analyze input to understand structure and content
   */
  analyzeInput(text) {
    const doc = compromise(text);
    
    return {
      sentences: doc.sentences().length,
      words: doc.terms().length,
      nouns: doc.nouns().out('array'),
      verbs: doc.verbs().out('array'),
      adjectives: doc.adjectives().out('array'),
      numbers: doc.numbers().out('array'),
      people: doc.people().out('array'),
      places: doc.places().out('array'),
      organizations: doc.organizations().out('array')
    };
  }

  /**
   * Identify essential words that must be kept
   */
  identifyEssentialWords(text, analysis) {
    const tokens = this.tokenizer.tokenize(text.toLowerCase());
    const essential = new Set();
    
    // Keep all named entities
    [...analysis.nouns, ...analysis.people, ...analysis.places, 
     ...analysis.organizations, ...analysis.numbers].forEach(entity => {
      entity.toLowerCase().split(' ').forEach(word => essential.add(word));
    });
    
    // Keep important verbs (action words)
    analysis.verbs.forEach(verb => {
      verb.toLowerCase().split(' ').forEach(word => essential.add(word));
    });
    
    // Keep words longer than 6 characters (usually more meaningful)
    tokens.forEach(token => {
      if (token.length > 6) essential.add(token);
    });
    
    // Use TF-IDF to identify important terms
    const tfidf = new this.TfIdf();
    tfidf.addDocument(text);
    
    tfidf.listTerms(0).slice(0, 20).forEach(item => {
      essential.add(item.term);
    });
    
    return essential;
  }

  /**
   * Remove redundancy while maintaining meaning
   */
  removeRedundancy(text, essentialWords, targetReduction) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const targetLength = Math.ceil(text.length * (100 - targetReduction) / 100);
    
    let compressed = '';
    
    for (const sentence of sentences) {
      const words = this.tokenizer.tokenize(sentence);
      const filtered = [];
      
      for (const word of words) {
        const lowerWord = word.toLowerCase();
        
        // Keep essential words
        if (essentialWords.has(lowerWord)) {
          filtered.push(word);
        }
        // Keep words that are not stop words
        else if (!this.stopWords.has(lowerWord) && word.length > 3) {
          filtered.push(word);
        }
        // Keep first and last word of sentence for structure
        else if (words.indexOf(word) === 0 || words.indexOf(word) === words.length - 1) {
          filtered.push(word);
        }
      }
      
      compressed += filtered.join(' ') + ' ';
      
      // Stop if we've reached target length
      if (compressed.length >= targetLength) break;
    }
    
    return compressed.trim();
  }

  /**
   * Verify semantic similarity between original and compressed
   */
  verifySemantics(original, compressed) {
    const originalDoc = compromise(original);
    const compressedDoc = compromise(compressed);
    
    // Extract key concepts
    const originalConcepts = new Set([
      ...originalDoc.nouns().out('array').map(n => n.toLowerCase()),
      ...originalDoc.verbs().out('array').map(v => v.toLowerCase()),
      ...originalDoc.numbers().out('array')
    ]);
    
    const compressedConcepts = new Set([
      ...compressedDoc.nouns().out('array').map(n => n.toLowerCase()),
      ...compressedDoc.verbs().out('array').map(v => v.toLowerCase()),
      ...compressedDoc.numbers().out('array')
    ]);
    
    // Calculate concept preservation
    let preserved = 0;
    originalConcepts.forEach(concept => {
      if (compressedConcepts.has(concept)) preserved++;
    });
    
    const conceptScore = (preserved / Math.max(originalConcepts.size, 1)) * 100;
    
    // Calculate structural similarity
    const structureScore = Math.min(
      (compressedDoc.sentences().length / Math.max(originalDoc.sentences().length, 1)) * 100,
      100
    );
    
    // Weighted combination
    return (conceptScore * 0.7 + structureScore * 0.3);
  }

  /**
   * Estimate token count (approximation)
   */
  estimateTokens(text) {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  /**
   * Calculate compression rate
   */
  calculateCompressionRate(original, compressed) {
    const originalTokens = this.estimateTokens(original);
    const compressedTokens = this.estimateTokens(compressed);
    return ((originalTokens - compressedTokens) / originalTokens * 100).toFixed(1);
  }
}

module.exports = new LLMLinguaEngine();

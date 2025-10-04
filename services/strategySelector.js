const compromise = require('compromise');
const natural = require('natural');

/**
 * Intelligent Strategy Selection Engine
 * Determines optimal compression strategy based on prompt characteristics
 */
class StrategySelector {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
  }

  /**
   * Analyze prompt and recommend optimal strategy
   */
  analyzeAndRecommend(prompt, userPreference = 'auto') {
    if (userPreference !== 'auto') {
      return {
        recommended: userPreference,
        confidence: 100,
        reasoning: 'User-specified strategy override'
      };
    }

    const characteristics = this.analyzePromptCharacteristics(prompt);
    const scores = this.calculateStrategyScores(characteristics);
    
    const recommended = scores.synthlang > scores.llmlingua ? 'synthlang' : 'llmlingua';
    const confidence = Math.abs(scores.synthlang - scores.llmlingua);
    
    return {
      recommended,
      confidence: Math.min(95, 50 + confidence / 2).toFixed(1),
      scores,
      characteristics,
      reasoning: this.generateReasoning(recommended, characteristics)
    };
  }

  /**
   * Analyze prompt characteristics
   */
  analyzePromptCharacteristics(prompt) {
    const doc = compromise(prompt);
    const words = this.tokenizer.tokenize(prompt);
    const lowerPrompt = prompt.toLowerCase();
    
    // Category detection
    const category = this.detectCategory(lowerPrompt);
    
    // Complexity analysis
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const complexity = (avgWordLength * uniqueWords) / words.length;
    
    // Repetition analysis
    const wordFreq = {};
    words.forEach(word => {
      const lower = word.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    });
    const repeatedWords = Object.values(wordFreq).filter(c => c > 1).length;
    const repetitionScore = (repeatedWords / words.length) * 100;
    
    // Domain specificity
    const domainScore = this.calculateDomainSpecificity(lowerPrompt, category);
    
    // Structure analysis
    const sentences = doc.sentences().length;
    const hasNumbers = doc.numbers().length > 0;
    const hasEntities = doc.people().length + doc.places().length + doc.organizations().length > 0;
    
    return {
      category,
      length: prompt.length,
      tokenCount: Math.ceil(prompt.length / 4),
      wordCount: words.length,
      sentenceCount: sentences,
      complexity: Math.min(100, complexity * 10),
      repetitionScore,
      domainSpecificity: domainScore,
      avgWordLength,
      uniqueWordRatio: (uniqueWords / words.length) * 100,
      hasNumbers,
      hasEntities
    };
  }

  /**
   * Detect category from prompt
   */
  detectCategory(lowerPrompt) {
    const categories = {
      financial: ['financial', 'revenue', 'profit', 'portfolio', 'investment', 'market', 'trading', 'stock'],
      technical: ['code', 'function', 'security', 'performance', 'bug', 'api', 'software', 'algorithm'],
      research: ['research', 'study', 'analyze', 'data', 'hypothesis', 'findings', 'investigation'],
      creative: ['write', 'story', 'narrative', 'creative', 'imagine', 'describe', 'compelling']
    };
    
    let maxMatches = 0;
    let detectedCategory = 'general';
    
    Object.entries(categories).forEach(([cat, keywords]) => {
      const matches = keywords.filter(kw => lowerPrompt.includes(kw)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedCategory = cat;
      }
    });
    
    return detectedCategory;
  }

  /**
   * Calculate domain specificity score
   */
  calculateDomainSpecificity(lowerPrompt, category) {
    const domainKeywords = {
      financial: ['revenue', 'profit', 'portfolio', 'investment', 'financial', 'market', 'stock', 'trading', 'asset', 'capital'],
      technical: ['code', 'function', 'security', 'performance', 'error', 'optimization', 'algorithm', 'implementation', 'bug', 'test'],
      research: ['analyze', 'study', 'research', 'investigate', 'examine', 'data', 'findings', 'hypothesis', 'methodology', 'conclusion'],
      creative: ['story', 'narrative', 'character', 'plot', 'scene', 'creative', 'imagine', 'describe', 'compelling', 'inspire']
    };
    
    const keywords = domainKeywords[category] || [];
    const matches = keywords.filter(kw => lowerPrompt.includes(kw)).length;
    
    return (matches / Math.max(keywords.length, 1)) * 100;
  }

  /**
   * Calculate strategy scores
   */
  calculateStrategyScores(characteristics) {
    // SynthLang excels with:
    // - High domain specificity (established symbol library exists)
    // - High repetition (symbols can replace repeated concepts)
    // - Structured, formal content
    // - Technical/Financial domains
    
    const synthLangScore = (
      characteristics.domainSpecificity * 0.35 +
      characteristics.repetitionScore * 0.25 +
      (characteristics.category !== 'general' && characteristics.category !== 'creative' ? 25 : 0) +
      (characteristics.hasNumbers ? 10 : 0) +
      (characteristics.hasEntities ? 5 : 0)
    );
    
    // LLMLingua excels with:
    // - Lower domain specificity (general purpose)
    // - High complexity (nuanced language)
    // - Creative/varied content
    // - One-off prompts
    
    const llmlinguaScore = (
      (100 - characteristics.domainSpecificity) * 0.35 +
      characteristics.complexity * 0.25 +
      characteristics.uniqueWordRatio * 0.15 +
      (characteristics.category === 'general' || characteristics.category === 'creative' ? 25 : 0)
    );
    
    return {
      synthlang: Math.min(100, synthLangScore).toFixed(1),
      llmlingua: Math.min(100, llmlinguaScore).toFixed(1)
    };
  }

  /**
   * Generate human-readable reasoning
   */
  generateReasoning(strategy, characteristics) {
    if (strategy === 'synthlang') {
      const reasons = [];
      
      if (characteristics.domainSpecificity > 60) {
        reasons.push(`High domain specificity (${characteristics.domainSpecificity.toFixed(0)}%) allows effective symbolic compression`);
      }
      
      if (characteristics.repetitionScore > 30) {
        reasons.push(`Repetitive content (${characteristics.repetitionScore.toFixed(0)}%) benefits from symbol reuse`);
      }
      
      if (characteristics.category !== 'general') {
        reasons.push(`${characteristics.category} domain has established symbol library`);
      }
      
      if (reasons.length === 0) {
        reasons.push('Structured content suitable for symbolic compression');
      }
      
      return reasons.join('. ') + '.';
    } else {
      const reasons = [];
      
      if (characteristics.complexity > 60) {
        reasons.push(`Complex language (${characteristics.complexity.toFixed(0)}%) requires nuanced compression`);
      }
      
      if (characteristics.uniqueWordRatio > 70) {
        reasons.push(`High vocabulary diversity (${characteristics.uniqueWordRatio.toFixed(0)}%) favors intelligent word removal`);
      }
      
      if (characteristics.category === 'general' || characteristics.category === 'creative') {
        reasons.push(`${characteristics.category} content works best with general-purpose compression`);
      }
      
      if (reasons.length === 0) {
        reasons.push('Varied content suitable for general-purpose compression');
      }
      
      return reasons.join('. ') + '.';
    }
  }
}

module.exports = new StrategySelector();

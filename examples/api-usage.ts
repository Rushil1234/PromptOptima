/**
 * Demo Script - How to Use LLM Optimizer API
 * 
 * This file demonstrates how to integrate the LLM Optimizer
 * into your own applications programmatically.
 */

// Example 1: Using LLMLingua Compression
async function compressWithLLMLingua(prompt: string) {
  const response = await fetch('http://localhost:3000/api/compress/llmlingua', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      prompt,
      targetRatio: 0.5 // Compress to 50% of original
    }),
  });

  const result = await response.json();
  
  console.log('Original:', result.original);
  console.log('Compressed:', result.compressed);
  console.log('Compression Ratio:', result.compressionRatio + '%');
  console.log('Tokens Saved:', result.estimatedTokenSavings);
  console.log('Semantic Score:', result.semanticScore + '%');
  
  return result;
}

// Example 2: Using SynthLang Compression
async function compressWithSynthLang(prompt: string) {
  const response = await fetch('http://localhost:3000/api/compress/synthlang', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();
  
  console.log('Original:', result.original);
  console.log('Compressed (Symbolic):', result.compressed);
  console.log('Compression Ratio:', result.compressionRatio + '%');
  console.log('Tokens Saved:', result.estimatedTokenSavings);
  
  return result;
}

// Example 3: Get AI Strategy Recommendation
async function getRecommendedStrategy(prompt: string) {
  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();
  
  console.log('Recommended Strategy:', result.recommendedStrategy);
  console.log('Reasoning:', result.reasoning);
  console.log('Estimated Savings:', result.estimatedSavings + '%');
  
  return result;
}

// Example 4: Smart Compression (Auto-select strategy)
async function smartCompress(prompt: string) {
  // First, get recommendation
  const analysis = await getRecommendedStrategy(prompt);
  
  // Then compress with recommended strategy
  if (analysis.recommendedStrategy === 'llmlingua') {
    return await compressWithLLMLingua(prompt);
  } else if (analysis.recommendedStrategy === 'synthlang') {
    return await compressWithSynthLang(prompt);
  } else {
    // Hybrid: try both and pick the best
    const llmResult = await compressWithLLMLingua(prompt);
    const synthResult = await compressWithSynthLang(prompt);
    
    return llmResult.compressionRatio > synthResult.compressionRatio 
      ? llmResult 
      : synthResult;
  }
}

// Example 5: Batch Compression
async function batchCompress(prompts: string[]) {
  const results = [];
  
  for (const prompt of prompts) {
    const result = await smartCompress(prompt);
    results.push(result);
  }
  
  // Calculate aggregate statistics
  const totalOriginalTokens = results.reduce((sum, r) => 
    sum + estimateTokens(r.original), 0);
  const totalSavedTokens = results.reduce((sum, r) => 
    sum + r.estimatedTokenSavings, 0);
  const avgCompressionRatio = results.reduce((sum, r) => 
    sum + r.compressionRatio, 0) / results.length;
  const avgSemanticScore = results.reduce((sum, r) => 
    sum + (r.semanticScore || 95), 0) / results.length;
  
  console.log('\n=== Batch Compression Results ===');
  console.log('Total Prompts:', prompts.length);
  console.log('Original Tokens:', totalOriginalTokens);
  console.log('Tokens Saved:', totalSavedTokens);
  console.log('Avg Compression:', avgCompressionRatio.toFixed(1) + '%');
  console.log('Avg Semantic Score:', avgSemanticScore.toFixed(1) + '%');
  
  return results;
}

// Example 6: Integration with Your LLM Call
async function optimizedLLMCall(prompt: string, llmFunction: Function) {
  // Compress the prompt first
  const compressed = await smartCompress(prompt);
  
  console.log('Original Tokens:', estimateTokens(prompt));
  console.log('Compressed Tokens:', estimateTokens(compressed.compressed));
  console.log('Savings:', compressed.estimatedTokenSavings, 'tokens');
  
  // Make the actual LLM call with compressed prompt
  const response = await llmFunction(compressed.compressed);
  
  return {
    response,
    compressionStats: compressed,
    originalPrompt: prompt,
    compressedPrompt: compressed.compressed,
  };
}

// Example 7: Get All SynthLang Symbols
async function getSymbolReference() {
  const response = await fetch('http://localhost:3000/api/symbols');
  const data = await response.json();
  
  console.log('Total Symbols:', data.symbols.length);
  console.log('Categories:', data.categories);
  
  // Print symbols by category
  for (const category of data.categories) {
    console.log(`\n=== ${category.toUpperCase()} ===`);
    const symbols = data.symbolsByCategory[category];
    symbols.forEach((s: any) => {
      console.log(`${s.symbol} - ${s.concept}: ${s.description}`);
    });
  }
  
  return data;
}

// Helper function to estimate tokens
function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

// Example Usage
async function runExamples() {
  console.log('=== LLM Optimizer API Demo ===\n');
  
  const examplePrompt = `Please analyze this document carefully and provide me with a comprehensive summary that includes all the key points, main themes, and any important insights you can discover from the content.`;
  
  // Run examples
  console.log('1. LLMLingua Compression:');
  await compressWithLLMLingua(examplePrompt);
  
  console.log('\n2. SynthLang Compression:');
  await compressWithSynthLang(examplePrompt);
  
  console.log('\n3. Strategy Recommendation:');
  await getRecommendedStrategy(examplePrompt);
  
  console.log('\n4. Smart Compression:');
  await smartCompress(examplePrompt);
  
  console.log('\n5. Symbol Reference:');
  await getSymbolReference();
}

// Export functions for use in other files
export {
  compressWithLLMLingua,
  compressWithSynthLang,
  getRecommendedStrategy,
  smartCompress,
  batchCompress,
  optimizedLLMCall,
  getSymbolReference,
};

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

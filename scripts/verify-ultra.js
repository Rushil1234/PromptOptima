#!/usr/bin/env node

/**
 * Simple Ultra Verification Test
 * Tests Ultra compression with a single real-world example
 */

async function verifyUltra() {
  console.log('\n🔬 Ultra Compression Verification\n');
  console.log('='  .repeat(60));
  
  const prompt = `I need you to help me create a comprehensive guide for beginners 
learning web development. The guide should cover HTML basics, CSS styling, 
JavaScript fundamentals, and how to deploy a simple website. Please include 
code examples and best practices.`;

  console.log(`\n📝 Test Prompt (${prompt.length} chars):`);
  console.log(`"${prompt.substring(0, 100)}..."\n`);
  
  try {
    console.log('⏳ Compressing with Ultra strategy...\n');
    
    const response = await fetch('http://localhost:3001/api/compress/ultra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ Failed: ${error.error}`);
      console.error(`Details: ${error.details || 'None'}\n`);
      process.exit(1);
    }

    const result = await response.json();
    
    console.log('✅ Ultra Compression Complete!\n');
    console.log('='  .repeat(60));
    console.log(`\n📊 Results:`);
    console.log(`   Input:       ${result.original.length} characters`);
    console.log(`   Output:      ${result.compressed.length} characters`);
    console.log(`   Compression: ${result.totalCompressionRatio.toFixed(1)}%`);
    console.log(`   Tokens Saved: ${result.totalTokensSaved}`);
    console.log(`   Semantic:    ${result.overallSemanticScore.toFixed(1)}%`);
    console.log(`   Duration:    ${result.processingTime}`);
    
    console.log(`\n🔄 Compression Layers:`);
    console.log(`   1️⃣  Hybrid:    ${result.layers.hybrid.compressionRatio.toFixed(1)}% compression`);
    console.log(`   2️⃣  LLMLingua: ${result.layers.llmlingua.compressionRatio.toFixed(1)}% compression`);
    console.log(`   3️⃣  SynthLang: ${result.layers.synthlang.compressionRatio.toFixed(1)}% compression`);
    
    console.log(`\n📤 Compressed Output:`);
    console.log(`   "${result.compressed}"`);
    
    console.log(`\n${'='.repeat(60)}`);
    
    // Verify it worked
    if (result.compressed.length < result.original.length &&
        result.totalCompressionRatio > 0 &&
        result.compressed.length > 0) {
      console.log('\n✅ SUCCESS: Ultra compression is working correctly!\n');
      process.exit(0);
    } else {
      console.log('\n⚠️  WARNING: Results seem unusual\n');
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

// Main
(async () => {
  try {
    await fetch('http://localhost:3001');
  } catch {
    console.error('\n❌ Server not running. Start with: npm run dev\n');
    process.exit(1);
  }
  
  await verifyUltra();
})();

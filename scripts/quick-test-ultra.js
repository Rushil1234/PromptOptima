#!/usr/bin/env node

/**
 * Quick Ultra Compression Test
 * Single simple test to verify basic functionality
 */

async function quickTest() {
  console.log('🧪 Quick Ultra Compression Test\n');
  
  const testPrompt = 'Write a Python function that sorts a list.';
  
  console.log(`Testing with: "${testPrompt}"`);
  console.log(`Length: ${testPrompt.length} chars\n`);
  
  try {
    console.log('📡 Sending request to /api/compress/ultra...');
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3001/api/compress/ultra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: testPrompt }),
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    if (!response.ok) {
      const error = await response.json();
      console.error(`\n❌ FAILED: ${error.error}`);
      if (error.details) console.error(`Details: ${error.details}`);
      if (error.suggestion) console.error(`Suggestion: ${error.suggestion}`);
      process.exit(1);
    }

    const result = await response.json();
    
    console.log(`\n✅ SUCCESS in ${duration}s\n`);
    console.log(`Original:   "${result.original}"`);
    console.log(`Compressed: "${result.compressed}"`);
    console.log(`Ratio: ${result.totalCompressionRatio.toFixed(1)}%`);
    console.log(`Tokens Saved: ${result.totalTokensSaved}`);
    console.log(`Semantic: ${result.overallSemanticScore.toFixed(1)}%\n`);
    
    console.log('Journey:');
    result.compressionJourney.forEach(stage => {
      console.log(`  ${stage.stage}: ${stage.length} chars (${stage.ratio.toFixed(1)}% total)`);
    });
    
    console.log('\n🎉 Ultra compression is working!\n');
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}\n`);
    process.exit(1);
  }
}

// Check server
async function checkServer() {
  try {
    await fetch('http://localhost:3001');
    return true;
  } catch {
    return false;
  }
}

(async () => {
  console.log('Checking server...');
  const running = await checkServer();
  
  if (!running) {
    console.error('❌ Server not running on http://localhost:3001');
    console.error('Start with: npm run dev\n');
    process.exit(1);
  }
  
  console.log('✅ Server running\n');
  await quickTest();
})();

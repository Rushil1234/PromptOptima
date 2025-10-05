#!/usr/bin/env node

/**
 * Ultra Compression Test Suite
 * Tests all aspects of the Ultra compression pipeline
 */

const testCases = [
  {
    name: 'Short Technical Prompt',
    prompt: 'Write a Python function that sorts a list of integers in ascending order using bubble sort algorithm.',
    expectedMinCompression: 30,
  },
  {
    name: 'Medium Verbose Prompt',
    prompt: `I would like you to please help me create a comprehensive guide that explains how to set up a development environment for web development. The guide should include instructions for installing Node.js, configuring VS Code, setting up Git, and creating a basic project structure. Please make sure to include detailed steps and explanations for each part.`,
    expectedMinCompression: 50,
  },
  {
    name: 'Long Complex Prompt',
    prompt: `ChatGPT, you are a highly sophisticated AI assistant with multiple roles including researcher, historian, technical writer, and tutor. Your task is to analyze and synthesize information from various domains while maintaining a conversational and engaging tone. You should always verify facts, provide sources when possible, and explain complex concepts in simple terms. When answering questions, please consider multiple perspectives and present a balanced view. If you're unsure about something, please admit it rather than making up information. Your responses should be well-structured, informative, and tailored to the user's level of understanding. Please remember to be patient, supportive, and encouraging in your interactions.`,
    expectedMinCompression: 60,
  },
  {
    name: 'Very Long Detailed Prompt',
    prompt: `You are an expert software architect tasked with designing a microservices-based e-commerce platform. The platform should include the following services: user authentication and authorization, product catalog management, shopping cart functionality, order processing, payment integration, inventory management, shipping and logistics, customer reviews and ratings, recommendation engine, and analytics dashboard. Each service should be independently deployable, scalable, and fault-tolerant. Consider using API gateways for routing, message queues for asynchronous communication, and distributed caching for performance optimization. The architecture should support multiple databases (SQL and NoSQL) based on service requirements. Implement proper monitoring, logging, and tracing across all services. Design for high availability, disaster recovery, and compliance with data protection regulations. Include security best practices such as encryption, rate limiting, and input validation. Provide detailed diagrams, technology stack recommendations, and deployment strategies for both development and production environments. Consider cost optimization, performance tuning, and scalability planning for future growth.`,
    expectedMinCompression: 70,
  },
  {
    name: 'Structured Data Prompt',
    prompt: `Task: Data Analysis
Input Format: CSV with columns [name, age, salary, department]
Output Format: JSON with aggregated statistics
Requirements:
1. Calculate average salary per department
2. Find oldest and youngest employee
3. Identify top 3 highest paid employees
4. Count employees per department
5. Calculate total payroll cost
Additional Notes: Handle missing values, remove duplicates, validate data types`,
    expectedMinCompression: 40,
  },
];

async function testUltraCompression(testCase) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📝 TEST: ${testCase.name}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Original Length: ${testCase.prompt.length} chars`);
  console.log(`Expected Min Compression: ${testCase.expectedMinCompression}%\n`);

  try {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3001/api/compress/ultra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: testCase.prompt }),
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ FAILED: ${error.error}`);
      if (error.details) console.error(`   Details: ${error.details}`);
      return { success: false, error: error.error };
    }

    const result = await response.json();
    
    console.log(`\n✅ COMPRESSION SUCCESSFUL`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`\n📊 RESULTS:`);
    console.log(`   Original:   ${result.original.length} chars`);
    console.log(`   Compressed: ${result.compressed.length} chars`);
    console.log(`   Ratio:      ${result.totalCompressionRatio.toFixed(1)}%`);
    console.log(`   Tokens Saved: ${result.totalTokensSaved}`);
    console.log(`   Semantic Score: ${result.overallSemanticScore.toFixed(1)}%`);
    
    console.log(`\n🔄 COMPRESSION JOURNEY:`);
    result.compressionJourney.forEach(stage => {
      console.log(`   ${stage.stage.padEnd(25)} ${String(stage.length).padStart(5)} chars  (${stage.ratio.toFixed(1)}% total)`);
    });
    
    console.log(`\n📈 LAYER BREAKDOWN:`);
    console.log(`   Hybrid:    ${result.layers.hybrid.compressionRatio.toFixed(1)}% (${result.layers.hybrid.tokensSaved} tokens, ${result.layers.hybrid.semanticScore.toFixed(1)}% semantic)`);
    console.log(`   LLMLingua: ${result.layers.llmlingua.compressionRatio.toFixed(1)}% (${result.layers.llmlingua.tokensSaved} tokens, ${result.layers.llmlingua.semanticScore.toFixed(1)}% semantic)`);
    console.log(`   SynthLang: ${result.layers.synthlang.compressionRatio.toFixed(1)}% (${result.layers.synthlang.tokensSaved} tokens, ${result.layers.synthlang.symbolsUsed} symbols)`);
    
    console.log(`\n📝 COMPRESSED OUTPUT (first 200 chars):`);
    console.log(`   "${result.compressed.substring(0, 200)}${result.compressed.length > 200 ? '...' : ''}"`);
    
    // Validation
    const compressionMet = result.totalCompressionRatio >= testCase.expectedMinCompression;
    const hasOutput = result.compressed.length > 0;
    const validRatio = result.totalCompressionRatio > 0 && result.totalCompressionRatio <= 100;
    
    console.log(`\n✓ VALIDATION:`);
    console.log(`   ${compressionMet ? '✅' : '⚠️'} Compression ratio ${compressionMet ? 'meets' : 'below'} expected minimum (${result.totalCompressionRatio.toFixed(1)}% vs ${testCase.expectedMinCompression}%)`);
    console.log(`   ${hasOutput ? '✅' : '❌'} Has compressed output`);
    console.log(`   ${validRatio ? '✅' : '❌'} Valid compression ratio`);
    
    return {
      success: true,
      result,
      duration,
      compressionMet,
      hasOutput,
      validRatio,
    };
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    ULTRA COMPRESSION TEST SUITE                            ║
║                    Testing All Compression Layers                          ║
╚════════════════════════════════════════════════════════════════════════════╝
`);

  const results = [];
  
  for (const testCase of testCases) {
    const result = await testUltraCompression(testCase);
    results.push({
      name: testCase.name,
      ...result,
    });
    
    // Wait between tests to avoid rate limiting
    if (testCases.indexOf(testCase) < testCases.length - 1) {
      console.log(`\n⏳ Waiting 3 seconds before next test...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Summary
  console.log(`\n\n${'='.repeat(80)}`);
  console.log(`📊 TEST SUMMARY`);
  console.log(`${'='.repeat(80)}\n`);
  
  const passed = results.filter(r => r.success && r.compressionMet && r.hasOutput && r.validRatio).length;
  const failed = results.filter(r => !r.success).length;
  const warnings = results.filter(r => r.success && (!r.compressionMet || !r.hasOutput || !r.validRatio)).length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`❌ Failed: ${failed}`);
  
  results.forEach(result => {
    const status = !result.success ? '❌ FAILED' :
                   (result.compressionMet && result.hasOutput && result.validRatio) ? '✅ PASSED' :
                   '⚠️  WARNING';
    console.log(`\n${status} - ${result.name}`);
    if (result.success && result.result) {
      console.log(`   Compression: ${result.result.totalCompressionRatio.toFixed(1)}% | Duration: ${result.duration}s | Semantic: ${result.result.overallSemanticScore.toFixed(1)}%`);
    } else if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  console.log(`\n${'='.repeat(80)}\n`);
  
  const overallSuccess = failed === 0 && warnings === 0;
  if (overallSuccess) {
    console.log(`🎉 ALL TESTS PASSED! Ultra compression is working correctly.\n`);
  } else if (failed === 0) {
    console.log(`✅ Tests completed with warnings. Review results above.\n`);
  } else {
    console.log(`❌ Some tests failed. Please review errors and fix issues.\n`);
  }
  
  process.exit(overallSuccess ? 0 : 1);
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3001');
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  console.log('🔍 Checking if server is running on http://localhost:3001...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('\n❌ ERROR: Server is not running on http://localhost:3001');
    console.error('Please start the server with: npm run dev\n');
    process.exit(1);
  }
  
  console.log('✅ Server is running\n');
  await runAllTests();
})();

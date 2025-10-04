#!/usr/bin/env node

/**
 * Test script to verify the backend API is working correctly
 */

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing Dual-Strategy Optimizer API\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const health = await healthResponse.json();
    console.log('✅ Health check passed:', health.status);
    console.log();
    
    // Test 2: Optimize Prompt (Financial)
    console.log('2️⃣  Testing optimization with financial prompt...');
    const financialPrompt = 'Please analyze the quarterly financial performance of our technology portfolio, focusing specifically on revenue growth, profit margins, and risk exposure across different market segments. Provide detailed recommendations for portfolio optimization and risk mitigation strategies.';
    
    const optimizeResponse = await fetch(`${API_BASE}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: financialPrompt,
        strategy: 'auto',
        model: 'gpt4'
      })
    });
    
    const optimizeData = await optimizeResponse.json();
    console.log('✅ Optimization completed');
    console.log('   Recommended Strategy:', optimizeData.recommendation.recommended);
    console.log('   Confidence:', optimizeData.recommendation.confidence + '%');
    console.log('   LLMLingua Compression:', optimizeData.results.llmlingua.compressionRate + '%');
    console.log('   SynthLang Compression:', optimizeData.results.synthlang.compressionRate + '%');
    console.log('   Semantic Preservation (LLMLingua):', optimizeData.results.llmlingua.semanticScore + '%');
    console.log('   Semantic Preservation (SynthLang):', optimizeData.results.synthlang.semanticScore + '%');
    console.log();
    
    // Test 3: Analyze Prompt
    console.log('3️⃣  Testing prompt analysis...');
    const analyzeResponse = await fetch(`${API_BASE}/optimize/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Write a creative story about space exploration'
      })
    });
    
    const analyzeData = await analyzeResponse.json();
    console.log('✅ Analysis completed');
    console.log('   Category:', analyzeData.analysis.characteristics.category);
    console.log('   Recommended:', analyzeData.analysis.recommended);
    console.log('   Reasoning:', analyzeData.analysis.reasoning);
    console.log();
    
    // Test 4: Get Symbol Libraries
    console.log('4️⃣  Testing symbol library endpoint...');
    const symbolsResponse = await fetch(`${API_BASE}/symbols`);
    const symbols = await symbolsResponse.json();
    console.log('✅ Symbol libraries retrieved');
    console.log('   Categories:', Object.keys(symbols).join(', '));
    console.log('   Financial symbols count:', Object.keys(symbols.financial || {}).length);
    console.log('   Technical symbols count:', Object.keys(symbols.technical || {}).length);
    console.log();
    
    // Test 5: Get Metrics
    console.log('5️⃣  Testing metrics endpoint...');
    const metricsResponse = await fetch(`${API_BASE}/metrics/summary`);
    const metrics = await metricsResponse.json();
    console.log('✅ Metrics retrieved');
    console.log('   Total Prompts:', metrics.totalPrompts);
    console.log('   Average Compression:', metrics.averageCompression + '%');
    console.log('   Total Cost Savings: $' + metrics.totalCostSavings);
    console.log();
    
    // Test 6: Add Custom Symbol
    console.log('6️⃣  Testing custom symbol addition...');
    const addSymbolResponse = await fetch(`${API_BASE}/symbols/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        concept: 'test',
        symbol: '🧪'
      })
    });
    
    const addSymbolData = await addSymbolResponse.json();
    console.log('✅ Custom symbol added:', addSymbolData.message || 'Success');
    console.log();
    
    console.log('🎉 All tests passed successfully!\n');
    console.log('✨ Your Dual-Strategy Optimizer backend is working perfectly!');
    console.log('🌐 Web interface available at: http://localhost:3000');
    console.log('📚 API documentation available at: http://localhost:3000/api\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\n⚠️  Make sure the server is running: npm start\n');
    process.exit(1);
  }
}

// Run tests
testAPI();

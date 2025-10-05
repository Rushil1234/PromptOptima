#!/usr/bin/env node

/**
 * SynthLang CLI Tool
 * Command-line interface for tokenizer training, translation, and testing
 * 
 * Usage:
 *   npm run synthlang -- export-vocab [format]
 *   npm run synthlang -- translate "your text here" [direction]
 *   npm run synthlang -- test
 *   npm run synthlang -- benchmark [iterations]
 */

const { tokenizer } = require('../src/lib/tokenizer');
const { mappingEngine } = require('../src/lib/mapping-engine');
const { testingFramework } = require('../src/lib/testing-framework');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('🎌 SynthLang CLI Tool\n');

  if (!command) {
    printHelp();
    return;
  }

  switch (command) {
    case 'export-vocab':
      await exportVocabulary(args[1] || 'json');
      break;

    case 'translate':
      await translate(args[1], args[2] || 'to-kanji');
      break;

    case 'test':
      await runTests();
      break;

    case 'benchmark':
      await runBenchmark(parseInt(args[1]) || 1000);
      break;

    case 'training-dataset':
      await generateTrainingDataset(parseInt(args[1]) || 10000);
      break;

    case 'stats':
      printStats();
      break;

    case 'help':
      printHelp();
      break;

    default:
      console.log(`❌ Unknown command: ${command}\n`);
      printHelp();
  }
}

async function exportVocabulary(format) {
  console.log(`📦 Exporting vocabulary in ${format} format...\n`);

  const exportsDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  switch (format) {
    case 'json':
      const jsonPath = path.join(exportsDir, 'vocabulary.json');
      tokenizer.exportToJSON(jsonPath);
      console.log(`✅ Exported to: ${jsonPath}`);
      break;

    case 'huggingface':
    case 'hf':
      const hfPath = path.join(exportsDir, 'huggingface');
      tokenizer.exportToHuggingFace(hfPath);
      console.log(`✅ Exported to: ${hfPath}`);
      break;

    case 'sentencepiece':
    case 'sp':
      const spPath = path.join(exportsDir, 'sentencepiece.vocab');
      tokenizer.exportToSentencePiece(spPath);
      console.log(`✅ Exported to: ${spPath}`);
      break;

    case 'all':
      tokenizer.exportToJSON(path.join(exportsDir, 'vocabulary.json'));
      tokenizer.exportToHuggingFace(path.join(exportsDir, 'huggingface'));
      tokenizer.exportToSentencePiece(path.join(exportsDir, 'sentencepiece.vocab'));
      console.log(`✅ Exported all formats to: ${exportsDir}`);
      break;

    default:
      console.log(`❌ Unknown format: ${format}`);
      console.log('Available formats: json, huggingface (hf), sentencepiece (sp), all');
  }
}

async function translate(text, direction) {
  if (!text) {
    console.log('❌ Please provide text to translate');
    console.log('Usage: npm run synthlang -- translate "your text here" [direction]');
    return;
  }

  console.log(`🔄 Translating: "${text}"\n`);

  try {
    let result;

    if (direction === 'to-kanji') {
      result = await mappingEngine.translateToKanji(text);
      console.log('📝 Original (English):');
      console.log(`   ${text}\n`);
      console.log('🎌 Compressed (Kanji):');
      console.log(`   ${result.translated}\n`);
    } else if (direction === 'to-english') {
      result = await mappingEngine.translateToEnglish(text);
      console.log('🎌 Original (Kanji):');
      console.log(`   ${text}\n`);
      console.log('📝 Decompressed (English):');
      console.log(`   ${result.translated}\n`);
    } else {
      console.log(`❌ Invalid direction: ${direction}`);
      console.log('Use: to-kanji or to-english');
      return;
    }

    console.log('📊 Metrics:');
    console.log(`   Compression Ratio: ${(result.compressionRatio * 100).toFixed(1)}%`);
    console.log(`   Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`   Symbols Used: ${result.metadata.symbolCount}`);
    console.log(`   Original Length: ${result.metadata.originalLength} chars`);
    console.log(`   Translated Length: ${result.metadata.translatedLength} chars`);

    if (result.metadata.fallbackWords.length > 0) {
      console.log(`\n⚠️  Fallback words (no Kanji mapping):`);
      console.log(`   ${result.metadata.fallbackWords.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Translation error:', error);
  }
}

async function runTests() {
  console.log('🧪 Running comprehensive test suite...\n');

  const results = await testingFramework.runAllTests();

  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Tests:        ${results.summary.totalTests}`);
  console.log(`Passed:             ${results.summary.passed} ✅`);
  console.log(`Failed:             ${results.summary.failed} ❌`);
  console.log(`Pass Rate:          ${(results.summary.passRate * 100).toFixed(1)}%`);
  console.log(`Avg Compression:    ${(results.summary.avgCompressionRatio * 100).toFixed(1)}%`);
  console.log(`Avg Semantic Score: ${(results.summary.avgSemanticScore * 100).toFixed(1)}%`);
  console.log(`Avg Latency:        ${results.summary.avgLatency.toFixed(2)}ms`);

  console.log('\n📈 By Difficulty:');
  Object.entries(results.byDifficulty).forEach(([difficulty, result]) => {
    console.log(`   ${difficulty.padEnd(8)}: ${(result.passRate * 100).toFixed(1)}% pass rate`);
  });

  console.log('\n📂 By Category:');
  Object.entries(results.byCategory).forEach(([category, result]) => {
    console.log(`   ${category.padEnd(12)}: ${(result.passRate * 100).toFixed(1)}% pass rate`);
  });

  // Save report
  const exportsDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  const report = testingFramework.generateReport(results);
  const reportPath = path.join(exportsDir, 'test-report.md');
  const resultsPath = path.join(exportsDir, 'test-results.json');

  fs.writeFileSync(reportPath, report, 'utf-8');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✅ Full report saved to: ${reportPath}`);
  console.log(`✅ Results saved to: ${resultsPath}`);
}

async function runBenchmark(iterations) {
  console.log(`⚡ Running performance benchmark (${iterations} iterations)...\n`);

  const benchmark = await testingFramework.runPerformanceBenchmark(iterations);

  console.log('\n' + '='.repeat(60));
  console.log('⚡ PERFORMANCE BENCHMARK RESULTS');
  console.log('='.repeat(60));
  console.log(`Iterations:     ${iterations}`);
  console.log(`Avg Latency:    ${benchmark.avgLatency.toFixed(2)}ms`);
  console.log(`Min Latency:    ${benchmark.minLatency.toFixed(2)}ms`);
  console.log(`Max Latency:    ${benchmark.maxLatency.toFixed(2)}ms`);
  console.log(`Throughput:     ${benchmark.throughput.toFixed(0)} ops/sec`);
}

async function generateTrainingDataset(count) {
  console.log(`🎓 Generating training dataset (${count} pairs)...\n`);

  const exportsDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  const outputPath = path.join(exportsDir, 'training-dataset.jsonl');
  tokenizer.exportTrainingDataset(outputPath, count);

  console.log(`✅ Training dataset saved to: ${outputPath}`);
  console.log(`   Format: JSONL (for OpenAI, Anthropic, etc.)`);
  console.log(`   Pairs: ${count}`);
}

function printStats() {
  console.log('📊 Vocabulary Statistics\n');

  const stats = tokenizer.getStats();

  console.log(`Total Tokens: ${stats.totalTokens}\n`);

  console.log('Tokens by Category:');
  Object.entries(stats.tokensByCategory)
    .sort(([, a], [, b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category.padEnd(20)}: ${count}`);
    });

  if (stats.topFrequentTokens.length > 0) {
    console.log('\nTop Frequent Tokens:');
    stats.topFrequentTokens.forEach((t, i) => {
      console.log(`   ${(i + 1).toString().padStart(2)}. ${t.token}  (${t.frequency} uses)`);
    });
  }
}

function printHelp() {
  console.log('Usage: npm run synthlang -- <command> [options]\n');
  console.log('Commands:');
  console.log('  export-vocab [format]         Export vocabulary (json, huggingface, sentencepiece, all)');
  console.log('  translate <text> [direction]  Translate text (to-kanji, to-english)');
  console.log('  test                          Run all automated tests');
  console.log('  benchmark [iterations]        Run performance benchmark (default: 1000)');
  console.log('  training-dataset [count]      Generate training dataset (default: 10000)');
  console.log('  stats                         Show vocabulary statistics');
  console.log('  help                          Show this help message\n');
  console.log('Examples:');
  console.log('  npm run synthlang -- export-vocab json');
  console.log('  npm run synthlang -- translate "create new user" to-kanji');
  console.log('  npm run synthlang -- test');
  console.log('  npm run synthlang -- benchmark 5000');
}

main().catch(console.error);

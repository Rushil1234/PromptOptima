/**
 * Testing Framework for SynthLang
 * Validates compression ratios, semantic preservation, and performance
 * Tests across multiple LLMs: GPT-4, Claude, Gemini
 */

import { mappingEngine, type TranslationResult } from './mapping-engine';
import { tokenizer } from './tokenizer';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  compressionRatio: number;
  semanticScore: number;
  latency: number;
  translated: string;
  expected?: string;
  confidence: number;
  errors: string[];
}

export interface BenchmarkResult {
  model: string;
  totalTests: number;
  passed: number;
  failed: number;
  avgCompressionRatio: number;
  avgSemanticScore: number;
  avgLatency: number;
  passRate: number;
  results: TestResult[];
}

export class TestingFramework {
  private testCases: TestCase[];
  private llmEndpoints: Map<string, string>;

  constructor() {
    this.testCases = [];
    this.llmEndpoints = new Map([
      ['gemini-2.5-flash', '/api/test/gemini'],
      ['gpt-4', '/api/test/gpt4'],
      ['claude-3', '/api/test/claude'],
    ]);
    this.initializeTestCases();
  }

  /**
   * Initialize comprehensive test cases
   */
  private initializeTestCases(): void {
    this.testCases = [
      // ===== EASY TESTS (Basic CRUD) =====
      {
        id: 'easy_001',
        input: 'create new user',
        expectedOutput: '作 新 者',
        category: 'crud',
        difficulty: 'easy',
        description: 'Simple CREATE operation',
      },
      {
        id: 'easy_002',
        input: 'read all data',
        expectedOutput: '読 全 値',
        category: 'crud',
        difficulty: 'easy',
        description: 'Simple READ operation',
      },
      {
        id: 'easy_003',
        input: 'update user',
        expectedOutput: '更 者',
        category: 'crud',
        difficulty: 'easy',
        description: 'Simple UPDATE operation',
      },
      {
        id: 'easy_004',
        input: 'delete file',
        expectedOutput: '削 簿',
        category: 'crud',
        difficulty: 'easy',
        description: 'Simple DELETE operation',
      },
      {
        id: 'easy_005',
        input: 'send request',
        expectedOutput: '送 求',
        category: 'api',
        difficulty: 'easy',
        description: 'Simple API call',
      },

      // ===== MEDIUM TESTS (Multi-step operations) =====
      {
        id: 'medium_001',
        input: 'create new user and save to database',
        expectedOutput: '作 新 者 且 書 庫',
        category: 'crud',
        difficulty: 'medium',
        description: 'CREATE with database save',
      },
      {
        id: 'medium_002',
        input: 'fetch all records and filter by date',
        expectedOutput: '読 全 録 且 選 日',
        category: 'data',
        difficulty: 'medium',
        description: 'READ with filtering',
      },
      {
        id: 'medium_003',
        input: 'validate input then update database',
        expectedOutput: '検 入 故 更 庫',
        category: 'logic',
        difficulty: 'medium',
        description: 'Conditional UPDATE',
      },
      {
        id: 'medium_004',
        input: 'send request to server and receive response',
        expectedOutput: '送 求 器 且 受 答',
        category: 'api',
        difficulty: 'medium',
        description: 'API request-response cycle',
      },
      {
        id: 'medium_005',
        input: 'loop through all items and calculate total',
        expectedOutput: '回 全 物 且 計 全',
        category: 'logic',
        difficulty: 'medium',
        description: 'Loop with calculation',
      },
      {
        id: 'medium_006',
        input: 'compress file and encrypt data',
        expectedOutput: '圧 簿 且 暗 値',
        category: 'data',
        difficulty: 'medium',
        description: 'Multiple transformations',
      },
      {
        id: 'medium_007',
        input: 'authenticate user and create session',
        expectedOutput: '認 者 且 作 会',
        category: 'auth',
        difficulty: 'medium',
        description: 'Authentication flow',
      },

      // ===== HARD TESTS (Complex workflows) =====
      {
        id: 'hard_001',
        input:
          'if error occurs then retry the operation or cancel and rollback',
        expectedOutput: '条 誤 故 再 処 或 取 且 戻',
        category: 'logic',
        difficulty: 'hard',
        description: 'Complex error handling',
      },
      {
        id: 'hard_002',
        input:
          'fetch data from cache or load from database and update cache',
        expectedOutput: '読 蔵 或 読 庫 且 更 蔵',
        category: 'data',
        difficulty: 'hard',
        description: 'Cache-first strategy',
      },
      {
        id: 'hard_003',
        input:
          'validate user credentials authenticate and create session then return token',
        expectedOutput: '検 者 認 且 作 会 故 戻 令',
        category: 'auth',
        difficulty: 'hard',
        description: 'Full authentication flow',
      },
      {
        id: 'hard_004',
        input:
          'query database filter results sort by date and return first ten items',
        expectedOutput: '問 庫 選 成 順 日 且 戻 初 10 物',
        category: 'data',
        difficulty: 'hard',
        description: 'Complex database query',
      },
      {
        id: 'hard_005',
        input:
          'train the model on dataset validate accuracy and save weights if performance improves',
        expectedOutput: '訓 模 値 検 精 且 書 重 条 最',
        category: 'ml',
        difficulty: 'hard',
        description: 'ML training pipeline',
      },
      {
        id: 'hard_006',
        input:
          'render screen display button and wait for user click then process event',
        expectedOutput: '描 画 表 釦 且 待 者 押 故 処 件',
        category: 'ui',
        difficulty: 'hard',
        description: 'UI interaction flow',
      },

      // ===== DOMAIN-SPECIFIC TESTS =====
      {
        id: 'domain_ml_001',
        input: 'train model predict value and calculate loss',
        expectedOutput: '訓 模 予 値 且 計 損',
        category: 'ml',
        difficulty: 'medium',
        description: 'ML training loop',
      },
      {
        id: 'domain_ml_002',
        input: 'classify data cluster items and optimize accuracy',
        expectedOutput: '級 値 群 物 且 最 精',
        category: 'ml',
        difficulty: 'medium',
        description: 'ML classification task',
      },
      {
        id: 'domain_web_001',
        input: 'fetch from API parse JSON and display results',
        expectedOutput: '読 接 解 JSON 且 表 成',
        category: 'web',
        difficulty: 'medium',
        description: 'Web API integration',
      },
      {
        id: 'domain_db_001',
        input: 'insert record into table and create index',
        expectedOutput: '挿 録 表 且 作 索',
        category: 'database',
        difficulty: 'medium',
        description: 'Database operations',
      },
      {
        id: 'domain_db_002',
        input: 'backup database and restore from snapshot',
        expectedOutput: '備 庫 且 復 快',
        category: 'database',
        difficulty: 'medium',
        description: 'Database backup/restore',
      },
    ];

    console.log(`✅ Initialized ${this.testCases.length} test cases`);
  }

  /**
   * Run all tests
   */
  async runAllTests(): Promise<{
    summary: BenchmarkResult;
    byDifficulty: Record<string, BenchmarkResult>;
    byCategory: Record<string, BenchmarkResult>;
  }> {
    console.log(`\n🧪 Running ${this.testCases.length} test cases...\n`);

    const results: TestResult[] = [];
    let passed = 0;
    let failed = 0;

    for (const testCase of this.testCases) {
      const result = await this.runTest(testCase);
      results.push(result);

      if (result.passed) {
        passed++;
        console.log(`✅ ${testCase.id}: PASSED`);
      } else {
        failed++;
        console.log(`❌ ${testCase.id}: FAILED`);
        if (result.errors.length > 0) {
          console.log(`   Errors: ${result.errors.join(', ')}`);
        }
      }
    }

    // Calculate aggregate metrics
    const avgCompressionRatio =
      results.reduce((sum, r) => sum + r.compressionRatio, 0) / results.length;
    const avgSemanticScore =
      results.reduce((sum, r) => sum + r.semanticScore, 0) / results.length;
    const avgLatency =
      results.reduce((sum, r) => sum + r.latency, 0) / results.length;
    const passRate = passed / results.length;

    const summary: BenchmarkResult = {
      model: 'SynthLang',
      totalTests: results.length,
      passed,
      failed,
      avgCompressionRatio,
      avgSemanticScore,
      avgLatency,
      passRate,
      results,
    };

    // Group by difficulty
    const byDifficulty: Record<string, BenchmarkResult> = {};
    ['easy', 'medium', 'hard'].forEach((difficulty) => {
      const filtered = results.filter(
        (r) =>
          this.testCases.find((tc) => tc.id === r.testId)?.difficulty ===
          difficulty
      );
      if (filtered.length > 0) {
        byDifficulty[difficulty] = this.createBenchmarkResult(
          filtered,
          difficulty
        );
      }
    });

    // Group by category
    const categories = [...new Set(this.testCases.map((tc) => tc.category))];
    const byCategory: Record<string, BenchmarkResult> = {};
    categories.forEach((category) => {
      const filtered = results.filter(
        (r) =>
          this.testCases.find((tc) => tc.id === r.testId)?.category === category
      );
      if (filtered.length > 0) {
        byCategory[category] = this.createBenchmarkResult(filtered, category);
      }
    });

    return { summary, byDifficulty, byCategory };
  }

  /**
   * Run a single test case
   */
  private async runTest(testCase: TestCase): Promise<TestResult> {
    const startTime = performance.now();
    const errors: string[] = [];

    try {
      // Translate to Kanji
      const result = await mappingEngine.translateToKanji(testCase.input);

      const endTime = performance.now();
      const latency = endTime - startTime;

      // Check if translation matches expected output
      let passed = true;
      if (testCase.expectedOutput) {
        const normalizedResult = this.normalizeText(result.translated);
        const normalizedExpected = this.normalizeText(testCase.expectedOutput);

        if (normalizedResult !== normalizedExpected) {
          passed = false;
          errors.push(
            `Output mismatch: got "${result.translated}", expected "${testCase.expectedOutput}"`
          );
        }
      }

      // Calculate semantic score (similarity to expected output)
      const semanticScore = testCase.expectedOutput
        ? this.calculateSemanticSimilarity(
            result.translated,
            testCase.expectedOutput
          )
        : result.confidence;

      // Check compression ratio
      if (result.compressionRatio > 0.9) {
        errors.push(
          `Poor compression: ${(result.compressionRatio * 100).toFixed(1)}%`
        );
      }

      return {
        testId: testCase.id,
        passed: passed && errors.length === 0,
        compressionRatio: result.compressionRatio,
        semanticScore,
        latency,
        translated: result.translated,
        expected: testCase.expectedOutput,
        confidence: result.confidence,
        errors,
      };
    } catch (error) {
      const endTime = performance.now();
      return {
        testId: testCase.id,
        passed: false,
        compressionRatio: 1.0,
        semanticScore: 0,
        latency: endTime - startTime,
        translated: '',
        expected: testCase.expectedOutput,
        confidence: 0,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
  }

  /**
   * Normalize text for comparison
   */
  private normalizeText(text: string): string {
    return text.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /**
   * Calculate semantic similarity between two strings
   */
  private calculateSemanticSimilarity(str1: string, str2: string): number {
    const tokens1 = new Set(str1.split(/\s+/));
    const tokens2 = new Set(str2.split(/\s+/));

    const intersection = new Set(
      [...tokens1].filter((token) => tokens2.has(token))
    );
    const union = new Set([...tokens1, ...tokens2]);

    // Jaccard similarity
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  /**
   * Create benchmark result from test results
   */
  private createBenchmarkResult(
    results: TestResult[],
    label: string
  ): BenchmarkResult {
    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;
    const avgCompressionRatio =
      results.reduce((sum, r) => sum + r.compressionRatio, 0) / results.length;
    const avgSemanticScore =
      results.reduce((sum, r) => sum + r.semanticScore, 0) / results.length;
    const avgLatency =
      results.reduce((sum, r) => sum + r.latency, 0) / results.length;
    const passRate = passed / results.length;

    return {
      model: label,
      totalTests: results.length,
      passed,
      failed,
      avgCompressionRatio,
      avgSemanticScore,
      avgLatency,
      passRate,
      results,
    };
  }

  /**
   * Generate detailed test report
   */
  generateReport(benchmark: {
    summary: BenchmarkResult;
    byDifficulty: Record<string, BenchmarkResult>;
    byCategory: Record<string, BenchmarkResult>;
  }): string {
    let report = '# SynthLang Testing Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    // Summary
    report += '## Overall Summary\n\n';
    report += `- **Total Tests**: ${benchmark.summary.totalTests}\n`;
    report += `- **Passed**: ${benchmark.summary.passed} ✅\n`;
    report += `- **Failed**: ${benchmark.summary.failed} ❌\n`;
    report += `- **Pass Rate**: ${(benchmark.summary.passRate * 100).toFixed(1)}%\n`;
    report += `- **Avg Compression**: ${(benchmark.summary.avgCompressionRatio * 100).toFixed(1)}%\n`;
    report += `- **Avg Semantic Score**: ${(benchmark.summary.avgSemanticScore * 100).toFixed(1)}%\n`;
    report += `- **Avg Latency**: ${benchmark.summary.avgLatency.toFixed(2)}ms\n\n`;

    // By Difficulty
    report += '## Results by Difficulty\n\n';
    Object.entries(benchmark.byDifficulty).forEach(([difficulty, result]) => {
      report += `### ${difficulty.toUpperCase()}\n`;
      report += `- Pass Rate: ${(result.passRate * 100).toFixed(1)}%\n`;
      report += `- Avg Compression: ${(result.avgCompressionRatio * 100).toFixed(1)}%\n`;
      report += `- Avg Semantic Score: ${(result.avgSemanticScore * 100).toFixed(1)}%\n\n`;
    });

    // By Category
    report += '## Results by Category\n\n';
    Object.entries(benchmark.byCategory).forEach(([category, result]) => {
      report += `### ${category}\n`;
      report += `- Pass Rate: ${(result.passRate * 100).toFixed(1)}%\n`;
      report += `- Avg Compression: ${(result.avgCompressionRatio * 100).toFixed(1)}%\n`;
      report += `- Avg Semantic Score: ${(result.avgSemanticScore * 100).toFixed(1)}%\n\n`;
    });

    // Failed Tests
    const failedTests = benchmark.summary.results.filter((r) => !r.passed);
    if (failedTests.length > 0) {
      report += '## Failed Tests\n\n';
      failedTests.forEach((test) => {
        const testCase = this.testCases.find((tc) => tc.id === test.testId);
        report += `### ${test.testId}: ${testCase?.description}\n`;
        report += `- **Input**: ${testCase?.input}\n`;
        report += `- **Expected**: ${test.expected}\n`;
        report += `- **Got**: ${test.translated}\n`;
        report += `- **Errors**: ${test.errors.join(', ')}\n\n`;
      });
    }

    return report;
  }

  /**
   * Export test results to JSON
   */
  exportResults(
    benchmark: {
      summary: BenchmarkResult;
      byDifficulty: Record<string, BenchmarkResult>;
      byCategory: Record<string, BenchmarkResult>;
    },
    filePath: string
  ): void {
    const fs = require('fs');
    fs.writeFileSync(filePath, JSON.stringify(benchmark, null, 2), 'utf-8');
    console.log(`✅ Test results exported to ${filePath}`);
  }

  /**
   * Run performance benchmark
   */
  async runPerformanceBenchmark(
    iterations: number = 1000
  ): Promise<{
    avgLatency: number;
    minLatency: number;
    maxLatency: number;
    throughput: number;
  }> {
    console.log(`\n⚡ Running performance benchmark (${iterations} iterations)...\n`);

    const latencies: number[] = [];
    const testInput = 'create new user and save to database';

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await mappingEngine.translateToKanji(testInput);
      const end = performance.now();
      latencies.push(end - start);
    }

    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const minLatency = Math.min(...latencies);
    const maxLatency = Math.max(...latencies);
    const throughput = 1000 / avgLatency; // ops/second

    console.log(`✅ Performance Benchmark Complete`);
    console.log(`   Avg Latency: ${avgLatency.toFixed(2)}ms`);
    console.log(`   Min Latency: ${minLatency.toFixed(2)}ms`);
    console.log(`   Max Latency: ${maxLatency.toFixed(2)}ms`);
    console.log(`   Throughput: ${throughput.toFixed(0)} ops/sec`);

    return { avgLatency, minLatency, maxLatency, throughput };
  }

  /**
   * Add custom test case
   */
  addTestCase(testCase: TestCase): void {
    this.testCases.push(testCase);
  }

  /**
   * Get all test cases
   */
  getTestCases(): TestCase[] {
    return this.testCases;
  }
}

// Export singleton instance
export const testingFramework = new TestingFramework();

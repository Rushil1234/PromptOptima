/**
 * API Route: Testing Framework
 * Run automated tests and benchmarks
 */

import { NextResponse } from 'next/server';
import { testingFramework } from '@/lib/testing-framework';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'test-cases') {
      const testCases = testingFramework.getTestCases();
      return NextResponse.json({ testCases });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: test-cases' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Testing framework error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, iterations } = body;

    if (action === 'run-tests') {
      console.log('🧪 Running all tests...');
      const results = await testingFramework.runAllTests();

      // Generate report
      const report = testingFramework.generateReport(results);

      // Save report to file
      const reportPath = path.join(process.cwd(), 'exports', 'test-report.md');
      const resultsPath = path.join(process.cwd(), 'exports', 'test-results.json');

      // Ensure exports directory exists
      const exportsDir = path.join(process.cwd(), 'exports');
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }

      fs.writeFileSync(reportPath, report, 'utf-8');
      fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf-8');

      return NextResponse.json({
        success: true,
        results,
        reportPath,
        resultsPath,
      });
    }

    if (action === 'performance-benchmark') {
      console.log('⚡ Running performance benchmark...');
      const benchmark = await testingFramework.runPerformanceBenchmark(
        iterations || 1000
      );

      return NextResponse.json({
        success: true,
        benchmark,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: run-tests or performance-benchmark' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Testing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

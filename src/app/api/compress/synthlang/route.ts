import { NextRequest, NextResponse } from 'next/server';
import { SynthLangEngine } from '@/lib/synthlang';
import { analyticsService } from '@/lib/analytics-service';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const engine = new SynthLangEngine();
    const compressed = engine.compress(prompt);
    const compressionRatio = engine.getCompressionRatio(prompt, compressed);
    const usedSymbols = engine.extractUsedSymbols(prompt, compressed);
    const estimatedTokenSavings = Math.ceil((prompt.length - compressed.length) / 4);

    // Track analytics
    const processingTime = Date.now() - startTime;
    const originalTokens = Math.ceil(prompt.length / 4);
    const compressedTokens = Math.ceil(compressed.length / 4);
    
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'synthlang',
      originalTokens,
      compressedTokens,
      compressionRatio,
      tokensSaved: estimatedTokenSavings,
      processingTime,
      semanticScore: 98,
      promptCategory: 'general',
      success: true
    });
    
    // Track symbol usage
    if (usedSymbols && usedSymbols.length > 0) {
      usedSymbols.forEach((symbolInfo: any) => {
        analyticsService.trackSymbolUsage(symbolInfo.symbol, symbolInfo.concept);
      });
    }

    return NextResponse.json({
      original: prompt,
      compressed,
      compressionRatio,
      estimatedTokenSavings,
      semanticScore: 98,
      usedSymbols,
    });
  } catch (error) {
    console.error('SynthLang compression error:', error);
    
    // Track failed compression
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'synthlang',
      originalTokens: 0,
      compressedTokens: 0,
      compressionRatio: 0,
      tokensSaved: 0,
      processingTime: Date.now() - startTime,
      semanticScore: 0,
      promptCategory: 'general',
      success: false,
      errorType: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return NextResponse.json(
      { error: 'Failed to compress prompt' },
      { status: 500 }
    );
  }
}

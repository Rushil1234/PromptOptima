/**
 * API Route: Ultra Compression
 * Maximum compression using all three strategies in sequence:
 * Hybrid → LLMLingua → SynthLang
 * 
 * Expected: 90-95% total compression
 */

import { NextRequest, NextResponse } from 'next/server';
import { ultraCompressor } from '@/lib/ultra-compressor';
import { analyticsService } from '@/lib/analytics-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt cannot be empty' },
        { status: 400 }
      );
    }

    if (prompt.length > 10000) {
      return NextResponse.json(
        { 
          error: 'Prompt too long for Ultra compression',
          suggestion: 'Ultra compression works best with prompts under 10,000 characters. Try splitting your prompt or use Hybrid compression instead.'
        },
        { status: 400 }
      );
    }

    console.log(`\n🚀 Starting ULTRA compression for ${prompt.length} character prompt...`);
    
    // Apply ultra compression (this may take 15-30 seconds)
    const startTime = Date.now();
    const result = await ultraCompressor.compress(prompt);
    const durationSeconds = (Date.now() - startTime) / 1000;
    const duration = durationSeconds.toFixed(1);

    console.log(`✅ Ultra compression completed in ${duration}s`);

    // Get detailed stats
    const stats = ultraCompressor.getCompressionStats(result);

    // Track analytics
    const originalTokens = Math.ceil(result.original.length / 4);
    const compressedTokens = Math.ceil(result.compressed.length / 4);
    
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'hybrid', // Track as hybrid since ultra is hybrid + more
      originalTokens,
      compressedTokens,
      compressionRatio: result.totalCompressionRatio,
      tokensSaved: result.totalTokensSaved,
      processingTime: Date.now() - startTime,
      semanticScore: result.overallSemanticScore,
      promptCategory: 'general',
      success: true
    });

    return NextResponse.json({
      original: result.original,
      compressed: result.compressed,
      totalCompressionRatio: result.totalCompressionRatio,
      totalTokensSaved: result.totalTokensSaved,
      overallSemanticScore: result.overallSemanticScore,
      processingTime: duration + 's',
      layers: {
        hybrid: {
          compressed: result.layers.hybrid.compressed,
          compressionRatio: result.layers.hybrid.ratio,
          tokensSaved: result.layers.hybrid.tokensSaved,
          semanticScore: result.layers.hybrid.semanticScore,
        },
        llmlingua: {
          compressed: result.layers.llmlingua.compressed,
          compressionRatio: result.layers.llmlingua.ratio,
          tokensSaved: result.layers.llmlingua.tokensSaved,
          semanticScore: result.layers.llmlingua.semanticScore,
        },
        synthlang: {
          compressed: result.layers.synthlang.compressed,
          compressionRatio: result.layers.synthlang.ratio,
          tokensSaved: result.layers.synthlang.tokensSaved,
          symbolsUsed: result.layers.synthlang.symbolsUsed,
        },
      },
      compressionJourney: result.compressionJourney,
      stats: stats,
      warning: durationSeconds > 20 ? 'Ultra compression took longer than expected. Consider using Hybrid for faster results.' : undefined,
    });
  } catch (error) {
    console.error('Ultra compression error:', error);
    
    // Track failed compression
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'hybrid',
      originalTokens: 0,
      compressedTokens: 0,
      compressionRatio: 0,
      tokensSaved: 0,
      processingTime: 0,
      semanticScore: 0,
      promptCategory: 'general',
      success: false,
      errorType: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return NextResponse.json(
      {
        error: 'Failed to compress prompt with Ultra strategy',
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Ultra compression is very intensive. Try using Hybrid or LLMLingua for better reliability.'
      },
      { status: 500 }
    );
  }
}

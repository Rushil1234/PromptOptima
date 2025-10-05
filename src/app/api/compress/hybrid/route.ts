/**
 * API Route: Hybrid Semantic Compression
 * Multi-layer compression combining structural, semantic, contextual, and format optimization
 */

import { NextRequest, NextResponse } from 'next/server';
import { hybridCompressor } from '@/lib/hybrid-compressor';
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

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt cannot be empty' },
        { status: 400 }
      );
    }

    // Apply hybrid semantic compression with AI deep learning pass
    const result = await hybridCompressor.compress(prompt, true);

    // Track analytics
    const processingTime = Date.now() - startTime;
    const originalTokens = Math.ceil(result.original.length / 4);
    const compressedTokens = Math.ceil(result.compressed.length / 4);
    
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'hybrid',
      originalTokens,
      compressedTokens,
      compressionRatio: result.compressionRatio,
      tokensSaved: result.estimatedTokenSavings,
      processingTime,
      semanticScore: result.semanticScore,
      promptCategory: 'general',
      success: true
    });

    return NextResponse.json({
      original: result.original,
      compressed: result.compressed,
      compressionRatio: result.compressionRatio,
      estimatedTokenSavings: result.estimatedTokenSavings,
      semanticScore: result.semanticScore,
      layers: {
        structural: {
          compressionRatio: result.layers.structural.ratio,
          removedCount: result.layers.structural.removed.length,
          removed: result.layers.structural.removed.slice(0, 10), // Limit for response size
        },
        semantic: {
          compressionRatio: result.layers.semantic.ratio,
          mergedCount: result.layers.semantic.merged.length,
          merged: result.layers.semantic.merged.slice(0, 10), // Limit for response size
        },
        contextual: {
          preservedCount: result.layers.contextual.preserved.length,
          relationshipsCount: result.layers.contextual.relationships.length,
          preserved: result.layers.contextual.preserved.slice(0, 10),
          relationships: result.layers.contextual.relationships.slice(0, 10),
        },
        format: {
          compressionRatio: result.layers.format.ratio,
          optimizationCount: result.layers.format.optimizations.length,
          optimizations: result.layers.format.optimizations.slice(0, 10),
        },
        deepLearning: result.layers.deepLearning ? {
          compressionRatio: result.layers.deepLearning.ratio,
          semanticPreservation: result.layers.deepLearning.semanticPreservation,
        } : undefined
      }
    });
  } catch (error) {
    console.error('Hybrid compression error:', error);
    
    // Track failed compression
    analyticsService.trackCompression({
      timestamp: Date.now(),
      strategy: 'hybrid',
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
      {
        error: 'Failed to compress prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

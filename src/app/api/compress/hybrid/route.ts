/**
 * API Route: Hybrid Semantic Compression
 * Multi-layer compression combining structural, semantic, contextual, and format optimization
 */

import { NextRequest, NextResponse } from 'next/server';
import { hybridCompressor } from '@/lib/hybrid-compressor';

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

    // Apply hybrid semantic compression
    const result = hybridCompressor.compress(prompt);

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
        }
      }
    });
  } catch (error) {
    console.error('Hybrid compression error:', error);
    return NextResponse.json(
      {
        error: 'Failed to compress prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

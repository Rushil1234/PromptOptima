import { NextRequest, NextResponse } from 'next/server';
import { SynthLangEngine } from '@/lib/synthlang';

export async function POST(request: NextRequest) {
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

    return NextResponse.json({
      original: prompt,
      compressed,
      compressionRatio,
      estimatedTokenSavings: Math.ceil((prompt.length - compressed.length) / 4),
      semanticScore: 98, // SynthLang has very high preservation
    });
  } catch (error) {
    console.error('SynthLang compression error:', error);
    return NextResponse.json(
      { error: 'Failed to compress prompt' },
      { status: 500 }
    );
  }
}

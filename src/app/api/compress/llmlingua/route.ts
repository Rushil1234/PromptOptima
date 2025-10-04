import { NextRequest, NextResponse } from 'next/server';
import { LLMLinguaEngine } from '@/lib/llmlingua';

export async function POST(request: NextRequest) {
  try {
    const { prompt, targetRatio = 0.5 } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const engine = new LLMLinguaEngine();
    const result = await engine.compress(prompt, targetRatio);

    return NextResponse.json(result);
  } catch (error) {
    console.error('LLMLingua compression error:', error);
    return NextResponse.json(
      { error: 'Failed to compress prompt' },
      { status: 500 }
    );
  }
}

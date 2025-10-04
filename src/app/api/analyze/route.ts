import { NextRequest, NextResponse } from 'next/server';
import { LLMLinguaEngine } from '@/lib/llmlingua';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const engine = new LLMLinguaEngine();
    const analysis = await engine.analyzePrompt(prompt);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Prompt analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze prompt' },
      { status: 500 }
    );
  }
}

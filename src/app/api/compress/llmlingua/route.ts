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

    // Check prompt length
    if (prompt.length > 10000) {
      return NextResponse.json(
        { 
          error: 'Prompt too long', 
          details: `Your prompt is ${prompt.length} characters. LLMLingua works best with prompts under 10,000 characters. Consider using Hybrid or SynthLang compression for very large prompts.`,
          suggestion: 'Try splitting your prompt into smaller chunks or use Hybrid compression instead.'
        },
        { status: 400 }
      );
    }

    const engine = new LLMLinguaEngine();
    
    // Set a timeout for the compression
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Compression timeout after 30 seconds')), 30000)
    );

    const result = await Promise.race([
      engine.compress(prompt, targetRatio),
      timeoutPromise
    ]) as any;

    return NextResponse.json(result);
  } catch (error) {
    console.error('LLMLingua compression error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { 
          error: 'Compression timeout', 
          details: 'Your prompt took too long to compress. This usually happens with very large or complex prompts.',
          suggestion: 'Try using Hybrid compression for faster results, or break your prompt into smaller parts.'
        },
        { status: 408 }
      );
    }
    
    if (errorMessage.includes('API key') || errorMessage.includes('404')) {
      return NextResponse.json(
        { 
          error: 'API Configuration Error',
          details: 'Google Gemini API key is missing or invalid. Please add GOOGLE_GENAI_API_KEY to your .env.local file.',
          suggestion: 'Get a free API key at https://aistudio.google.com/app/apikey'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to compress prompt',
        details: errorMessage,
        suggestion: 'Try reducing the prompt size or using a different compression strategy.'
      },
      { status: 500 }
    );
  }
}

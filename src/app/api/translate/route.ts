/**
 * API Route: Bidirectional Translation
 * Handles English ↔ Kanji conversion
 */

import { NextResponse } from 'next/server';
import { mappingEngine } from '@/lib/mapping-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, direction, context } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    let result;

    if (direction === 'to-kanji' || !direction) {
      // English → Kanji (compress)
      result = await mappingEngine.translateToKanji(text, context);
    } else if (direction === 'to-english') {
      // Kanji → English (decompress)
      result = await mappingEngine.translateToEnglish(text, context);
    } else {
      return NextResponse.json(
        { error: 'Invalid direction. Use: to-kanji or to-english' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const param = searchParams.get('param');

    if (action === 'suggestions' && param) {
      const suggestions = mappingEngine.getSuggestions(param, 10);
      return NextResponse.json({ suggestions });
    }

    if (action === 'symbol-info' && param) {
      const info = mappingEngine.getSymbolInfo(param);
      return NextResponse.json({ info });
    }

    if (action === 'validate' && param) {
      const validation = mappingEngine.validateSynthLang(param);
      return NextResponse.json({ validation });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Mapping engine error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

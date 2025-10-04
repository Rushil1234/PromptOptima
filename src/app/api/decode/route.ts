/**
 * API Route: Decode SynthLang Symbols
 * Decodes compressed SynthLang text back to natural language
 */

import { NextRequest, NextResponse } from 'next/server';
import { synthLangDecoder } from '@/lib/synthlang-decoder';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    // Decode the text
    const decoded = synthLangDecoder.decode(text);

    // Get detailed symbol information
    const symbolsFound = synthLangDecoder.getSymbolDetails(text);

    // Calculate expansion ratio
    const originalLength = text.length;
    const decodedLength = decoded.length;
    const expansionRatio = originalLength > 0 
      ? Math.round((decodedLength / originalLength) * 100) 
      : 0;

    // Get symbol analysis
    const analysis = synthLangDecoder.analyzeSymbols(text);

    return NextResponse.json({
      original: text,
      decoded,
      symbolsFound,
      expansionRatio,
      analysis: {
        totalSymbols: analysis.totalSymbols,
        categories: analysis.categories,
        coveragePercent: analysis.coveragePercent
      },
      decodingHint: synthLangDecoder.generateDecodingHint(text)
    });
  } catch (error) {
    console.error('Decode error:', error);
    return NextResponse.json(
      {
        error: 'Failed to decode text',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return the full symbol dictionary
  try {
    const allSymbols = synthLangDecoder.getAllSymbols();
    const dictionaryPrompt = synthLangDecoder.generateDictionaryPrompt();

    return NextResponse.json({
      totalSymbols: allSymbols.length,
      symbols: allSymbols,
      dictionaryPrompt,
      categories: [...new Set(allSymbols.map(s => s.category))]
    });
  } catch (error) {
    console.error('Dictionary retrieval error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve dictionary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

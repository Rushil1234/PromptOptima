import { NextRequest, NextResponse } from 'next/server';
import { spellChecker } from '@/lib/spell-checker';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await spellChecker.check(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Spell check error:', error);
    return NextResponse.json(
      { error: 'Failed to check spelling' },
      { status: 500 }
    );
  }
}

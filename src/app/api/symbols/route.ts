import { NextRequest, NextResponse } from 'next/server';
import { SynthLangEngine, SYNTHLANG_SYMBOLS } from '@/lib/synthlang';

export async function GET(request: NextRequest) {
  try {
    const engine = new SynthLangEngine();
    const categories = engine.getCategories();

    const symbolsByCategory = categories.reduce((acc, category) => {
      acc[category] = engine.getSymbolsByCategory(category);
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      symbols: SYNTHLANG_SYMBOLS,
      categories,
      symbolsByCategory,
    });
  } catch (error) {
    console.error('Symbols fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch symbols' },
      { status: 500 }
    );
  }
}

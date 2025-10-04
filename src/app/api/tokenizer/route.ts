/**
 * API Route: Export Tokenizer Vocabulary
 * Generates vocabulary files for LLM training
 */

import { NextResponse } from 'next/server';
import { tokenizer } from '@/lib/tokenizer';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    const outputDir = path.join(process.cwd(), 'exports');

    switch (format) {
      case 'json':
        const vocab = tokenizer.exportVocabulary();
        return NextResponse.json(vocab);

      case 'huggingface':
        tokenizer.exportToHuggingFace(path.join(outputDir, 'huggingface'));
        return NextResponse.json({
          success: true,
          message: 'HuggingFace tokenizer exported',
          path: path.join(outputDir, 'huggingface'),
        });

      case 'sentencepiece':
        const spPath = path.join(outputDir, 'sentencepiece.vocab');
        tokenizer.exportToSentencePiece(spPath);
        return NextResponse.json({
          success: true,
          message: 'SentencePiece vocabulary exported',
          path: spPath,
        });

      case 'stats':
        const stats = tokenizer.getStats();
        return NextResponse.json(stats);

      default:
        return NextResponse.json(
          { error: 'Invalid format. Use: json, huggingface, sentencepiece, or stats' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tokenizer export error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, count } = body;

    if (action === 'training-dataset') {
      const outputPath = path.join(process.cwd(), 'exports', 'training-dataset.jsonl');
      tokenizer.exportTrainingDataset(outputPath, count || 10000);

      return NextResponse.json({
        success: true,
        message: 'Training dataset exported',
        path: outputPath,
        count: count || 10000,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Tokenizer action error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

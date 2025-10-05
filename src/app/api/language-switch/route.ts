import { NextRequest, NextResponse } from 'next/server';
import { languageRouter } from '@/lib/language-router';
import { languageTranslator } from '@/lib/language-translator';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    // Classify the task
    const routing = languageRouter.classifyTask(text);

    // Translate to optimal language
    let translatedText = text;
    let backTranslation = text;
    
    if (routing.optimalLanguage !== 'english' && routing.confidence > 0.7) {
      const translation = await languageTranslator.translateTo(
        text,
        routing.optimalLanguage
      );
      translatedText = translation.translatedText;
      
      // Back-translate to English for verification
      backTranslation = await languageTranslator.translateToEnglish(
        translatedText,
        routing.optimalLanguage as any
      );
    }

    // Calculate token savings
    const originalTokens = Math.ceil(text.length / 4);
    const translatedTokens = Math.ceil(translatedText.length / 4);
    const tokensSaved = originalTokens - translatedTokens;
    const actualReduction = ((tokensSaved / originalTokens) * 100).toFixed(1);

    // Get capabilities for the selected language
    const allCapabilities = languageRouter.getLanguageCapabilities();
    const selectedCapabilities = allCapabilities.find(
      cap => cap.language === routing.optimalLanguage
    );

    return NextResponse.json({
      originalText: text,
      translatedText,
      backTranslation,
      language: routing.optimalLanguage,
      taskType: routing.taskType,
      confidence: routing.confidence,
      originalTokens,
      translatedTokens,
      tokensSaved,
      tokenReduction: `${actualReduction}%`,
      expectedReduction: `${(routing.expectedTokenReduction * 100).toFixed(1)}%`,
      languageCapabilities: selectedCapabilities
    });
  } catch (error) {
    console.error('Language switching error:', error);
    return NextResponse.json(
      { error: 'Failed to process language switching', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

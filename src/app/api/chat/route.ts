import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/lib/genkit';
import { languageRouter } f    const response = await ai.generate({
      model: 'gemini-1.5-flash-latest',
      prompt: fullPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });ib/language-router';
import { languageTranslator } from '@/lib/language-translator';
import { SynthLangEngine } from '@/lib/synthlang';
import { spellChecker } from '@/lib/spell-checker';
import { synthLangDecoder } from '@/lib/synthlang-decoder';

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      useSynthLang = true,
      useLanguageSwitching = true,
      useSpellCheck = true,
      history = []
    } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    let processedMessage = message;
    let spellCorrected = false;
    let originalPrompt = message;

    // Step 1: Spell check
    if (useSpellCheck) {
      const spellCheckResult = await spellChecker.check(message);
      if (spellCheckResult.hasErrors) {
        processedMessage = spellCheckResult.correctedText;
        spellCorrected = true;
      }
    }

    // Step 2: Language routing (if enabled)
    let language = 'english';
    let taskType = 'general';
    let translatedPrompt = processedMessage;
    let languageTokensSaved = 0;

    let routingReasoning = '';
    
    if (useLanguageSwitching) {
      const routing = languageRouter.classifyTask(processedMessage);
      
      // Lower threshold to 0.3 to ensure Chinese is used for math problems
      if (routing.optimalLanguage !== 'english' && routing.confidence > 0.3) {
        language = routing.optimalLanguage;
        taskType = routing.taskType;
        routingReasoning = routing.reasoning;
        
        console.log(`🌍 Language Routing: ${taskType} task detected`);
        console.log(`   → Using ${routing.optimalLanguage} (confidence: ${routing.confidence.toFixed(2)})`);
        console.log(`   → Reasoning: ${routing.reasoning}`);
        console.log(`   → Expected reduction: ${routing.expectedTokenReduction}%`);

        
        // Translate to optimal language
        const translation = await languageTranslator.translateTo(
          processedMessage,
          routing.optimalLanguage
        );
        
        translatedPrompt = translation.translatedText;
        languageTokensSaved = Math.floor(
          (processedMessage.length - translation.translatedText.length) * 0.25
        );
      }
    }

    // Step 3: SynthLang compression (if enabled)
    let compressedPrompt = translatedPrompt;
    let compressionRatio = 0;
    let synthLangTokensSaved = 0;

    if (useSynthLang) {
      const engine = new SynthLangEngine();
      compressedPrompt = engine.compress(translatedPrompt);
      compressionRatio = engine.getCompressionRatio(translatedPrompt, compressedPrompt);
      synthLangTokensSaved = Math.floor(
        (translatedPrompt.length - compressedPrompt.length) * 0.25
      );
    }

    // Step 4: Decode SynthLang symbols if present (middleware decoding)
    let decodedPrompt = compressedPrompt;
    let usedSymbols: Array<{ symbol: string; concept: string }> = [];
    let dictionaryContext = '';

    if (synthLangDecoder.containsSymbols(compressedPrompt)) {
      // Decode the compressed prompt back to natural language
      decodedPrompt = synthLangDecoder.decode(compressedPrompt);
      
      // Get detailed symbol information
      const symbolDetails = synthLangDecoder.getSymbolDetails(compressedPrompt);
      usedSymbols = symbolDetails.map(s => ({
        symbol: s.symbol,
        concept: s.concept
      }));

      // Generate lightweight decoding hint for the LLM
      dictionaryContext = synthLangDecoder.generateDecodingHint(compressedPrompt);
    }

    // Step 5: Generate response using Gemini with decoded prompt
    // ALWAYS instruct AI to respond in English for consistent user experience
    const systemPrompt = `You are a helpful, knowledgeable AI assistant. 
Provide clear, concise, and accurate responses.
Always respond in English, regardless of the input language.`;

    const contextPrompt = history.length > 0
      ? `Previous conversation:\n${history.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}\n\n`
      : '';

    // Include dictionary context if symbols were decoded
    const fullPrompt = `${systemPrompt}\n\n${dictionaryContext}${contextPrompt}User: ${decodedPrompt}`;

    const response = await ai.generate({
      model: 'gemini-2.5-flash',
      prompt: fullPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    let responseText = response.text || 'Sorry, I could not generate a response.';

    // Calculate total tokens saved
    const totalTokensSaved = languageTokensSaved + synthLangTokensSaved;

    return NextResponse.json({
      response: responseText, // Always in English (instructed in system prompt)
      originalPrompt,
      translatedPrompt: language !== 'english' ? translatedPrompt : undefined,
      compressedPrompt: useSynthLang ? compressedPrompt : undefined,
      decodedPrompt: useSynthLang && decodedPrompt !== compressedPrompt ? decodedPrompt : undefined,
      usedSymbols: usedSymbols.length > 0 ? usedSymbols : undefined,
      language,
      taskType,
      routingReasoning: routingReasoning || undefined,
      tokensSaved: totalTokensSaved,
      compressionRatio,
      spellCorrected,
      metadata: {
        languageTokensSaved,
        synthLangTokensSaved,
        symbolsDecoded: usedSymbols.length,
        usedOptimizations: {
          spellCheck: useSpellCheck && spellCorrected,
          languageSwitching: useLanguageSwitching && language !== 'english',
          synthLang: useSynthLang && compressionRatio > 0,
          symbolDecoding: usedSymbols.length > 0
        }
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

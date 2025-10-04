// Simple Gemini AI wrapper without Genkit
// We'll use the Google AI SDK directly for a cleaner implementation

interface GenerateOptions {
  model: string;
  prompt: string;
  config?: {
    temperature?: number;
    maxOutputTokens?: number;
  };
}

interface GenerateResponse {
  text: string;
}

// Mock AI instance that uses fetch to call Gemini API
export const ai = {
  async generate(options: GenerateOptions): Promise<GenerateResponse> {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GOOGLE_GENAI_API_KEY environment variable is required');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${options.model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: options.prompt
          }]
        }],
        generationConfig: {
          temperature: options.config?.temperature ?? 0.7,
          maxOutputTokens: options.config?.maxOutputTokens ?? 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      throw new Error(`Gemini API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return { text };
  },
};

// Model names for Gemini (updated to 2.5 models)
export const gemini15Flash = 'gemini-2.5-flash';
export const gemini15Pro = 'gemini-2.5-pro-preview-05-06';

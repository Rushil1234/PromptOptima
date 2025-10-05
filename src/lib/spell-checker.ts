/**
 * Spell Check Service
 * Client-side spell checking before prompt processing
 */

export interface SpellCheckResult {
  hasErrors: boolean;
  corrections: Array<{
    word: string;
    suggestions: string[];
    position: number;
  }>;
  correctedText: string;
}

export class SpellChecker {
  private commonMisspellings: Map<string, string>;

  constructor() {
    // Common programming/technical term corrections
    this.commonMisspellings = new Map([
      ['plese', 'please'],
      ['pls', 'please'],
      ['databse', 'database'],
      ['databas', 'database'],
      ['datbase', 'database'],
      ['databae', 'database'],
      ['functon', 'function'],
      ['funtion', 'function'],
      ['funciton', 'function'],
      ['fucntion', 'function'],
      ['valdiate', 'validate'],
      ['valdate', 'validate'],
      ['vailidate', 'validate'],
      ['retreive', 'retrieve'],
      ['retrive', 'retrieve'],
      ['recieve', 'receive'],
      ['recive', 'receive'],
      ['querry', 'query'],
      ['qeury', 'query'],
      ['responce', 'response'],
      ['respons', 'response'],
      ['reponse', 'response'],
      ['seperator', 'separator'],
      ['seperate', 'separate'],
      ['seprrate', 'separate'],
      ['occured', 'occurred'],
      ['ocurred', 'occurred'],
      ['lenght', 'length'],
      ['wierd', 'weird'],
      ['reccomend', 'recommend'],
      ['recomend', 'recommend'],
      ['definately', 'definitely'],
      ['defintely', 'definitely'],
      ['acheive', 'achieve'],
      ['achive', 'achieve'],
      ['beleive', 'believe'],
      ['belive', 'believe'],
      ['sucessful', 'successful'],
      ['succesful', 'successful'],
      ['sucessfull', 'successful'],
      ['emmediately', 'immediately'],
      ['imediately', 'immediately'],
      ['enviroment', 'environment'],
      ['enviornment', 'environment'],
      ['aplication', 'application'],
      ['applicaton', 'application'],
      ['authentification', 'authentication'],
      ['athentication', 'authentication'],
      ['autorization', 'authorization'],
      ['authorizaton', 'authorization'],
      ['implmentation', 'implementation'],
      ['implementaton', 'implementation'],
      ['confguration', 'configuration'],
      ['configuraton', 'configuration'],
      ['conncetion', 'connection'],
      ['conection', 'connection'],
      ['refrence', 'reference'],
      ['referance', 'reference'],
      ['performace', 'performance'],
      ['preformance', 'performance'],
    ]);
  }

  /**
   * Check text for spelling errors
   */
  async check(text: string): Promise<SpellCheckResult> {
    const words = this.extractWords(text);
    const corrections: SpellCheckResult['corrections'] = [];
    let correctedText = text;

    for (const { word, position } of words) {
      const lowerWord = word.toLowerCase();
      
      // Check against common misspellings
      if (this.commonMisspellings.has(lowerWord)) {
        const suggestion = this.commonMisspellings.get(lowerWord)!;
        corrections.push({
          word,
          suggestions: [suggestion],
          position
        });

        // Apply correction
        correctedText = correctedText.replace(
          new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'g'),
          suggestion
        );
      }
    }

    return {
      hasErrors: corrections.length > 0,
      corrections,
      correctedText
    };
  }

  /**
   * Auto-correct text
   */
  async autoCorrect(text: string): Promise<string> {
    const result = await this.check(text);
    return result.correctedText;
  }

  /**
   * Extract words with positions from text
   */
  private extractWords(text: string): Array<{ word: string; position: number }> {
    const words: Array<{ word: string; position: number }> = [];
    const wordRegex = /\b[a-zA-Z]+\b/g;
    let match;

    while ((match = wordRegex.exec(text)) !== null) {
      words.push({
        word: match[0],
        position: match.index
      });
    }

    return words;
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Add custom misspelling corrections
   */
  addCorrection(misspelling: string, correction: string): void {
    this.commonMisspellings.set(misspelling.toLowerCase(), correction);
  }

  /**
   * Get all known misspellings
   */
  getKnownMisspellings(): Array<{ misspelling: string; correction: string }> {
    return Array.from(this.commonMisspellings.entries()).map(([misspelling, correction]) => ({
      misspelling,
      correction
    }));
  }
}

export const spellChecker = new SpellChecker();

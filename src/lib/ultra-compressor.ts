/**
 * Ultra Compression Engine
 * Maximum compression by chaining all three strategies:
 * 1. Hybrid Semantic (70-85%) - Remove redundancy, optimize structure
 * 2. LLMLingua (60-80%) - AI-powered semantic compression
 * 3. SynthLang (80-90%) - Symbol-based ultra compression
 * 
 * Expected Total Compression: 90-95% with multi-layer optimization
 * Target: Maximum token reduction while maintaining decodability
 */

import { hybridCompressor, HybridCompressionResult } from './hybrid-compressor';
import { LLMLinguaEngine } from './llmlingua';
import { SynthLangEngine } from './synthlang';

export interface UltraCompressionResult {
  original: string;
  compressed: string;
  totalCompressionRatio: number;
  layers: {
    hybrid: {
      compressed: string;
      ratio: number;
      tokensSaved: number;
      semanticScore: number;
    };
    llmlingua: {
      compressed: string;
      ratio: number;
      tokensSaved: number;
      semanticScore: number;
    };
    synthlang: {
      compressed: string;
      ratio: number;
      tokensSaved: number;
      symbolsUsed: number;
    };
  };
  totalTokensSaved: number;
  overallSemanticScore: number;
  compressionJourney: Array<{
    stage: string;
    length: number;
    ratio: number;
  }>;
}

export class UltraCompressor {
  private hybridEngine = hybridCompressor;
  private llmlinguaEngine = new LLMLinguaEngine();
  private synthlangEngine = new SynthLangEngine();

  /**
   * Apply ultra compression using all three strategies in sequence
   * Pipeline: Original → Hybrid → LLMLingua → SynthLang → Ultra Compressed
   */
  async compress(prompt: string): Promise<UltraCompressionResult> {
    const original = prompt;
    const compressionJourney: Array<{ stage: string; length: number; ratio: number }> = [];

    // Track starting point
    compressionJourney.push({
      stage: 'Original',
      length: original.length,
      ratio: 0
    });

    // ===== LAYER 1: Hybrid Semantic Compression =====
    console.log('🔄 Ultra Layer 1: Hybrid Semantic Compression...');
    const hybridResult = await this.hybridEngine.compress(original, true);
    const hybridCompressed = hybridResult.compressed;
    const hybridRatio = hybridResult.compressionRatio;
    const hybridTokensSaved = hybridResult.estimatedTokenSavings;
    const hybridSemanticScore = hybridResult.semanticScore;

    compressionJourney.push({
      stage: 'After Hybrid',
      length: hybridCompressed.length,
      ratio: hybridRatio
    });

    console.log(`✅ Hybrid: ${original.length} → ${hybridCompressed.length} chars (${hybridRatio.toFixed(1)}% compression)`);

    // ===== LAYER 2: LLMLingua Compression =====
    console.log('🔄 Ultra Layer 2: LLMLingua AI Compression...');
    let llmlinguaCompressed = hybridCompressed;
    let llmlinguaRatio = 0;
    let llmlinguaTokensSaved = 0;
    let llmlinguaSemanticScore = 95;

    try {
      const llmlinguaResult = await this.llmlinguaEngine.compress(hybridCompressed, 0.5);
      
      // Validate that LLMLingua actually compressed something
      if (llmlinguaResult.compressed && llmlinguaResult.compressed.length > 0 && llmlinguaResult.compressed.length < hybridCompressed.length) {
        llmlinguaCompressed = llmlinguaResult.compressed;
        llmlinguaRatio = llmlinguaResult.compressionRatio;
        llmlinguaTokensSaved = llmlinguaResult.estimatedTokenSavings;
        llmlinguaSemanticScore = llmlinguaResult.semanticScore;
        
        compressionJourney.push({
          stage: 'After LLMLingua',
          length: llmlinguaCompressed.length,
          ratio: ((original.length - llmlinguaCompressed.length) / original.length) * 100
        });
        
        console.log(`✅ LLMLingua: ${hybridCompressed.length} → ${llmlinguaCompressed.length} chars (${llmlinguaRatio.toFixed(1)}% compression)`);
      } else {
        console.warn('⚠️ LLMLingua returned invalid result, skipping this layer');
        compressionJourney.push({
          stage: 'LLMLingua (Skipped)',
          length: hybridCompressed.length,
          ratio: ((original.length - hybridCompressed.length) / original.length) * 100
        });
      }
    } catch (error) {
      console.error('⚠️ LLMLingua compression failed:', error instanceof Error ? error.message : 'Unknown error');
      console.log('📝 Continuing with Hybrid result only');
      compressionJourney.push({
        stage: 'LLMLingua (Failed)',
        length: hybridCompressed.length,
        ratio: ((original.length - hybridCompressed.length) / original.length) * 100
      });
    }

    // ===== LAYER 3: SynthLang Symbol Compression =====
    console.log('🔄 Ultra Layer 3: SynthLang Symbol Compression...');
    const synthlangCompressed = this.synthlangEngine.compress(llmlinguaCompressed);
    const synthlangRatio = this.synthlangEngine.getCompressionRatio(llmlinguaCompressed, synthlangCompressed);
    const synthlangTokensSaved = Math.floor((llmlinguaCompressed.length - synthlangCompressed.length) * 0.25);
    
    // Count symbols used
    const symbolsUsed = (synthlangCompressed.match(/[一-龯々〆〤]/g) || []).length;

    compressionJourney.push({
      stage: 'Final (SynthLang)',
      length: synthlangCompressed.length,
      ratio: ((original.length - synthlangCompressed.length) / original.length) * 100
    });

    console.log(`✅ SynthLang: ${llmlinguaCompressed.length} → ${synthlangCompressed.length} chars (${synthlangRatio.toFixed(1)}% compression)`);

    // ===== CALCULATE TOTALS =====
    const totalCompressionRatio = ((original.length - synthlangCompressed.length) / original.length) * 100;
    const totalTokensSaved = hybridTokensSaved + llmlinguaTokensSaved + synthlangTokensSaved;
    
    // Weighted semantic score (more weight on earlier stages)
    const overallSemanticScore = (
      hybridSemanticScore * 0.5 +
      llmlinguaSemanticScore * 0.35 +
      90 * 0.15 // SynthLang is mostly symbolic, assume 90% preservation
    );

    console.log(`\n🎉 ULTRA COMPRESSION COMPLETE:`);
    console.log(`   ${original.length} → ${synthlangCompressed.length} chars`);
    console.log(`   ${totalCompressionRatio.toFixed(1)}% total compression`);
    console.log(`   ${totalTokensSaved} tokens saved`);
    console.log(`   ${overallSemanticScore.toFixed(1)}% semantic preservation\n`);

    return {
      original,
      compressed: synthlangCompressed,
      totalCompressionRatio,
      layers: {
        hybrid: {
          compressed: hybridCompressed,
          ratio: hybridRatio,
          tokensSaved: hybridTokensSaved,
          semanticScore: hybridSemanticScore,
        },
        llmlingua: {
          compressed: llmlinguaCompressed,
          ratio: llmlinguaRatio,
          tokensSaved: llmlinguaTokensSaved,
          semanticScore: llmlinguaSemanticScore,
        },
        synthlang: {
          compressed: synthlangCompressed,
          ratio: synthlangRatio,
          tokensSaved: synthlangTokensSaved,
          symbolsUsed,
        },
      },
      totalTokensSaved,
      overallSemanticScore,
      compressionJourney,
    };
  }

  /**
   * Get compression statistics for analysis
   */
  getCompressionStats(result: UltraCompressionResult) {
    return {
      stages: result.compressionJourney,
      efficiency: {
        hybrid: result.layers.hybrid.ratio,
        llmlingua: result.layers.llmlingua.ratio,
        synthlang: result.layers.synthlang.ratio,
        total: result.totalCompressionRatio,
      },
      tokenSavings: {
        hybrid: result.layers.hybrid.tokensSaved,
        llmlingua: result.layers.llmlingua.tokensSaved,
        synthlang: result.layers.synthlang.tokensSaved,
        total: result.totalTokensSaved,
      },
      quality: {
        semanticScore: result.overallSemanticScore,
        symbolsUsed: result.layers.synthlang.symbolsUsed,
      },
    };
  }
}

// Export singleton instance
export const ultraCompressor = new UltraCompressor();

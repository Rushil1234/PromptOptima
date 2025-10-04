'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/GlassPanel';
import LoadingSpinner from '@/components/LoadingSpinner';
import MetricCard from '@/components/MetricCard';
import StrategyCard from '@/components/StrategyCard';
import SymbolReference from '@/components/SymbolReference';

type Strategy = 'llmlingua' | 'synthlang' | 'hybrid';

interface CompressionResult {
  original: string;
  compressed: string;
  compressionRatio: number;
  estimatedTokenSavings: number;
  semanticScore: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [strategy, setStrategy] = useState<Strategy>('llmlingua');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [showSymbols, setShowSymbols] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<{
    recommendedStrategy: Strategy;
    reasoning: string;
    estimatedSavings: number;
  } | null>(null);

  // Parallax effect
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCompress = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setSuggestion(null);

    try {
      const endpoint =
        strategy === 'llmlingua'
          ? '/api/compress/llmlingua'
          : '/api/compress/synthlang';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, targetRatio: 0.5 }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Compression failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Compression error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to compress prompt';
      
      if (errorMessage.includes('API key') || errorMessage.includes('Not Found')) {
        setError(
          strategy === 'llmlingua'
            ? '🔑 API Key Required: LLMLingua needs a Google Gemini API key. Add GOOGLE_GENAI_API_KEY to your .env.local file. Get a free key at https://aistudio.google.com/app/apikey'
            : errorMessage
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Display suggestion and auto-select strategy
      setSuggestion({
        recommendedStrategy: data.recommendedStrategy,
        reasoning: data.reasoning,
        estimatedSavings: data.estimatedSavings,
      });
      setStrategy(data.recommendedStrategy);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze prompt';
      
      if (errorMessage.includes('API key') || errorMessage.includes('Not Found')) {
        setError('🔑 API Key Required: AI Suggest needs a Google Gemini API key. Add GOOGLE_GENAI_API_KEY to your .env.local file. Get a free key at https://aistudio.google.com/app/apikey');
      } else {
        setError(errorMessage);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <main className="min-h-screen relative">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-50" />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-sm font-semibold text-primary-400">AI-Powered Optimization</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-dark-50 mb-6 tracking-tight">
            LLM Optimizer
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Intelligent middleware for prompt compression using{' '}
            <span className="text-primary-400 font-semibold">dual-strategy optimization</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="badge bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
              ⚡ Up to 90% token reduction
            </span>
            <span className="badge bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
              🎯 95%+ semantic preservation
            </span>
            <span className="badge bg-accent-500/10 border-accent-500/20 text-accent-400">
              🚀 Instant compression
            </span>
          </div>
        </motion.div>

        {/* Strategy Selection */}
        <GlassPanel className="mb-8">
          <h2 className="text-2xl font-bold text-dark-50 mb-2">
            Select Optimization Strategy
          </h2>
          <p className="text-dark-400 mb-6">Choose the compression method that best fits your use case</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StrategyCard
              title="LLMLingua"
              description="General-purpose compression using AI-powered semantic analysis to remove non-essential words"
              icon="🧠"
              compression="60-80%"
              bestFor="Any prompt"
              selected={strategy === 'llmlingua'}
              onClick={() => setStrategy('llmlingua')}
            />
            <StrategyCard
              title="SynthLang"
              description="Symbolic language system using custom glyphs to represent complex concepts"
              icon="⟐"
              compression="80-90%"
              bestFor="Structured tasks"
              selected={strategy === 'synthlang'}
              onClick={() => setStrategy('synthlang')}
            />
          </div>
          <button
            onClick={() => setShowSymbols(!showSymbols)}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors font-semibold flex items-center gap-2"
          >
            <span>{showSymbols ? '▼' : '▶'}</span>
            {showSymbols ? 'Hide' : 'Show'} SynthLang Symbol Reference
          </button>
          {showSymbols && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <SymbolReference />
            </motion.div>
          )}
        </GlassPanel>

        {/* Input Section */}
        <GlassPanel className="mb-8">
          <h2 className="text-2xl font-bold text-dark-50 mb-2">Your Prompt</h2>
          <p className="text-dark-400 mb-4 text-sm">Enter the prompt you want to optimize and compress</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here... (e.g., 'Please analyze this text and provide a comprehensive summary with key points and insights about the main themes')"
            className="input-field h-48 resize-none font-normal"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleCompress}
              disabled={loading || !prompt.trim()}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Compress Prompt
                </>
              )}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !prompt.trim()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-400 border-t-dark-100 rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  AI Suggest Strategy
                </>
              )}
            </button>
          </div>
        </GlassPanel>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassPanel className="border-red-500/30 bg-red-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
                  <p className="text-dark-200 whitespace-pre-line leading-relaxed">{error}</p>
                  {error.includes('API key') && (
                    <div className="mt-4 p-4 bg-dark-800/50 rounded-lg border border-dark-700">
                      <p className="text-sm text-dark-300 mb-2 font-semibold">Quick Setup:</p>
                      <ol className="text-sm text-dark-400 space-y-1 list-decimal list-inside">
                        <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Google AI Studio</a></li>
                        <li>Generate a free API key</li>
                        <li>Add it to <code className="bg-dark-900 px-2 py-0.5 rounded text-primary-400">.env.local</code> file</li>
                        <li>Restart the dev server</li>
                      </ol>
                      <p className="text-xs text-dark-500 mt-3">💡 Tip: SynthLang works offline without an API key!</p>
                    </div>
                  )}
                  <button
                    onClick={() => setError(null)}
                    className="mt-4 text-sm text-red-400 hover:text-red-300 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* AI Suggestion Display */}
        {suggestion && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassPanel className="border-primary-500/30 bg-primary-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl">🤖</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">AI Recommendation</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-dark-400">Recommended Strategy:</span>
                      <div className="mt-1 inline-block">
                        <span className="badge bg-primary-500/20 border-primary-500/30 text-primary-300 text-base px-4 py-1.5">
                          {suggestion.recommendedStrategy.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-dark-400">Reasoning:</span>
                      <p className="text-dark-200 mt-1 leading-relaxed">{suggestion.reasoning}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-dark-400">Estimated Savings:</span>
                      <span className="text-emerald-400 font-bold text-lg ml-2">{suggestion.estimatedSavings}%</span>
                      <span className="text-dark-400 text-sm ml-1">token reduction</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSuggestion(null)}
                    className="mt-4 text-sm text-primary-400 hover:text-primary-300 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <GlassPanel className="mb-8">
            <LoadingSpinner
              size="lg"
              text="Optimizing your prompt with advanced compression algorithms..."
            />
          </GlassPanel>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                label="Compression Ratio"
                value={result.compressionRatio.toFixed(1)}
                suffix="%"
                icon="📉"
                color="success"
              />
              <MetricCard
                label="Tokens Saved"
                value={result.estimatedTokenSavings}
                icon="💾"
                color="info"
              />
              <MetricCard
                label="Semantic Preservation"
                value={result.semanticScore.toFixed(1)}
                suffix="%"
                icon="🎯"
                color="accent"
              />
            </div>

            {/* Compressed Output */}
            <GlassPanel>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-dark-50">
                    Compressed Prompt
                  </h2>
                  <p className="text-sm text-dark-400 mt-1">Ready to use in your LLM calls</p>
                </div>
                <button
                  onClick={() => copyToClipboard(result.compressed)}
                  className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                >
                  📋 Copy
                </button>
              </div>
              <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4 font-mono text-dark-100 text-sm leading-relaxed">
                {result.compressed}
              </div>
            </GlassPanel>

            {/* Comparison */}
            <GlassPanel>
              <h2 className="text-2xl font-bold text-dark-50 mb-6">
                Before & After Comparison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-dark-300">
                      Original
                    </h3>
                    <span className="text-xs text-dark-500">{result.original.length} characters</span>
                  </div>
                  <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4 h-48 overflow-y-auto scrollbar-thin text-dark-200 text-sm leading-relaxed">
                    {result.original}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-dark-300">
                      Compressed
                    </h3>
                    <span className="text-xs text-dark-500">{result.compressed.length} characters</span>
                  </div>
                  <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4 h-48 overflow-y-auto scrollbar-thin text-primary-300 text-sm leading-relaxed font-mono">
                    {result.compressed}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-dark-500 text-sm">
            <span>Built with</span>
            <span className="text-primary-400 font-semibold">Next.js</span>
            <span>•</span>
            <span className="text-primary-400 font-semibold">TypeScript</span>
            <span>•</span>
            <span className="text-primary-400 font-semibold">Tailwind CSS</span>
            <span>•</span>
            <span className="text-primary-400 font-semibold">Google Gemini</span>
          </div>
          <p className="text-dark-600 text-xs">
            Powered by LLMLingua compression and SynthLang symbolic optimization
          </p>
        </motion.footer>
      </div>
    </main>
  );
}

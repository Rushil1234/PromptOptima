'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/GlassPanel';
import LoadingSpinner from '@/components/LoadingSpinner';
import MetricCard from '@/components/MetricCard';
import StrategyCard from '@/components/StrategyCard';
import SymbolReference from '@/components/SymbolReference';
import Chatbot from '@/components/Chatbot';
import CopyButton from '@/components/CopyButton';
import { ToastContainer } from '@/components/Toast';
import Threads from '@/components/Threads';
import TypeText from '@/components/TypeText';
import DecryptedText from '@/components/DecryptedText';

type Strategy = 'llmlingua' | 'synthlang' | 'hybrid' | 'ultra';
type Tab = 'compress' | 'chat';

interface CompressionResult {
  original: string;
  compressed: string;
  compressionRatio: number;
  estimatedTokenSavings: number;
  semanticScore: number;
  usedSymbols?: Array<{
    symbol: string;
    concept: string;
    originalWords: string[];
  }>;
  layers?: {
    structural?: {
      compressionRatio: number;
      removedCount: number;
      removed: string[];
    };
    semantic?: {
      compressionRatio: number;
      mergedCount: number;
      merged: Array<{ original: string[]; merged: string }>;
    };
    contextual?: {
      preservedCount: number;
      relationshipsCount: number;
      preserved: string[];
      relationships: Array<{ from: string; to: string; type: string }>;
    };
    format?: {
      compressionRatio: number;
      optimizationCount: number;
      optimizations: Array<{ before: string; after: string }>;
    };
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('compress');
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
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>>([]);
  const [showSubheading, setShowSubheading] = useState(false);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

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
          : strategy === 'synthlang'
          ? '/api/compress/synthlang'
          : strategy === 'ultra'
          ? '/api/compress/ultra'
          : '/api/compress/hybrid';

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
            ? 'API Key Required: LLMLingua needs a Google Gemini API key. Add GOOGLE_GENAI_API_KEY to your .env.local file. Get a free key at https://aistudio.google.com/app/apikey'
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
        setError('API Key Required: AI Suggest needs a Google Gemini API key. Add GOOGLE_GENAI_API_KEY to your .env.local file. Get a free key at https://aistudio.google.com/app/apikey');
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
    <>
      {/* WebGL Threads Background - Smooth flowing lines with mouse interaction */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        isolation: 'isolate',
        backgroundColor: '#0a0a0a',
        willChange: 'transform',
        overflow: 'hidden'
      }}>
        <Threads
          color={[0.5, 0.2, 0.9]}  // Deep purple (RGB 0-1 scale)
          amplitude={2.5}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>

      <main className="min-h-screen relative" style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'transparent',
        minHeight: '100vh'
      }}>
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl" style={{
          backgroundColor: 'transparent'
        }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-400/20 rounded-full px-5 py-2.5 mb-8 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-primary-400 to-purple-400"></span>
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">AI-Powered Optimization</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <TypeText
              text="Prompt Optima"
              className="bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent"
              speed={80}
              delay={300}
              onComplete={() => setShowSubheading(true)}
            />
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 font-medium max-w-3xl mx-auto mb-10 leading-relaxed min-h-[3.5rem]">
            {showSubheading && (
              <>
                Intelligent middleware for prompt compression using{' '}
                <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  <DecryptedText
                    text="multi-strategy optimization"
                    speed={80}
                    delay={200}
                  />
                </span>
              </>
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20 text-emerald-300 backdrop-blur-xl">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Up to 95% token reduction
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 text-cyan-300 backdrop-blur-xl">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              95%+ semantic preservation
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-400/20 text-purple-300 backdrop-blur-xl">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M12 2l-4 4M12 2l4 4M5 12l14-7M19 12l-14 7"/>
              </svg>
              4 compression strategies
            </span>
          </div>
          <a
            href="/analytics"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
            <svg className="relative w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span className="relative">View Analytics Dashboard</span>
          </a>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 relative z-[30]"
        >
          <GlassPanel className="p-2 relative">
            <div className="flex gap-2 relative z-[2]">
              <button
                onClick={() => setActiveTab('compress')}
                className={`relative z-[3] flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'compress'
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                    : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                  <span>Compression Lab</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`relative z-[3] flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                    : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>AI Chat</span>
                </span>
              </button>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Compression Tab */}
        {activeTab === 'compress' && (
          <motion.div
            key="compress"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Strategy Selection */}
            <GlassPanel className="mb-8">
          <h2 className="text-2xl font-bold text-dark-50 mb-2">
            Select Optimization Strategy
          </h2>
          <p className="text-dark-400 mb-6">Choose the compression method that best fits your use case</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StrategyCard
              title="LLMLingua"
              description="General-purpose compression using AI-powered semantic analysis to remove non-essential words"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
              compression="60-80%"
              bestFor="Any prompt"
              selected={strategy === 'llmlingua'}
              onClick={() => setStrategy('llmlingua')}
            />
            <StrategyCard
              title="SynthLang"
              description="Symbolic language system using custom glyphs to represent complex concepts"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 15h6M12 9v6"/></svg>}
              compression="80-90%"
              bestFor="Structured tasks"
              selected={strategy === 'synthlang'}
              onClick={() => setStrategy('synthlang')}
            />
            <StrategyCard
              title="Hybrid Semantic"
              description="Enhanced multi-layer approach with AI-powered deep learning pass for maximum semantic preservation"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>}
              compression="70-85%"
              bestFor="Complex prompts"
              selected={strategy === 'hybrid'}
              onClick={() => setStrategy('hybrid')}
            />
            <StrategyCard
              title="Ultra"
              description="Maximum compression! Chains all three strategies: Hybrid → LLMLingua → SynthLang for ultimate token savings"
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
              compression="90-95%"
              bestFor="Maximum savings"
              selected={strategy === 'ultra'}
              onClick={() => setStrategy('ultra')}
            />
          </div>
          <button
            onClick={() => setShowSymbols(!showSymbols)}
            className="relative z-[30] text-sm text-primary-400 hover:text-primary-300 transition-colors font-semibold flex items-center gap-2 cursor-pointer pointer-events-auto"
            style={{ position: 'relative', zIndex: 30 }}
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
            className="input-field h-48 resize-none font-normal relative z-50"
            style={{ zIndex: 50 }}
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-4 relative z-50">
            <button
              onClick={handleCompress}
              disabled={loading || !prompt.trim()}
              className="btn-primary flex-1 flex items-center justify-center gap-2 relative z-50"
              style={{ zIndex: 50 }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Compress Prompt
                </>
              )}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !prompt.trim()}
              className="btn-secondary flex items-center justify-center gap-2 relative z-50"
              style={{ zIndex: 50 }}
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-400 border-t-dark-100 rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
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
                <svg className="flex-shrink-0 w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
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
                      <p className="text-xs text-dark-500 mt-3 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4M12 8h.01"/>
                        </svg>
                        Tip: SynthLang works offline without an API key!
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => setError(null)}
                    className="mt-4 text-sm text-red-400 hover:text-red-300 font-semibold relative z-50"
                    style={{ zIndex: 50 }}
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
                <svg className="flex-shrink-0 w-8 h-8 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
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
                    className="mt-4 text-sm text-primary-400 hover:text-primary-300 font-semibold relative z-50"
                    style={{ zIndex: 50 }}
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
                value={result.compressionRatio != null ? result.compressionRatio.toFixed(1) : '0'}
                suffix="%"
                icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                color="success"
              />
              <MetricCard
                label="Tokens Saved"
                value={result.estimatedTokenSavings || 0}
                icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
                color="info"
              />
              <MetricCard
                label="Semantic Preservation"
                value={result.semanticScore != null ? result.semanticScore.toFixed(1) : '0'}
                suffix="%"
                icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
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
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy
                </button>
              </div>
              <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4 font-mono text-dark-100 text-sm leading-relaxed">
                {result.compressed}
              </div>
            </GlassPanel>

            {/* Symbols Used (SynthLang only) */}
            {result.usedSymbols && result.usedSymbols.length > 0 && (
              <GlassPanel>
                <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                    <line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                  Kanji Symbols Used
                </h2>
                <p className="text-sm text-dark-400 mb-6">
                  {result.usedSymbols.length} unique symbols replaced {result.usedSymbols.reduce((acc, s) => acc + s.originalWords.length, 0)} words
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
                  {result.usedSymbols.map((sym, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-gradient-to-br from-dark-800/70 to-dark-900/70 border border-primary-500/30 rounded-lg p-3 hover:border-primary-400/50 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{sym.symbol}</span>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                            {sym.concept}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-dark-300">
                        <span className="text-dark-500">Replaced: </span>
                        <span className="text-dark-200">{sym.originalWords.join(', ')}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {/* Layer Breakdown (Hybrid only) */}
            {result.layers && (
              <GlassPanel>
                <h2 className="text-2xl font-bold text-dark-50 mb-2">
                  Compression Layer Breakdown
                </h2>
                <p className="text-sm text-dark-400 mb-6">
                  Multi-layer optimization applied sequentially
                </p>
                <div className="space-y-4">
                  {/* Structural Layer */}
                  {result.layers.structural && (
                    <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-dark-100 flex items-center gap-2">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                            <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>
                          </svg>
                          Structural Analysis
                        </h3>
                        <span className="text-sm text-emerald-400 font-semibold">
                          {result.layers.structural.compressionRatio.toFixed(1)}% reduced
                        </span>
                      </div>
                      <p className="text-xs text-dark-400 mb-2">
                        Removed {result.layers.structural.removedCount} filler words and redundant phrases
                      </p>
                      {result.layers.structural.removed.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.layers.structural.removed.slice(0, 5).map((word, idx) => (
                            <span key={idx} className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded">
                              {word}
                            </span>
                          ))}
                          {result.layers.structural.removedCount > 5 && (
                            <span className="text-xs text-dark-500">
                              +{result.layers.structural.removedCount - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Semantic Layer */}
                  {result.layers.semantic && (
                    <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-dark-100 flex items-center gap-2">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10"/>
                            <polyline points="1 20 1 14 7 14"/>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                          </svg>
                          Semantic Deduplication
                        </h3>
                        <span className="text-sm text-emerald-400 font-semibold">
                          {result.layers.semantic.compressionRatio.toFixed(1)}% reduced
                        </span>
                      </div>
                      <p className="text-xs text-dark-400 mb-2">
                        Merged {result.layers.semantic.mergedCount} verbose phrases into concise equivalents
                      </p>
                      {result.layers.semantic.merged.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {result.layers.semantic.merged.slice(0, 3).map((merge, idx) => (
                            <div key={idx} className="text-xs flex items-center gap-2">
                              <span className="text-dark-500">{merge.original.join(', ')}</span>
                              <span className="text-primary-400">→</span>
                              <span className="text-emerald-400">{merge.merged}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contextual Layer */}
                  {result.layers.contextual && (
                    <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-dark-100 flex items-center gap-2">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                          </svg>
                          Context Preservation
                        </h3>
                        <span className="text-sm text-cyan-400 font-semibold">
                          {result.layers.contextual.preservedCount} entities preserved
                        </span>
                      </div>
                      <p className="text-xs text-dark-400 mb-2">
                        Maintained {result.layers.contextual.relationshipsCount} key relationships
                      </p>
                      {result.layers.contextual.preserved.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.layers.contextual.preserved.slice(0, 8).map((entity, idx) => (
                            <span key={idx} className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">
                              {entity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Format Layer */}
                  {result.layers.format && (
                    <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-dark-100 flex items-center gap-2">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                          Format Optimization
                        </h3>
                        <span className="text-sm text-emerald-400 font-semibold">
                          {result.layers.format.compressionRatio.toFixed(1)}% reduced
                        </span>
                      </div>
                      <p className="text-xs text-dark-400 mb-2">
                        Applied {result.layers.format.optimizationCount} format optimizations
                      </p>
                      {result.layers.format.optimizations.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {result.layers.format.optimizations.slice(0, 3).map((opt, idx) => (
                            <div key={idx} className="text-xs flex items-center gap-2">
                              <span className="text-dark-500 truncate max-w-[200px]">{opt.before}</span>
                              <span className="text-primary-400">→</span>
                              <span className="text-emerald-400">{opt.after}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </GlassPanel>
            )}

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
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-dark-500">{result.original.length} characters</span>
                      <CopyButton
                        text={result.original}
                        onCopy={() => addToast('Original text copied!')}
                        size="sm"
                      />
                    </div>
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-dark-500">{result.compressed.length} characters</span>
                      <CopyButton
                        text={result.compressed}
                        onCopy={() => addToast('Compressed text copied!')}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-4 h-48 overflow-y-auto scrollbar-thin text-primary-300 text-sm leading-relaxed font-mono">
                    {result.compressed}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
        </motion.div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Chatbot />
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
            Powered by LLMLingua compression, SynthLang optimization & strategic language switching
          </p>
        </motion.footer>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </main>
    </>
  );
}

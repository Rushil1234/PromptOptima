'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from './GlassPanel';
import CopyButton from './CopyButton';
import { ToastContainer } from './Toast';
import { OptimalLanguage, TaskType } from '@/lib/language-router';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    originalPrompt?: string;
    translatedPrompt?: string;
    compressedPrompt?: string;
    decodedPrompt?: string;
    originalLanguageResponse?: string; // Reasoning in original language
    usedSymbols?: Array<{ symbol: string; concept: string }>;
    language?: OptimalLanguage;
    taskType?: TaskType;
    tokensSaved?: number;
    compressionRatio?: number;
    spellCorrected?: boolean;
    symbolsDecoded?: number;
  };
}

interface ChatbotProps {
  useSynthLang?: boolean;
  useLanguageSwitching?: boolean;
  useSpellCheck?: boolean;
}

export default function Chatbot({
  useSynthLang = true,
  useLanguageSwitching = true,
  useSpellCheck = true
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [spellCheckSuggestion, setSpellCheckSuggestion] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Spell check as user types
  useEffect(() => {
    if (!useSpellCheck || !input.trim()) {
      setSpellCheckSuggestion(null);
      return;
    }

    const checkSpelling = async () => {
      try {
        const response = await fetch('/api/spell-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.hasErrors) {
            setSpellCheckSuggestion(data.correctedText);
          } else {
            setSpellCheckSuggestion(null);
          }
        }
      } catch (error) {
        console.error('Spell check error:', error);
      }
    };

    const timeout = setTimeout(checkSpelling, 500); // Debounce
    return () => clearTimeout(timeout);
  }, [input, useSpellCheck]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSpellCheckSuggestion(null);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          useSynthLang,
          useLanguageSwitching,
          useSpellCheck,
          history: messages.slice(-5) // Last 5 messages for context
        })
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response, // Always in English
        timestamp: new Date(),
        metadata: {
          originalPrompt: data.originalPrompt,
          translatedPrompt: data.translatedPrompt,
          originalLanguageResponse: data.originalLanguageResponse, // Reasoning in original language
          language: data.language,
          taskType: data.taskType,
          tokensSaved: data.tokensSaved,
          compressionRatio: data.compressionRatio,
          spellCorrected: data.spellCorrected
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const acceptSpellCheckSuggestion = () => {
    if (spellCheckSuggestion) {
      setInput(spellCheckSuggestion);
      setSpellCheckSuggestion(null);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <GlassPanel className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-dark-700">
        <h2 className="text-2xl font-bold text-dark-50 flex items-center gap-2">
          🤖 AI Chat Assistant
        </h2>
        <p className="text-sm text-dark-400 mt-1">
          💡 <strong>Smart Token Optimization:</strong> This chatbot uses advanced compression to reduce token usage by up to <span className="text-primary-400 font-semibold">95%</span>
        </p>
        <div className="mt-2 text-xs text-dark-500 space-y-1">
          <p>✨ <strong>SynthLang Compression:</strong> Converts verbose text to symbolic tokens (60-93% reduction)</p>
          <p>🌍 <strong>Language Switching:</strong> Translates to token-efficient languages like Japanese/Chinese (40% reduction)</p>
          <p>✏️ <strong>Auto Spell-Check:</strong> Fixes typos to improve compression quality</p>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-dark-900/50 rounded-lg border border-dark-700"
          >
            <h3 className="text-sm font-semibold text-dark-300 mb-3">Optimization Settings</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2 text-dark-400 cursor-pointer">
                <input type="checkbox" checked={useSynthLang} readOnly className="rounded" />
                <span>SynthLang Compression (60-93%)</span>
              </label>
              <label className="flex items-center gap-2 text-dark-400 cursor-pointer">
                <input type="checkbox" checked={useLanguageSwitching} readOnly className="rounded" />
                <span>Strategic Language Switching (40%)</span>
              </label>
              <label className="flex items-center gap-2 text-dark-400 cursor-pointer">
                <input type="checkbox" checked={useSpellCheck} readOnly className="rounded" />
                <span>Spell Check</span>
              </label>
            </div>
            <div className="mt-3 pt-3 border-t border-dark-700">
              <p className="text-xs text-dark-500">
                Combined optimization can achieve up to <span className="text-primary-400 font-semibold">95%+ token reduction</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-dark-300 mb-2">
              Start a conversation
            </h3>
            <p className="text-sm text-dark-500 max-w-md">
              Chat with AI using advanced token optimization.<br />
              Your prompts are automatically compressed for efficiency.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-md">
              <button
                onClick={() => setInput('Calculate the square root of 144')}
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300"
              >
                📐 Calculate the square root of 144
              </button>
              <button
                onClick={() => setInput('Write a short story about a robot')}
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300"
              >
                ✍️ Write a short story about a robot
              </button>
              <button
                onClick={() => setInput('Explain how to create a REST API')}
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300"
              >
                💻 Explain how to create a REST API
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 relative ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                      : 'bg-dark-800/50 text-dark-100 border border-dark-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap flex-1">
                      {message.content}
                    </div>
                    <CopyButton
                      text={message.content}
                      onCopy={() => addToast('Message copied to clipboard!')}
                      size="sm"
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  
                  {/* Show original language reasoning if available */}
                  {message.metadata?.originalLanguageResponse && (
                    <details className="mt-3 pt-3 border-t border-dark-700/50">
                      <summary className="text-xs font-semibold text-primary-400 cursor-pointer hover:text-primary-300 transition-colors flex items-center gap-2">
                        <span>🧠</span>
                        <span>View Reasoning in {message.metadata.language || 'Original Language'}</span>
                        <span className="text-dark-500">(Click to expand)</span>
                      </summary>
                      <div className="mt-2 p-3 bg-dark-900/50 rounded-lg border border-dark-700/30">
                        <div className="text-xs text-dark-300 leading-relaxed whitespace-pre-wrap">
                          {message.metadata.originalLanguageResponse}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <CopyButton
                            text={message.metadata.originalLanguageResponse}
                            onCopy={() => addToast('Original reasoning copied!')}
                            size="sm"
                          />
                          <span className="text-xs text-dark-500">Original {message.metadata.language} response</span>
                        </div>
                      </div>
                    </details>
                  )}
                  
                  {message.metadata && (
                    <div className="mt-2 pt-2 border-t border-dark-700/50 text-xs text-dark-400 space-y-1">
                      {message.metadata.language && message.metadata.language !== 'english' && (
                        <div className="flex items-center gap-1">
                          🌐 Reasoned in {message.metadata.language}, translated to English
                        </div>
                      )}
                      {message.metadata.tokensSaved !== undefined && message.metadata.tokensSaved > 0 && (
                        <div className="flex items-center gap-1">
                          💾 {message.metadata.tokensSaved} tokens saved
                        </div>
                      )}
                      {message.metadata.compressionRatio !== undefined && (
                        <div className="flex items-center gap-1">
                          📊 {message.metadata.compressionRatio.toFixed(1)}% compression
                        </div>
                      )}
                      {message.metadata.spellCorrected && (
                        <div className="flex items-center gap-1">
                          ✓ Spell checked
                        </div>
                      )}
                      {message.metadata.symbolsDecoded !== undefined && message.metadata.symbolsDecoded > 0 && (
                        <div className="flex items-center gap-1">
                          🔤 {message.metadata.symbolsDecoded} symbols decoded
                        </div>
                      )}
                      {message.metadata.usedSymbols && message.metadata.usedSymbols.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-dark-700/50">
                          <div className="text-xs font-semibold text-primary-400 mb-1">Decoded Symbols:</div>
                          <div className="flex flex-wrap gap-1">
                            {message.metadata.usedSymbols.slice(0, 10).map((sym, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/30 rounded px-1.5 py-0.5"
                                title={sym.concept}
                              >
                                <span className="text-sm">{sym.symbol}</span>
                                <span className="text-xs text-primary-400">→</span>
                                <span className="text-xs text-dark-300">{sym.concept.toLowerCase()}</span>
                              </span>
                            ))}
                            {message.metadata.usedSymbols.length > 10 && (
                              <span className="text-xs text-dark-500">
                                +{message.metadata.usedSymbols.length - 10} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-xs text-dark-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-dark-800/50 rounded-2xl px-4 py-3 border border-dark-700">
                  <div className="flex items-center gap-2 text-dark-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Spell Check Suggestion */}
      <AnimatePresence>
        {spellCheckSuggestion && spellCheckSuggestion !== input && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-sm text-yellow-300">
              <span>✨</span>
              <span>Suggestion: {spellCheckSuggestion}</span>
            </div>
            <button
              onClick={acceptSpellCheckSuggestion}
              className="text-xs px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded transition-colors text-yellow-200"
            >
              Apply
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex gap-2 relative z-50">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter to send)"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
          style={{ zIndex: 50 }}
          rows={2}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="px-6 py-3 bg-gradient-to-br from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 relative z-50"
          style={{ zIndex: 50 }}
        >
          {loading ? '⏳' : '🚀'}
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </GlassPanel>
  );
}

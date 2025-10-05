'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
    routingReasoning?: string; // Why this language was chosen
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
          routingReasoning: data.routingReasoning, // Why this language was chosen
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
    <GlassPanel className="flex flex-col h-[600px] max-h-[600px]">
      {/* Header */}
      <div className="flex-shrink-0 mb-4 pb-4 border-b border-dark-700">
        <h2 className="text-2xl font-bold text-dark-50 flex items-center gap-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          AI Chat Assistant
        </h2>
        <p className="text-sm text-dark-400 mt-1 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <span><strong>Smart Token Optimization:</strong> This chatbot uses advanced compression to reduce token usage by up to <span className="text-primary-400 font-semibold">95%</span></span>
        </p>
        <div className="mt-2 text-xs text-dark-500 space-y-1">
          <p className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span><strong>SynthLang Compression:</strong> Converts verbose text to symbolic tokens (60-93% reduction)</span>
          </p>
          <p className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span><strong>Language Switching:</strong> Translates to token-efficient languages like Japanese/Chinese (40% reduction)</span>
          </p>
          <p className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span><strong>Auto Spell-Check:</strong> Fixes typos to improve compression quality</span>
          </p>
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
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 mb-4 scrollbar-thin pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="w-16 h-16 text-dark-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
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
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M9 9h.01M15 15h.01M16 8l-8 8"/>
                </svg>
                Calculate the square root of 144
              </button>
              <button
                onClick={() => setInput('Write a short story about a robot')}
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Write a short story about a robot
              </button>
              <button
                onClick={() => setInput('Explain how to create a REST API')}
                className="p-3 text-left rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors text-sm text-dark-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                Explain how to create a REST API
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
                    <div className="text-sm leading-relaxed flex-1">
                      {message.role === 'assistant' ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                            // Style code blocks
                            code: ({ node, inline, className, children, ...props }: any) => {
                              const match = /language-(\w+)/.exec(className || '');
                              return inline ? (
                                <code className="bg-dark-900 px-1.5 py-0.5 rounded text-primary-400 text-xs" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <code className="block bg-dark-900 p-3 rounded-lg text-xs overflow-x-auto" {...props}>
                                  {children}
                                </code>
                              );
                            },
                            // Style links
                            a: ({ node, children, ...props }: any) => (
                              <a className="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener noreferrer" {...props}>
                                {children}
                              </a>
                            ),
                            // Style lists
                            ul: ({ node, children, ...props }: any) => (
                              <ul className="list-disc list-inside space-y-1 my-2" {...props}>{children}</ul>
                            ),
                            ol: ({ node, children, ...props }: any) => (
                              <ol className="list-decimal list-inside space-y-1 my-2" {...props}>{children}</ol>
                            ),
                            // Style headings
                            h1: ({ node, children, ...props }: any) => (
                              <h1 className="text-lg font-bold mt-4 mb-2" {...props}>{children}</h1>
                            ),
                            h2: ({ node, children, ...props }: any) => (
                              <h2 className="text-base font-bold mt-3 mb-2" {...props}>{children}</h2>
                            ),
                            h3: ({ node, children, ...props }: any) => (
                              <h3 className="text-sm font-bold mt-2 mb-1" {...props}>{children}</h3>
                            ),
                            // Style blockquotes
                            blockquote: ({ node, children, ...props }: any) => (
                              <blockquote className="border-l-4 border-primary-500/50 pl-3 italic my-2 text-dark-300" {...props}>
                                {children}
                              </blockquote>
                            ),
                            // Style tables
                            table: ({ node, children, ...props }: any) => (
                              <div className="overflow-x-auto my-2">
                                <table className="min-w-full border border-dark-700" {...props}>{children}</table>
                              </div>
                            ),
                            th: ({ node, children, ...props }: any) => (
                              <th className="border border-dark-700 px-2 py-1 bg-dark-800 text-left" {...props}>{children}</th>
                            ),
                            td: ({ node, children, ...props }: any) => (
                              <td className="border border-dark-700 px-2 py-1" {...props}>{children}</td>
                            ),
                            // Style paragraphs
                            p: ({ node, children, ...props }: any) => (
                              <p className="my-2" {...props}>{children}</p>
                            ),
                          }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
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
                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                          <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
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
                      {message.metadata.routingReasoning && (
                        <div className="mb-2 p-2 bg-info-500/10 border border-info-500/30 rounded text-info-400">
                          <div className="flex items-start gap-1.5">
                            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 16v-4M12 8h.01"/>
                            </svg>
                            <div>
                              <div className="font-semibold mb-1">💡 Why {message.metadata.language}?</div>
                              <div className="text-dark-300 leading-relaxed">{message.metadata.routingReasoning}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {message.metadata.language && message.metadata.language !== 'english' && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                          Reasoned in {message.metadata.language}, translated to English
                        </div>
                      )}
                      {message.metadata.tokensSaved !== undefined && message.metadata.tokensSaved > 0 && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                            <polyline points="17 21 17 13 7 13 7 21"/>
                            <polyline points="7 3 7 8 15 8"/>
                          </svg>
                          {message.metadata.tokensSaved} tokens saved
                        </div>
                      )}
                      {message.metadata.compressionRatio !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="20" x2="18" y2="10"/>
                            <line x1="12" y1="20" x2="12" y2="4"/>
                            <line x1="6" y1="20" x2="6" y2="14"/>
                          </svg>
                          {message.metadata.compressionRatio.toFixed(1)}% compression
                        </div>
                      )}
                      {message.metadata.spellCorrected && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Spell checked
                        </div>
                      )}
                      {message.metadata.symbolsDecoded !== undefined && message.metadata.symbolsDecoded > 0 && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="4 7 4 4 20 4 20 7"/>
                            <line x1="9" y1="20" x2="15" y2="20"/>
                            <line x1="12" y1="4" x2="12" y2="20"/>
                          </svg>
                          {message.metadata.symbolsDecoded} symbols decoded
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
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
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
          className="px-6 py-3 bg-gradient-to-br from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 relative z-50 flex items-center justify-center"
          style={{ zIndex: 50 }}
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          )}
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </GlassPanel>
  );
}

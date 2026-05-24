'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: "Hi there! 👋 I'm the Guide Soft AI assistant. I can help you with information about our services, pricing, and bookings. What can I help you with today?",
  timestamp: new Date(),
};

const QUICK_REPLIES = [
  'What services do you offer?',
  'Show me pricing',
  'Book a consultation',
  'Contact the team',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show notification bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasNewMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.reply || "I'm sorry, I couldn't generate a response. Please try again or contact us directly.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please contact us directly at [WhatsApp](https://wa.me/918884162999) or email us.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  function renderContent(text: string) {
    // Simple markdown link rendering
    return text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <a key={i} href={match[2]} className="underline text-green-300" target={match[2].startsWith('http') ? '_blank' : undefined}>{match[1]}</a>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* WhatsApp quick link */}
        <motion.a
          href="https://wa.me/918884162999"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 shadow-lg text-sm font-medium transition-all hover:shadow-xl"
          title="Chat on WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.61L0 24l6.613-1.375A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.523-5.176-1.432l-.371-.22-3.852.802.816-3.742-.242-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </motion.a>

        {/* AI Chat Button */}
        <motion.button
          onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
          className="relative w-14 h-14 gradient-bg rounded-full shadow-2xl flex items-center justify-center hover:shadow-green-500/40 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI Chat"
        >
          {isOpen ? <X size={22} className="text-white" /> : <Bot size={22} className="text-white" />}
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse-green border-2 border-white" />
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: isMinimized ? 0.95 : 1, scale: 1, y: 0, height: isMinimized ? '60px' : 'auto' }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-bg px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Guide Soft AI</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse" />
                    <span className="text-green-100 text-xs">Online • Reply in seconds</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="text-white/70 hover:text-white">
                  <Minimize2 size={14} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-72 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'assistant' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {message.role === 'assistant'
                          ? <Bot size={12} className="text-green-600" />
                          : <User size={12} className="text-blue-600" />}
                      </div>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                        message.role === 'user'
                          ? 'chat-bubble-user'
                          : 'chat-bubble-ai'
                      }`}>
                        {renderContent(message.content)}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Bot size={12} className="text-green-600" />
                      </div>
                      <div className="chat-bubble-ai px-3 py-2 rounded-xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length < 3 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1">
                    {QUICK_REPLIES.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => sendMessage(reply)}
                        className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-full px-3 py-1 hover:bg-green-100 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? <Loader2 size={14} className="text-white animate-spin" /> : <Send size={14} className="text-white" />}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

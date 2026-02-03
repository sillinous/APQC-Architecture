'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { agents, apqcLevels } from '@/data/apqc-levels';

import { motion, AnimatePresence } from 'framer-motion';

export default function AgentAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initial greeting based on context
  useEffect(() => {
    let contextGreeting = "I am your APQC Strategic Assistant. How can I help you navigate the 103 agents in our framework?";
    
    if (pathname === '/strategy') {
      contextGreeting = "You're in the Strategic Planning Hub. I can help you interpret your Maturity Assessment or calculate specific ROI for Level 1.0 (Vision) agents.";
    } else if (pathname === '/agents/ops') {
      contextGreeting = "Viewing the Swarm Pulse? I can explain the different operational protocols like MCP and A2A used in our production nodes.";
    } else if (pathname === '/framework') {
      contextGreeting = "The Process Classification Framework (PCF) is the backbone of our system. Which of the 12 levels would you like to explore deeper?";
    }

    setMessages([{ role: 'assistant', content: contextGreeting }]);
  }, [pathname]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Find a relevant agent for context if one appears to match the query
      const searchTerm = input.toLowerCase();
      const matchedAgent = agents.find(a => 
        a.name.toLowerCase().includes(searchTerm) || 
        a.description.toLowerCase().includes(searchTerm)
      );

      const response = await fetch('/api/neural/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: matchedAgent?.id || 'analyze-market-trends', // Default to Market Trends Analyst if no match
          context: {
            userQuery: input,
            pageContext: pathname
          }
        })
      });

      const data = await response.json();
      
      const assistantMessage = { 
        role: 'assistant', 
        content: data.success ? data.output : `I encountered a neural gateway error: ${data.error}`
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: "My neural link is currently offline. Please ensure the API services are running." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Launch Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-50 flex items-center justify-center group"
      >
        <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Slide-over */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-gray-950 shadow-2xl z-[60] flex flex-col border-l border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-indigo-600 text-white">
              <div>
                <h3 className="font-bold text-lg">Agent Assistant</h3>
                <div className="flex items-center gap-2 text-xs text-indigo-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active PCF Context
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-indigo-700 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 border-t border-gray-200 dark:border-gray-800">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about APQC agents..."
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['Maturity', 'ROI', 'Level 8.0 Agents', 'MCP Protocol'].map(chip => (
                  <button 
                    key={chip}
                    type="button"
                    onClick={() => setInput(chip)}
                    className="whitespace-nowrap px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  title: string;
  description: string;
  target?: string;
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "The Orchestration Canvas",
    description: "Welcome to the Neural Layer. Here, APQC agents are deployed as functional nodes in a strategic swarm.",
  },
  {
    title: "Deploying an Agent",
    description: "Select an agent from the left palette and click on a swimlane to deploy it. Each lane corresponds to an APQC maturity level.",
  },
  {
    title: "A2A Linkage (The Power Move)",
    description: "Use the 'Connection Protocol' dropdown on any deployed agent to select another agent. This passes the output of the source agent as context to the target.",
  },
  {
    title: "Running Tasks",
    description: "Click 'Run Neural Task' to initiate the LLM orchestration. Watch the 'Protocol Interactions' to see MCP tools in action.",
  }
];

export default function UserGuide({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Guide Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] bg-white dark:bg-gray-950 shadow-2xl z-[101] border-l border-gray-200 dark:border-gray-800 flex flex-col"
          >
            <div className="p-8 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black italic tracking-tighter text-gray-900 dark:text-white uppercase">Neural Guide</h2>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Version 1.0 // System Protocol</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {/* Progress Bar */}
              <div className="flex gap-1 h-1">
                {tutorialSteps.map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold italic">
                    {currentStep + 1}
                  </div>
                  <h3 className="text-2xl font-black italic text-gray-900 dark:text-white tracking-tight leading-none">
                    {tutorialSteps[currentStep].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                    {tutorialSteps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-8 flex gap-3">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex-1 py-4 rounded-3xl bg-gray-50 dark:bg-gray-900 text-gray-400 font-black uppercase text-[10px] tracking-widest disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
                >
                  Previous
                </button>
                <button 
                  onClick={() => {
                    if (currentStep < tutorialSteps.length - 1) {
                      setCurrentStep(prev => prev + 1);
                    } else {
                      onClose();
                    }
                  }}
                  className="flex-[2] py-4 rounded-3xl bg-indigo-600 dark:bg-indigo-500 text-white font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
                >
                  {currentStep === tutorialSteps.length - 1 ? 'Finish Tutorial' : 'Next Step'}
                </button>
              </div>

              {/* Use Cases Section */}
              <div className="pt-12 border-t border-gray-100 dark:border-gray-900 space-y-6">
                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Use Cases</h4>
                <div className="grid gap-4">
                  {[
                    { name: 'Strategic Market Launch', icon: '🚀' },
                    { name: 'Quality Swarm', icon: '🛡️' },
                    { name: 'Finance Forecasting', icon: '📊' }
                  ].map((uc) => (
                    <div key={uc.name} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-lg">{uc.icon}</div>
                        <div className="font-bold text-xs text-gray-900 dark:text-white">{uc.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-black/20">
              <a 
                href="/strategy/guide" 
                className="block w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-3xl text-center font-black uppercase text-[10px] tracking-widest hover:opacity-80 transition-all"
              >
                View Full Documentation
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

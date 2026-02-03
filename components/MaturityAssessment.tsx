'use client';

import React, { useState } from 'react';
import { db, isFirebaseEnabled } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
const { motion, AnimatePresence } = require('framer-motion') as any;

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  { id: 1, text: "Strategic goals are clearly mapped to APQC level 1.0 processes.", category: "Strategy" },
  { id: 2, text: "Product development cycles are integrated with APQC level 2.0 standards.", category: "Product" },
  { id: 3, text: "Customer service metrics (Level 6.0) are monitored by autonomous agents.", category: "Service" },
  { id: 4, text: "Financial reporting (Level 8.0) is automated via blockchain or smart agents.", category: "Finance" },
  { id: 5, text: "Risk management (Level 10.0) processes are predictive rather than reactive.", category: "Risk" },
];

export default function MaturityAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const saveToCloud = async () => {
    if (!db) return;
    setIsSaving(true);
    try {
      const docRef = await addDoc(collection(db, "assessments"), {
        answers,
        maturityLevel: result.level,
        score: averageScore,
        recommendations,
        timestamp: serverTimestamp(),
      });
      setSavedId(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsSaving(false);
  };

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [questions[currentStep].id]: score });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateMaturity = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const average = total / questions.length;
    if (average < 2) return { level: "Level 1: Initial", description: "Processes are ad-hoc and chaotic.", color: "text-red-500" };
    if (average < 3) return { level: "Level 2: Managed", description: "Processes are documented and repeatable.", color: "text-orange-500" };
    if (average < 4) return { level: "Level 3: Defined", description: "Processes are standardized across the organization.", color: "text-blue-500" };
    return { level: "Level 4: Optimized", description: "Processes are continuously improved using data and agents.", color: "text-emerald-500" };
  };

  const getRecommendations = (average: number) => {
    if (average < 2) return [
      "Focus on Level 1.0 (Vision and Strategy) to establish a clear architectural foundation.",
      "Identify high-impact 'quick wins' in Level 4.0 (Operations) to demonstrate agent value.",
      "Establish a centralized Agent Governance board."
    ];
    if (average < 3) return [
      "Standardize Level 13.0 (IT) protocols for agent-to-agent communication.",
      "Implement predictive monitoring in Level 10.0 (Risk Management).",
      "Develop a comprehensive skill matrix for Level 7.0 (Human Resources)."
    ];
    if (average < 4) return [
      "Scale Level 3.0 (Sales) agents for dynamic pricing and market analysis.",
      "Integrate Level 8.0 (Finance) with real-time blockchain reconciliation.",
      "Expand Level 12.0 (Business Capabilities) with autonomous project managers."
    ];
    return [
      "Explore Level 2.0 (Product Development) for AI-driven rapid prototyping.",
      "Optimize Level 11.0 (External Relations) with automated stakeholder sentiment loops.",
      "Implement a self-evolving swarm architecture across all APQC levels."
    ];
  };

  const result = calculateMaturity();
  const averageScore = Object.values(answers).reduce((a, b) => a + b, 0) / questions.length;
  const recommendations = getRecommendations(averageScore);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider">
                {questions[currentStep].category}
              </span>
              <span className="text-gray-400 text-sm">Question {currentStep + 1} of {questions.length}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {questions[currentStep].text}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Strongly Disagree", score: 1 },
                { label: "Disagree", score: 2 },
                { label: "Neutral", score: 3 },
                { label: "Agree", score: 4 },
                { label: "Strongly Agree", score: 5 },
              ].map((option) => (
                <button
                  key={option.score}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                      {option.label}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600">
                      {option.score}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Maturity Profile</h3>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
              <div className={`text-3xl font-black mb-2 ${result.color}`}>
                {result.level}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {result.description}
              </p>
            </div>

            <div className="text-left space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Strategic Recommendations:</h4>
              <div className="space-y-2">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 text-[10px] font-bold">
                      {idx + 1}
                    </div>
                    {rec}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setShowResult(false);
                  setSavedId(null);
                }}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
              >
                Restart
              </button>
              
              {isFirebaseEnabled && !savedId && (
                <button
                  onClick={saveToCloud}
                  disabled={isSaving}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                      Save to Cloud
                    </>
                  )}
                </button>
              )}

              {savedId && (
                <div className="flex-1 flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <div className="text-left">
                    <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Assessment Saved</div>
                    <div className="text-xs text-gray-500 font-mono truncate max-w-[150px]">{savedId}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

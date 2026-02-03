'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { agents, apqcLevels } from '@/data/apqc-levels';
const { motion, AnimatePresence } = require('framer-motion') as any;

export default function StrategicOptimizationHub() {
  // Mocking maturity context for prescriptive logic
  const [currentMaturity] = useState(2.4);

  const recommendations = useMemo(() => {
    // Prescriptive logic: Find agents in levels with low coverage relative to maturity
    const prioritizedLevels = apqcLevels
      .sort((a, b) => a.agentCount - b.agentCount)
      .slice(0, 5);

    return prioritizedLevels.map((level, idx) => {
      const suggestedAgent = agents.find(a => a.level === level.id) || agents[0];
      return {
        ...level,
        suggestedAgent,
        priority: 5 - idx,
        roiPotency: (6 - idx) * 15,
        complexity: idx < 2 ? 'Low' : 'Complex'
      };
    });
  }, []);

  const alphaScore = useMemo(() => {
    return (currentMaturity * 18.5).toFixed(1);
  }, [currentMaturity]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-900 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800">
               <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Optimization Engine active</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Optimization <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">Hub</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-xl leading-relaxed">
              Prescriptive intelligence applied to your APQC landscape. 
              We've analyzed your maturity assessment and identified the path to clinical-grade automation alpha.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-right min-w-[200px]">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Optimization Alpha</div>
            <div className="text-5xl font-black text-indigo-500 tracking-tighter">{alphaScore}%</div>
            <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Potential Value Locked</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Roadmap: Left */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tight">
              <span className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm italic py-4">01</span>
              Prioritized Deployment Roadmap
            </h2>

            <div className="space-y-6 relative ml-4">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-emerald-500 via-indigo-500 to-transparent opacity-30"></div>

              {recommendations.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-16 group"
                >
                  {/* Step Bubble */}
                  <div className={`absolute left-0 top-2 w-12 h-12 rounded-2xl ${idx === 0 ? 'bg-emerald-500' : 'bg-gray-100 dark:bg-gray-800'} border-4 border-white dark:border-gray-950 text-white dark:text-gray-300 flex items-center justify-center font-black z-10 shadow-xl group-hover:scale-110 transition-transform`}>
                    {idx + 1}
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/20 transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-md ${item.color} text-white text-[10px] font-black uppercase tracking-tighter`}>Level {item.id}</span>
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.shortName} Cluster</span>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{item.suggestedAgent.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg italic">
                          Deployment targets the "{item.name}" bottleneck to unlock {item.roiPotency}% performance delta.
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-end gap-2 border-l border-gray-100 dark:border-gray-800 pl-6 min-w-[140px]">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Complexity</div>
                        <div className={`text-lg font-black uppercase ${item.complexity === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`}>{item.complexity}</div>
                        <Link href={`/agents/${item.suggestedAgent.id}`} className="mt-2 text-indigo-500 font-bold text-xs hover:underline flex items-center gap-1 group/link">
                          View Agent Spec
                          <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Insights: Right */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tight">
              <span className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm italic py-4">02</span>
              Gap Analysis
            </h2>

            <div className="bg-indigo-600 rounded-3xl p-8 text-white space-y-6 shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
               {/* Decorative icon */}
               <svg className="absolute -right-12 -bottom-12 w-64 h-64 text-indigo-500/20 transform rotate-12" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.884 4.47a1 1 0 10-1.415 1.414l.707.707a1 1 0 001.415-1.414l-.707-.707zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zM4.47 14.116a1 1 0 001.414 1.415l.707-.707a1 1 0 00-1.414-1.415l-.707.707zM11 17a1 1 0 10-2 0v-1a1 1 0 102 0v1zM14.116 15.53a1 1 0 011.415-1.414l.707.707a1 1 0 01-1.415 1.414l-.707-.707zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM15.53 5.884a1 1 0 01-1.414-1.415l.707-.707a1 1 0 011.414 1.415l-.707.707z" /></svg>
               
               <div className="relative z-10 space-y-4">
                 <h4 className="text-xl font-black leading-tight">Strategic Bottleneck Identified</h4>
                 <p className="text-indigo-100 text-sm leading-relaxed opacity-80">
                   "Your Level 10.0 (Risk Management) cluster shows the highest variance between current maturity and simulated operational risk. Immediate deployment of a **Constraint Satisfaction Agent** is recommended."
                 </p>
                 <div className="pt-4">
                    <Link href="/strategy/war-room" className="inline-flex py-3 px-6 bg-white text-indigo-600 font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-transform">
                      Re-Simulate Risk
                    </Link>
                 </div>
               </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl space-y-6">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs">Recommended Service Stack</h4>
              <div className="space-y-4">
                {[
                  { name: 'Swarm Protocol v2.1', status: 'Required' },
                  { name: 'Semantic Reconciliation', status: 'Optimal' },
                  { name: 'Hierarchical Guardrails', status: 'Optional' },
                ].map(s => (
                  <div key={s.name} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">{s.name}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${s.status === 'Required' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

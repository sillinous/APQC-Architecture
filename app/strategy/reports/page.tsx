'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { apqcLevels } from '@/data/apqc-levels';
import { enterprisePolicies } from '@/data/policies';
const { motion, AnimatePresence } = require('framer-motion') as any;

export default function StrategicReportsHub() {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Mock data for synthesis
  const metrics = {
    maturity: 2.8,
    simulatedAlpha: 4.2,
    complianceScore: 92,
    activeAgents: 45
  };

  const narrative = useMemo(() => {
    return {
      executiveSummary: `The APQC Strategic Framework has reached an operational maturity of ${metrics.maturity}/5.0. Our recent War Room simulations indicate that a prioritized deployment in Level 4.0 (Operations) clusters will unlock a ${metrics.simulatedAlpha}x multiplier in efficiency. The ecosystem is currently governed by ${enterprisePolicies.length} active policy guardrails, maintaining a trust index of ${metrics.complianceScore}%.`,
      strategicOutlook: "Short-term focus should remain on hardening the Level 10.0 Risk cluster. Long-term projection suggests a 30% reduction in architectural debt through the activation of 'Constraint Satisfaction' agents.",
      pillars: [
        { title: "Observability", value: metrics.maturity, total: 5.0, desc: "Process maturity tracking." },
        { title: "Tactical Alpha", value: metrics.simulatedAlpha, total: 10, desc: "Simulated efficiency gains." },
        { title: "Trust Index", value: metrics.complianceScore, total: 100, desc: "Policy alignment percentage." }
      ]
    };
  }, [metrics]);

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setReportGenerated(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-900 pb-12 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
               <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Narrative Engine v1.0</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Reports</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-xl leading-relaxed">
              Convert raw framework telemetry into board-ready executive narratives. 
              Synthesize your maturity, simulations, and governance into a cohesive strategic story.
            </p>
          </div>
          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${
                isSynthesizing 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 active:scale-95'
            }`}
          >
            {isSynthesizing ? 'Synthesizing...' : 'Generate Executive Report'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isSynthesizing && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[400px] flex flex-col items-center justify-center space-y-8"
            >
              <div className="relative w-24 h-24">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
                 />
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-4 bg-indigo-500/20 rounded-full flex items-center justify-center"
                 >
                    <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </motion.div>
              </div>
              <div className="text-center">
                 <div className="text-sm font-black uppercase tracking-widest text-gray-400 animate-pulse">Scanning Governance Tunnels...</div>
                 <div className="text-[10px] font-bold text-gray-500 mt-2">Unified APQC Consensus established.</div>
              </div>
            </motion.div>
          )}

          {reportGenerated && !isSynthesizing && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Narrative Content */}
              <div className="lg:col-span-8 space-y-12">
                <section className="space-y-6">
                   <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight italic">Executive Narrative</h2>
                   <p className="text-2xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-600 first-letter:italic">
                     {narrative.executiveSummary}
                   </p>
                </section>

                <section className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-widest text-indigo-500">Strategic Outlook</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic">
                      "{narrative.strategicOutlook}"
                    </p>
                </section>

                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-transform">
                      Download PDF
                   </button>
                   <button className="flex-1 py-4 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      Share Strategy Room
                   </button>
                </div>
              </div>

              {/* Right Column: Key Pillars */}
              <div className="lg:col-span-4 space-y-6">
                 <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Key Pillars</h2>
                 {narrative.pillars.map((pillar, idx) => (
                   <div key={pillar.title} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                      <div className="relative z-10 flex justify-between items-end">
                         <div>
                            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{pillar.title}</div>
                            <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{pillar.value}<span className="text-lg text-gray-400 font-medium ml-1">/ {pillar.total}</span></div>
                         </div>
                         <div className="text-[10px] font-bold text-gray-500 uppercase text-right w-24 leading-tight opacity-60">
                            {pillar.desc}
                         </div>
                      </div>
                      <div className="mt-6 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(pillar.value / pillar.total) * 100}%` }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                            className="h-full bg-indigo-500"
                         />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </div>
                 ))}

                 <div className="p-8 bg-black rounded-3xl text-white space-y-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-2">Next Step</div>
                      <h4 className="font-bold text-lg leading-tight">Activate Optimization Roadmap Phase 1</h4>
                      <Link href="/strategy/optimization" className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                        Go to Optimizer
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                 </div>
              </div>
            </motion.div>
          )}

          {!reportGenerated && !isSynthesizing && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-gray-50/50 dark:bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800"
            >
               <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center text-gray-400 rotate-6 group-hover:rotate-0 transition-transform">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Awaiting Narrative Generation</h3>
                  <p className="text-gray-500 text-sm max-w-sm mt-2">Click the button above to synthesize the latest telemetry into an executive brief.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

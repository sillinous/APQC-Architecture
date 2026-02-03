'use client';

import React, { useState } from 'react';
import { enterprisePolicies } from '@/data/policies';
import { agents } from '@/data/apqc-levels';
const { motion, AnimatePresence } = require('framer-motion') as any;

export default function GovernanceDashboard() {
  const [policies, setPolicies] = useState(enterprisePolicies);
  const [isEmergencyStop, setIsEmergencyStop] = useState(false);

  const togglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const complianceScore = Math.round(
    (policies.filter(p => p.enabled).length / policies.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Urgent Alert Banner */}
        <AnimatePresence>
          {isEmergencyStop && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-red-500/40"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span className="font-black uppercase tracking-tighter text-sm italic">Emergency Swarm Shutdown Active</span>
              </div>
              <button 
                onClick={() => setIsEmergencyStop(false)}
                className="px-4 py-1 bg-white text-red-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Re-Authorize Swarm
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header section with Compliance Gauge */}
        <div className="grid lg:grid-cols-12 gap-12 items-end border-b border-gray-200 dark:border-gray-800 pb-12">
          <div className="lg:col-span-8 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-800 dark:border-gray-200 shadow-xl">
               <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Guardian v4.0</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Policy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-indigo-600">Guardian</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-xl leading-relaxed">
              Centrally enforce architectural guardrails, ethical alignment, and safety protocols across all 103 APQC-aligned agents. 
              The ultimate failsafe for the autonomous enterprise.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center min-w-[280px] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Trust Compliance Score</div>
                <div className={`text-7xl font-black tracking-tighter ${complianceScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {complianceScore}%
                </div>
                <div className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Protocol Alignment Index</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rotate-in group-hover:opacity-100 transition-opacity opacity-0"></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Policy List: Left */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm italic">01</span>
                Active Policy Guardrails
              </h2>
              <button 
                onClick={() => setIsEmergencyStop(true)}
                className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-500/5 active:scale-95"
              >
                Global Kill Switch
              </button>
            </div>

            <div className="grid gap-4">
              {policies.map((policy) => (
                <motion.div
                  key={policy.id}
                  layout
                  className={`p-6 rounded-3xl border transition-all ${
                    policy.enabled 
                    ? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm' 
                    : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        policy.enabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                      }`}>
                         {policy.category === 'privacy' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                         {policy.category === 'ethics' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                         {policy.category === 'cost' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                         {policy.category === 'safety' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                           <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{policy.id}</span>
                           <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                             policy.severity === 'critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                           }`}>{policy.severity}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white italic">{policy.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{policy.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => togglePolicy(policy.id)}
                      className={`w-14 h-8 rounded-full relative transition-colors p-1 ${policy.enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      <motion.div 
                        initial={false}
                        animate={{ x: policy.enabled ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Audit Logs: Right */}
          <div className="lg:col-span-4 space-y-8">
             <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm italic">02</span>
              Compliance Log
            </h2>

            <div className="space-y-4">
              {[1,2,3,4].map(i => {
                const randomAgent = agents[Math.floor(Math.random() * agents.length)];
                return (
                  <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-3xl shadow-sm group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">11:{30 + i}:45 AM</span>
                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Pass</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{randomAgent.name}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 italic opacity-60">Verified via Zero-Leak PII Protocol</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="relative z-10 space-y-4 text-center">
                 <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400">Governance Report</h4>
                 <div className="text-4xl font-black tracking-tighter">Healthy</div>
                 <p className="text-gray-400 text-xs leading-relaxed">
                   All active nodes are currently operating within the established safety manifold.
                 </p>
                 <button className="w-full py-3 bg-white text-gray-950 font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-transform">
                   Generate Full Audit
                 </button>
               </div>
               <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotate-in {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

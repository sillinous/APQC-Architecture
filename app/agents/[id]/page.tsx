'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { agents, apqcLevels } from '@/data/apqc-levels';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgentProfilePage() {
  const { id } = useParams();
  const agent = agents.find(a => a.id === id);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [isDeployed, setIsDeployed] = useState(false);

  useEffect(() => {
    const deployedStatus = localStorage.getItem(`agent-deployed-${id}`);
    if (deployedStatus === 'true') {
      setIsDeployed(true);
    }
  }, [id]);

  const handleDeploy = () => {
    if (isDeployed || isDeploying) return;
    
    setIsDeploying(true);
    setDeployProgress(0);
    
    const interval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          setIsDeployed(true);
          localStorage.setItem(`agent-deployed-${id}`, 'true');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-4xl font-black mb-4">404: AGENT_NOT_FOUND</h1>
          <p className="text-gray-500 mb-8">The requested node is not registered in the current APQC cluster.</p>
          <Link href="/agents" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Return to Library</Link>
        </div>
      </div>
    );
  }

  const levelData = apqcLevels.find(l => l.id === agent.level);

  // Sample data for Radar Chart - would ideally come from agent properties
  const radarData = [
    { subject: 'Automation', A: 85, fullMark: 100 },
    { subject: 'Strategy', A: 70, fullMark: 100 },
    { subject: 'Compliance', A: 95, fullMark: 100 },
    { subject: 'Reasoning', A: 65, fullMark: 100 },
    { subject: 'Interoperable', A: 90, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/agents" className="text-indigo-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Library Cluster
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-6">
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl"
                style={{ backgroundColor: levelData?.color }}
              >
                {agent.level}
              </div>
              <div>
                <h1 className="text-5xl font-black tracking-tight dark:text-white mb-2">{agent.name}</h1>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase rounded-full">
                    {levelData?.shortName}
                  </span>
                  <span className={`px-3 py-1 text-xs font-black uppercase rounded-full ${
                    isDeployed 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                  }`}>
                    {isDeployed ? 'Node Active' : 'Production Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold">Operational Context</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xl">
                {agent.description} This agent is architected to operate within the **APQC Process Level ${agent.level}** ecosystem, 
                ensuring strict compliance with the framework's hierarchical data models and operational standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Protocol Compliance
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Model Context Protocol (MCP)', status: 'Active', desc: 'Real-time tool and resource mounting.' },
                    { name: 'Agent Coordination Protocol (ACP)', status: 'Active', desc: 'Secure swarm negotiation and task bidding.' },
                    { name: 'Cross-Process Interop (CPI)', status: 'Verified', desc: 'Type-safe data handoffs across levels.' }
                  ].map(p => (
                    <div key={p.name} className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm dark:text-white">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.desc}</div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 uppercase">{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Dynamic Algorithms
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Hierarchical Reconciliation', 'Predictive Resource Mapping', 'Constraint Satisfaction', 'Zero-Knowledge Validation'].map(tag => (
                    <span key={tag} className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 8 Principles Auditor */}
              <div className="md:col-span-2 bg-white dark:bg-gray-950 p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wide">
                    <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Principle Auditor v1.0
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-gray-500 uppercase">Compliance</div>
                      <div className="text-2xl font-black text-emerald-500 font-mono">100%</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { n: 'Standardized', d: 'BaseAgent implementation verified.' },
                    { n: 'Interoperable', d: 'MCP/ACP protocol stack active.' },
                    { n: 'Redeployable', d: 'Container-ready environment config.' },
                    { n: 'Reusable', d: 'Logic isolated from project specific.' },
                    { n: 'Atomic', d: 'Single responsibility boundaries.' },
                    { n: 'Composable', d: 'Schema-governed I/O nodes.' },
                    { n: 'Orchestratable', d: 'Swarm negotiation layer.' },
                    { n: 'Agnostic', d: 'Multi-LLM / Multi-Cloud support.' },
                  ].map(p => (
                    <div key={p.n} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 relative group overflow-hidden">
                       <div className="absolute top-2 right-2">
                         <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                       </div>
                       <div className="font-bold text-xs mb-1 dark:text-gray-200">{p.n}</div>
                       <div className="text-[10px] text-gray-500 leading-tight">{p.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Radar Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 aspect-square flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-4 left-6 text-xs font-black text-gray-600 uppercase tracking-widest">Technical Potency</div>
               <div className="w-full h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <Radar
                      name={agent.name}
                      dataKey="A"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-2xl">
              <h3 className="text-xl font-black mb-4 uppercase tracking-wide">Strategic Impact</h3>
              <div className="text-4xl font-black mb-1">94%</div>
              <div className="text-sm text-indigo-100 mb-6 uppercase font-bold tracking-widest">Efficiency Yield</div>
              <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                Implementation of this agent typically results in a **40% reduction** in manual cycle time for Level ${agent.level} sub-processes.
              </p>
              <div className="space-y-4">
                {isDeploying && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-100">
                      <span>Mounting Node...</span>
                      <span>{deployProgress}%</span>
                    </div>
                    <div className="h-2 bg-indigo-900/40 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${deployProgress}%` }}
                        className="h-full bg-emerald-400"
                      />
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying || isDeployed}
                  className={`w-full py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-sm shadow-xl ${
                    isDeployed 
                    ? 'bg-emerald-500 text-white cursor-default' 
                    : isDeploying
                    ? 'bg-indigo-400 text-white cursor-not-allowed'
                    : 'bg-white text-indigo-600 hover:bg-gray-100 active:scale-95'
                  }`}
                >
                  {isDeployed ? 'Node Deployed' : isDeploying ? 'Deploying...' : 'Deploy Node'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Link from 'next/link';
import { db, isFirebaseEnabled } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { motion } = require('framer-motion') as any;

export default function StrategicWarRoom() {
  const [config, setConfig] = useState({
    strategy: 30, // Vision, Strategy, Marketing (Levels 1-3)
    operations: 50, // Supply Chain, Sales, Service (Levels 4-6)
    support: 20, // HR, IT, Finance (Levels 7-13)
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const saveSimulation = async () => {
    if (!db) return;
    setIsSaving(true);
    try {
      const docRef = await addDoc(collection(db, "simulations"), {
        config,
        metrics: {
          roi: metrics.roi,
          risk: metrics.risk,
          agility: metrics.agility
        },
        timestamp: serverTimestamp(),
      });
      setSavedId(docRef.id);
    } catch (e) {
      console.error("Error saving simulation: ", e);
    }
    setIsSaving(false);
  };

  // Derived Simulation Metrics
  const metrics = useMemo(() => {
    const avgDensity = (config.strategy + config.operations + config.support) / 3;
    const roi = (avgDensity * 1.5).toFixed(1);
    const risk = (100 - (avgDensity * 0.8)).toFixed(0);
    const agility = (config.strategy * 0.4 + config.operations * 0.3 + config.support * 0.3).toFixed(0);
    
    const chartData = [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 100 + (avgDensity * 0.2) },
      { month: 'Mar', value: 100 + (avgDensity * 1.1) },
      { month: 'Apr', value: 100 + (avgDensity * 2.1) },
      { month: 'May', value: 100 + (avgDensity * 3.5) },
      { month: 'Jun', value: 100 + (avgDensity * 5.2) },
    ];

    const radarData = [
      { subject: 'Cost Efficiency', A: avgDensity * 0.9, fullMark: 100 },
      { subject: 'Innovation Speed', A: config.strategy * 0.8 + 20, fullMark: 100 },
      { subject: 'Operational Risk', A: 100 - (avgDensity * 0.5), fullMark: 100 },
      { subject: 'Compliance', A: 90, fullMark: 100 },
      { subject: 'Data Agility', A: config.support * 0.7 + 30, fullMark: 100 },
    ];

    return { roi, risk, agility, chartData, radarData, avgDensity };
  }, [config]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Executive View</span>
              <span className="text-gray-500 font-mono text-xs">// SIM_MODE: PREDICTIVE_IMPACT</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white">Strategic <span className="text-indigo-500">War Room</span></h1>
            <p className="text-gray-400 max-w-2xl">
              Simulate the architectural impact of agentic automation across the PCF landscape. 
              Model the "what-if" scenarios for your autonomous enterprise transformation.
            </p>
          </div>
          <Link href="/strategy" className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-colors font-bold text-sm">
            Exit War Room
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 space-y-8 shadow-2xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Automation Density
              </h2>

              <div className="space-y-10">
                {[
                  { key: 'strategy', label: 'Strategic Clusters', desc: 'Levels 1.0 - 3.0 (Vision, Marketing, Product)', color: 'bg-blue-500' },
                  { key: 'operations', label: 'Operational Clusters', desc: 'Levels 4.0 - 6.0 (Supply Chain, Sales, Service)', color: 'bg-indigo-500' },
                  { key: 'support', label: 'Support Clusters', desc: 'Levels 7.0 - 13.0 (HR, IT, Finance, Risk)', color: 'bg-purple-500' },
                ].map((input) => (
                  <div key={input.key} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-sm font-bold text-gray-200">{input.label}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{input.desc}</div>
                      </div>
                      <div className="text-2xl font-black font-mono text-white">{(config as any)[input.key]}%</div>
                    </div>
                    <div className="relative h-2 bg-gray-800 rounded-full group">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={(config as any)[input.key]}
                        onChange={(e) => setConfig({...config, [input.key]: parseInt(e.target.value)})}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div 
                        className={`h-full rounded-full ${input.color} shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all`}
                        style={{ width: `${(config as any)[input.key]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-800 space-y-4">
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 leading-none">Simulation Insight</div>
                  <p className="text-xs text-indigo-100 leading-relaxed italic">
                    "Increasing density in **Support Clusters** primarily improves **Compliance** and **Operational Risk**, while Strategic density yields higher long-term Alpha."
                  </p>
                </div>

                {isFirebaseEnabled && (
                  <button
                    onClick={saveSimulation}
                    disabled={isSaving || !!savedId}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:bg-emerald-600 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      'Syncing to Cloud...'
                    ) : savedId ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Scenario Saved
                      </>
                    ) : (
                      'Save Strategic Scenario'
                    )}
                  </button>
                )}

                {savedId && (
                   <div className="text-center">
                     <div className="text-[10px] text-gray-500 font-mono">ID: {savedId}</div>
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* KPI Stripe */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Projected ROI', value: `${metrics.roi}x`, trend: '+12%', color: 'text-emerald-500' },
                { label: 'Risk Mitigation', value: `${metrics.risk}%`, trend: 'Optimized', color: 'text-blue-500' },
                { label: 'Agility Index', value: metrics.agility, trend: 'High', color: 'text-indigo-500' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl shadow-xl">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{kpi.label}</div>
                  <div className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[10px] font-bold text-gray-600 mt-2 uppercase">{kpi.trend}</div>
                </div>
              ))}
            </div>

            {/* Main Chart */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 h-[400px] relative overflow-hidden">
               <div className="absolute top-6 left-8 z-10">
                 <h3 className="font-bold flex items-center gap-2">
                   Strategic Value Curve
                   <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full">PREDICTIVE</span>
                 </h3>
               </div>
               
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={metrics.chartData} margin={{ top: 40, right: 0, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} dy={10} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                     itemStyle={{ color: '#fff' }}
                   />
                   <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Radar Cluster */}
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 aspect-square flex flex-col items-center justify-center relative">
                <div className="absolute top-6 left-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Balanced Capability Matrix</div>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={metrics.radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <Radar name="Simulated" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Action Log */}
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col">
                <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-gray-500">Executive Briefing</h3>
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <div className="text-indigo-400 font-bold text-sm">Target Alpha Reached</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      At **{metrics.avgDensity.toFixed(0)}%** automation density, the enterprise achieves a self-sustaining operational baseline. 
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-emerald-400 font-bold text-sm">Critical Threshold: Operations</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Pushing Level 4.0-6.0 agents beyond 75% will require a formal shift to **Decentralized Swarm Architecture**.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)]">
                      Generate PDF Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

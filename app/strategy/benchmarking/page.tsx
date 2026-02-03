'use client';

import React, { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { industryBenchmarks } from '@/data/benchmarks';
import { apqcLevels } from '@/data/apqc-levels';
import Link from 'next/link';
const { motion } = require('framer-motion') as any;

export default function BenchmarkingHub() {
  const [selectedIndustryId, setSelectedIndustryId] = useState(industryBenchmarks[0].id);

  const selectedBenchmark = useMemo(() => 
    industryBenchmarks.find(b => b.id === selectedIndustryId) || industryBenchmarks[0]
  , [selectedIndustryId]);

  // Mock enterprise data (would normally fetch from Firebase/MaturityAssessment)
  const enterpriseMaturity = {
    '1.0': 3.2,
    '2.0': 2.8,
    '3.0': 4.1,
    '4.0': 3.5,
    '5.0': 2.2,
    '6.0': 3.8,
    '7.0': 4.5,
    '8.0': 2.9,
    '9.0': 3.3,
    '10.0': 4.0,
    '11.0': 2.5,
    '12.0': 3.1,
    '13.0': 3.4,
  };

  const chartData = useMemo(() => {
    return apqcLevels.map(level => ({
      subject: level.shortName,
      enterprise: enterpriseMaturity[level.id as keyof typeof enterpriseMaturity] || 0,
      benchmark: selectedBenchmark.scores[level.id] || 0,
      fullMark: 5,
    }));
  }, [selectedBenchmark, enterpriseMaturity]);

  const gaps = useMemo(() => {
    return apqcLevels.map(level => {
      const enterprise = enterpriseMaturity[level.id as keyof typeof enterpriseMaturity] || 0;
      const benchmark = selectedBenchmark.scores[level.id] || 0;
      const diff = enterprise - benchmark;
      return {
        id: level.id,
        name: level.name,
        diff: parseFloat(diff.toFixed(1)),
        status: diff > 0.5 ? 'lead' : diff < -0.5 ? 'lag' : 'par'
      };
    }).sort((a, b) => a.diff - b.diff);
  }, [selectedBenchmark, enterpriseMaturity]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header section with Industry Selector */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gray-200 dark:border-gray-800 pb-12">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800">
               <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.993 7.993 0 002 12a7.998 7.998 0 007 7.938V4.804zM11 4.804V19.938A7.998 7.998 0 0018 12a7.993 7.993 0 00-7-7.196z" /></svg>
               <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Competitive Insights v1.0</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Benchmarks</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-xl leading-relaxed">
              Compare your agentic maturity against industry-leading benchmarks. 
              Identify competitive gaps and set high-octane performance targets for your autonomous workforce.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Select Industry Sector</label>
             <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                {industryBenchmarks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedIndustryId(b.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      selectedIndustryId === b.id 
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {b.name.split(' ')[0]}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Radar Visualization: Left */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                  Comparative Radar
                </h2>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-[10px] font-bold text-gray-500">Benchmark</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span className="text-[10px] font-bold text-gray-500">Your Enterprise</span>
                   </div>
                </div>
             </div>

             <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#6b7280' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar
                      name="Benchmark"
                      dataKey="benchmark"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Enterprise"
                      dataKey="enterprise"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.5}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="absolute top-0 right-0 p-8">
                <div className="text-right">
                   <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry Average</div>
                   <div className="text-4xl font-black tracking-tighter text-amber-500">
                      {(Object.values(selectedBenchmark.scores).reduce((a,b) => a+b, 0) / 13).toFixed(1)}
                   </div>
                </div>
             </div>
          </div>

          {/* Gap Analysis: Right */}
          <div className="lg:col-span-5 space-y-8">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tight">Competitive Gaps</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sorted by Variance</span>
             </div>

             <div className="space-y-3">
                {gaps.map((gap, i) => (
                  <motion.div
                    key={gap.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                         gap.status === 'lead' ? 'bg-emerald-50 text-emerald-600' :
                         gap.status === 'lag' ? 'bg-red-50 text-red-600' :
                         'bg-gray-50 text-gray-400'
                       }`}>
                          {gap.id}
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate w-48">{gap.name}</h4>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${
                            gap.status === 'lead' ? 'text-emerald-500' :
                            gap.status === 'lag' ? 'text-red-500' :
                            'text-gray-400'
                          }`}>{gap.status === 'lead' ? 'Market Advantage' : gap.status === 'lag' ? 'Strategic Deficit' : 'Market Standard'}</span>
                       </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                       <div className={`text-lg font-black tracking-tighter ${gap.diff >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {gap.diff > 0 ? `+${gap.diff}` : gap.diff}
                       </div>
                       <div className="flex gap-1 h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1">
                          <div className={`h-full ${gap.diff >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.abs(gap.diff) * 20}%` }}></div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>

             <div className="bg-amber-500 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                   <h4 className="font-black text-xs uppercase tracking-widest text-amber-200">Recommended Action</h4>
                   <p className="text-xl font-bold leading-tight">
                     Closing the gap in <span className="underline decoration-amber-300">Level 5.0 (Tech)</span> would increase your competitive positioning by 22% in the {selectedBenchmark.name} sector.
                   </p>
                   <Link href="/strategy/optimization" className="inline-flex py-3 px-6 bg-white text-gray-950 font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-transform">
                      View Optimization Plan
                   </Link>
                </div>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

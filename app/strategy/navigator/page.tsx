'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { apqcLevels } from '@/data/apqc-levels';
const { motion, AnimatePresence } = require('framer-motion') as any;

export default function ProcessNavigator() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  // Constants for Sunburst
  const size = 600;
  const center = size / 2;
  const innerRadius = 80;
  const outerRadius = 280;
  const angleStep = (2 * Math.PI) / apqcLevels.length;

  const getPath = (index: number, inner: number, outer: number) => {
    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = (index + 1) * angleStep - Math.PI / 2;
    
    const x1 = center + inner * Math.cos(startAngle);
    const y1 = center + inner * Math.sin(startAngle);
    const x2 = center + outer * Math.cos(startAngle);
    const y2 = center + outer * Math.sin(startAngle);
    const x3 = center + outer * Math.cos(endAngle);
    const y3 = center + outer * Math.sin(endAngle);
    const x4 = center + inner * Math.cos(endAngle);
    const y4 = center + inner * Math.sin(endAngle);

    const largeArc = angleStep > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outer} ${outer} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${inner} ${inner} 0 ${largeArc} 0 ${x1} ${y1} Z`;
  };

  const activeLevelData = apqcLevels.find(l => l.id === hoveredLevel);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Info Panel */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Framework Satellite View</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Navigator</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              Explore the entire 13-level APQC Strategic Framework in a single unified cockpit. 
              Hover over segments to audit implementation density and strategic alignment.
            </p>
          </div>

          <div className="h-[300px] relative">
            <AnimatePresence mode="wait">
              {activeLevelData ? (
                <motion.div
                  key={activeLevelData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4 h-full flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${activeLevelData.color} flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-xl font-black italic">{activeLevelData.id}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{activeLevelData.name}</h3>
                      <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">{activeLevelData.shortName}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{activeLevelData.description}"</p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Agent Count</div>
                      <div className="text-xl font-black text-indigo-500">{activeLevelData.agentCount}</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Execution Ready</div>
                      <div className="text-xl font-black text-emerald-500">{activeLevelData.implementedCount}</div>
                    </div>
                  </div>
                  <Link 
                    href="/framework" 
                    className="mt-2 block w-full text-center py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black uppercase tracking-widest text-[10px] rounded-xl transition-transform active:scale-95"
                  >
                    Enter Deep Audit
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50/50 dark:bg-gray-900/20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  </div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select a Segment</div>
                  <p className="text-xs text-gray-500 mt-2">Interact with the Sunburst to explore level-specific metrics.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Sunburst Chart */}
        <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
          <div className="relative w-[600px] h-[600px]">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl">
              {/* Central Core */}
              <circle cx={center} cy={center} r={innerRadius - 5} className="fill-gray-100 dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-800" strokeWidth={2} />
              <text x={center} y={center - 5} textAnchor="middle" className="fill-gray-900 dark:fill-white font-black text-xl italic tracking-tighter">APQC</text>
              <text x={center} y={center + 15} textAnchor="middle" className="fill-gray-500 dark:fill-gray-600 font-black text-[8px] uppercase tracking-[0.3em]">Core v1.0</text>
              
              {/* Segments */}
              {apqcLevels.map((level, i) => (
                <motion.path
                  key={level.id}
                  d={getPath(i, innerRadius, outerRadius)}
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredLevel === level.id ? 'fill-indigo-500 dark:fill-indigo-400' : 'fill-gray-50 dark:fill-gray-900/80 stroke-gray-200 dark:stroke-gray-800'
                  }`}
                  strokeWidth={2}
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  whileHover={{ scale: 1.02 }}
                />
              ))}

              {/* Segment Labels (Minimalist) */}
              {apqcLevels.map((level, i) => {
                const angle = i * angleStep + angleStep / 2 - Math.PI / 2;
                const r = (innerRadius + outerRadius) / 2;
                const tx = center + r * Math.cos(angle);
                const ty = center + r * Math.sin(angle);
                const rotation = (angle * 180) / Math.PI + 90;

                return (
                  <text
                    key={`label-${level.id}`}
                    x={tx}
                    y={ty}
                    transform={`rotate(${rotation}, ${tx}, ${ty})`}
                    textAnchor="middle"
                    className={`font-black pointer-events-none transition-colors duration-300 pointer-events-none ${
                        hoveredLevel === level.id ? 'fill-white' : 'fill-gray-400 dark:fill-gray-600'
                    }`}
                    style={{ fontSize: 14 }}
                  >
                    {level.id}
                  </text>
                );
              })}

              {/* Exterior Decorative ring */}
              <circle cx={center} cy={center} r={outerRadius + 20} className="fill-none stroke-indigo-500/10 dark:stroke-indigo-400/5 rotate-in" strokeWidth={1} strokeDasharray="10 5" />
            </svg>
            
            {/* Visual Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotate-in {
            animation: rotate 120s linear infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); transform-origin: center; }
            to { transform: rotate(360deg); transform-origin: center; }
        }
      `}</style>
    </div>
  );
}

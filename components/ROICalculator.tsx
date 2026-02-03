'use client';

import React from 'react';
import { agents } from '@/data/apqc-levels';
const { motion } = require('framer-motion') as any;

export default function ROICalculator() {
  const agentsWithFinancials = agents.filter(a => a.estimatedSavings && a.implementationCost);
  
  const totalSavings = agentsWithFinancials.reduce((sum, a) => sum + (a.estimatedSavings || 0), 0);
  const totalCost = agentsWithFinancials.reduce((sum, a) => sum + (a.implementationCost || 0), 0);
  const avgROI = totalCost > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Agent ROI Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
          <div className="text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase mb-1">Total Est. Savings</div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
            ${totalSavings.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600/70 mt-1">Annual projected</div>
        </div>

        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
          <div className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase mb-1">Implementation Cost</div>
          <div className="text-3xl font-black text-blue-700 dark:text-blue-300">
            ${totalCost.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600/70 mt-1">One-time investment</div>
        </div>

        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
          <div className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase mb-1">Efficiency ROI</div>
          <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300">
            {avgROI.toFixed(1)}%
          </div>
          <div className="mt-2 h-1.5 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(avgROI / 5, 100)}%` }}
              className="h-full bg-indigo-500"
            />
          </div>
          <div className="text-[10px] text-indigo-600/70 mt-1 uppercase font-bold tracking-tighter">Yield Multiplier</div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-gray-900 dark:text-white flex justify-between items-center">
          <span>Target Agents for Optimization</span>
          <span className="text-sm font-normal text-gray-500">{agentsWithFinancials.length} Active Agents</span>
        </h4>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {agentsWithFinancials.map(agent => (
            <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{agent.name}</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">Level {agent.level} • {agent.complexity} complexity</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-600 font-bold items-center flex gap-1 justify-end">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  ${(agent.estimatedSavings || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-400">Implementation: ${(agent.implementationCost || 0).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

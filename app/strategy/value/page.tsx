'use client';

import React from 'react';
import MaturityAssessment from '@/components/MaturityAssessment';
import ROICalculator from '@/components/ROICalculator';
import Link from 'next/link';

export default function ValueRealizationHub() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Realization</span> Hub
              </h1>
              <p className="text-xl text-indigo-100/80 mb-8 leading-relaxed">
                Transform your APQC framework from a theoretical model into a value-generating engine. 
                Measure maturity, track agent ROI, and accelerate digital transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/strategy" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all border border-white/10">
                  ← Back to Strategy Hub
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/3">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                  <div className="text-sm font-bold text-indigo-300 uppercase mb-4">Live Ecosystem Stats</div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-100/60">Monitored Assets</span>
                      <span className="font-mono font-bold">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-100/60">Active Agents</span>
                      <span className="font-mono font-bold">103</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400">
                      <span>Efficiency Gain</span>
                      <span className="font-mono font-bold">+22.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Organizational Maturity</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Assess how effectively your organization has integrated the APQC Process Classification Framework. 
                  Identify gaps and benchmark against world-class agent-driven operations.
                </p>
              </div>
              <MaturityAssessment />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Financial Impact Tracking</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Quantify the economic value of your autonomous agent ecosystem. 
                  View aggregated ROI metrics based on real-world implementation data and efficiency gains.
                </p>
              </div>
              <ROICalculator />
            </div>

          </div>
        </div>
      </section>

      {/* Strategic Integration */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Connect to the Strategy Stack</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Value creation doesn't happen in isolation. Our framework integrates maturity levels with architectural 
              principles and long-term roadmaps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/strategy/principles" className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl transition-all border border-transparent hover:border-emerald-500/30">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Architectural Principles</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ensure all agents follow the standardized design protocols that drive long-term value.
              </p>
            </Link>

            <Link href="/roadmap" className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl transition-all border border-transparent hover:border-orange-500/30">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strategic Roadmap</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Visualize the implementation timeline for higher-maturity processes and higher-ROI agents.
              </p>
            </Link>

            <Link href="/framework" className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl transition-all border border-transparent hover:border-blue-500/30">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Process Explorer</h3>
              <div className="text-gray-500 text-sm leading-relaxed">
                Dive deep into all 13 APQC levels to find more opportunities for agent-based optimization.
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { togafAdmPhases } from '@/data/togaf';
import { architecturePrinciples } from '@/data/principles';
import { roadmapPhases } from '@/data/roadmap';

export default function StrategyDashboard() {
  const completedPhases = togafAdmPhases.filter(p => p.status === 'completed').length;
  const inProgressPhases = togafAdmPhases.filter(p => p.status === 'in-progress').length;
  const progressPercent = Math.round((completedPhases / togafAdmPhases.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Strategic Planning Hub</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Integrated tools for Enterprise Architecture management, from TOGAF ADM tracking
            to architectural principles and strategic roadmapping.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* TOGAF ADM Explorer */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">TOGAF ADM Tracker</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Track your progress through the Architecture Development Method cycles and manage phase deliverables.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Cycle Progress</span>
                    <span className="font-bold text-blue-600">{progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-700 dark:text-blue-300">
                      <strong>{completedPhases}</strong> Completed
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg text-indigo-700 dark:text-indigo-300">
                      <strong>{inProgressPhases}</strong> Active
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/strategy/togaf"
                  className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Manage ADM Cycle
                </Link>
              </div>
            </div>

            {/* Architecture Principles */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Architecture Principles</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Standardized principles that govern the design and implementation of agents and systems.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {architecturePrinciples.slice(0, 5).map(p => (
                    <span key={p.id} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                      {p.name}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-full text-xs font-medium">
                    +{architecturePrinciples.length - 5} more
                  </span>
                </div>
              </div>
              <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/strategy/principles"
                  className="block w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Explore Principles
                </Link>
              </div>
            </div>

            {/* Strategic Roadmap */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Strategic Roadmap</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Visualization of architectural evolution and capability implementation phases.
                </p>
                <div className="space-y-3 mb-6">
                  {roadmapPhases.slice(0, 2).map(phase => (
                    <div key={phase.id} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{phase.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{phase.timeframe}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/roadmap"
                  className="block w-full text-center py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
                >
                  View Full Roadmap
                </Link>
              </div>
            </div>

            {/* Value Realization Hub */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Value Realization</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                  Assess organizational maturity and calculate the ROI of your autonomous agent ecosystem.
                </p>
              </div>
              <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/strategy/value"
                  className="block w-full text-center py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Enter Value Hub
                </Link>
              </div>
            </div>

            {/* Orchestration Canvas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            </div>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Action</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Orchestration Canvas</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
              Visual drag-and-drop workspace. Map agents to APQC process tracks and simulate autonomous workflows.
            </p>
            <Link 
              href="/strategy/canvas"
              className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Open Canvas
            </Link>
          </div>
        </div>

        {/* Strategic Benchmarking */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-amber-50 dark:bg-amber-900/30 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Comparative</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Benchmarking Hub</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
              Industry-standard competitive analysis. Compare your maturity against tech, finance, and manufacturing benchmarks.
            </p>
            <Link 
              href="/strategy/benchmarking"
              className="block w-full text-center py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
            >
              Compare Performance
            </Link>
          </div>
        </div>

        {/* Strategic Reports */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Executive</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Executive Reports</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
              Data-driven strategic narratives. Synthesize telemetry into board-ready presentations and action plans.
            </p>
            <Link 
              href="/strategy/reports"
              className="block w-full text-center py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-purple-500/20"
            >
              Generate Draft
            </Link>
          </div>
        </div>

        {/* Enterprise Governance */}
        <div className="bg-gray-950 rounded-2xl shadow-sm border border-gray-800 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-red-500/10 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-gray-900 border border-red-500/20 rounded-xl shadow-sm flex items-center justify-center text-red-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Active Guardian</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Policy Guardian</h3>
            <p className="text-gray-400 text-sm mb-6 flex-1">
              Enforce ethical guardrails and safety protocols. Monitor the global alignment and trust index of the swarm.
            </p>
            <Link 
              href="/strategy/governance"
              className="block w-full text-center py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>

        {/* Strategic Optimization */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Prescriptive</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Optimization Hub</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
              Data-driven agent deployment roadmap. Convert maturity gaps into prioritized strategic actions.
            </p>
            <Link 
              href="/strategy/optimization"
              className="block w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
            >
              Analyze Roadmap
            </Link>
          </div>
        </div>

        {/* Global Process Navigator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:col-span-3 lg:col-span-1">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 flex items-center justify-between">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2.5 5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L14 17l-5 3.5z" /></svg>
            </div>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">New</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Navigator</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
              Interactive "Satellite View" of the entire 13-level framework. Map implementation density and strategic gaps.
            </p>
            <Link 
              href="/strategy/navigator"
              className="block w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
            >
              Launch Navigator
            </Link>
          </div>
        </div>

        {/* Strategic War Room */}
            <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 italic tracking-tight">Strategic War Room</h2>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  Predictive impact modeling for enterprise-wide automation. Simulate ROI and Risk across process clusters.
                </p>
                <div className="flex gap-2">
                   <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[60%] animate-pulse" />
                   </div>
                   <div className="text-[10px] font-black text-indigo-400 uppercase">SIM_ACTIVE</div>
                </div>
              </div>
              <div className="mt-auto p-6 bg-gray-900/50 border-t border-gray-800">
                <Link 
                  href="/strategy/war-room"
                  className="block w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_10px_20px_rgba(79,70,229,0.2)]"
                >
                  Enter Simulation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Strategic Planning Resources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'APQC Framework', link: '/framework', icon: '📊' },
              { name: 'Agent Catalog', link: '/agents', icon: '🤖' },
              { name: 'Workflow Builder', link: '/workflows', icon: '⚡' },
              { name: 'Documentation', link: '/resources', icon: '📚' }
            ].map(item => (
              <Link 
                key={item.name}
                href={item.link}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

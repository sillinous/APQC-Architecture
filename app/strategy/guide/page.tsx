import React from 'react';
import Link from 'next/link';

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-900 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-500/20 hover:scale-110 transition-transform">
              AQ
            </Link>
            <div>
              <h1 className="text-sm font-black italic tracking-tighter text-gray-900 dark:text-white uppercase leading-none">System Protocol</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">User Guide & Methodology</p>
            </div>
          </div>
          <Link href="/strategy/canvas" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-500 transition-colors">
            Back to Canvas
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-24 space-y-24">
        {/* Introduction */}
        <section className="space-y-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Foundational Architecture
          </div>
          <h2 className="text-6xl font-black italic text-gray-900 dark:text-white tracking-tighter leading-none">
            Welcome to the <br/><span className="text-indigo-600 dark:text-indigo-500">Neural Workforce.</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            The APQC Strategic Framework uses a tiered neural layer to bridge high-level business process classifications with autonomous AI delivery.
          </p>
        </section>

        {/* Use Cases */}
        <section className="space-y-12">
          <h3 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-tight border-l-4 border-indigo-500 pl-6">
            Strategic Scenarios
          </h3>
          
          <div className="grid gap-8">
            <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500 flex items-center justify-center text-3xl shadow-xl shadow-indigo-500/20 transition-transform group-hover:rotate-12">🚀</div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-black italic text-gray-900 dark:text-white tracking-tight leading-none uppercase">Strategic Market Launch</h4>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
                    Problem: You need to launch a new SaaS product in the APAC region but lack localized pricing and market sentiment data.
                  </p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-[10px] font-black text-white">1</div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Deploy "Analyze Market Trends" agent to the Level 1 lane.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-[10px] font-black text-white">2</div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Deploy "Manage Pricing" and use A2A Link to connect the analyst's output.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-[10px] font-black text-white">3</div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Run the chain. The pricing agent will base its strategy on real-time market insights.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500 flex items-center justify-center text-3xl shadow-xl shadow-indigo-500/20 transition-transform group-hover:rotate-12">🛡️</div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-black italic text-gray-900 dark:text-white tracking-tight leading-none uppercase">Autonomous Quality Swarm</h4>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
                    Goal: Reach 99.9% manufacturing uptime by automating supplier audit triggers.
                  </p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white">F</div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Chain: "Develop Process Strategy" {"->"} "Perform Quality Control" {"->"} "Perform Vendor Audit".</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="space-y-12">
          <h3 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-tight border-l-4 border-indigo-500 pl-6">
            Core Methodology
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <h5 className="font-black italic uppercase text-indigo-500 text-[10px] tracking-widest">MCP (Model Context Protocol)</h5>
              <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                Our agents aren't generic chatbots. They use the Model Context Protocol to bridge LLM reasoning with internal tools, databases, and APIs.
              </p>
            </div>
            <div className="space-y-4 p-8 bg-black text-white rounded-[2.5rem]">
              <h5 className="font-black italic uppercase text-indigo-400 text-[10px] tracking-widest">A2A (Agent-to-Agent)</h5>
              <p className="text-sm font-medium leading-relaxed opacity-80">
                The real power of the system lies in coordination. By linking agents together on the canvas, you create a compound intelligence flow where each node builds on the last.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-gray-100 dark:border-gray-900 text-center">
        <div className="text-[10px] font-black italic text-gray-400 uppercase tracking-[0.3em]">
          End of Protocol // Authorized Users Only
        </div>
      </footer>
    </div>
  );
}

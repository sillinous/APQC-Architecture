'use client';

import React, { useState, useRef, useEffect } from 'react';
import { agents, apqcLevels } from '@/data/apqc-levels';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import UserGuide from '@/components/UserGuide';

interface CanvasAgent {
  id: string;
  agentId: string;
  level: string;
  x: number;
  y: number;
  isExecuting?: boolean;
  output?: string;
  error?: string;
  toolCalls?: any[];
  sourceAgentId?: string; // For A2A coordination
  config?: {
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
  }
}

export default function OrchestrationCanvas() {
  const [placedAgents, setPlacedAgents] = useState<CanvasAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [activeExecutionId, setActiveExecutionId] = useState<string | null>(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Constants
  const swimlaneWidth = 350;
  const swimlaneHeaderHeight = 60;

  // Persistence: Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apqc-canvas-agents');
    if (saved) {
      try {
        setPlacedAgents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved agents", e);
      }
    }
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    if (placedAgents.length > 0) {
      localStorage.setItem('apqc-canvas-agents', JSON.stringify(placedAgents));
    }
  }, [placedAgents]);

  const addAgentToCanvas = (agentId: string, level: string) => {
    const newAgent: CanvasAgent = {
      id: `placed-${Date.now()}`,
      agentId,
      level,
      x: 20 + Math.random() * 50,
      y: swimlaneHeaderHeight + 20 + Math.random() * 200,
    };
    setPlacedAgents(prev => [...prev, newAgent]);
    setSelectedAgentId(null);
  };

  const setSourceAgent = (id: string, sourceId: string | undefined) => {
    setPlacedAgents(prev => prev.map(a => 
      a.id === id ? { ...a, sourceAgentId: sourceId } : a
    ));
  };

  const removeAgent = (id: string) => {
    setPlacedAgents(prev => prev.filter(a => a.id !== id));
    if (activeExecutionId === id) setActiveExecutionId(null);
  };

  const executeAgent = async (id: string) => {
    const agent = placedAgents.find(a => a.id === id);
    if (!agent || agent.isExecuting) return;

    setActiveExecutionId(id);
    setPlacedAgents(prev => prev.map(a => 
      a.id === id ? { ...a, isExecuting: true, output: undefined, error: undefined } : a
    ));

    // Prepare context with source agent output if linked
    const context: Record<string, string> = {};
    if (agent.sourceAgentId) {
      const sourceAgent = placedAgents.find(a => a.id === agent.sourceAgentId);
      if (sourceAgent?.output) {
        context.data = `Previous Analysis from Agent [${sourceAgent.agentId}]: \n\n${sourceAgent.output}`;
      }
    }

    try {
      const response = await fetch('/api/neural/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.agentId,
          context: context,
          overrides: agent.config
        })
      });

      const data = await response.json();
      
      setPlacedAgents(prev => prev.map(a => 
        a.id === id ? { 
          ...a, 
          isExecuting: false, 
          output: data.success ? data.output : undefined,
          error: data.success ? undefined : data.error,
          toolCalls: data.success ? data.toolCalls : undefined
        } : a
      ));
    } catch (err: any) {
      setPlacedAgents(prev => prev.map(a => 
        a.id === id ? { ...a, isExecuting: false, error: err.message } : a
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans overflow-hidden">
      
      {/* Top Controller Bar */}
      <div className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shrink-0 z-30">
        <div className="flex items-center gap-6">
          <Link href="/strategy" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Orchestration <span className="text-indigo-500">Canvas</span></h1>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Workspace: 001-ALPHA</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSimulationActive(!isSimulationActive)}
            className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              isSimulationActive 
              ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' 
              : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-700'
            }`}
          >
            {isSimulationActive ? 'Stop Simulation' : 'Run Live Flow'}
          </button>
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button 
            onClick={() => setPlacedAgents([])}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-colors"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Agent Palette */}
        <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 z-20">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Agent Library</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search candidates..."
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {agents.slice(0, 20).map(agent => (
              <div 
                key={agent.id}
                onClick={() => setSelectedAgentId(prev => prev === agent.id ? null : agent.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  selectedAgentId === agent.id 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-[1.02]' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-500/30'
                }`}
              >
                {selectedAgentId === agent.id && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                  />
                )}
                <div className="text-[8px] font-black uppercase opacity-60 mb-1">Level {agent.level}</div>
                <div className="font-bold text-sm truncate">{agent.name}</div>
                {selectedAgentId === agent.id && (
                  <div className="text-[8px] mt-2 font-bold uppercase tracking-widest text-indigo-200 animate-pulse">
                    Selected: Click a lane to add
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-100 dark:bg-gray-950 flex relative custom-scrollbar scroll-smooth">
          
          {/* Simulation Overlay */}
          <AnimatePresence>
            {isSimulationActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-500/5 animate-pulse"></div>
                {/* Visual "Particles" */}
                {placedAgents.map((_, i) => (
                  <motion.div 
                    key={`p-${i}`}
                    animate={{ x: [0, 2000], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                    className="absolute top-[20%] w-[400px] h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                    style={{ top: `${(i % 5) * 20 + 10}%` }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(99, 102, 241, 0.4)" />
              </marker>
            </defs>
            {placedAgents.filter(a => a.sourceAgentId).map(agent => {
              const source = placedAgents.find(s => s.id === agent.sourceAgentId);
              if (!source) return null;

              const sourceLevelIdx = apqcLevels.findIndex(l => l.id === source.level);
              const targetLevelIdx = apqcLevels.findIndex(l => l.id === agent.level);

              const startX = (sourceLevelIdx * swimlaneWidth) + source.x + 256 / 2;
              const startY = source.y + 120 / 2; // Approximate height

              const endX = (targetLevelIdx * swimlaneWidth) + agent.x + 256 / 2;
              const endY = agent.y + 120 / 2;

              // Quadratic bezier for smooth curves
              const midX = (startX + endX) / 2;
              const path = `M ${startX} ${startY} Q ${midX} ${startY} ${endX} ${endY}`;

              return (
                <g key={`conn-${agent.id}`}>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    d={path}
                    fill="none"
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                  {isSimulationActive && (
                    <motion.circle
                      r="3"
                      fill="#6366f1"
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: `path("${path}")` }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Swimlanes */}
          {apqcLevels.map((level) => (
            <div 
              key={level.id} 
              className={`shrink-0 border-r border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 relative ${
                selectedAgentId 
                ? 'bg-indigo-50/50 dark:bg-indigo-500/5 cursor-crosshair' 
                : ''
              }`}
              style={{ width: swimlaneWidth }}
              onClick={() => {
                if (selectedAgentId) addAgentToCanvas(selectedAgentId, level.id);
              }}
            >
              {selectedAgentId && (
                <div className="absolute inset-0 border-2 border-indigo-500/20 pointer-events-none animate-pulse"></div>
              )}
              <div className="h-10 bg-white/50 dark:bg-gray-900/50 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${level.color.replace('bg-', 'bg-')}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{level.shortName}</span>
                </div>
                <span className="text-[10px] font-black italic text-gray-400">{level.id}</span>
              </div>

              <div className="relative h-full">
                {/* Placed Agents in this lane */}
                {placedAgents.filter(a => a.level === level.id).map(placed => {
                  const agentData = agents.find(a => a.id === placed.agentId);
                  return (
                    <motion.div
                      key={placed.id}
                      drag
                      dragElastic={0.1}
                      dragMomentum={false}
                      onDragEnd={(_, info) => {
                        const newX = Math.max(0, Math.min(swimlaneWidth - 260, placed.x + info.offset.x));
                        const newY = placed.y + info.offset.y;
                        setPlacedAgents(prev => prev.map(a => 
                          a.id === placed.id ? { ...a, x: newX, y: newY } : a
                        ));
                      }}
                      className="absolute p-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-indigo-500/10 cursor-move z-20 w-64 group"
                      style={{ left: placed.x, top: placed.y }}
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeAgent(placed.id); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>

                      <div className="flex items-center gap-3 mb-3">
                         <div className={`w-10 h-10 rounded-2xl ${level.color} flex items-center justify-center text-white shadow-lg font-black italic`}>
                            {level.id}
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-black text-gray-900 dark:text-white truncate italic">{agentData?.name}</h4>
                            <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Node Online</div>
                         </div>
                      </div>

                      <div className="flex gap-1 mb-4">
                         {[1,2,3].map(i => (
                            <div key={i} className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                               <div className="h-full bg-indigo-500 w-1/2 opacity-30"></div>
                            </div>
                         ))}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-[8px] font-black uppercase text-gray-400 tracking-widest flex justify-between">
                          <span>Connection Protocol</span>
                          <span className="text-indigo-500">A2A_LINK</span>
                        </div>
                        <select 
                          value={placed.sourceAgentId || ''}
                          onChange={(e) => setSourceAgent(placed.id, e.target.value || undefined)}
                          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-3 py-2 text-[9px] font-bold text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="">No Source Agent</option>
                          {placedAgents
                            .filter(a => a.id !== placed.id)
                            .map(a => {
                              const aData = agents.find(ad => ad.id === a.agentId);
                              return <option key={a.id} value={a.id}>Source: {aData?.name}</option>;
                            })
                          }
                        </select>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); executeAgent(placed.id); }}
                          disabled={placed.isExecuting}
                          className={`w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            placed.isExecuting 
                            ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95'
                          }`}
                        >
                          {placed.isExecuting ? 'Executing...' : 'Run Neural Task'}
                        </button>
                        
                        {(placed.output || placed.error) && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveExecutionId(placed.id); }}
                            className="w-full py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl text-[8px] font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            View Results
                          </button>
                        )}
                      </div>

                      {isSimulationActive && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 overflow-hidden"
                        >
                           <div className="text-[8px] font-mono text-gray-500 bg-gray-50 dark:bg-black/40 p-2 rounded-lg truncate">
                              PROCESSED_BLOCK_{Math.floor(Math.random() * 1000)}...
                           </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Grid Indicators */}
                {!placedAgents.some(a => a.level === level.id) && selectedAgentId && (
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <div className="border-2 border-dashed border-indigo-500/50 w-64 h-32 rounded-3xl flex flex-col items-center justify-center gap-2 bg-indigo-500/5">
                         <svg className="w-5 h-5 text-indigo-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                         </svg>
                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Click to Assign Agent</span>
                      </div>
                   </div>
                )}
              </div>
            </div>
          ))}

          {/* Endless horizontal space */}
          <div className="shrink-0 w-80"></div>
        </div>
      </div>

      <AnimatePresence>
        {isGuideOpen && (
          <UserGuide 
            isOpen={isGuideOpen} 
            onClose={() => setIsGuideOpen(false)} 
          />
        )}
        {activeExecutionId && (
          <OrchestrationSidebar 
            agent={placedAgents.find(a => a.id === activeExecutionId)!} 
            placedAgents={placedAgents}
            onClose={() => setActiveExecutionId(null)} 
            onUpdate={(id, config) => {
              setPlacedAgents(prev => prev.map(a => 
                a.id === id ? { ...a, config: { ...a.config, ...config } } : a
              ));
            }}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 100, 100, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 100, 100, 0.4);
        }
      `}</style>
    </div>
  );
}

function OrchestrationSidebar({ 
  agent, 
  placedAgents, 
  onClose,
  onUpdate
}: { 
  agent: CanvasAgent, 
  placedAgents: CanvasAgent[], 
  onClose: () => void,
  onUpdate: (id: string, config: Partial<CanvasAgent['config']>) => void
}) {
  const [activeTab, setActiveTab] = useState<'results' | 'config'>('results');
  const agentData = agents.find(a => a.id === agent.agentId);
  const level = apqcLevels.find(l => l.id === agent.level);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white dark:bg-gray-950 shadow-2xl z-[100] border-l border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <div className="p-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-indigo-600 text-white shrink-0">
        <div>
          <h3 className="font-black text-xl uppercase tracking-tighter">Orchestration Report</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-100 uppercase tracking-widest">
            <span className={`w-2 h-2 rounded-full ${agent.isExecuting ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            {agent.isExecuting ? 'Neural Layer Processing' : 'Execution Finalized'}
          </div>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-indigo-700 rounded-2xl transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 shrink-0">
        <button 
          onClick={() => setActiveTab('results')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'results' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400'}`}
        >
          Results & Analysis
        </button>
        <button 
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'config' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400'}`}
        >
          Graphical Management
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'results' ? (
          <div className="p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-3xl ${level?.color} flex items-center justify-center text-white text-xl font-black italic shadow-xl`}>
                {agent.level}
              </div>
              <div>
                <h4 className="font-black text-lg text-gray-900 dark:text-white uppercase tracking-tight">{agentData?.name}</h4>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{level?.name}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Agent Capability</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-indigo-500 pl-4">
                {agentData?.description}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Neural Linkage</h5>
              {agent.sourceAgentId ? (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-[10px] items-center justify-center font-black">A2A</div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">Source: {agents.find(a => a.id === placedAgents.find(pa => pa.id === agent.sourceAgentId)?.agentId)?.name || 'Unknown Agent'}</div>
                    <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Protocol Handshake Active</div>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 text-center">
                  Direct Input Mode (No A2A Link)
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Neural Output</h5>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] p-8 font-mono text-xs border border-gray-100 dark:border-gray-800 min-h-[300px] shadow-inner">
                {agent.isExecuting ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500 animate-pulse">Mounting Model Context...</div>
                  </div>
                ) : agent.error ? (
                  <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
                    <div className="font-black uppercase text-[10px] mb-2 tracking-widest">Execution Failure</div>
                    {agent.error}
                  </div>
                ) : agent.output ? (
                  <div className="space-y-6">
                    {agent.toolCalls && agent.toolCalls.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          MCP Tool Interactions
                        </div>
                        <div className="space-y-2">
                          {agent.toolCalls.map((call: any, idx: number) => {
                            const toolUse = Array.isArray(call.content) ? call.content.find((c: any) => c.type === 'tool_use') : null;
                            if (!toolUse) return null;
                            return (
                              <div key={idx} className="bg-white dark:bg-black/20 p-4 rounded-2xl border border-indigo-500/10 text-[10px]">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">{toolUse.name}</span>
                                  <span className="text-[8px] opacity-40">PROTOCOL_OK</span>
                                </div>
                                <div className="opacity-60 truncate">Args: {JSON.stringify(toolUse.input)}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200 prose prose-invert max-w-none border-t border-gray-100 dark:border-gray-800 pt-6 text-[11px]">
                      {agent.output}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 italic">
                    No active payload. Click 'Run Neural Task' to initiate orchestration.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-10">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">System Prompt Architecture</h5>
              <div className="relative">
                <textarea 
                  value={agent.config?.systemPrompt || ''}
                  placeholder="Leave empty to use default agent template..."
                  onChange={(e) => onUpdate(agent.id, { systemPrompt: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 text-xs font-mono min-h-[150px] focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <div className="absolute top-4 right-4 text-[8px] font-black text-indigo-500 uppercase opacity-40">Override Active</div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Execution Parameters</h5>
              
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Creativity (Temperature)</span>
                  <span className="text-indigo-500">{agent.config?.temperature || 0.7}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1.0" 
                  step="0.1" 
                  value={agent.config?.temperature || 0.7}
                  onChange={(e) => onUpdate(agent.id, { temperature: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Max Response Depth (Tokens)</span>
                  <span className="text-indigo-500">{agent.config?.maxTokens || 4000}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="8000" 
                  step="500" 
                  value={agent.config?.maxTokens || 4000}
                  onChange={(e) => onUpdate(agent.id, { maxTokens: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h6 className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-widest">Graphical Control active</h6>
               </div>
               <p className="text-[10px] font-medium leading-relaxed text-indigo-600/60 dark:text-indigo-400/60 italic">
                  Changes made here are applied immediately to this node instance. Default values are inherited from the global agentic registry.
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4">Protocol Stack</div>
        <div className="flex gap-2">
          {['MCP', 'A2A', 'ANP'].map(p => (
            <span key={p} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

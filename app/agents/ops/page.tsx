'use client';

import React from 'react';
import { agents, apqcLevels } from '@/data/apqc-levels';
import { useTelemetry } from '@/context/TelemetryContext';

import { motion, AnimatePresence } from 'framer-motion';

export default function AgentOperationsHub() {
  const { events, isLive } = useTelemetry();
  const activeAgents = agents.filter(a => a.status === 'production');

  // Convert Telemetry Events to visual pulse format if they exist
  const displayEvents = events.length > 0 ? events : [];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">
              Agent Operations <span className="text-indigo-500">Hub</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg">
              Real-time monitoring and orchestration of the autonomous APQC-aligned workforce.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">System Health</div>
              <div className="text-2xl font-mono font-bold">99.98%</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Active Nodes</div>
              <div className="text-2xl font-mono font-bold">{activeAgents.length}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Swarm Pulse Visualizer */}
          <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-8 border border-gray-800 relative overflow-hidden h-[500px]">
            <div className="absolute top-6 left-6 z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Swarm Pulse
              </h2>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative h-full flex items-center justify-center">
              <AnimatePresence>
                {displayEvents.map((event, idx) => {
                  const agent = agents.find(a => a.id === event.agentId);
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0, x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute p-4 bg-gray-800 rounded-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 w-48"
                    >
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">
                        {agent ? `Level ${agent.level}` : 'External node'}
                      </div>
                      <div className="font-bold text-sm truncate">{agent?.name || event.agentId}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '100%' }} 
                            transition={{ duration: 2 }}
                            className="h-full bg-indigo-500"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">{event.status === 'active' ? 'EXEC' : event.status.toUpperCase()}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Central Core */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center blur-sm"
              />
              <div className="absolute w-24 h-24 rounded-full bg-indigo-500/40 border border-indigo-400 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex flex-col h-[500px]">
            <h3 className="text-lg font-bold mb-4 px-2">Operational Log</h3>
            <div className="flex-1 overflow-y-auto space-y-3 px-2 custom-scrollbar">
              {displayEvents.map((event) => {
                const agent = agents.find(a => a.id === event.agentId);
                return (
                  <div key={event.id} className="p-3 bg-gray-800/50 rounded-xl border border-gray-800 text-xs">
                    <div className="flex justify-between text-gray-500 mb-1">
                      <span>{event.timestamp?.toDate ? event.timestamp.toDate().toLocaleTimeString() : 'Just now'}</span>
                      <span className={`font-bold ${event.status === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {event.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="font-medium text-gray-200">{agent?.name || event.agentId} signal received.</div>
                    <div className="text-[10px] text-gray-600 mt-1 uppercase">Action: {event.task}</div>
                  </div>
                );
              })}
              {displayEvents.length === 0 && (
                <div className="text-center text-gray-600 mt-20 text-sm italic">
                  Awaiting live telemetry... <br/>
                  <span className="text-[10px] uppercase font-bold text-gray-700">Protocol: /api/sensors/heartbeat</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tactical Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          {apqcLevels.slice(2, 6).map(level => {
            const levelAgents = activeAgents.filter(a => a.level === level.id);
            return (
              <div key={level.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-800 rounded-lg text-indigo-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4l4 4" />
                    </svg>
                  </div>
                  <span className="text-xs font-black text-gray-600 uppercase">Level {level.id}</span>
                </div>
                <h4 className="font-bold text-gray-200 mb-1">{level.shortName} Cluster</h4>
                <div className="text-2xl font-black mb-3">{levelAgents.length} Agents</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Utilization</span>
                    <span className="text-emerald-400">84%</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[84%]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

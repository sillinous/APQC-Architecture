'use client';

import React, { useState } from 'react';
import { agentPrompts } from '@/data/agent-prompts';
import { motion, AnimatePresence } from 'framer-motion';

interface ExecutionLog {
  id: string;
  agentId: string;
  timestamp: Date;
  status: 'success' | 'error';
  tokensUsed: number;
  duration: number;
  provider: string;
}

export default function NeuralDashboard() {
  const [selectedAgent, setSelectedAgent] = useState(agentPrompts[0]);
  const [context, setContext] = useState<Record<string, string>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  const handleExecute = async () => {
    setIsExecuting(true);
    setOutput('');
    const startTime = Date.now();

    try {
      const response = await fetch('/api/neural/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: selectedAgent.agentId,
          context
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.output);
        const log: ExecutionLog = {
          id: Date.now().toString(),
          agentId: selectedAgent.agentId,
          timestamp: new Date(),
          status: 'success',
          tokensUsed: data.tokensUsed,
          duration: Date.now() - startTime,
          provider: data.provider
        };
        setExecutionLogs(prev => [log, ...prev]);
      } else {
        setOutput(`Error: ${data.error}`);
        const log: ExecutionLog = {
          id: Date.now().toString(),
          agentId: selectedAgent.agentId,
          timestamp: new Date(),
          status: 'error',
          tokensUsed: 0,
          duration: Date.now() - startTime,
          provider: 'unknown'
        };
        setExecutionLogs(prev => [log, ...prev]);
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const totalTokens = executionLogs.reduce((sum, log) => sum + log.tokensUsed, 0);
  const successRate = executionLogs.length > 0 
    ? Math.round((executionLogs.filter(l => l.status === 'success').length / executionLogs.length) * 100)
    : 0;
  const avgDuration = executionLogs.length > 0
    ? Math.round(executionLogs.reduce((sum, log) => sum + log.duration, 0) / executionLogs.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gray-200 dark:border-gray-800 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
              <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Neural Layer v1.0</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Live Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Execution</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-xl leading-relaxed">
              Connect APQC agents to live LLM models. Execute autonomous tasks, monitor performance, and track token usage across your strategic swarm.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-indigo-500">{executionLogs.length}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Executions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-500">{successRate}%</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-500">{totalTokens.toLocaleString()}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tokens</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Execution Panel: Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-xl font-black uppercase tracking-tight mb-6">Agent Executor</h2>
              
              {/* Agent Selector */}
              <div className="mb-6">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Select Agent</label>
                <select
                  value={selectedAgent.agentId}
                  onChange={(e) => setSelectedAgent(agentPrompts.find(p => p.agentId === e.target.value)!)}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-mono text-sm"
                >
                  {agentPrompts.map(p => (
                    <option key={p.agentId} value={p.agentId}>{p.agentId}</option>
                  ))}
                </select>
              </div>

              {/* Context Inputs */}
              <div className="mb-6 space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Task Context</label>
                {selectedAgent.taskTemplate.match(/{{(\w+)}}/g)?.map(match => {
                  const key = match.replace(/{{|}}/g, '');
                  return (
                    <div key={key}>
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 block capitalize">{key}</label>
                      <input
                        type="text"
                        value={context[key] || ''}
                        onChange={(e) => setContext(prev => ({ ...prev, [key]: e.target.value }))}
                        placeholder={`Enter ${key}...`}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-lg shadow-indigo-500/20 disabled:shadow-none"
              >
                {isExecuting ? 'Executing...' : 'Execute Agent Task'}
              </button>
            </div>

            {/* Output Panel */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <h3 className="text-lg font-black uppercase tracking-tight mb-4">Agent Output</h3>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl font-mono text-xs whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {output}
                </div>
              </motion.div>
            )}
          </div>

          {/* Execution Logs: Right */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">Execution History</h2>
            
            <div className="space-y-3 max-h-[800px] overflow-y-auto">
              <AnimatePresence>
                {executionLogs.map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">{log.agentId}</span>
                      </div>
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{log.provider}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-xs font-black text-gray-900 dark:text-white">{log.tokensUsed}</div>
                        <div className="text-[8px] text-gray-400 uppercase tracking-widest">Tokens</div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-900 dark:text-white">{log.duration}ms</div>
                        <div className="text-[8px] text-gray-400 uppercase tracking-widest">Duration</div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-900 dark:text-white">{log.timestamp.toLocaleTimeString()}</div>
                        <div className="text-[8px] text-gray-400 uppercase tracking-widest">Time</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {executionLogs.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">No executions yet. Run an agent task to see logs here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

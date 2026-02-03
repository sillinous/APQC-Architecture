'use client';

import { useState } from 'react';
import { togafAdmPhases, TogafPhase } from '@/data/togaf';

export default function TogafTracker() {
  const [selectedPhase, setSelectedPhase] = useState<TogafPhase>(togafAdmPhases[0]);
  const [phaseTasks, setPhaseTasks] = useState<Record<string, Record<string, 'not-started' | 'in-progress' | 'completed'>>>(
    togafAdmPhases.reduce((acc, phase) => ({
      ...acc,
      [phase.id]: phase.tasks.reduce((tAcc, t) => ({ ...tAcc, [t.id]: t.status }), {})
    }), {})
  );

  const toggleTaskStatus = (phaseId: string, taskId: string) => {
    setPhaseTasks(prev => {
      const currentStatus = prev[phaseId][taskId];
      const nextStatus = currentStatus === 'completed' ? 'not-started' : 
                         currentStatus === 'not-started' ? 'in-progress' : 'completed';
      return {
        ...prev,
        [phaseId]: {
          ...prev[phaseId],
          [taskId]: nextStatus
        }
      };
    });
  };

  const totalTasks = togafAdmPhases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = Object.values(phaseTasks).reduce((acc, tasks) => 
    acc + Object.values(tasks).filter(s => s === 'completed').length, 0
  );
  const overallPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">TOGAF ADM Tracker</h1>
              <p className="text-blue-100">
                Architecture Development Method (ADM) Lifecycle Management
              </p>
            </div>
            <div className="bg-blue-700/50 p-4 rounded-xl border border-blue-500/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-medium">Cycle Completion</span>
                <span className="text-2xl font-bold">{overallPercent}%</span>
              </div>
              <div className="w-48 h-2 bg-blue-800/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${overallPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* ADM Circular Navigation */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8 text-center uppercase tracking-wider">
                  ADM Lifecycle Phases
                </h3>
                
                <div className="relative aspect-square">
                  {/* Outer circle for labels */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 dark:border-gray-700"></div>
                  
                  {/* Requirements Management (Center) */}
                  <button
                    onClick={() => setSelectedPhase(togafAdmPhases.find(p => p.id === 'requirements')!)}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center transition-all shadow-md z-10 ${
                      selectedPhase.id === 'requirements'
                        ? 'ring-4 ring-indigo-300 dark:ring-indigo-900 scale-110 border-2 border-white'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: togafAdmPhases.find(p => p.id === 'requirements')?.color }}
                  >
                    <span className="text-white font-bold text-xs">REQ</span>
                    <span className="text-[10px] text-indigo-100 font-medium leading-tight px-2">Management</span>
                  </button>

                  {/* Other Phases (A-H + Preliminary) */}
                  {togafAdmPhases.filter(p => p.id !== 'requirements').map((phase, idx, arr) => {
                    const angle = (idx / arr.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + 38 * Math.cos(angle);
                    const y = 50 + 38 * Math.sin(angle);
                    
                    return (
                      <button
                        key={phase.id}
                        onClick={() => setSelectedPhase(phase)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all shadow-sm ${
                          selectedPhase.id === phase.id
                            ? 'ring-4 ring-opacity-50 scale-125 border-2 border-white z-20'
                            : 'hover:scale-110'
                        }`}
                        style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          backgroundColor: phase.color,
                          boxShadow: selectedPhase.id === phase.id ? `0 0 20px ${phase.color}40` : ''
                        }}
                      >
                        <span className="text-white font-bold text-xs">{phase.shortName}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-12 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Not Started</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-500">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-500">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Detail Section */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden text-left">
                <div 
                  className="px-8 py-10 text-white"
                  style={{ backgroundColor: selectedPhase.color }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                      Phase {selectedPhase.shortName}
                    </span>
                    <span className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium capitalize`}>
                      {selectedPhase.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{selectedPhase.name}</h2>
                  <p className="text-white/80 max-w-2xl leading-relaxed">
                    {selectedPhase.description}
                  </p>
                </div>

                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Phase Deliverables & Tasks</h3>
                  <div className="space-y-4">
                    {selectedPhase.tasks.map((task) => {
                      const status = phaseTasks[selectedPhase.id][task.id];
                      return (
                        <button 
                          key={task.id}
                          onClick={() => toggleTaskStatus(selectedPhase.id, task.id)}
                          className="w-full flex items-start gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-gray-200 dark:hover:border-gray-600 transition-colors group text-left"
                        >
                          <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                            status === 'in-progress' ? 'bg-blue-500 border-blue-500 text-white' :
                            'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                          }`}>
                            {status === 'completed' ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : status === 'in-progress' ? (
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-4 mb-1">
                              <h4 className="font-bold text-gray-900 dark:text-white">{task.title}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter ${
                                status === 'completed' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' :
                                status === 'in-progress' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' :
                                'text-gray-500 bg-gray-100 dark:bg-gray-800'
                              }`}>
                                {status.replace('-', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {task.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-2xl">
                        💡
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-100">AI Architecture Assistant</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Need help drafting the Architecture Vision for Phase A? 
                          <button className="ml-1 underline font-medium hover:text-blue-800">Ask the VisionAgent</button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

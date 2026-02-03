'use client';

import { useState } from 'react';
import { apqcLevels, protocols } from '@/data/apqc-levels';

export default function FrameworkPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const selectedLevelData = selectedLevel ? apqcLevels.find(l => l.id === selectedLevel) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">APQC Process Framework</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            The Process Classification Framework (PCF) provides a comprehensive taxonomy
            for organizing business processes. Click on any level to explore.
          </p>
        </div>
      </section>

      {/* Interactive Framework */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Process Levels List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                13 Process Levels
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {apqcLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedLevel === level.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: level.color }}
                      >
                        {level.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {level.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {level.agentCount} agents
                          </span>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {level.implementedCount} implemented
                          </span>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          selectedLevel === level.id ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {selectedLevelData ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div
                      className="p-6 text-white"
                      style={{ backgroundColor: selectedLevelData.color }}
                    >
                      <div className="text-sm font-medium opacity-80">Level {selectedLevelData.id}</div>
                      <h3 className="text-xl font-bold mt-1">{selectedLevelData.name}</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {selectedLevelData.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          Sub-Processes
                        </h4>
                        <div className="space-y-2">
                          {selectedLevelData.subProcesses.map((sub) => (
                            <div
                              key={sub.id}
                              className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {sub.id} {sub.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {sub.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          Key Algorithms
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedLevelData.keyAlgorithms.map((alg) => (
                            <span
                              key={alg}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                            >
                              {alg}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          Business Outcomes
                        </h4>
                        <ul className="space-y-1">
                          {selectedLevelData.businessOutcomes.map((outcome) => (
                            <li key={outcome} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {selectedLevelData.agentCount}
                            </div>
                            <div className="text-xs text-gray-500">Total Agents</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              {selectedLevelData.implementedCount}
                            </div>
                            <div className="text-xs text-gray-500">Implemented</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">
                      Click on a process level to see details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            SuperStandard v1.0 Protocols
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
            All APQC agents implement these 8 production-ready protocols for interoperability and communication.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protocols.map((protocol) => (
              <div
                key={protocol.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4"
                  style={{ backgroundColor: protocol.color }}
                >
                  {protocol.id}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {protocol.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {protocol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Principles */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            8 Architectural Principles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Every agent in the library adheres to these core principles ensuring quality and consistency.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Standardized', desc: 'BaseAgent + dataclass config', icon: '📐' },
              { name: 'Interoperable', desc: 'Protocol support (A2A, MCP, etc)', icon: '🔗' },
              { name: 'Redeployable', desc: 'Environment configuration', icon: '🚀' },
              { name: 'Reusable', desc: 'No project-specific logic', icon: '♻️' },
              { name: 'Atomic', desc: 'Single responsibility', icon: '⚛️' },
              { name: 'Composable', desc: 'Schema-based I/O', icon: '🧩' },
              { name: 'Orchestratable', desc: 'Coordination support', icon: '🎭' },
              { name: 'Vendor Agnostic', desc: 'Abstraction layers', icon: '🌐' },
            ].map((principle) => (
              <div
                key={principle.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl mb-3">{principle.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {principle.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Stats */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Agent Coverage by Level
          </h2>

          <div className="space-y-4">
            {apqcLevels.map((level) => {
              const percentage = Math.round((level.implementedCount / level.agentCount) * 100);
              return (
                <div key={level.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: level.color }}
                      >
                        {level.id}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {level.shortName}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {level.implementedCount}/{level.agentCount} agents
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: level.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

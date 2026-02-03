'use client';

import { useState } from 'react';
import { workflows, workflowStats } from '@/data/workflows';
import { apqcLevels } from '@/data/apqc-levels';

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const selected = workflows.find(w => w.id === selectedWorkflow);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cross-Process Workflows</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Pre-built workflows that orchestrate multiple agents across APQC process levels
            for end-to-end business automation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold">{workflowStats.totalWorkflows}</div>
              <div className="text-sm text-purple-200">Total Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{workflowStats.availableWorkflows}</div>
              <div className="text-sm text-purple-200">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5-8</div>
              <div className="text-sm text-purple-200">Avg Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$10M+</div>
              <div className="text-sm text-purple-200">Est. Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Workflow List */}
            <div className="lg:col-span-2 space-y-6">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border cursor-pointer transition-all ${
                    selectedWorkflow === workflow.id
                      ? 'border-purple-500 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {workflow.name}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          workflow.status === 'available'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {workflow.status === 'available' ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        workflow.complexity === 'low'
                          ? 'bg-green-100 text-green-700'
                          : workflow.complexity === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {workflow.complexity} complexity
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {workflow.description}
                    </p>

                    {/* Process Flow */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500 mb-2">Process Flow</div>
                      <div className="flex items-center flex-wrap gap-2">
                        {workflow.levels.map((level, idx) => {
                          const levelData = apqcLevels.find(l => l.id === level);
                          return (
                            <div key={level} className="flex items-center">
                              <div
                                className="px-3 py-2 rounded-lg text-white text-sm font-medium"
                                style={{ backgroundColor: levelData?.color }}
                              >
                                {level} {levelData?.shortName}
                              </div>
                              {idx < workflow.levels.length - 1 && (
                                <svg className="w-6 h-6 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {workflow.estimatedValue}
                      </div>
                      <div className="text-sm text-gray-500">
                        {workflow.steps.length} steps
                      </div>
                    </div>
                  </div>

                  {/* Expanded Steps */}
                  {selectedWorkflow === workflow.id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            Execution Sequence
                          </h4>
                          <div className="space-y-4">
                            {workflow.steps.map((step, idx) => {
                              const levelData = apqcLevels.find(l => l.id === step.levelId);
                              return (
                                <div key={idx} className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                      style={{ backgroundColor: levelData?.color }}
                                    >
                                      {step.order}
                                    </div>
                                    {idx < workflow.steps.length - 1 && (
                                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 pb-4">
                                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                                      {step.agentName}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {step.action}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Flow Preview
                          </h4>
                          <div className="space-y-4">
                            {workflow.steps.map((step, idx) => (
                              <div key={idx} className="relative">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-purple-500 uppercase">Step {step.order}</span>
                                    <span className="text-[10px] font-mono text-gray-400">PROT: MCP</span>
                                  </div>
                                  <div className="text-xs font-bold truncate">{step.agentName}</div>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {step.outputs.slice(0, 2).map(out => (
                                      <span key={out} className="px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] rounded border border-green-100 dark:border-green-800/50">
                                        {out}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {idx < workflow.steps.length - 1 && (
                                  <div className="flex justify-center my-1">
                                    <svg className="w-4 h-4 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Why Cross-Process Workflows?
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      End-to-end process automation across departments
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Eliminate manual handoffs between systems
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Consistent data flow and decision making
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Measurable business outcomes
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Build Custom Workflows
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                    Combine any APQC agents into custom workflows tailored to your business.
                  </p>
                  <a
                    href="/contribute"
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

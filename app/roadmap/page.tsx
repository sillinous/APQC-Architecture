'use client';

import { roadmapPhases, overallProgress } from '@/data/roadmap';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Strategic Roadmap</h1>
          <p className="text-xl text-orange-100 max-w-3xl">
            Our plan to expand APQC agent coverage, enable cross-process workflows,
            and build enterprise-grade intelligence capabilities.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">{roadmapPhases.length}</div>
              <div className="text-sm text-orange-200">Phases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{overallProgress.totalObjectives}</div>
              <div className="text-sm text-orange-200">Objectives</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{overallProgress.overallPercent}%</div>
              <div className="text-sm text-orange-200">Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-900 dark:text-white">Overall Progress</span>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${overallProgress.overallPercent}%` }}
              ></div>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{overallProgress.overallPercent}%</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {roadmapPhases.map((phase, idx) => (
              <div key={phase.id} className="relative">
                {/* Timeline connector */}
                {idx < roadmapPhases.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10"></div>
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    phase.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : phase.status === 'in-progress'
                      ? 'bg-blue-500 text-white'
                      : phase.status === 'planned'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {phase.status === 'completed' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : phase.status === 'in-progress' ? (
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span className="font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Phase content */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className={`px-6 py-4 ${
                      phase.status === 'completed'
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : phase.status === 'in-progress'
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : ''
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {phase.name}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {phase.timeframe}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          phase.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                            : phase.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                            : phase.status === 'planned'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {phase.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {phase.description}
                      </p>

                      {/* Objectives */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Objectives</h4>
                        <div className="space-y-3">
                          {phase.objectives.map((obj) => (
                            <div key={obj.id} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                                obj.status === 'completed'
                                  ? 'bg-green-500 text-white'
                                  : obj.status === 'in-progress'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}>
                                {obj.status === 'completed' && (
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                  {obj.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {obj.description}
                                </div>
                                {obj.status !== 'planned' && (
                                  <div className="mt-1">
                                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${
                                          obj.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                                        }`}
                                        style={{ width: `${obj.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.deliverables.map((d) => (
                            <span
                              key={d}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Metrics</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {phase.metrics.map((metric) => (
                            <div key={metric.name} className="text-center">
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {metric.current}
                              </div>
                              <div className="text-xs text-gray-500">
                                {metric.name}
                              </div>
                              <div className="text-xs text-green-600 dark:text-green-400">
                                Target: {metric.target}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

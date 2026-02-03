'use client';

import { useState } from 'react';
import { apqcLevels, agents, protocols } from '@/data/apqc-levels';
import Link from 'next/link';

export default function AgentsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const matchesLevel = selectedLevel === 'all' || agent.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agent Catalog</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Browse 103 APQC-aligned agents with 84 fully implemented and production-ready.
            Each agent implements sophisticated business algorithms.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">103</div>
              <div className="text-sm text-green-200">Total Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">84</div>
              <div className="text-sm text-green-200">Implemented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm text-green-200">Algorithms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Levels</option>
              {apqcLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.id} - {level.shortName}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="production">Production</option>
              <option value="beta">Beta</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAgents.length} of {agents.length} implemented agents
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => {
              const level = apqcLevels.find(l => l.id === agent.level);
              return (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 block group"
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: level?.color }}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-bold text-white"
                          style={{ backgroundColor: level?.color }}
                        >
                          {agent.level}
                        </span>
                        <span className="text-xs text-gray-500">{level?.shortName}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.status === 'production'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : agent.status === 'beta'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {agent.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {agent.name.replace(/ Agent$/, '')}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {agent.description}
                    </p>

                    <div className="mb-4">
                      <div className="text-xs font-medium text-gray-500 mb-1">Algorithms</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.algorithms.slice(0, 3).map((alg) => (
                          <span
                            key={alg}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs"
                          >
                            {alg}
                          </span>
                        ))}
                        {agent.algorithms.length > 3 && (
                          <span className="px-2 py-1 text-gray-500 text-xs">
                            +{agent.algorithms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-medium text-gray-500 mb-1">Protocols</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.protocols.map((proto) => {
                          const protocol = protocols.find(p => p.id === proto);
                          return (
                            <span
                              key={proto}
                              className="px-2 py-1 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: protocol?.color }}
                            >
                              {proto}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs font-medium text-gray-500 mb-2 font-bold uppercase tracking-widest text-[9px]">Skill Proficiency</div>
                      <div className="space-y-2">
                        {Object.entries(agent.skillLevels).slice(0, 2).map(([skill, level]) => (
                          <div key={skill}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">{skill.replace(/_/g, ' ')}</span>
                              <span className="text-gray-900 dark:text-white font-medium">{(level * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${level * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {agent.implementationDate && (
                      <div className="mt-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">
                        Node Deployed: {agent.implementationDate}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">No agents match your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* All Levels Overview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Complete Agent Inventory by Level
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Level</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Process</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Total</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Implemented</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {apqcLevels.map((level) => {
                  const coverage = Math.round((level.implementedCount / level.agentCount) * 100);
                  return (
                    <tr key={level.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 px-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: level.color }}
                        >
                          {level.id}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">{level.shortName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{level.name}</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {level.agentCount}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`text-lg font-semibold ${
                          level.implementedCount > 0 ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {level.implementedCount}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${coverage}%`,
                                backgroundColor: level.color
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {coverage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-gray-900/50">
                  <td colSpan={2} className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-gray-900 dark:text-white">103</td>
                  <td className="py-4 px-4 text-center font-bold text-green-600">84</td>
                  <td className="py-4 px-4 text-center font-bold text-gray-900 dark:text-white">81%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

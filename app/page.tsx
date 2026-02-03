import Link from 'next/link';
import { apqcLevels, totalAgents, implementedAgents, totalAlgorithms, protocols } from '@/data/apqc-levels';
import { workflows } from '@/data/workflows';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              103 Agents | 13 Process Levels | Production Ready
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">APQC Strategic Framework</span>
              <br />
              <span className="text-white">for AI Agent Ecosystems</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Enterprise-grade AI agents organized by the APQC Process Classification Framework.
              Build intelligent automation across all business functions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/framework"
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:scale-105"
              >
                Explore Framework
              </Link>
              <Link
                href="/agents"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all hover:scale-105"
              >
                Browse Agents
              </Link>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Agents', value: totalAgents, icon: '🤖' },
              { label: 'APQC Levels', value: 13, icon: '📊' },
              { label: 'Implemented', value: implementedAgents, icon: '✅' },
              { label: 'Algorithms', value: `${totalAlgorithms}+`, icon: '🧮' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is APQC Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What is APQC?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                The <strong>APQC Process Classification Framework (PCF)</strong> is the industry standard
                taxonomy for business processes, used by 80% of Fortune 100 companies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We&apos;ve aligned our AI agent library with APQC&apos;s 13 process levels, enabling:
              </p>
              <ul className="space-y-3">
                {[
                  'Standardized agent discovery by business function',
                  'Cross-process workflow automation',
                  'Industry benchmark comparisons',
                  'Enterprise architecture alignment',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">13 APQC Process Levels</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {apqcLevels.map((level) => (
                  <div
                    key={level.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: level.color }}
                    ></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{level.id}</span>
                    <span className="text-gray-600 dark:text-gray-400">{level.shortName}</span>
                    <span className="ml-auto text-gray-500">{level.agentCount} agents</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Production-Ready Agents
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              15 fully-implemented agents with sophisticated business algorithms,
              ready for enterprise deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: '3.0', name: 'Analyze Market Trends', algorithms: ['Moving Averages', 'Linear Regression', 'CAGR'] },
              { level: '4.0', name: 'Optimize Inventory', algorithms: ['EOQ', 'Safety Stock', 'ABC Analysis'] },
              { level: '8.0', name: 'Cost Accounting', algorithms: ['Activity-Based Costing', 'Variance Analysis'] },
              { level: '9.0', name: 'Asset Utilization', algorithms: ['OEE Calculation', 'Capacity Planning'] },
              { level: '10.0', name: 'Risk Assessment', algorithms: ['Risk Matrix', 'Heat Map', 'RPN'] },
              { level: '12.0', name: 'Project Execution', algorithms: ['CPM', 'Earned Value Management'] },
            ].map((agent) => {
              const level = apqcLevels.find(l => l.id === agent.level);
              return (
                <div
                  key={agent.name}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: level?.color }}
                    >
                      {agent.level}
                    </span>
                    <span className="text-sm text-gray-500">{level?.shortName}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {agent.name}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {agent.algorithms.map((alg) => (
                      <span
                        key={alg}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400"
                      >
                        {alg}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View all 103 agents
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Protocols */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              8 Production Protocols
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              SuperStandard v1.0 defines 8 protocols for agent communication,
              coordination, and interoperability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {protocols.map((protocol) => (
              <div
                key={protocol.id}
                className="p-4 rounded-xl border-2 hover:shadow-lg transition-all text-center"
                style={{ borderColor: protocol.color }}
              >
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: protocol.color }}
                >
                  {protocol.id}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {protocol.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {protocol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cross-Process Workflows
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pre-built workflows that span multiple APQC levels for end-to-end business process automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.slice(0, 3).map((workflow) => (
              <div
                key={workflow.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {workflow.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  {workflow.levels.map((level, idx) => {
                    const levelData = apqcLevels.find(l => l.id === level);
                    return (
                      <div key={level} className="flex items-center">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: levelData?.color }}
                        >
                          {level}
                        </span>
                        {idx < workflow.levels.length - 1 && (
                          <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {workflow.estimatedValue}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/workflows"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Explore all workflows
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business Processes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the collaborative ecosystem building the future of enterprise automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contribute"
              className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Contribute an Agent
            </Link>
            <a
              href="https://github.com/sillinous"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { resources, resourceCategories } from '@/data/resources';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category.toLowerCase().replace(' ', '-') === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & Documentation</h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Documentation, repositories, tools, and external resources to help you
            understand and implement the APQC agent ecosystem.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({resources.length})
            </button>
            {resourceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target={resource.type === 'external' ? '_blank' : undefined}
                rel={resource.type === 'external' ? 'noopener noreferrer' : undefined}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    resource.type === 'documentation'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : resource.type === 'repository'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      : resource.type === 'specification'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : resource.type === 'tool'
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {resource.type}
                  </span>
                  {resource.type === 'external' && (
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Quick Reference
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Algorithms */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Business Algorithms
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { name: 'EOQ (Economic Order Quantity)', formula: '((2 x D x S) / H)', desc: 'Optimal order quantity' },
                  { name: 'Safety Stock', formula: 'Z x s x LT', desc: 'Buffer inventory calculation' },
                  { name: 'OEE', formula: 'A x P x Q', desc: 'Overall Equipment Effectiveness' },
                  { name: 'CAGR', formula: '(EV/BV)^(1/n) - 1', desc: 'Compound Annual Growth Rate' },
                  { name: 'DSO', formula: '(AR / Revenue) x Days', desc: 'Days Sales Outstanding' },
                  { name: 'EVM', formula: 'PV x % Complete', desc: 'Earned Value Management' },
                ].map((alg) => (
                  <div key={alg.name} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{alg.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">{alg.desc}</div>
                    </div>
                    <code className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                      {alg.formula}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* API Reference */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                API Endpoints
              </h3>
              <div className="space-y-3 text-sm font-mono">
                {[
                  { method: 'GET', path: '/agents', desc: 'List all agents' },
                  { method: 'GET', path: '/agents/discover', desc: 'Discover by criteria' },
                  { method: 'GET', path: '/agents/{id}', desc: 'Get agent details' },
                  { method: 'POST', path: '/agents/{id}/execute', desc: 'Execute agent' },
                  { method: 'POST', path: '/agents/{id}/validate', desc: 'Validate agent' },
                  { method: 'GET', path: '/statistics', desc: 'Registry statistics' },
                  { method: 'GET', path: '/workflows', desc: 'List workflows' },
                  { method: 'POST', path: '/workflows/{id}/execute', desc: 'Execute workflow' },
                ].map((endpoint) => (
                  <div key={endpoint.path} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      endpoint.method === 'GET'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-700 dark:text-gray-300">{endpoint.path}</code>
                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-auto">
                      {endpoint.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

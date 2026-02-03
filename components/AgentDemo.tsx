'use client';

import { ReactNode, useState } from 'react';

interface AgentDemoProps {
  agentName: string;
  agentDescription: string;
  apqcLevel: string;
  algorithms: string[];
  children: ReactNode;
  className?: string;
}

export default function AgentDemo({
  agentName,
  agentDescription,
  apqcLevel,
  algorithms,
  children,
  className = '',
}: AgentDemoProps) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2">
              APQC {apqcLevel}
            </span>
            <h2 className="text-2xl font-bold text-white">{agentName}</h2>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-white hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
          >
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-3">{agentDescription}</p>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Algorithms Used:</h4>
            <div className="flex flex-wrap gap-2">
              {algorithms.map((alg) => (
                <span
                  key={alg}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium"
                >
                  {alg}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demo Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

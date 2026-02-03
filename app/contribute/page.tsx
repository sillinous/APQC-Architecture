import Link from 'next/link';

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contribute</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Join our collaborative ecosystem building the future of enterprise AI automation.
            Every contribution helps expand APQC agent coverage.
          </p>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Ways to Contribute
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Add Agent */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Add a New Agent
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Implement a new APQC-aligned agent with business algorithms.
                88 agents are waiting to be implemented!
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Choose an unimplemented APQC level
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Extend the BaseAgent pattern
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Add business algorithms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Submit a pull request
                </li>
              </ul>
            </div>

            {/* Create Workflow */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Create a Workflow
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Design cross-process workflows that chain multiple APQC agents
                for end-to-end automation.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Identify a business process
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Map APQC levels involved
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Define inputs/outputs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Document estimated value
                </li>
              </ul>
            </div>

            {/* Improve Docs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Improve Documentation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Help others understand and use the framework by improving
                documentation, examples, and tutorials.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Fix typos and errors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Add usage examples
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Write tutorials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Translate content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Implementation Guide */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Agent Implementation Guide
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3>1. Choose an APQC Level</h3>
            <p>
              Review the <Link href="/agents" className="text-blue-600 hover:underline">Agent Catalog</Link> to
              identify levels with low implementation coverage. Priority areas include:
            </p>
            <ul>
              <li>APQC 3.0 - Sales & Marketing (7 remaining)</li>
              <li>APQC 4.0 - Operations & Logistics (11 remaining)</li>
              <li>APQC 13.0 - Information Technology (19 remaining)</li>
            </ul>

            <h3>2. Follow the BaseAgent Pattern</h3>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto">
{`from base_agent import BaseAgent
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class MyAgentConfig:
    threshold: float = 0.75
    max_iterations: int = 100

class MyAgent(BaseAgent):
    """
    APQC Level: X.X
    Purpose: Brief description
    """

    def __init__(self, config: MyAgentConfig):
        super().__init__(name="my_agent")
        self.config = config
        self.skill_levels = {
            "primary_skill": 0.9,
            "secondary_skill": 0.85
        }

    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        # Implement business logic
        result = self._apply_algorithm(input_data)

        # Calculate confidence
        confidence = self._calculate_confidence(result)

        # HITL escalation if needed
        if confidence < self.config.threshold:
            return self._escalate_to_human(result)

        return {
            "result": result,
            "confidence": confidence,
            "algorithm": "algorithm_name"
        }

    def _apply_algorithm(self, data: Dict[str, Any]) -> Any:
        # Your business algorithm here
        pass`}
            </pre>

            <h3>3. Implement Business Algorithms</h3>
            <p>
              Each agent should implement real business algorithms, not just placeholder logic.
              Reference algorithms from the <Link href="/resources" className="text-blue-600 hover:underline">Resources</Link> section.
            </p>

            <h3>4. Ensure 8 Principles Compliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose my-6">
              {[
                'Standardized',
                'Interoperable',
                'Redeployable',
                'Reusable',
                'Atomic',
                'Composable',
                'Orchestratable',
                'Vendor Agnostic',
              ].map((principle) => (
                <div key={principle} className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">{principle}</span>
                </div>
              ))}
            </div>

            <h3>5. Submit Your Contribution</h3>
            <ol>
              <li>Fork the repository</li>
              <li>Create a feature branch</li>
              <li>Add your agent to the appropriate APQC directory</li>
              <li>Include unit tests</li>
              <li>Update the catalog</li>
              <li>Submit a pull request</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join our community of contributors building enterprise-grade AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sillinous"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/sillinous/apqc-strategic-framework/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition-colors"
            >
              Open an Issue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

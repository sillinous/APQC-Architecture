export interface ArchitecturePrinciple {
  id: string;
  name: string;
  statement: string;
  rationale: string;
  implications: string;
  icon: string;
  color: string;
}

export const architecturePrinciples: ArchitecturePrinciple[] = [
  {
    id: 'P1',
    name: 'Standardized',
    statement: 'Agents must be built on a common foundation (BaseAgent) and use standard data classes for configuration.',
    rationale: 'Standardization reduces development time, simplifies maintenance, and ensures a consistent developer experience across the library.',
    implications: 'Every agent must inherit from the APQC BaseAgent; developers must use predefined schema for agent I/O.',
    icon: '📐',
    color: '#3B82F6' // blue-500
  },
  {
    id: 'P2',
    name: 'Interoperable',
    statement: 'All agents must support standard communication protocols including A2A (Agent-to-Agent) and MCP.',
    rationale: 'Interoperability is essential for building complex, multi-agent workflows and integrating with external tools.',
    implications: 'Agents must implement required message schemas; protocol compliance must be verified during testing.',
    icon: '🔗',
    color: '#8B5CF6' // violet-500
  },
  {
    id: 'P3',
    name: 'Redeployable',
    statement: 'Agents must be environment-agnostic and easily redeployable across different infrastructures.',
    rationale: 'Ensures portability and reduces vendor lock-in, allowing agents to move between cloud and local environments.',
    implications: 'Configuration must be externalized; no hardcoded environment-specific logic.',
    icon: '🚀',
    color: '#EF4444' // red-500
  },
  {
    id: 'P4',
    name: 'Reusable',
    statement: 'Agents should provide generic business value and avoid project-specific or "bespoke" logic.',
    rationale: 'Maximizes the utility of the agent library and promotes the creation of a "long-tail" of specialized agents.',
    implications: 'Architects must review new agents for general applicability; project-specific logic belongs in workflows, not agents.',
    icon: '♻️',
    color: '#10B981' // emerald-500
  },
  {
    id: 'P5',
    name: 'Atomic',
    statement: 'Each agent should follow the single responsibility principle and perform one specific task well.',
    rationale: 'Simplifies testing, debugging, and understanding of agent behavior. Promotes better orchestration.',
    implications: 'Large, complex agents should be decomposed into multiple smaller, atomic agents.',
    icon: '⚛️',
    color: '#F59E0B' // amber-500
  },
  {
    id: 'P6',
    name: 'Composable',
    statement: 'Agents must be designed to be easily combined with others to form complex workflows.',
    rationale: 'Enables the creation of higher-level business processes through the orchestration of specialized agents.',
    implications: 'I/O interfaces must be well-defined and versioned; state management must be handled by the orchestrator.',
    icon: '🧩',
    color: '#EC4899' // pink-500
  },
  {
    id: 'P7',
    name: 'Orchestratable',
    statement: 'Agents must provide metadata and hooks that allow them to be managed by a central orchestration engine.',
    rationale: 'Required for complex swarms and long-running business processes that require monitoring and recovery.',
    implications: 'Agents must support status reporting and interruptibility protocols.',
    icon: '🎭',
    color: '#06B6D4' // cyan-500
  },
  {
    id: 'P8',
    name: 'Vendor Agnostic',
    statement: 'Agents should interact with LLMs and other services through abstraction layers.',
    rationale: 'Allows switching between different model providers (OpenAI, Google, Anthropic) without rewriting agent logic.',
    implications: 'Use standardized libraries for LLM interaction; avoid provider-specific SDKs in core agent logic.',
    icon: '🌐',
    color: '#6366F1' // indigo-500
  }
];

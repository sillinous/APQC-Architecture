export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'documentation' | 'repository' | 'specification' | 'tool' | 'external';
  url: string;
  category: string;
  tags: string[];
}

export const resources: Resource[] = [
  // Documentation
  {
    id: 'agent-library-catalog',
    title: 'Agent Library Catalog',
    description: 'Complete inventory of 103 APQC-aligned agents with implementation details, algorithms, and usage instructions.',
    type: 'documentation',
    url: 'https://github.com/sillinous/AGENT_LIBRARY_CATALOG.md',
    category: 'Core Documentation',
    tags: ['agents', 'catalog', 'implementation']
  },
  {
    id: 'superstandard-spec',
    title: 'SuperStandard v1.0 Specification',
    description: 'Production-ready specification for 8 agent communication protocols enabling interoperability.',
    type: 'specification',
    url: 'https://github.com/sillinous/AgenticStandardsResearch',
    category: 'Standards',
    tags: ['protocols', 'standards', 'interoperability']
  },
  {
    id: 'base-agent-pattern',
    title: 'BaseAgent Pattern Guide',
    description: 'Universal agent architecture pattern with confidence scoring, HITL escalation, and provider abstraction.',
    type: 'documentation',
    url: '#base-agent',
    category: 'Architecture',
    tags: ['pattern', 'architecture', 'design']
  },
  {
    id: '8-principles',
    title: '8 Architectural Principles',
    description: 'Core principles all agents must implement: Standardized, Interoperable, Redeployable, Reusable, Atomic, Composable, Orchestratable, Vendor Agnostic.',
    type: 'documentation',
    url: '#principles',
    category: 'Architecture',
    tags: ['principles', 'compliance', 'quality']
  },

  // Repositories
  {
    id: 'architecture-hub',
    title: 'ArchitectureHub',
    description: 'Central catalog and visualization platform for all architecture assets including APQC agents.',
    type: 'repository',
    url: 'https://github.com/sillinous/ArchitectureHub',
    category: 'Platforms',
    tags: ['catalog', 'visualization', 'platform']
  },
  {
    id: 'agent-operations-hub',
    title: 'AgentOperationsHub',
    description: 'Unified operational platform for agent monitoring, governance, and orchestration.',
    type: 'repository',
    url: 'https://github.com/sillinous/AgentOperationsHub',
    category: 'Platforms',
    tags: ['operations', 'monitoring', 'orchestration']
  },
  {
    id: 'devops-hub',
    title: 'DevOps Hub',
    description: 'Agent factory with registration, validation, and lifecycle management capabilities.',
    type: 'repository',
    url: 'https://github.com/sillinous/devops-hub',
    category: 'Infrastructure',
    tags: ['factory', 'devops', 'lifecycle']
  },
  {
    id: 'agentic-ecosystem',
    title: 'AgenticEcosystem',
    description: 'Foundation for collaborative multi-agent systems with the Collaborative Agent Protocol (CAP).',
    type: 'repository',
    url: 'https://github.com/sillinous/AgenticEcosystem',
    category: 'Infrastructure',
    tags: ['ecosystem', 'collaboration', 'cap']
  },

  // Tools
  {
    id: 'agent-validator',
    title: 'Agent Validator',
    description: 'Validates agents against 8 architectural principles with scoring and recommendations.',
    type: 'tool',
    url: 'https://github.com/sillinous/devops-hub/tree/main/factory',
    category: 'Tools',
    tags: ['validation', 'compliance', 'quality']
  },
  {
    id: 'workflow-engine',
    title: 'Workflow Engine',
    description: 'Orchestrates multi-agent workflows across APQC process levels.',
    type: 'tool',
    url: 'https://github.com/sillinous/devops-hub/tree/main/service',
    category: 'Tools',
    tags: ['workflow', 'orchestration', 'automation']
  },

  // External Resources
  {
    id: 'apqc-official',
    title: 'APQC Official Website',
    description: 'American Productivity & Quality Center - Source of the Process Classification Framework.',
    type: 'external',
    url: 'https://www.apqc.org',
    category: 'External',
    tags: ['apqc', 'official', 'framework']
  },
  {
    id: 'apqc-pcf',
    title: 'APQC Process Classification Framework',
    description: 'Official PCF documentation and best practices from APQC.',
    type: 'external',
    url: 'https://www.apqc.org/process-frameworks',
    category: 'External',
    tags: ['pcf', 'framework', 'official']
  },
  {
    id: 'anthropic-mcp',
    title: 'Anthropic Model Context Protocol',
    description: 'Official MCP specification for LLM tool integration.',
    type: 'external',
    url: 'https://modelcontextprotocol.io',
    category: 'External',
    tags: ['mcp', 'anthropic', 'protocol']
  },
];

export const resourceCategories = [
  { id: 'core-docs', name: 'Core Documentation', count: 4 },
  { id: 'platforms', name: 'Platforms', count: 2 },
  { id: 'infrastructure', name: 'Infrastructure', count: 2 },
  { id: 'tools', name: 'Tools', count: 2 },
  { id: 'external', name: 'External Resources', count: 3 },
];

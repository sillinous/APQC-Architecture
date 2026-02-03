export interface RoadmapPhase {
  id: string;
  name: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'planned' | 'future';
  description: string;
  objectives: RoadmapObjective[];
  deliverables: string[];
  metrics: RoadmapMetric[];
}

export interface RoadmapObjective {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
}

export interface RoadmapMetric {
  name: string;
  current: number | string;
  target: number | string;
  unit?: string;
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-0',
    name: 'Foundation & Agentic Core',
    timeframe: 'Completed',
    status: 'completed',
    description: 'Establish core APQC framework and initial agent library',
    objectives: [
      { id: '0.1', title: 'APQC Taxonomy', description: 'Map 13 process levels to agent architecture', status: 'completed', progress: 100 },
      { id: '0.2', title: 'Agent Catalog', description: 'Document 103 agents across all levels', status: 'completed', progress: 100 },
      { id: '0.3', title: 'Algorithm Suite', description: 'Build 20+ production-ready business algorithms', status: 'completed', progress: 100 },
      { id: '0.4', title: '8 Principles', description: 'Establish compliance standards', status: 'completed', progress: 100 },
    ],
    deliverables: ['AGENT_LIBRARY_CATALOG.md', '103 agent profiles', '20 algorithms'],
    metrics: [{ name: 'Agents Cataloged', current: 103, target: 103 }, { name: 'Algorithms', current: 20, target: 20 }]
  },
  {
    id: 'phase-1',
    name: 'Observability & Persistence',
    timeframe: 'Completed',
    status: 'completed',
    description: 'Cloud storage, real-time telemetry, and global navigation',
    objectives: [
      { id: '1.1', title: 'Firebase Integration', description: 'Real-time cloud persistence for all modules', status: 'completed', progress: 100 },
      { id: '1.2', title: 'Live Telemetry', description: 'Heartbeat API and Ops Hub integration', status: 'completed', progress: 100 },
      { id: '1.3', title: 'Process Navigator', description: 'Interactive SVG Sunburst for 13 levels', status: 'completed', progress: 100 },
    ],
    deliverables: ['TelemetryProvider', 'Sensor API', 'Sunburst Navigator'],
    metrics: [{ name: 'Uptime', current: '99.9%', target: '100%' }, { name: 'Persistence', current: '100%', target: '100%' }]
  },
  {
    id: 'phase-2',
    name: 'Intelligence & Simulation',
    timeframe: 'Completed',
    status: 'completed',
    description: 'Predictive War Rooms and Prescriptive Optimization',
    objectives: [
      { id: '2.1', title: 'War Room', description: 'Scenario simulation for ROI analysis', status: 'completed', progress: 100 },
      { id: '2.2', title: 'Optimization Hub', description: 'Prescriptive deployment roadmap', status: 'completed', progress: 100 },
      { id: '2.3', title: 'Value Hub', description: 'Maturity assessments and ROI calculators', status: 'completed', progress: 100 },
    ],
    deliverables: ['Simulation Engine', 'Roadmap Multiplier', 'ROI Calculator'],
    metrics: [{ name: 'Simulations Run', current: 120, target: 100 }, { name: 'Value Gaps Closed', current: '35%', target: '50%' }]
  },
  {
    id: 'phase-3',
    name: 'Action & Orchestration',
    timeframe: 'Completed',
    status: 'completed',
    description: 'Visual workflow design and executive reporting',
    objectives: [
      { id: '3.1', title: 'Orchestration Canvas', description: 'Drag-and-drop workspace for workflows', status: 'completed', progress: 100 },
      { id: '3.2', title: 'Policy Guardian', description: 'Enterprise governance and safety guardrails', status: 'completed', progress: 100 },
      { id: '3.3', title: 'Executive Reports', description: 'Automated narrative synthesis for boards', status: 'completed', progress: 100 },
    ],
    deliverables: ['Canvas Workspace', 'Policy Engine', 'Narrative Engine'],
    metrics: [{ name: 'Governance Score', current: '92%', target: '100%' }, { name: 'Workflows Designed', current: 15, target: 10 }]
  },
  {
    id: 'phase-4',
    name: 'Context & Competitive Edge',
    timeframe: 'Completed',
    status: 'completed',
    description: 'Industry benchmarking and global competitive analysis',
    objectives: [
      { id: '4.1', title: 'Benchmarking Hub', description: 'Industry comparison using Radar analysis', status: 'completed', progress: 100 },
      { id: '4.2', title: 'Competitive Gap', description: 'Identifying market deficit and leadership', status: 'completed', progress: 100 },
    ],
    deliverables: ['Benchmarking Radar', 'Industry Dataset'],
    metrics: [{ name: 'Market Context', current: 'High', target: 'Critical' }]
  }
];

export const overallProgress = {
  totalObjectives: roadmapPhases.reduce((acc, phase) => acc + phase.objectives.length, 0),
  completedObjectives: roadmapPhases.reduce((acc, phase) =>
    acc + phase.objectives.filter(o => o.status === 'completed').length, 0),
  overallPercent: Math.round(
    (roadmapPhases.reduce((acc, phase) =>
      acc + phase.objectives.reduce((sum, o) => sum + o.progress, 0), 0) /
    (roadmapPhases.reduce((acc, phase) => acc + phase.objectives.length, 0) * 100)) * 100
  )
};

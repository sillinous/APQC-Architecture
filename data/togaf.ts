export interface TogafTask {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface TogafPhase {
  id: string;
  name: string;
  shortName: string;
  description: string;
  tasks: TogafTask[];
  status: 'not-started' | 'in-progress' | 'completed';
  color: string;
}

export const togafAdmPhases: TogafPhase[] = [
  {
    id: 'preliminary',
    name: 'Preliminary Phase',
    shortName: 'PRE',
    description: 'Preparation and initiation activities required to meet the business directive for a new enterprise architecture.',
    status: 'completed',
    color: '#4B5563', // gray-600
    tasks: [
      { id: 'P1', title: 'Define the Enterprise', description: 'Identify scope and boundaries', status: 'completed' },
      { id: 'P2', title: 'Establish Architecture Team', description: 'Define roles and responsibilities', status: 'completed' },
      { id: 'P3', title: 'Define Architecture Principles', description: 'Core standards for the architecture', status: 'completed' },
    ]
  },
  {
    id: 'phase-a',
    name: 'Phase A: Architecture Vision',
    shortName: 'A',
    description: 'Initial phase of an architecture development cycle. It includes information about defining the scope, identifying the stakeholders, creating the Architecture Vision, and obtaining approval.',
    status: 'in-progress',
    color: '#3B82F6', // blue-500
    tasks: [
      { id: 'A1', title: 'Define Scope', description: 'Breadth and depth of the effort', status: 'completed' },
      { id: 'A2', title: 'Identify Stakeholders', description: 'Engage and analyze concerns', status: 'in-progress' },
      { id: 'A3', title: 'Develop Business Transformation Readiness', description: 'Assess cultural and organizational impact', status: 'not-started' },
    ]
  },
  {
    id: 'phase-b',
    name: 'Phase B: Business Architecture',
    shortName: 'B',
    description: 'The development of a Business Architecture to support an agreed Architecture Vision.',
    status: 'not-started',
    color: '#8B5CF6', // violet-500
    tasks: [
      { id: 'B1', title: 'Develop Baseline Description', description: 'Current business state', status: 'not-started' },
      { id: 'B2', title: 'Develop Target Description', description: 'Future business state', status: 'not-started' },
      { id: 'B3', title: 'Perform Gap Analysis', description: 'Identify missing capabilities', status: 'not-started' },
    ]
  },
  {
    id: 'phase-c',
    name: 'Phase C: Information Systems Architectures',
    shortName: 'C',
    description: 'The development of Information Systems Architectures (Data and Application) for an architecture project.',
    status: 'not-started',
    color: '#EC4899', // pink-500
    tasks: [
      { id: 'C1', title: 'Data Architecture', description: 'Structure of logical and physical data', status: 'not-started' },
      { id: 'C2', title: 'Application Architecture', description: 'Blueprint for application systems', status: 'not-started' },
    ]
  },
  {
    id: 'phase-d',
    name: 'Phase D: Technology Architecture',
    shortName: 'D',
    description: 'The development of the Technology Architecture for an architecture project.',
    status: 'not-started',
    color: '#F97316', // orange-500
    tasks: [
      { id: 'D1', title: 'Reference Models', description: 'Select relevant standards', status: 'not-started' },
      { id: 'D2', title: 'Baseline Technology', description: 'Current technology landscape', status: 'not-started' },
      { id: 'D3', title: 'Target Technology', description: 'Future infrastructure view', status: 'not-started' },
    ]
  },
  {
    id: 'phase-e',
    name: 'Phase E: Opportunities & Solutions',
    shortName: 'E',
    description: 'Initial implementation planning and the identification of delivery vehicles for the architecture defined in previous phases.',
    status: 'not-started',
    color: '#EF4444', // red-500
    tasks: [
      { id: 'E1', title: 'Define Roadmap', description: 'Timeline and milestones', status: 'not-started' },
      { id: 'E2', title: 'Identify Incremental Steps', description: 'Transition architectures', status: 'not-started' },
    ]
  },
  {
    id: 'phase-f',
    name: 'Phase F: Migration Planning',
    shortName: 'F',
    description: 'Addressing the formulation of a set of detailed sequence of projects that implement the Target Architecture.',
    status: 'not-started',
    color: '#10B981', // emerald-500
    tasks: [
      { id: 'F1', title: 'Prioritize Projects', description: 'Cost/benefit analysis', status: 'not-started' },
      { id: 'F2', title: 'Finalize Implementation Plan', description: 'Detailed resource allocation', status: 'not-started' },
    ]
  },
  {
    id: 'phase-g',
    name: 'Phase G: Implementation Governance',
    shortName: 'G',
    description: 'Architectural oversight of the implementation.',
    status: 'not-started',
    color: '#06B6D4', // cyan-500
    tasks: [
      { id: 'G1', title: 'Architecture Contracts', description: 'Formalize expectations', status: 'not-started' },
      { id: 'G2', title: 'Post-Implementation Review', description: 'Lessons learned', status: 'not-started' },
    ]
  },
  {
    id: 'phase-h',
    name: 'Phase H: Architecture Change Management',
    shortName: 'H',
    description: 'Establishing procedures for managing change to the new architecture.',
    status: 'not-started',
    color: '#F59E0B', // amber-500
    tasks: [
      { id: 'H1', title: 'Establish Change Process', description: 'Monitor and manage drivers', status: 'not-started' },
      { id: 'H2', title: 'Manage Architecture Version', description: 'Document updates', status: 'not-started' },
    ]
  },
  {
    id: 'requirements',
    name: 'Requirements Management',
    shortName: 'REQ',
    description: 'The process of managing architecture requirements throughout the ADM.',
    status: 'in-progress',
    color: '#6366F1', // indigo-500
    tasks: [
      { id: 'R1', title: 'Identify Requirements', description: 'Log and catalog needs', status: 'completed' },
      { id: 'R2', title: 'Prioritize Requirements', description: 'Rank based on business value', status: 'in-progress' },
    ]
  }
];

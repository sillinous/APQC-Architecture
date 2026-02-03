export interface Workflow {
  id: string;
  name: string;
  description: string;
  levels: string[];
  steps: WorkflowStep[];
  estimatedValue: string;
  complexity: 'low' | 'medium' | 'high';
  status: 'available' | 'coming-soon' | 'planned';
}

export interface WorkflowStep {
  order: number;
  levelId: string;
  agentName: string;
  action: string;
  inputs: string[];
  outputs: string[];
}

export const workflows: Workflow[] = [
  {
    id: 'order-to-cash',
    name: 'Order-to-Cash',
    description: 'Complete revenue cycle from customer order through payment collection. Automates sales, fulfillment, invoicing, and collections.',
    levels: ['3.0', '4.0', '5.0', '8.0'],
    steps: [
      { order: 1, levelId: '3.0', agentName: 'Manage Pricing Agent', action: 'Quote pricing', inputs: ['Customer request', 'Product catalog'], outputs: ['Price quote', 'Discount approval'] },
      { order: 2, levelId: '4.0', agentName: 'Optimize Inventory Agent', action: 'Check availability', inputs: ['Order items', 'Inventory data'], outputs: ['Availability status', 'Allocation'] },
      { order: 3, levelId: '4.0', agentName: 'Forecast Demand Agent', action: 'Update forecasts', inputs: ['Order data', 'Historical trends'], outputs: ['Updated demand forecast'] },
      { order: 4, levelId: '5.0', agentName: 'Service Delivery Agent', action: 'Coordinate delivery', inputs: ['Order details', 'Customer location'], outputs: ['Delivery schedule', 'Tracking'] },
      { order: 5, levelId: '8.0', agentName: 'Process AR Agent', action: 'Invoice and collect', inputs: ['Delivery confirmation', 'Pricing'], outputs: ['Invoice', 'Payment status'] },
    ],
    estimatedValue: '$2-5M annual savings for mid-size enterprise',
    complexity: 'high',
    status: 'available'
  },
  {
    id: 'procure-to-pay',
    name: 'Procure-to-Pay',
    description: 'End-to-end procurement process from requisition through payment. Streamlines supplier management, purchasing, and accounts payable.',
    levels: ['4.0', '8.0', '10.0'],
    steps: [
      { order: 1, levelId: '4.0', agentName: 'Manage Supplier Agent', action: 'Evaluate suppliers', inputs: ['Requirements', 'Supplier data'], outputs: ['Supplier scorecard', 'Recommendation'] },
      { order: 2, levelId: '4.0', agentName: 'Optimize Inventory Agent', action: 'Calculate order quantity', inputs: ['Demand forecast', 'Inventory levels'], outputs: ['Purchase order', 'EOQ'] },
      { order: 3, levelId: '10.0', agentName: 'Assess Risks Agent', action: 'Evaluate supplier risk', inputs: ['Supplier profile', 'Market data'], outputs: ['Risk assessment', 'Mitigation plan'] },
      { order: 4, levelId: '8.0', agentName: 'Cost Accounting Agent', action: 'Process payment', inputs: ['Invoice', 'Receipt'], outputs: ['Payment authorization', 'Accounting entry'] },
    ],
    estimatedValue: '15-25% procurement cost reduction',
    complexity: 'medium',
    status: 'available'
  },
  {
    id: 'hire-to-retire',
    name: 'Hire-to-Retire',
    description: 'Complete employee lifecycle management from recruitment through retirement. Covers talent acquisition, development, and offboarding.',
    levels: ['7.0', '12.0'],
    steps: [
      { order: 1, levelId: '7.0', agentName: 'Employee Competencies Agent', action: 'Assess skill requirements', inputs: ['Job description', 'Team needs'], outputs: ['Skill profile', 'Training needs'] },
      { order: 2, levelId: '7.0', agentName: 'Manage Performance Agent', action: 'Set objectives', inputs: ['Role expectations', 'Company goals'], outputs: ['Performance plan', 'KPIs'] },
      { order: 3, levelId: '12.0', agentName: 'Execute Projects Agent', action: 'Assign to projects', inputs: ['Skills', 'Project needs'], outputs: ['Resource allocation', 'Timeline'] },
      { order: 4, levelId: '7.0', agentName: 'Manage Performance Agent', action: 'Review performance', inputs: ['KPI data', 'Feedback'], outputs: ['Performance score', 'Development plan'] },
    ],
    estimatedValue: '30% reduction in time-to-productivity',
    complexity: 'medium',
    status: 'available'
  },
  {
    id: 'idea-to-product',
    name: 'Idea-to-Product',
    description: 'Innovation pipeline from concept through market launch. Manages ideation, development, testing, and go-to-market.',
    levels: ['1.0', '2.0', '3.0'],
    steps: [
      { order: 1, levelId: '1.0', agentName: 'Strategic Planning Agent', action: 'Evaluate opportunity', inputs: ['Idea proposal', 'Market data'], outputs: ['Strategic fit score', 'Priority'] },
      { order: 2, levelId: '3.0', agentName: 'Market Trends Agent', action: 'Analyze market', inputs: ['Concept', 'Competitor data'], outputs: ['Market analysis', 'Opportunity size'] },
      { order: 3, levelId: '2.0', agentName: 'Product Portfolio Agent', action: 'Portfolio fit', inputs: ['Concept', 'Existing products'], outputs: ['Portfolio impact', 'Cannibalization risk'] },
      { order: 4, levelId: '3.0', agentName: 'Manage Pricing Agent', action: 'Price strategy', inputs: ['Costs', 'Market analysis'], outputs: ['Pricing model', 'Revenue projection'] },
    ],
    estimatedValue: '40% faster time-to-market',
    complexity: 'high',
    status: 'available'
  },
  {
    id: 'issue-to-resolution',
    name: 'Issue-to-Resolution',
    description: 'Customer issue management from initial contact through resolution and follow-up. Ensures consistent service quality.',
    levels: ['6.0', '5.0', '7.0'],
    steps: [
      { order: 1, levelId: '6.0', agentName: 'Resolve Issues Agent', action: 'Categorize issue', inputs: ['Customer inquiry', 'History'], outputs: ['Issue category', 'Priority'] },
      { order: 2, levelId: '6.0', agentName: 'Resolve Issues Agent', action: 'Root cause analysis', inputs: ['Issue details', 'Similar cases'], outputs: ['Root cause', 'Resolution path'] },
      { order: 3, levelId: '5.0', agentName: 'Service Delivery Agent', action: 'Execute resolution', inputs: ['Resolution plan', 'Resources'], outputs: ['Resolution status', 'Customer update'] },
      { order: 4, levelId: '7.0', agentName: 'Employee Competencies Agent', action: 'Update knowledge', inputs: ['Resolution', 'Learnings'], outputs: ['Knowledge article', 'Training update'] },
    ],
    estimatedValue: '50% reduction in resolution time',
    complexity: 'low',
    status: 'available'
  },
  {
    id: 'risk-to-mitigation',
    name: 'Risk-to-Mitigation',
    description: 'Enterprise risk management from identification through mitigation and monitoring. Proactive risk handling.',
    levels: ['10.0', '12.0', '1.0'],
    steps: [
      { order: 1, levelId: '10.0', agentName: 'Assess Risks Agent', action: 'Identify risks', inputs: ['Business context', 'External factors'], outputs: ['Risk register', 'Heat map'] },
      { order: 2, levelId: '10.0', agentName: 'Assess Risks Agent', action: 'Prioritize risks', inputs: ['Risk register', 'Impact data'], outputs: ['Priority ranking', 'Focus areas'] },
      { order: 3, levelId: '12.0', agentName: 'Execute Projects Agent', action: 'Plan mitigation', inputs: ['Priority risks', 'Resources'], outputs: ['Mitigation projects', 'Timeline'] },
      { order: 4, levelId: '1.0', agentName: 'Strategic Planning Agent', action: 'Align strategy', inputs: ['Risk profile', 'Business goals'], outputs: ['Strategic adjustments', 'Contingencies'] },
    ],
    estimatedValue: '60% improvement in risk response time',
    complexity: 'medium',
    status: 'coming-soon'
  }
];

export const workflowStats = {
  totalWorkflows: workflows.length,
  availableWorkflows: workflows.filter(w => w.status === 'available').length,
  avgComplexity: 'medium',
  estimatedTotalValue: '$10M+ annual enterprise value'
};

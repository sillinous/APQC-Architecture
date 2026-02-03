export interface APQCLevel {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  agentCount: number;
  implementedCount: number;
  subProcesses: APQCSubProcess[];
  keyAlgorithms: string[];
  businessOutcomes: string[];
}

export interface APQCSubProcess {
  id: string;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  level: string;
  description: string;
  status: 'production' | 'beta' | 'planned';
  protocols: string[];
  algorithms: string[];
  skillLevels: Record<string, number>;
  businessValue: string;
  implementationDate?: string;
  lifecycle?: 'concept' | 'poc' | 'mvp' | 'production' | 'retired';
  estimatedSavings?: number;
  implementationCost?: number;
  complexity?: 'low' | 'medium' | 'high';
  // Operational Metrics
  uptime?: number; // percentage
  successRate?: number; // percentage
  lastExecuted?: string; // ISO date
}

export const apqcLevels: APQCLevel[] = [
  {
    id: '1.0',
    name: 'Develop Vision and Strategy',
    shortName: 'Strategy',
    description: 'Define business strategy, vision, and long-term planning. Establish organizational direction and competitive positioning.',
    color: '#8B5CF6',
    icon: 'Compass',
    agentCount: 5,
    implementedCount: 5,
    subProcesses: [
      { id: '1.1', name: 'Define the business concept and long-term vision', description: 'Establish strategic direction' },
      { id: '1.2', name: 'Develop business strategy', description: 'Create competitive strategy' },
      { id: '1.3', name: 'Manage strategic initiatives', description: 'Execute strategic programs' },
      { id: '1.4', name: 'Develop and manage innovation', description: 'Foster innovation culture' },
    ],
    keyAlgorithms: ['SWOT Analysis', 'Porter\'s Five Forces', 'Scenario Planning', 'Balanced Scorecard'],
    businessOutcomes: ['Strategic alignment', 'Competitive advantage', 'Innovation pipeline', 'Market positioning']
  },
  {
    id: '2.0',
    name: 'Develop and Manage Products and Services',
    shortName: 'Design',
    description: 'Generate and develop new products/services. Manage the complete product lifecycle from ideation to retirement.',
    color: '#EC4899',
    icon: 'Lightbulb',
    agentCount: 6,
    implementedCount: 6,
    subProcesses: [
      { id: '2.1', name: 'Manage product and service portfolio', description: 'Portfolio optimization' },
      { id: '2.2', name: 'Develop products and services', description: 'New product development' },
      { id: '2.3', name: 'Design and prototype', description: 'Rapid prototyping' },
      { id: '2.4', name: 'Test and validate', description: 'Market validation' },
    ],
    keyAlgorithms: ['Stage-Gate Process', 'Design Thinking', 'MVP Validation', 'A/B Testing'],
    businessOutcomes: ['Product-market fit', 'Faster time-to-market', 'Innovation success rate', 'Portfolio optimization']
  },
  {
    id: '3.0',
    name: 'Market and Sell Products and Services',
    shortName: 'Sales',
    description: 'Understand market, develop marketing strategies, and manage sales operations. Drive revenue through customer acquisition.',
    color: '#F59E0B',
    icon: 'TrendingUp',
    agentCount: 10,
    implementedCount: 10,
    subProcesses: [
      { id: '3.1', name: 'Understand markets and customers', description: 'Market research and segmentation' },
      { id: '3.2', name: 'Develop marketing strategy', description: 'Strategic marketing planning' },
      { id: '3.3', name: 'Develop sales strategy', description: 'Sales planning and targeting' },
      { id: '3.4', name: 'Manage pricing', description: 'Dynamic pricing optimization' },
      { id: '3.5', name: 'Manage marketing and sales plans', description: 'Campaign execution' },
    ],
    keyAlgorithms: ['Moving Averages', 'Linear Regression', 'CAGR Calculation', 'Price Elasticity', 'BCG Matrix', 'Pareto Analysis'],
    businessOutcomes: ['Revenue growth', 'Market share', 'Customer acquisition cost', 'Sales efficiency']
  },
  {
    id: '4.0',
    name: 'Deliver Products and Services',
    shortName: 'Operations',
    description: 'Plan and execute core business operations including supply chain, manufacturing, and logistics.',
    color: '#10B981',
    icon: 'Truck',
    agentCount: 14,
    implementedCount: 14,
    subProcesses: [
      { id: '4.1', name: 'Plan for and align supply chain resources', description: 'Supply chain planning' },
      { id: '4.2', name: 'Procure materials and services', description: 'Procurement management' },
      { id: '4.3', name: 'Produce/Manufacture/Deliver product', description: 'Production operations' },
      { id: '4.4', name: 'Manage logistics and warehousing', description: 'Logistics optimization' },
    ],
    keyAlgorithms: ['EOQ (Economic Order Quantity)', 'Safety Stock Calculation', 'ABC Analysis', 'Exponential Smoothing', 'Seasonal Decomposition'],
    businessOutcomes: ['Inventory optimization', 'Supply chain efficiency', 'Delivery performance', 'Cost reduction']
  },
  {
    id: '5.0',
    name: 'Manage Customer Service',
    shortName: 'Service',
    description: 'Manage operational service delivery to customers. Ensure service quality and customer satisfaction.',
    color: '#06B6D4',
    icon: 'Headphones',
    agentCount: 7,
    implementedCount: 7,
    subProcesses: [
      { id: '5.1', name: 'Develop customer service strategy', description: 'Service strategy' },
      { id: '5.2', name: 'Plan and manage customer service operations', description: 'Service operations' },
      { id: '5.3', name: 'Measure and evaluate customer service operations', description: 'Service metrics' },
    ],
    keyAlgorithms: ['SLA Monitoring', 'Service Level Calculation', 'Queue Management'],
    businessOutcomes: ['Service quality', 'Customer satisfaction', 'Service efficiency', 'SLA compliance']
  },
  {
    id: '6.0',
    name: 'Develop and Manage Human Capital',
    shortName: 'Customer',
    description: 'Support and manage customer interactions. Handle inquiries, resolve issues, and build customer relationships.',
    color: '#3B82F6',
    icon: 'MessageSquare',
    agentCount: 7,
    implementedCount: 7,
    subProcesses: [
      { id: '6.1', name: 'Manage customer inquiries', description: 'Inquiry handling' },
      { id: '6.2', name: 'Resolve customer issues', description: 'Issue resolution' },
      { id: '6.3', name: 'Handle service exceptions', description: 'Exception management' },
    ],
    keyAlgorithms: ['5 Whys Root Cause Analysis', 'Issue Categorization', 'Sentiment Analysis', 'Escalation Routing'],
    businessOutcomes: ['First contact resolution', 'Customer retention', 'Issue resolution time', 'Customer effort score']
  },
  {
    id: '7.0',
    name: 'Manage Human Resources',
    shortName: 'HR',
    description: 'Recruit, develop, and manage workforce. Build organizational capability through talent management.',
    color: '#6366F1',
    icon: 'Users',
    agentCount: 10,
    implementedCount: 10,
    subProcesses: [
      { id: '7.1', name: 'Develop HR planning and strategies', description: 'Workforce planning' },
      { id: '7.2', name: 'Recruit, source, and select employees', description: 'Talent acquisition' },
      { id: '7.3', name: 'Develop and counsel employees', description: 'Learning & development' },
      { id: '7.4', name: 'Manage employee performance', description: 'Performance management' },
      { id: '7.5', name: 'Reward and retain employees', description: 'Compensation & benefits' },
    ],
    keyAlgorithms: ['Skill Gap Analysis', 'Weighted KPI Scoring', 'Competency Mapping', 'Learning Path Generation'],
    businessOutcomes: ['Employee engagement', 'Talent retention', 'Workforce productivity', 'Skill development']
  },
  {
    id: '8.0',
    name: 'Manage Financial Resources',
    shortName: 'Finance',
    description: 'Manage accounting and financial operations. Ensure financial health and regulatory compliance.',
    color: '#14B8A6',
    icon: 'DollarSign',
    agentCount: 6,
    implementedCount: 6,
    subProcesses: [
      { id: '8.1', name: 'Perform planning and management accounting', description: 'Financial planning' },
      { id: '8.2', name: 'Perform revenue accounting', description: 'Revenue management' },
      { id: '8.3', name: 'Perform general accounting', description: 'General ledger' },
      { id: '8.4', name: 'Manage treasury operations', description: 'Cash management' },
    ],
    keyAlgorithms: ['Activity-Based Costing (ABC)', 'Variance Analysis', 'DSO Calculation', 'AR Aging Analysis', 'Payment Probability Prediction'],
    businessOutcomes: ['Cost optimization', 'Cash flow management', 'Financial accuracy', 'Working capital efficiency']
  },
  {
    id: '9.0',
    name: 'Acquire and Manage Assets',
    shortName: 'Assets',
    description: 'Manage and optimize asset utilization. Maximize return on physical and intangible assets.',
    color: '#F97316',
    icon: 'Building',
    agentCount: 1,
    implementedCount: 1,
    subProcesses: [
      { id: '9.1', name: 'Design and construct/acquire assets', description: 'Asset acquisition' },
      { id: '9.2', name: 'Maintain and repair assets', description: 'Asset maintenance' },
      { id: '9.3', name: 'Dispose of assets', description: 'Asset disposition' },
    ],
    keyAlgorithms: ['OEE (Overall Equipment Effectiveness)', 'Capacity Planning', 'Bottleneck Identification', 'Utilization Optimization'],
    businessOutcomes: ['Asset utilization', 'Maintenance efficiency', 'Capital optimization', 'Equipment reliability']
  },
  {
    id: '10.0',
    name: 'Manage Enterprise Risk, Compliance, and Resiliency',
    shortName: 'Risk',
    description: 'Manage organizational risks and compliance. Ensure business continuity and regulatory adherence.',
    color: '#EF4444',
    icon: 'Shield',
    agentCount: 8,
    implementedCount: 8,
    subProcesses: [
      { id: '10.1', name: 'Manage enterprise risk', description: 'Risk management' },
      { id: '10.2', name: 'Manage compliance', description: 'Regulatory compliance' },
      { id: '10.3', name: 'Manage business resiliency', description: 'Business continuity' },
    ],
    keyAlgorithms: ['Risk Matrix (Probability x Impact)', 'Heat Map Generation', 'RPN Calculation', 'Mitigation Strategy Selection'],
    businessOutcomes: ['Risk reduction', 'Compliance adherence', 'Business continuity', 'Regulatory confidence']
  },
  {
    id: '11.0',
    name: 'Manage External Relationships',
    shortName: 'Relations',
    description: 'Manage external relationships and public relations. Build and maintain stakeholder relationships.',
    color: '#8B5CF6',
    icon: 'Globe',
    agentCount: 5,
    implementedCount: 5,
    subProcesses: [
      { id: '11.1', name: 'Build investor relationships', description: 'Investor relations' },
      { id: '11.2', name: 'Manage government relationships', description: 'Government affairs' },
      { id: '11.3', name: 'Manage public relations', description: 'PR management' },
    ],
    keyAlgorithms: ['Stakeholder Mapping', 'Sentiment Analysis', 'Communication Planning'],
    businessOutcomes: ['Stakeholder satisfaction', 'Brand reputation', 'Regulatory relationships', 'Investor confidence']
  },
  {
    id: '12.0',
    name: 'Develop and Manage Business Capabilities',
    shortName: 'Capability',
    description: 'Manage organizational capabilities and projects. Drive continuous improvement and transformation.',
    color: '#84CC16',
    icon: 'Rocket',
    agentCount: 7,
    implementedCount: 7,
    subProcesses: [
      { id: '12.1', name: 'Manage enterprise programs and projects', description: 'Project management' },
      { id: '12.2', name: 'Manage enterprise quality', description: 'Quality management' },
      { id: '12.3', name: 'Manage change', description: 'Change management' },
      { id: '12.4', name: 'Manage business processes', description: 'Process management' },
    ],
    keyAlgorithms: ['Critical Path Method (CPM)', 'Earned Value Management (EVM)', 'Resource Leveling', 'SPI/CPI Calculation'],
    businessOutcomes: ['Project success rate', 'Process efficiency', 'Change adoption', 'Quality improvement']
  },
  {
    id: '13.0',
    name: 'Manage Information Technology',
    shortName: 'IT',
    description: 'Manage IT operations and infrastructure. Enable business through technology excellence.',
    color: '#6366F1',
    icon: 'Server',
    agentCount: 20,
    implementedCount: 20,
    subProcesses: [
      { id: '13.1', name: 'Develop IT strategy', description: 'IT strategic planning' },
      { id: '13.2', name: 'Develop and manage IT solutions', description: 'Solution development' },
      { id: '13.3', name: 'Deploy IT solutions', description: 'Solution deployment' },
      { id: '13.4', name: 'Manage IT operations', description: 'IT operations' },
      { id: '13.5', name: 'Manage IT security', description: 'Cybersecurity' },
    ],
    keyAlgorithms: ['Deployment Planning', 'Rollback Strategy', 'Monitoring Setup', 'Validation Automation'],
    businessOutcomes: ['System availability', 'Security posture', 'IT efficiency', 'Digital enablement']
  }
];

export const agents: Agent[] = [
  // APQC 3.0 - Sales & Marketing
  {
    id: 'analyze-market-trends',
    name: 'Analyze Market Trends Sales Marketing Agent',
    level: '3.0',
    description: 'Analyzes market trends using statistical methods including moving averages, linear regression, and seasonality analysis.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Moving Averages', 'Linear Regression', 'Seasonality Analysis', 'CAGR'],
    skillLevels: { trend_analysis: 0.9, statistical_analysis: 0.88 },
    businessValue: 'Enables data-driven market insights for strategic decision making',
    implementationDate: 'Oct 17, 2025',
    lifecycle: 'production',
    estimatedSavings: 120000,
    implementationCost: 45000,
    complexity: 'medium'
  },
  {
    id: 'manage-product-portfolio',
    name: 'Manage Product Portfolio Sales Marketing Agent',
    level: '3.0',
    description: 'Optimizes product portfolio using BCG Matrix, Pareto analysis, and risk assessment methodologies.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['BCG Matrix', 'Pareto Analysis', 'Shannon Entropy', 'Risk Assessment'],
    skillLevels: { portfolio_optimization: 0.9, profitability_analysis: 0.87 },
    businessValue: 'Maximizes portfolio value through data-driven product decisions',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'manage-pricing',
    name: 'Manage Pricing Sales Marketing Agent',
    level: '3.0',
    description: 'Implements dynamic pricing strategies using price elasticity analysis and competitive benchmarking.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'A2P'],
    algorithms: ['Price Elasticity', 'Competitive Analysis', 'Margin Optimization'],
    skillLevels: { dynamic_pricing: 0.92, elasticity_analysis: 0.88 },
    businessValue: 'Optimizes revenue through intelligent pricing decisions',
    implementationDate: 'Oct 17, 2025',
    lifecycle: 'production',
    estimatedSavings: 250000,
    implementationCost: 85000,
    complexity: 'high'
  },
  {
    id: 'segment-customers',
    name: 'Segment Customers Sales Marketing Agent',
    level: '3.0',
    description: 'Segments customers using RFM analysis, clustering algorithms, and behavioral patterns for targeted marketing.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['RFM Analysis', 'K-Means Clustering', 'Customer Scoring'],
    skillLevels: { customer_segmentation: 0.91, clustering_analysis: 0.87 },
    businessValue: 'Enables precision marketing and improves conversion rates',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'generate-leads',
    name: 'Generate Leads Sales Marketing Agent',
    level: '3.0',
    description: 'Identifies and scores potential leads using predictive analytics and enrichment data.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Lead Scoring', 'Propensity Modeling', 'Lookalike Analysis'],
    skillLevels: { lead_identification: 0.89, predictive_scoring: 0.86 },
    businessValue: 'Increases qualified lead volume and reduces acquisition costs',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'score-opportunities',
    name: 'Score Opportunities Sales Marketing Agent',
    level: '3.0',
    description: 'Scores sales opportunities based on win probability, deal size, and sales cycle analysis.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Win Probability Calculation', 'Deal Scoring', 'Pipeline Velocity'],
    skillLevels: { opportunity_scoring: 0.90, win_prediction: 0.85 },
    businessValue: 'Improves sales focus and forecast accuracy',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-sales-territories',
    name: 'Optimize Sales Territories Sales Marketing Agent',
    level: '3.0',
    description: 'Optimizes sales territory design using geographic analysis, account distribution, and workload balancing.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Territory Optimization', 'Workload Balancing', 'Geographic Clustering'],
    skillLevels: { territory_design: 0.88, workload_analysis: 0.84 },
    businessValue: 'Maximizes sales coverage and team productivity',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'forecast-sales-pipeline',
    name: 'Forecast Sales Pipeline Sales Marketing Agent',
    level: '3.0',
    description: 'Forecasts sales pipeline using historical win rates, stage progression, and seasonality patterns.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Pipeline Forecasting', 'Stage Conversion Analysis', 'Weighted Forecasting'],
    skillLevels: { pipeline_forecasting: 0.91, conversion_analysis: 0.87 },
    businessValue: 'Improves revenue predictability and resource planning',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-campaigns',
    name: 'Manage Campaigns Sales Marketing Agent',
    level: '3.0',
    description: 'Manages marketing campaigns with attribution modeling, ROI analysis, and channel optimization.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Multi-Touch Attribution', 'Campaign ROI', 'Channel Mix Optimization'],
    skillLevels: { attribution_modeling: 0.89, roi_analysis: 0.86 },
    businessValue: 'Optimizes marketing spend and channel effectiveness',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'analyze-customer-lifetime-value',
    name: 'Analyze Customer Lifetime Value Sales Marketing Agent',
    level: '3.0',
    description: 'Calculates customer lifetime value using cohort analysis, retention modeling, and revenue projections.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['CLV Calculation', 'Cohort Analysis', 'Retention Modeling', 'Churn Prediction'],
    skillLevels: { clv_calculation: 0.92, retention_analysis: 0.88 },
    businessValue: 'Identifies high-value customer segments and retention strategies',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 4.0 - Operations & Logistics
  {
    id: 'forecast-demand',
    name: 'Forecast Demand Operational Agent',
    level: '4.0',
    description: 'Forecasts demand using exponential smoothing, seasonal decomposition, and confidence intervals.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Exponential Smoothing', 'Seasonal Decomposition', 'Confidence Intervals'],
    skillLevels: { time_series_forecasting: 0.92, seasonality_detection: 0.88 },
    businessValue: 'Improves inventory planning and reduces stockouts',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'manage-supplier-relationships',
    name: 'Manage Supplier Relationships Operational Agent',
    level: '4.0',
    description: 'Manages supplier performance using weighted scorecards and tier classification.',
    status: 'production',
    protocols: ['A2A', 'ANP', 'A2P'],
    algorithms: ['Weighted Scorecard', 'Tier Classification', 'Performance Tracking'],
    skillLevels: { supplier_scoring: 0.9, performance_tracking: 0.88 },
    businessValue: 'Strengthens supply chain through better supplier management',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'optimize-inventory',
    name: 'Optimize Inventory Operational Agent',
    level: '4.0',
    description: 'Optimizes inventory using EOQ, Safety Stock, and ABC Analysis methodologies.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['EOQ', 'Safety Stock', 'ABC Analysis'],
    skillLevels: { eoq_calculation: 0.92, safety_stock: 0.88, abc_analysis: 0.86 },
    businessValue: 'Minimizes inventory costs while ensuring availability',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'plan-production-schedule',
    name: 'Plan Production Schedule Operational Agent',
    level: '4.0',
    description: 'Creates optimized production schedules using capacity planning, constraint-based scheduling, and resource leveling.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Capacity Planning', 'Constraint Programming', 'Resource Leveling', 'Gantt Chart Generation'],
    skillLevels: { production_scheduling: 0.91, capacity_planning: 0.88 },
    businessValue: 'Maximizes production throughput and resource utilization',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-material-requirements',
    name: 'Optimize Material Requirements Operational Agent',
    level: '4.0',
    description: 'Optimizes material requirements planning using BOM explosion, lead time analysis, and lot sizing.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['MRP (Material Requirements Planning)', 'BOM Explosion', 'Lot Sizing', 'Lead Time Analysis'],
    skillLevels: { mrp_calculation: 0.90, bom_analysis: 0.87 },
    businessValue: 'Ensures material availability while minimizing inventory costs',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-warehouse-operations',
    name: 'Manage Warehouse Operations Operational Agent',
    level: '4.0',
    description: 'Optimizes warehouse operations using slotting optimization, pick path planning, and space utilization.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Slotting Optimization', 'Pick Path Planning', 'Space Utilization', 'Wave Planning'],
    skillLevels: { warehouse_optimization: 0.89, slotting_analysis: 0.85 },
    businessValue: 'Improves picking efficiency and inventory accuracy',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'coordinate-transportation',
    name: 'Coordinate Transportation Operational Agent',
    level: '4.0',
    description: 'Coordinates transportation logistics using load optimization, carrier selection, and mode selection.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Load Optimization', 'Carrier Selection', 'Mode Selection', 'Freight Cost Analysis'],
    skillLevels: { load_optimization: 0.88, carrier_selection: 0.84 },
    businessValue: 'Reduces transportation costs and improves delivery times',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'track-shipments',
    name: 'Track Shipments Operational Agent',
    level: '4.0',
    description: 'Tracks shipments in real-time using event management, ETA prediction, and exception detection.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['ETA Prediction', 'Event Tracking', 'Exception Detection', 'Delay Analysis'],
    skillLevels: { shipment_tracking: 0.91, eta_prediction: 0.87 },
    businessValue: 'Provides shipment visibility and proactive exception handling',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-quality-control',
    name: 'Manage Quality Control Operational Agent',
    level: '4.0',
    description: 'Manages quality control using statistical process control, defect analysis, and acceptance sampling.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['SPC (Statistical Process Control)', 'Defect Analysis', 'Acceptance Sampling', 'Six Sigma'],
    skillLevels: { quality_analysis: 0.90, defect_detection: 0.86 },
    businessValue: 'Reduces defect rates and improves product quality',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-route-planning',
    name: 'Optimize Route Planning Operational Agent',
    level: '4.0',
    description: 'Optimizes delivery routes using vehicle routing algorithms, time windows, and capacity constraints.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Vehicle Routing Problem (VRP)', 'Time Window Optimization', 'Multi-Stop Routing'],
    skillLevels: { route_optimization: 0.92, vrp_solving: 0.88 },
    businessValue: 'Minimizes delivery costs and improves customer service',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'forecast-supply-chain-disruptions',
    name: 'Forecast Supply Chain Disruptions Operational Agent',
    level: '4.0',
    description: 'Predicts supply chain disruptions using risk modeling, supplier monitoring, and scenario analysis.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Risk Modeling', 'Supplier Health Monitoring', 'Scenario Analysis', 'Impact Assessment'],
    skillLevels: { disruption_prediction: 0.87, risk_modeling: 0.84 },
    businessValue: 'Enables proactive mitigation of supply chain risks',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-vendor-contracts',
    name: 'Manage Vendor Contracts Operational Agent',
    level: '4.0',
    description: 'Manages vendor contracts using spend analysis, compliance monitoring, and renewal optimization.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'A2P'],
    algorithms: ['Spend Analysis', 'Contract Compliance', 'Renewal Optimization', 'SLA Tracking'],
    skillLevels: { contract_management: 0.88, compliance_monitoring: 0.85 },
    businessValue: 'Optimizes vendor relationships and reduces procurement costs',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'coordinate-cross-dock-operations',
    name: 'Coordinate Cross-Dock Operations Operational Agent',
    level: '4.0',
    description: 'Coordinates cross-dock operations using dock scheduling, flow optimization, and staging management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Dock Scheduling', 'Flow Optimization', 'Staging Management', 'Dock Door Assignment'],
    skillLevels: { cross_dock_optimization: 0.89, dock_scheduling: 0.86 },
    businessValue: 'Reduces handling time and improves throughput',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-fulfillment-centers',
    name: 'Optimize Fulfillment Centers Operational Agent',
    level: '4.0',
    description: 'Optimizes fulfillment center operations using network design, capacity planning, and inventory positioning.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Network Optimization', 'Capacity Planning', 'Inventory Positioning', 'Split Shipment Analysis'],
    skillLevels: { network_optimization: 0.90, capacity_planning: 0.87 },
    businessValue: 'Optimizes fulfillment network for speed and cost',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 6.0 - Customer Service
  {
    id: 'resolve-customer-issues',
    name: 'Resolve Customer Issues Customer Service Agent',
    level: '6.0',
    description: 'Resolves customer issues using 5 Whys root cause analysis and intelligent workflow generation.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['5 Whys', 'Issue Categorization', 'Workflow Generation'],
    skillLevels: { issue_categorization: 0.9, root_cause_analysis: 0.88 },
    businessValue: 'Improves customer satisfaction through faster resolution',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'handle-customer-inquiries',
    name: 'Handle Customer Inquiries Customer Service Agent',
    level: '6.0',
    description: 'Handles customer inquiries using natural language processing, intent classification, and automated responses.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Intent Classification', 'NLP Processing', 'Automated Response Generation', 'Context Management'],
    skillLevels: { intent_classification: 0.91, nlp_processing: 0.87 },
    businessValue: 'Reduces response time and improves customer service efficiency',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'route-support-tickets',
    name: 'Route Support Tickets Customer Service Agent',
    level: '6.0',
    description: 'Routes support tickets using skill-based routing, workload balancing, and priority queuing.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Skill-Based Routing', 'Workload Balancing', 'Priority Queuing', 'SLA Matching'],
    skillLevels: { ticket_routing: 0.90, skill_matching: 0.86 },
    businessValue: 'Optimizes agent utilization and reduces resolution time',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-knowledge-base',
    name: 'Manage Knowledge Base Customer Service Agent',
    level: '6.0',
    description: 'Manages knowledge base using content categorization, search optimization, and usage analytics.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Content Categorization', 'Search Ranking', 'Usage Analytics', 'Content Recommendation'],
    skillLevels: { content_management: 0.88, search_optimization: 0.85 },
    businessValue: 'Improves self-service success and reduces support costs',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'analyze-customer-feedback',
    name: 'Analyze Customer Feedback Customer Service Agent',
    level: '6.0',
    description: 'Analyzes customer feedback using sentiment analysis, topic modeling, and trend detection.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Sentiment Analysis', 'Topic Modeling', 'Trend Detection', 'NPS Calculation'],
    skillLevels: { sentiment_analysis: 0.91, topic_modeling: 0.87 },
    businessValue: 'Identifies improvement opportunities and tracks satisfaction',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-service-level-agreements',
    name: 'Manage Service Level Agreements Customer Service Agent',
    level: '6.0',
    description: 'Manages SLAs using compliance tracking, breach prediction, and escalation management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['SLA Tracking', 'Breach Prediction', 'Escalation Management', 'Performance Reporting'],
    skillLevels: { sla_tracking: 0.92, breach_prediction: 0.88 },
    businessValue: 'Ensures SLA compliance and prevents service failures',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'coordinate-omnichannel-support',
    name: 'Coordinate Omnichannel Support Customer Service Agent',
    level: '6.0',
    description: 'Coordinates omnichannel support using context preservation, channel routing, and conversation continuity.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Context Preservation', 'Channel Routing', 'Conversation Continuity', 'Unified Customer View'],
    skillLevels: { omnichannel_coordination: 0.89, context_management: 0.86 },
    businessValue: 'Provides seamless customer experience across channels',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 7.0 - Human Capital
  {
    id: 'develop-employee-competencies',
    name: 'Develop Employee Competencies Human Capital Agent',
    level: '7.0',
    description: 'Develops employee competencies through skill gap analysis and personalized learning paths.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Skill Gap Analysis', 'Learning Path Generation'],
    skillLevels: { skill_gap_analysis: 0.9, learning_path_generation: 0.87 },
    businessValue: 'Accelerates employee development and skill building',
    implementationDate: 'Oct 17, 2025',
    lifecycle: 'production',
    estimatedSavings: 85000,
    implementationCost: 30000,
    complexity: 'medium'
  },
  {
    id: 'manage-performance',
    name: 'Manage Performance Human Capital Agent',
    level: '7.0',
    description: 'Manages employee performance using weighted KPI scoring and trend analysis.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Weighted KPI Scoring', 'Trend Analysis', 'Sentiment Analysis'],
    skillLevels: { kpi_tracking: 0.9, performance_scoring: 0.88 },
    businessValue: 'Enables objective performance management',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'source-and-recruit-talent',
    name: 'Source and Recruit Talent Human Capital Agent',
    level: '7.0',
    description: 'Sources and recruits talent using candidate scoring, sourcing channel optimization, and interview scheduling.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Candidate Scoring', 'Job Match Analysis', 'Sourcing Channel ROI', 'Interview Scheduling'],
    skillLevels: { candidate_scoring: 0.90, job_matching: 0.87 },
    businessValue: 'Improves hiring quality and reduces time-to-fill',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'onboard-new-employees',
    name: 'Onboard New Employees Human Capital Agent',
    level: '7.0',
    description: 'Onboards new employees using personalized onboarding plans, progress tracking, and integration monitoring.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Onboarding Plan Generation', 'Progress Tracking', 'Integration Scoring', 'Milestone Management'],
    skillLevels: { onboarding_planning: 0.88, progress_tracking: 0.85 },
    businessValue: 'Accelerates time-to-productivity and improves retention',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'plan-succession',
    name: 'Plan Succession Human Capital Agent',
    level: '7.0',
    description: 'Plans succession using readiness assessment, talent pipeline analysis, and development planning.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Readiness Assessment', 'Talent Pipeline Analysis', 'Development Gap Analysis', 'Risk Scoring'],
    skillLevels: { succession_planning: 0.89, readiness_assessment: 0.86 },
    businessValue: 'Ensures leadership continuity and reduces succession risk',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'analyze-compensation',
    name: 'Analyze Compensation Human Capital Agent',
    level: '7.0',
    description: 'Analyzes compensation using market benchmarking, pay equity analysis, and total rewards optimization.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Market Benchmarking', 'Pay Equity Analysis', 'Compa-Ratio Calculation', 'Total Rewards Optimization'],
    skillLevels: { compensation_analysis: 0.91, market_benchmarking: 0.87 },
    businessValue: 'Ensures competitive compensation and pay equity',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'measure-employee-engagement',
    name: 'Measure Employee Engagement Human Capital Agent',
    level: '7.0',
    description: 'Measures employee engagement using survey analysis, sentiment tracking, and engagement scoring.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Engagement Scoring', 'Sentiment Analysis', 'eNPS Calculation', 'Trend Analysis'],
    skillLevels: { engagement_measurement: 0.90, sentiment_analysis: 0.87 },
    businessValue: 'Identifies engagement drivers and retention risks',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'plan-workforce',
    name: 'Plan Workforce Human Capital Agent',
    level: '7.0',
    description: 'Plans workforce using demand forecasting, skills inventory, and capacity planning.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Workforce Demand Forecasting', 'Skills Inventory', 'Capacity Planning', 'Hiring Forecast'],
    skillLevels: { workforce_planning: 0.89, demand_forecasting: 0.86 },
    businessValue: 'Optimizes workforce size and composition',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'coordinate-training',
    name: 'Coordinate Training Human Capital Agent',
    level: '7.0',
    description: 'Coordinates training using needs assessment, program scheduling, and effectiveness measurement.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Training Needs Assessment', 'Program Scheduling', 'Effectiveness Measurement', 'ROI Calculation'],
    skillLevels: { training_coordination: 0.88, effectiveness_measurement: 0.85 },
    businessValue: 'Maximizes training impact and development ROI',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-employee-exit',
    name: 'Manage Employee Exit Human Capital Agent',
    level: '7.0',
    description: 'Manages employee exit using flight risk prediction, exit interview analysis, and knowledge transfer.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Flight Risk Prediction', 'Exit Interview Analysis', 'Knowledge Transfer Planning', 'Retention Analysis'],
    skillLevels: { flight_risk_prediction: 0.88, exit_analysis: 0.85 },
    businessValue: 'Reduces regrettable attrition and captures tribal knowledge',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 8.0 - Financial Management
  {
    id: 'perform-cost-accounting',
    name: 'Perform Cost Accounting Financial Agent',
    level: '8.0',
    description: 'Performs cost accounting using Activity-Based Costing and variance analysis.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Activity-Based Costing', 'Variance Analysis', 'Overhead Allocation'],
    skillLevels: { cost_allocation: 0.9, variance_analysis: 0.88, abc_costing: 0.86 },
    businessValue: 'Provides accurate cost visibility for decision making',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'process-accounts-receivable',
    name: 'Process Accounts Receivable Financial Agent',
    level: '8.0',
    description: 'Manages accounts receivable using aging analysis and payment probability prediction.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'A2P'],
    algorithms: ['AR Aging', 'DSO Calculation', 'Payment Probability Prediction'],
    skillLevels: { aging_analysis: 0.9, dso_calculation: 0.88 },
    businessValue: 'Improves cash flow through better receivables management',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'manage-budgeting',
    name: 'Manage Budgeting Financial Agent',
    level: '8.0',
    description: 'Manages budgeting using bottom-up/top-down planning, variance analysis, and scenario modeling.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Budget Allocation', 'Variance Analysis', 'Scenario Modeling', 'Rolling Forecast'],
    skillLevels: { budget_planning: 0.90, scenario_modeling: 0.86 },
    businessValue: 'Improves budget accuracy and resource allocation',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'forecast-cash-flow',
    name: 'Forecast Cash Flow Financial Agent',
    level: '8.0',
    description: 'Forecasts cash flow using trend analysis, working capital modeling, and liquidity planning.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Cash Flow Forecasting', 'Working Capital Analysis', 'Liquidity Planning', 'Burn Rate Calculation'],
    skillLevels: { cash_flow_forecasting: 0.91, liquidity_planning: 0.87 },
    businessValue: 'Ensures liquidity and optimizes cash management',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'perform-financial-planning-analysis',
    name: 'Perform Financial Planning Analysis Financial Agent',
    level: '8.0',
    description: 'Performs FP&A using driver-based modeling, what-if analysis, and performance reporting.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Driver-Based Modeling', 'What-If Analysis', 'KPI Dashboards', 'Trend Analysis'],
    skillLevels: { financial_modeling: 0.92, variance_analysis: 0.88 },
    businessValue: 'Enables strategic financial decision-making',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-revenue-recognition',
    name: 'Manage Revenue Recognition Financial Agent',
    level: '8.0',
    description: 'Manages revenue recognition using ASC 606 compliance, contract analysis, and revenue allocation.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Revenue Allocation', 'Contract Analysis', 'Performance Obligation Tracking', 'ASC 606 Rules'],
    skillLevels: { revenue_recognition: 0.89, contract_analysis: 0.86 },
    businessValue: 'Ensures revenue compliance and accurate reporting',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 9.0 - Asset Management
  {
    id: 'optimize-asset-utilization',
    name: 'Optimize Asset Utilization Asset Management Agent',
    level: '9.0',
    description: 'Optimizes asset utilization using OEE calculations and bottleneck identification.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['OEE Calculation', 'Bottleneck Identification', 'Capacity Planning'],
    skillLevels: { oee_calculation: 0.92, capacity_planning: 0.88 },
    businessValue: 'Maximizes asset value and operational efficiency',
    implementationDate: 'Oct 17, 2025'
  },
  // APQC 10.0 - Risk & Compliance
  {
    id: 'assess-risks',
    name: 'Assess Risks Risk Compliance Agent',
    level: '10.0',
    description: 'Assesses organizational risks using risk matrices and mitigation strategies.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Risk Matrix', 'Heat Map', 'Mitigation Strategies'],
    skillLevels: { risk_scoring: 0.92, probability_analysis: 0.88 },
    businessValue: 'Reduces business risk through proactive identification',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'manage-regulatory-compliance',
    name: 'Manage Regulatory Compliance Risk Compliance Agent',
    level: '10.0',
    description: 'Manages regulatory compliance using requirement tracking, control testing, and remediation management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Compliance Tracking', 'Control Testing', 'Gap Analysis', 'Remediation Planning'],
    skillLevels: { compliance_management: 0.90, gap_analysis: 0.87 },
    businessValue: 'Ensures regulatory compliance and reduces penalties',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'conduct-internal-audits',
    name: 'Conduct Internal Audits Risk Compliance Agent',
    level: '10.0',
    description: 'Conducts internal audits using risk-based audit planning, finding tracking, and follow-up management.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Risk-Based Audit Planning', 'Finding Prioritization', 'Follow-up Tracking', 'Audit Sampling'],
    skillLevels: { audit_planning: 0.89, finding_prioritization: 0.86 },
    businessValue: 'Identifies control gaps and improves governance',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'plan-business-continuity',
    name: 'Plan Business Continuity Risk Compliance Agent',
    level: '10.0',
    description: 'Plans business continuity using impact analysis, recovery planning, and resilience testing.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Business Impact Analysis (BIA)', 'Recovery Time Objective (RTO)', 'Resilience Testing', 'Tabletop Exercises'],
    skillLevels: { impact_analysis: 0.88, recovery_planning: 0.85 },
    businessValue: 'Ensures business resilience and minimizes downtime',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'assess-cybersecurity-risk',
    name: 'Assess Cybersecurity Risk Risk Compliance Agent',
    level: '10.0',
    description: 'Assesses cybersecurity risk using threat modeling, vulnerability scanning, and security scoring.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Threat Modeling', 'Vulnerability Scoring (CVSS)', 'Security Posture Assessment', 'Attack Surface Analysis'],
    skillLevels: { threat_modeling: 0.91, vulnerability_assessment: 0.88 },
    businessValue: 'Reduces cyber risk and strengthens security posture',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-third-party-risk',
    name: 'Manage Third-Party Risk Risk Compliance Agent',
    level: '10.0',
    description: 'Manages third-party risk using vendor assessment, continuous monitoring, and risk tiering.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Vendor Risk Assessment', 'Continuous Monitoring', 'Risk Tiering', 'Due Diligence Automation'],
    skillLevels: { vendor_assessment: 0.89, continuous_monitoring: 0.86 },
    businessValue: 'Mitigates third-party risk and ensures vendor compliance',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'detect-fraud',
    name: 'Detect Fraud Risk Compliance Agent',
    level: '10.0',
    description: 'Detects fraud using anomaly detection, pattern analysis, and behavioral analytics.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Anomaly Detection', 'Pattern Analysis', 'Behavioral Analytics', 'Fraud Scoring'],
    skillLevels: { anomaly_detection: 0.90, pattern_analysis: 0.87 },
    businessValue: 'Prevents financial loss and reputational damage',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-policies',
    name: 'Manage Policies Risk Compliance Agent',
    level: '10.0',
    description: 'Manages policies using version control, attestation tracking, and compliance mapping.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Policy Versioning', 'Attestation Tracking', 'Compliance Mapping', 'Gap Analysis'],
    skillLevels: { policy_management: 0.88, compliance_mapping: 0.85 },
    businessValue: 'Ensures policy compliance and governance',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 12.0 - Capability Development
  {
    id: 'execute-projects',
    name: 'Execute Projects Capability Development Agent',
    level: '12.0',
    description: 'Manages project execution using CPM, EVM, and resource leveling.',
    status: 'production',
    protocols: ['A2A', 'ACP'],
    algorithms: ['Critical Path Method', 'Earned Value Management', 'Resource Leveling'],
    skillLevels: { task_scheduling: 0.9, resource_allocation: 0.88, progress_tracking: 0.86 },
    businessValue: 'Improves project success rate and delivery predictability',
    implementationDate: 'Oct 17, 2025'
  },
  // APQC 13.0 - Information Technology
  {
    id: 'deploy-it-solutions',
    name: 'Deploy IT Solutions Technology Agent',
    level: '13.0',
    description: 'Manages IT solution deployment with automated planning and rollback strategies.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Deployment Planning', 'Rollback Strategy', 'Monitoring Setup', 'Validation'],
    skillLevels: { deployment_automation: 0.9, rollback_strategy: 0.87 },
    businessValue: 'Ensures reliable and safe technology deployments',
    implementationDate: 'Oct 17, 2025'
  },
  {
    id: 'manage-change',
    name: 'Manage Change Capability Development Agent',
    level: '12.0',
    description: 'Manages organizational change using readiness assessment, stakeholder analysis, and adoption tracking.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Change Readiness Assessment', 'Stakeholder Analysis', 'Adoption Tracking', 'Resistance Analysis'],
    skillLevels: { change_management: 0.89, stakeholder_analysis: 0.86 },
    businessValue: 'Accelerates change adoption and reduces resistance',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-quality',
    name: 'Manage Quality Capability Development Agent',
    level: '12.0',
    description: 'Manages enterprise quality using defect tracking, root cause analysis, and CAPA management.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Defect Tracking', 'Root Cause Analysis', 'CAPA Management', 'Quality Metrics'],
    skillLevels: { quality_management: 0.90, root_cause_analysis: 0.87 },
    businessValue: 'Improves quality and reduces defects',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-business-processes',
    name: 'Optimize Business Processes Capability Development Agent',
    level: '12.0',
    description: 'Optimizes business processes using process mining, bottleneck analysis, and optimization modeling.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Process Mining', 'Bottleneck Analysis', 'Cycle Time Reduction', 'Value Stream Mapping'],
    skillLevels: { process_optimization: 0.91, process_mining: 0.88 },
    businessValue: 'Improves process efficiency and reduces waste',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-program-portfolio',
    name: 'Manage Program Portfolio Capability Development Agent',
    level: '12.0',
    description: 'Manages program portfolio using prioritization, resource allocation, and portfolio optimization.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Portfolio Prioritization', 'Resource Allocation', 'Value Scoring', 'Dependency Analysis'],
    skillLevels: { portfolio_management: 0.90, prioritization: 0.87 },
    businessValue: 'Optimizes portfolio value and resource utilization',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-lean-six-sigma',
    name: 'Implement Lean Six Sigma Capability Development Agent',
    level: '12.0',
    description: 'Implements Lean Six Sigma using DMAIC methodology, statistical analysis, and improvement tracking.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['DMAIC Methodology', 'Statistical Process Control', 'Process Capability Analysis', 'Waste Identification'],
    skillLevels: { lean_six_sigma: 0.91, statistical_analysis: 0.88 },
    businessValue: 'Drives continuous improvement and variation reduction',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-innovation-pipeline',
    name: 'Manage Innovation Pipeline Capability Development Agent',
    level: '12.0',
    description: 'Manages innovation pipeline using idea evaluation, stage-gate process, and innovation metrics.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Idea Scoring', 'Stage-Gate Management', 'Innovation Metrics', 'Portfolio Balancing'],
    skillLevels: { innovation_management: 0.89, idea_evaluation: 0.86 },
    businessValue: 'Accelerates innovation and improves success rate',
    implementationDate: 'Jan 26, 2026'
  },
  // APQC 13.0 - IT Management (Additional agents)
  {
    id: 'design-cloud-architecture',
    name: 'Design Cloud Architecture Technology Agent',
    level: '13.0',
    description: 'Designs cloud architecture using best practices, cost optimization, and security patterns.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Architecture Patterns', 'Cost Modeling', 'Security Design', 'Scalability Planning'],
    skillLevels: { cloud_architecture: 0.92, cost_optimization: 0.88 },
    businessValue: 'Creates scalable, secure, and cost-effective cloud solutions',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'develop-microservices',
    name: 'Develop Microservices Technology Agent',
    level: '13.0',
    description: 'Develops microservices using domain-driven design, API contracts, and service decomposition.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'CAIP'],
    algorithms: ['Domain-Driven Design', 'Service Decomposition', 'API Contract Design', 'Event Storming'],
    skillLevels: { microservices_design: 0.91, domain_modeling: 0.87 },
    businessValue: 'Enables scalable and maintainable application architecture',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-api-gateway',
    name: 'Implement API Gateway Technology Agent',
    level: '13.0',
    description: 'Implements API gateway using rate limiting, authentication, and traffic management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'CAIP'],
    algorithms: ['Rate Limiting', 'JWT Authentication', 'Traffic Routing', 'API Versioning'],
    skillLevels: { api_management: 0.90, security_implementation: 0.87 },
    businessValue: 'Secures and optimizes API access',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-database-systems',
    name: 'Manage Database Systems Technology Agent',
    level: '13.0',
    description: 'Manages database systems using performance tuning, backup strategies, and high availability.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Query Optimization', 'Index Management', 'Replication Strategies', 'Backup Scheduling'],
    skillLevels: { database_optimization: 0.92, high_availability: 0.88 },
    businessValue: 'Ensures data reliability and query performance',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'configure-monitoring',
    name: 'Configure Monitoring Technology Agent',
    level: '13.0',
    description: 'Configures monitoring using metrics collection, alerting, and observability best practices.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Metrics Collection', 'Alert Thresholds', 'Dashboard Design', 'Anomaly Detection'],
    skillLevels: { monitoring_setup: 0.91, observability: 0.87 },
    businessValue: 'Enables proactive issue detection and resolution',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-security-controls',
    name: 'Implement Security Controls Technology Agent',
    level: '13.0',
    description: 'Implements security controls using zero trust, encryption, and access management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Zero Trust Architecture', 'Encryption Management', 'Access Control Lists', 'Security Hardening'],
    skillLevels: { security_implementation: 0.93, zero_trust: 0.89 },
    businessValue: 'Strengthens security posture and reduces vulnerabilities',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-user-access',
    name: 'Manage User Access Technology Agent',
    level: '13.0',
    description: 'Manages user access using RBAC, identity federation, and access reviews.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Role-Based Access Control (RBAC)', 'Identity Federation', 'Access Reviews', 'Privilege Management'],
    skillLevels: { access_management: 0.90, identity_governance: 0.87 },
    businessValue: 'Ensures secure and appropriate access to systems',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'deploy-infrastructure-as-code',
    name: 'Deploy Infrastructure as Code Technology Agent',
    level: '13.0',
    description: 'Deploys infrastructure as code using Terraform, CloudFormation, and GitOps practices.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Template Generation', 'State Management', 'Drift Detection', 'GitOps Workflows'],
    skillLevels: { iac_development: 0.92, state_management: 0.88 },
    businessValue: 'Enables repeatable and version-controlled infrastructure',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'optimize-cloud-costs',
    name: 'Optimize Cloud Costs Technology Agent',
    level: '13.0',
    description: 'Optimizes cloud costs using rightsizing, reserved instances, and waste detection.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Rightsizing Analysis', 'Reserved Instance Recommendations', 'Waste Detection', 'Cost Allocation'],
    skillLevels: { cost_optimization: 0.91, resource_analysis: 0.87 },
    businessValue: 'Reduces cloud spending and improves ROI',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-backup-recovery',
    name: 'Manage Backup Recovery Technology Agent',
    level: '13.0',
    description: 'Manages backup and recovery using automation, retention policies, and recovery testing.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Backup Automation', 'Retention Policies', 'Recovery Time Analysis', 'Restore Testing'],
    skillLevels: { backup_management: 0.90, disaster_recovery: 0.87 },
    businessValue: 'Ensures data protection and business continuity',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-cicd-pipeline',
    name: 'Implement CI/CD Pipeline Technology Agent',
    level: '13.0',
    description: 'Implements CI/CD pipelines using automation, testing, and deployment strategies.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Pipeline Automation', 'Test Automation', 'Deployment Strategies', 'Quality Gates'],
    skillLevels: { cicd_implementation: 0.92, automation: 0.88 },
    businessValue: 'Accelerates delivery and improves code quality',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'configure-load-balancing',
    name: 'Configure Load Balancing Technology Agent',
    level: '13.0',
    description: 'Configures load balancing using traffic distribution, health checks, and failover strategies.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Traffic Distribution', 'Health Check Configuration', 'Failover Strategies', 'Session Persistence'],
    skillLevels: { load_balancing: 0.90, high_availability: 0.87 },
    businessValue: 'Ensures application availability and performance',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-network-security',
    name: 'Manage Network Security Technology Agent',
    level: '13.0',
    description: 'Manages network security using firewall rules, segmentation, and intrusion detection.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Firewall Rule Management', 'Network Segmentation', 'Intrusion Detection', 'Traffic Analysis'],
    skillLevels: { network_security: 0.91, threat_detection: 0.88 },
    businessValue: 'Protects network infrastructure from threats',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'deploy-kubernetes-clusters',
    name: 'Deploy Kubernetes Clusters Technology Agent',
    level: '13.0',
    description: 'Deploys Kubernetes clusters using best practices, autoscaling, and resource management.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Cluster Provisioning', 'Autoscaling Configuration', 'Resource Quotas', 'Pod Scheduling'],
    skillLevels: { kubernetes_deployment: 0.92, container_orchestration: 0.89 },
    businessValue: 'Enables scalable container orchestration',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-service-mesh',
    name: 'Implement Service Mesh Technology Agent',
    level: '13.0',
    description: 'Implements service mesh using traffic management, observability, and security policies.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'CAIP'],
    algorithms: ['Traffic Management', 'Service Discovery', 'mTLS Configuration', 'Circuit Breaking'],
    skillLevels: { service_mesh_implementation: 0.90, traffic_management: 0.87 },
    businessValue: 'Improves microservices reliability and security',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'manage-cloud-storage',
    name: 'Manage Cloud Storage Technology Agent',
    level: '13.0',
    description: 'Manages cloud storage using lifecycle policies, versioning, and access control.',
    status: 'production',
    protocols: ['A2A', 'MCP'],
    algorithms: ['Lifecycle Policies', 'Storage Tiering', 'Versioning', 'Access Control'],
    skillLevels: { storage_management: 0.89, cost_optimization: 0.86 },
    businessValue: 'Optimizes storage costs and data management',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'configure-auto-scaling',
    name: 'Configure Auto-Scaling Technology Agent',
    level: '13.0',
    description: 'Configures auto-scaling using metrics-based policies, predictive scaling, and cost optimization.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Metrics-Based Scaling', 'Predictive Scaling', 'Cost-Aware Scaling', 'Cooldown Management'],
    skillLevels: { autoscaling_configuration: 0.91, capacity_planning: 0.87 },
    businessValue: 'Balances performance and cost automatically',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'implement-disaster-recovery',
    name: 'Implement Disaster Recovery Technology Agent',
    level: '13.0',
    description: 'Implements disaster recovery using multi-region strategies, failover automation, and recovery testing.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ACP'],
    algorithms: ['Multi-Region Replication', 'Failover Automation', 'RTO/RPO Analysis', 'DR Testing'],
    skillLevels: { disaster_recovery: 0.92, business_continuity: 0.88 },
    businessValue: 'Ensures business continuity in disaster scenarios',
    implementationDate: 'Jan 26, 2026'
  },
  {
    id: 'monitor-system-performance',
    name: 'Monitor System Performance Technology Agent',
    level: '13.0',
    description: 'Monitors system performance using APM, distributed tracing, and performance analytics.',
    status: 'production',
    protocols: ['A2A', 'MCP', 'ANP'],
    algorithms: ['Application Performance Monitoring', 'Distributed Tracing', 'Performance Analytics', 'Bottleneck Detection'],
    skillLevels: { performance_monitoring: 0.91, apm_implementation: 0.88 },
    businessValue: 'Identifies and resolves performance bottlenecks',
    implementationDate: 'Jan 26, 2026'
  }
];


export const totalAgents = 103;
export const implementedAgents = 84;
export const totalAlgorithms = 70;


export const protocols = [
  { id: 'A2A', name: 'Agent-to-Agent', description: 'Communication protocol for inter-agent messaging', color: '#3B82F6' },
  { id: 'MCP', name: 'Model Context Protocol', description: 'Anthropic protocol for LLM tool access', color: '#8B5CF6' },
  { id: 'ANP', name: 'Agent Network Protocol', description: 'Discovery protocol for agent networks', color: '#10B981' },
  { id: 'ACP', name: 'Agent Coordination Protocol', description: 'Task coordination for multi-agent systems', color: '#F59E0B' },
  { id: 'CAP', name: 'Collaborative Agent Protocol', description: 'Project collaboration with governance', color: '#EC4899' },
  { id: 'BAP', name: 'Blockchain Agent Protocol', description: 'Economics and token operations', color: '#6366F1' },
  { id: 'A2P', name: 'Agent-to-Pay', description: 'Payment protocol for agent transactions', color: '#14B8A6' },
  { id: 'CAIP', name: 'Common Agent Interface', description: 'Infrastructure protocol for common interfaces', color: '#EF4444' },
];

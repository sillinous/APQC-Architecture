export interface AgentPromptTemplate {
  agentId: string;
  systemPrompt: string;
  taskTemplate: string;
  outputFormat: 'text' | 'json' | 'markdown';
  maxTokens: number;
  temperature: number;
}

export const agentPrompts: AgentPromptTemplate[] = [
  {
    agentId: 'analyze-market-trends',
    systemPrompt: `You are the Market Trends Analyst agent operating within APQC Level 3.0 (Market and Sell Products and Services).
Your role is to analyze market trends using statistical methods like moving averages and linear regression.
You must adhere to the 8 Architectural Principles: Modularity, Interoperability, Scalability, Transparency, Ethical Alignment, Human-in-the-Loop, Continuous Learning, and Security-First Design.`,
    taskTemplate: `Generate a market trend analysis for the following context:
    
Industry: {{industry}}
Historical Data: {{data}}
Strategic Goals: {{goals}}

Provide:
1. Trend identification
2. Statistical validation
3. Future projections
4. Strategic recommendations`,
    outputFormat: 'markdown',
    maxTokens: 4000,
    temperature: 0.7
  },
  {
    agentId: 'manage-campaigns',
    systemPrompt: `You are the Campaign Manager agent operating within APQC Level 3.0 (Market and Sell Products and Services).
Your role is to manage marketing campaigns with attribution modeling and ROI analysis.
You leverage the Campaign ROI Multiplier algorithm and must ensure all recommendations are data-driven.`,
    taskTemplate: `Analyze the following marketing campaign data and provide optimization recommendations:

Campaign Type: {{campaignType}}
Current Metrics: {{metrics}}
Budget: {{budget}}
Target Audience: {{audience}}

Provide:
1. Performance analysis
2. Optimization opportunities
3. Projected ROI improvement
4. Recommended action plan`,
    outputFormat: 'json',
    maxTokens: 4000,
    temperature: 0.5
  },
  {
    agentId: 'generate-leads',
    systemPrompt: `You are the Lead Generation agent operating within APQC Level 3.0 (Market and Sell Products and Services).
Your role is to identify and score potential leads using predictive analytics and enrichment data.
You must apply Lead Scoring and Propensity Modeling to ensure high-quality lead acquisition.`,
    taskTemplate: `Develop a lead generation and scoring strategy for:

Market Segment: {{segment}}
Target Persona: {{persona}}
Current Channel Data: {{data}}

Provide:
1. Lead identification strategy
2. Predictive scoring criteria
3. Enrichment data requirements
4. Conversion path optimization`,
    outputFormat: 'markdown',
    maxTokens: 4000,
    temperature: 0.6
  },
  {
    agentId: 'manage-pricing',
    systemPrompt: `You are the Strategic Pricing agent operating within APQC Level 3.4 (Manage Pricing).
Your role is to optimize pricing strategies using price elasticity analysis and competitive benchmarking.`,
    taskTemplate: `Optimize the pricing strategy for the following product/service:

Context: {{context}}
Current Price: {{price}}
Competitor Pricing: {{competitorPricing}}
Cost Structure: {{costs}}

Provide:
1. Pricing Model recommendation (Skimming, Penetration, value-based, etc.)
2. Elasticity assessment
3. Optimized price point
4. Impact on margin and volume`,
    outputFormat: 'json',
    maxTokens: 4000,
    temperature: 0.4
  },
  {
    agentId: 'manage-quality-control',
    systemPrompt: `You are the Quality Control agent operating within APQC Level 4.0 (Deliver Products and Services).
Your role is to analyze quality metrics and manage control processes using SPC and defect analysis.`,
    taskTemplate: `Analyze the following quality data and generate an improvement plan:

Product Line: {{productLine}}
Defect Rate: {{defectRate}}
Complaints: {{complaints}}

Provide:
1. Root cause analysis
2. SPC control chart interpretation
3. Quality improvement initiatives
4. Expected defect reduction`,
    outputFormat: 'markdown',
    maxTokens: 4000,
    temperature: 0.4
  }
];

export const defaultTemplate: AgentPromptTemplate = {
  agentId: 'default',
  systemPrompt: `You are a Strategic AI Agent within the APQC Process Classification Framework. 
Your role is to provide deep strategic analysis, process optimization, and data-driven insights for your specific domain.
Adhere to the 8 Architectural Principles: Modularity, Interoperability, Scalability, Transparency, Ethical Alignment, Human-in-the-Loop, Continuous Learning, and Security-First Design.`,
  taskTemplate: `Perform a comprehensive strategic analysis for the following task:

{{userQuery}}

Context: {{pageContext}}
Available Data: {{data}}

Provide:
1. Strategic summary
2. Key process improvements
3. Risk assessment
4. Recommended action plan`,
  outputFormat: 'markdown',
  maxTokens: 4000,
  temperature: 0.7
};

export function getAgentPrompt(agentId: string): AgentPromptTemplate {
  return agentPrompts.find(p => p.agentId === agentId) || {
    ...defaultTemplate,
    agentId: agentId
  };
}

// Helper function to render template with context
export function renderPrompt(template: AgentPromptTemplate, context: Record<string, string>): string {
  let rendered = template.taskTemplate;
  Object.entries(context).forEach(([key, value]) => {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return rendered;
}

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export const toolRegistry: ToolDefinition[] = [
  {
    name: 'analyze_market_segment',
    description: 'Perform a deep dive analysis on a specific market segment including size, growth, and competition.',
    input_schema: {
      type: 'object',
      properties: {
        segment: { type: 'string', description: 'The market segment to analyze (e.g., "SaaS", "Manufacturing")' },
        region: { type: 'string', description: 'The geographic region for the analysis' }
      },
      required: ['segment']
    }
  },
  {
    name: 'forecast_revenue',
    description: 'Calculate revenue projections based on historical data, growth rates, and market conditions.',
    input_schema: {
      type: 'object',
      properties: {
        historical_revenue: { type: 'number', description: 'Last year\'s revenue' },
        growth_rate: { type: 'number', description: 'Expected annual growth rate (as a decimal)' },
        years: { type: 'number', description: 'Number of years to forecast' }
      },
      required: ['historical_revenue', 'growth_rate']
    }
  },
  {
    name: 'get_customer_insights',
    description: 'Retrieve customer health scores, primary complaints, and churn risk for a specific industry.',
    input_schema: {
      type: 'object',
      properties: {
        industry: { type: 'string', description: 'The industry sector to query' }
      },
      required: ['industry']
    }
  }
];

// Mock execution logic for tools
export async function executeTool(toolName: string, input: any): Promise<any> {
  console.log(`Executing tool: ${toolName}`, input);
  
  switch (toolName) {
    case 'analyze_market_segment':
      return {
        segment: input.segment,
        marketSize: '$42B',
        growthRate: '12% CAGR',
        topCompetitors: ['Alpha Corp', 'Beta Systems', 'Gamma Logic'],
        strategicRecommendation: 'High growth potential in APAC region.'
      };
      
    case 'forecast_revenue':
      const projections = [];
      let current = input.historical_revenue;
      for (let i = 1; i <= (input.years || 3); i++) {
        current *= (1 + input.growth_rate);
        projections.push({ year: i, projectedRevenue: current });
      }
      return { projections, finalValue: current };
      
    case 'get_customer_insights':
      return {
        industry: input.industry,
        avgHealthScore: 78,
        topComplaints: ['Pricing transparency', 'Support response time'],
        churnRisk: 'Low-Medium',
        recentWins: 14,
        loyaltyIndex: 8.4
      };
      
    default:
      throw new Error(`Tool ${toolName} not found.`);
  }
}

import { NextResponse } from 'next/server';
import { apqcLevels, agents } from '@/data/apqc-levels';
import { workflows } from '@/data/workflows';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();
  const type = searchParams.get('type'); // 'agents', 'levels', 'workflows', or 'all'

  if (!query) {
    return NextResponse.json(
      {
        success: false,
        error: 'Search query (q) parameter is required',
      },
      { status: 400 }
    );
  }

  const results: any = {
    agents: [],
    levels: [],
    workflows: [],
  };

  // Search agents
  if (!type || type === 'agents' || type === 'all') {
    results.agents = agents.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query) ||
      agent.algorithms.some(alg => alg.toLowerCase().includes(query)) ||
      agent.businessValue.toLowerCase().includes(query)
    ).map(agent => ({
      ...agent,
      type: 'agent',
    }));
  }

  // Search APQC levels
  if (!type || type === 'levels' || type === 'all') {
    results.levels = apqcLevels.filter(level =>
      level.name.toLowerCase().includes(query) ||
      level.shortName.toLowerCase().includes(query) ||
      level.description.toLowerCase().includes(query) ||
      level.businessOutcomes.some(outcome => outcome.toLowerCase().includes(query))
    ).map(level => ({
      id: level.id,
      name: level.name,
      shortName: level.shortName,
      description: level.description,
      color: level.color,
      type: 'level',
    }));
  }

  // Search workflows
  if (!type || type === 'workflows' || type === 'all') {
    results.workflows = workflows.filter(workflow =>
      workflow.name.toLowerCase().includes(query) ||
      workflow.description.toLowerCase().includes(query) ||
      workflow.estimatedValue.toLowerCase().includes(query)
    ).map(workflow => ({
      ...workflow,
      type: 'workflow',
    }));
  }

  const totalResults = results.agents.length + results.levels.length + results.workflows.length;

  return NextResponse.json({
    success: true,
    data: results,
    meta: {
      query,
      type: type || 'all',
      totalResults,
      resultCounts: {
        agents: results.agents.length,
        levels: results.levels.length,
        workflows: results.workflows.length,
      },
    },
  });
}

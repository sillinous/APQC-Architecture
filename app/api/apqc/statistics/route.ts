import { NextResponse } from 'next/server';
import { apqcLevels, agents, totalAgents, implementedAgents, totalAlgorithms, protocols } from '@/data/apqc-levels';
import { workflows } from '@/data/workflows';

export async function GET() {
  // Calculate statistics
  const agentsByLevel = apqcLevels.map(level => ({
    levelId: level.id,
    levelName: level.shortName,
    totalAgents: level.agentCount,
    implementedAgents: level.implementedCount,
    coveragePercent: Math. round((level.implementedCount / level.agentCount) * 100),
  }));

  const agentsByStatus = {
    production: agents.filter(a => a.status === 'production').length,
    beta: agents.filter(a => a.status === 'beta').length,
    planned: agents.filter(a => a.status === 'planned').length,
  };

  const protocolUsage = protocols.map(protocol => ({
    id: protocol.id,
    name: protocol.name,
    agentCount: agents.filter(a => a.protocols.includes(protocol.id)).length,
  }));

  const workflowStats = {
    total: workflows.length,
    available: workflows.filter(w => w.status === 'available').length,
    comingSoon: workflows.filter(w => w.status === 'coming-soon').length,
    planned: workflows.filter(w => w.status === 'planned').length,
  };

  // Algorithm statistics
  const allAlgorithms = new Set();
  agents.forEach(agent => {
    agent.algorithms.forEach(alg => allAlgorithms.add(alg));
  });

  return NextResponse.json({
    success: true,
    data: {
      overview: {
        totalAgents,
        implementedAgents,
        totalAlgorithms,
        totalLevels: apqcLevels.length,
        totalProtocols: protocols.length,
        totalWorkflows: workflows.length,
        uniqueAlgorithms: allAlgorithms.size,
        coveragePercent: Math.round((implementedAgents / totalAgents) * 100),
      },
      agentsByLevel,
      agentsByStatus,
      protocolUsage,
      workflowStats,
    },
  });
}

import { NextResponse } from 'next/server';
import { apqcLevels, APQCLevel } from '@/data/apqc-levels';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAgents = searchParams.get('includeAgents') === 'true';
  const includeSubProcesses = searchParams.get('includeSubProcesses') === 'true';

  let data: any[] = apqcLevels;

  // Filter data based on query parameters
  if (!includeAgents && !includeSubProcesses) {
    data = apqcLevels.map(level => ({
      id: level.id,
      name: level.name,
      shortName: level.shortName,
      description: level.description,
      color: level.color,
      icon: level.icon,
      agentCount: level.agentCount,
      implementedCount: level.implementedCount,
      businessOutcomes: level.businessOutcomes,
    }));
  } else if (!includeSubProcesses) {
    data = apqcLevels.map(level => ({
      ...level,
      subProcesses: [],
    }));
  }

  return NextResponse.json({
    success: true,
    data,
    meta: {
      totalLevels: apqcLevels.length,
      includeAgents,
      includeSubProcesses,
    },
  });
}

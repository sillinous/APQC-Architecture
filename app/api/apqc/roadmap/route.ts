import { NextResponse } from 'next/server';
import { roadmapPhases, overallProgress } from '@/data/roadmap';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      phases: roadmapPhases,
      progress: overallProgress,
    },
    meta: {
      totalPhases: roadmapPhases.length,
      completedPhases: roadmapPhases.filter(p => p.status === 'completed').length,
      inProgressPhases: roadmapPhases.filter(p => p.status === 'in-progress').length,
    },
  });
}

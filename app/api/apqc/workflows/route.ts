import { NextResponse } from 'next/server';
import { workflows } from '@/data/workflows';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const complexity = searchParams.get('complexity');

  let filteredWorkflows = [...workflows];

  if (status) {
    filteredWorkflows = filteredWorkflows.filter(w => w.status === status);
  }

  if (complexity) {
    filteredWorkflows = filteredWorkflows.filter(w => w.complexity === complexity);
  }

  return NextResponse.json({
    success: true,
    data: filteredWorkflows,
    meta: {
      total: filteredWorkflows.length,
      filters: {
        status,
        complexity,
      },
    },
  });
}

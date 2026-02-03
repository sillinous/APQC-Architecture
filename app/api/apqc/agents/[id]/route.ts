import { NextResponse } from 'next/server';
import { agents } from '@/data/apqc-levels';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const agentId = params.id;
  const agent = agents.find(a => a.id === agentId);

  if (!agent) {
    return NextResponse.json(
      {
        success: false,
        error: `Agent '${agentId}' not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: agent,
  });
}

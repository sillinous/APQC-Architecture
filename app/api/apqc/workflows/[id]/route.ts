import { NextResponse } from 'next/server';
import { workflows } from '@/data/workflows';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const workflowId = params.id;
  const workflow = workflows.find(w => w.id === workflowId);

  if (!workflow) {
    return NextResponse.json(
      {
        success: false,
        error: `Workflow '${workflowId}' not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: workflow,
  });
}

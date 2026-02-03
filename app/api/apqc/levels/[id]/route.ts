import { NextResponse } from 'next/server';
import { apqcLevels } from '@/data/apqc-levels';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const levelId = params.id;
  const level = apqcLevels.find(l => l.id === levelId);

  if (!level) {
    return NextResponse.json(
      {
        success: false,
        error: `APQC level '${levelId}' not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: level,
  });
}

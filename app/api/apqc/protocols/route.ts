import { NextResponse } from 'next/server';
import { protocols } from '@/data/apqc-levels';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: protocols,
    meta: {
      total: protocols.length,
    },
  });
}

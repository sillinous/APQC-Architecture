import { NextResponse } from 'next/server';
import { agents } from '@/data/apqc-levels';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Filter parameters
  const level = searchParams.get('level');
  const status = searchParams.get('status');
  const protocol = searchParams.get('protocol');
  const search = searchParams.get('search')?.toLowerCase();
  
  // Pagination parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');

  let filteredAgents = [...agents];

  // Apply filters
  if (level) {
    filteredAgents = filteredAgents.filter(agent => agent.level === level);
  }

  if (status) {
    filteredAgents = filteredAgents.filter(agent => agent.status === status);
  }

  if (protocol) {
    filteredAgents = filteredAgents.filter(agent => 
      agent.protocols.includes(protocol)
    );
  }

  if (search) {
    filteredAgents = filteredAgents.filter(agent =>
      agent.name.toLowerCase().includes(search) ||
      agent.description.toLowerCase().includes(search) ||
      agent.algorithms.some(alg => alg.toLowerCase().includes(search))
    );
  }

  // Pagination
  const totalAgents = filteredAgents.length;
  const totalPages = Math.ceil(totalAgents / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAgents = filteredAgents.slice(startIndex, endIndex);

  return NextResponse.json({
    success: true,
    data: paginatedAgents,
    meta: {
      total: totalAgents,
      page,
      limit,
      totalPages,
      filters: {
        level,
        status,
        protocol,
        search,
      },
    },
  });
}

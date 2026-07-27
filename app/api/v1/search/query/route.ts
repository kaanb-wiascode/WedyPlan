import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseSearchService } from '@/lib/search/application/enterprise-search.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await EnterpriseSearchService.query({
      query: body.query || '',
      sources: body.sources,
      portalContext: body.portalContext || 'PUBLIC',
      searchType: body.searchType || 'HYBRID',
      page: body.page || 1,
      limit: body.limit || 20,
      geoFilter: body.geoFilter,
      userId: body.userId,
      userRoles: body.userRoles
    });

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Search execution failed' }, { status: 400 });
  }
}
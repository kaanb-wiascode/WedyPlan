import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseSearchService } from '@/lib/search/application/enterprise-search.service';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') || '';

  const suggestions = EnterpriseSearchService.getSuggestions(query);

  return NextResponse.json({ query, suggestions });
}
import { NextRequest, NextResponse } from 'next/server';
import { SearchIndexerWorker } from '@/lib/search/infrastructure/search-indexer.worker';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const success = await SearchIndexerWorker.indexDocument({
      entityType: body.entityType || 'VENDOR',
      entityId: body.entityId,
      title: body.title,
      content: body.content,
      keywords: body.keywords || [],
      organizationId: body.organizationId
    });

    return NextResponse.json({ success, message: 'Entity queued for search indexing' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Indexing failed' }, { status: 400 });
  }
}
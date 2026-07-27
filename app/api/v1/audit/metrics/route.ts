import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await EnterpriseAuditService.recordMetric({
      endpointPath: body.endpointPath,
      httpMethod: body.httpMethod || 'GET',
      statusCode: body.statusCode || 200,
      executionMs: body.executionMs,
      dbQueryTimeMs: body.dbQueryTimeMs
    });

    return NextResponse.json({ success: true, message: 'Performance metric logged' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Metric logging failed' }, { status: 400 });
  }
}
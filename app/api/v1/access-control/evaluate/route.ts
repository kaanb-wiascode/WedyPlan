import { NextRequest, NextResponse } from 'next/server';
import { AccessControlEngine } from '@/lib/access-control/application/access-control.engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await AccessControlEngine.evaluateAccess({
      userId: body.userId,
      roles: body.roles || ['VISITOR'],
      portalContext: body.portalContext || 'PUBLIC',
      resource: body.resource,
      action: body.action,
      organizationId: body.organizationId,
      subscriptionTier: body.subscriptionTier,
      fieldNames: body.fieldNames
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Evaluation failed' }, { status: 400 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { AiGateway } from '@/lib/ai/gateway/ai-gateway';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await AiGateway.execute({
      userPrompt: body.prompt,
      systemPrompt: body.systemPrompt,
      providerOverride: body.provider,
      userId: body.userId,
      portalContext: body.portalContext || 'COUPLE'
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI Execution failed' }, { status: 400 });
  }
}
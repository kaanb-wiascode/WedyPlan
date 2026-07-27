import { NextRequest, NextResponse } from 'next/server';
import { ContractAnalyzerEngine } from '@/lib/ai/engines/contract-analyzer.engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.contractText) {
      return NextResponse.json({ error: 'Contract text is required' }, { status: 400 });
    }

    const analysis = await ContractAnalyzerEngine.analyze({
      contractTextOrOcr: body.contractText,
      agreedPriceTotal: body.agreedPriceTotal,
      userId: body.userId
    });

    return NextResponse.json(analysis);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Contract analysis failed' }, { status: 400 });
  }
}
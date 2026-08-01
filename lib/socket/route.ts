// app/api/socket/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Socket.io handler - Next.js App Router uyumlu
 * 
 * Bu endpoint Socket.io WebSocket yükseltmesini yönetir
 */
export async function GET(req: NextRequest) {
  // Socket.io, WebSocket upgrade için HTTP handler'ı kullanır
  // Bu endpoint direkt olarak Socket.io tarafından yönetilir

  return NextResponse.json({
    message: 'Socket.io server is running',
  });
}

/**
 * WebSocket upgrade handler (Advanced usage - custom middleware varsa)
 */
export const dynamic = 'force-dynamic';

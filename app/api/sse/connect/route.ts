// app/api/sse/connect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { registerSSEClient, unregisterSSEClient } from '@/lib/sse/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // SSE headers
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    };

    // Custom ReadableStream
    const stream = new ReadableStream({
      start(controller) {
        // Client'ı kaydet
        registerSSEClient(session.userId, controller);

        // Heartbeat (bağlantıyı canlı tut)
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(new TextEncoder().encode(': heartbeat\n\n'));
          } catch (error) {
            clearInterval(heartbeat);
            unregisterSSEClient(session.userId, controller);
            controller.close();
          }
        }, 30000); // 30 saniyede bir

        // Client disconnect
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
          unregisterSSEClient(session.userId, controller);
          controller.close();
        });
      },
    });

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error('[SSE] Connection error:', error);
    return NextResponse.json(
      { error: 'Connection failed' },
      { status: 500 }
    );
  }
}
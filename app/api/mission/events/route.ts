import { NextRequest } from "next/server";

// Shared clients set
const clients = new Set<ReadableStreamDefaultController>();

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);
      const keepAlive = setInterval(() => {
        try { controller.enqueue(`data: ping\n\n`); }
        catch { clearInterval(keepAlive); clients.delete(controller); }
      }, 15000);

      // Cleanup
      return () => {
        clearInterval(keepAlive);
        clients.delete(controller);
      };
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    }
  });
}

// Called internally after each state update
export function broadcastToClients(data: object) {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(c => {
    try { c.enqueue(msg); }
    catch { clients.delete(c); }
  });
}

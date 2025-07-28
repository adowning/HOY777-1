const clients = new Set<ReadableStreamDefaultController>();

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/sse') {
      const stream = new ReadableStream({
        start(controller) {
          clients.add(controller);
          req.signal.addEventListener('abort', () => {
            clients.delete(controller);
            controller.close();
          });
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    if (url.pathname === '/broadcast' && req.method === 'POST') {
      const data = await req.text();
      for (const client of clients) {
        client.enqueue(`data: ${data}\n\n`);
      }
      return new Response('Broadcasted', { status: 200 });
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`SSE server listening on http://localhost:${server.port}`);


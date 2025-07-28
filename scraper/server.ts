import { serve, file } from 'bun';
import { join } from 'path';

const dashboardDir = join(import.meta.dir, 'dashboard', 'dist');
const logFile = join(import.meta.dir, 'api-scraper.log.json');

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // API endpoint for the logs
    if (pathname === '/api-scraper.log.json') {
      try {
        return new Response(file(logFile));
      } catch (e) {
        return new Response('[]', { headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Serve static files from the dashboard
    let filePath = join(dashboardDir, pathname);
    
    // If it's a directory, serve index.html
    try {
      const stat = await file(filePath).exists();
      if (!stat) {
         filePath = join(dashboardDir, 'index.html');
      }
    } catch (e) {
       filePath = join(dashboardDir, 'index.html');
    }

    return new Response(file(filePath));
  },
});

console.log('Monitoring server running on http://localhost:3000');
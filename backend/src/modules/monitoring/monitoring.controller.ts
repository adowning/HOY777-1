import { Context } from 'hono'
import * as service from './monitoring.service'
import { streamSSE } from 'hono/streaming'

export const showMonitoringPage = (c: Context) => {
  return c.html(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Active Users (Live)</title>
    <style>
      body { font-family: sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
      #status { margin-bottom: 1em; display: block; }
    </style>
  </head>
  <body>
    <h1>Active Users (Live)</h1>
    <p id="status">Connecting...</p>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Last Seen</th>
          <th>IP Address</th>
          <th>User Agent</th>
        </tr>
      </thead>
      <tbody id="user-table-body">
        
      </tbody>
    </table>
    <script>
      const userTableBody = document.getElementById('user-table-body');
      const statusDiv = document.getElementById('status');
      const eventSource = new EventSource('/monitoring/events', { withCredentials: true });

      eventSource.onopen = function() {
        statusDiv.textContent = 'Live feed connected.';
        statusDiv.style.color = 'green';
      };

      eventSource.addEventListener('update', (event) => {
          const sessions = JSON.parse(event.data);
          userTableBody.innerHTML = ''; // Clear table
          if (sessions.length === 0) {
              userTableBody.innerHTML = '<tr><td colspan="4">No active users.</td></tr>';
          } else {
              sessions.forEach(session => {
                  const row = document.createElement('tr');
                  const lastSeen = new Date(session.lastSeen).toLocaleTimeString();
                  row.innerHTML = \`
                      <td>\${session.user?.username ?? 'N/A'}</td>
                      <td>\${lastSeen}</td>
                      <td>\${session.ipAddress ?? 'N/A'}</td>
                      <td>\${session.userAgent ?? 'N/A'}</td>
                  \`;
                  userTableBody.appendChild(row);
              });
          }
      });
      
      eventSource.addEventListener('heartbeat', function(event) {
        // You can use this to know the connection is still alive
        // console.log('Heartbeat received:', event.data);
      });

      eventSource.onerror = function(err) {
          statusDiv.textContent = 'Connection to live feed lost. Please refresh.';
          statusDiv.style.color = 'red';
          console.error("EventSource failed:", err);
          eventSource.close();
      };
    </script>
  </body>
  </html>
  `)
}

export const streamMonitoringEvents = (c: Context) => {
  return streamSSE(c, async (stream) => {
    console.log('Client connected to live feed.');
    // Keep the connection alive
    const heartbeat = setInterval(() => {
      stream.writeSSE({ data: 'ping', event: 'heartbeat' });
    }, 1000); // Send a heartbeat every 5 seconds

    const sessionChecker = setInterval(async () => {
      try {
        const sessions = await service.getActiveSessions();
        await stream.writeSSE({ data: JSON.stringify(sessions), event: 'update' });
      } catch (e) {
        console.error("Error fetching sessions:", e);
      }
    }, 2000); // Check for session updates every 2 seconds

    // When the client disconnects, stop sending events
    stream.onAbort(() => {
      console.log('Client disconnected, cleaning up intervals.');
      clearInterval(heartbeat);
      clearInterval(sessionChecker);
    });
  });
};
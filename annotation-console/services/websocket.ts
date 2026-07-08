export function createWebSocketConnection(url: string, onMessage: (data: unknown) => void) {
  const ws = new WebSocket(url);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      console.error('Error parsing WebSocket frame:', e);
    }
  };

  return ws;
}
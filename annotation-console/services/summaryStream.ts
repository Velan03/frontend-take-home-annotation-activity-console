export async function streamTaskSummary(
  taskId: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(`http://localhost:4000/api/tasks/${taskId}/summary`, { signal });
  if (!response.ok) throw new Error('Failed to fetch streaming response');

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) throw new Error('Stream readable pipeline not available');

  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const rawJson = line.slice(6).trim();
        if (rawJson === '"end"') return;
        try {
          const content = JSON.parse(rawJson);
          onChunk(content);
        } catch {
          // Skip malformed individual stream ticks safely
        }
      }
    }
  }
}
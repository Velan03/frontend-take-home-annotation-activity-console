import { useState, useEffect } from 'react';
import { streamTaskSummary } from '../services/summaryStream';

export function useTaskSummary(taskId: string | null) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) {
      // avoid synchronous setState inside effect to prevent cascading renders
      Promise.resolve().then(() => setSummary(''));
      return;
    }

    // clear previous summary asynchronously and defer state updates to avoid
    // synchronous setState inside effect which can trigger cascading renders
    Promise.resolve().then(() => {
      setSummary('');
      setLoading(true);
      setError(null);
    });

    const controller = new AbortController();

    streamTaskSummary(taskId, (chunk) => {
      setSummary((prev) => prev + chunk);
    }, controller.signal)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [taskId]);

  return { summary, loading, error };
}
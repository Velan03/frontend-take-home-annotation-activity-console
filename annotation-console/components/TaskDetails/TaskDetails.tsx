import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTaskSummary } from '../../hooks/useTaskSummary';
import { parseAndSanitizeMarkdown } from '../../lib/markdown';

export function TaskDetails() {
  const selectedId = useSelector((state: RootState) => state.tasks.selectedTaskId);
  const task = useSelector((state: RootState) => state.tasks.entities[selectedId || '']);
  const { summary, loading } = useTaskSummary(selectedId);

  if (!task) {
    return <div className="p-6 text-center text-gray-400 border rounded bg-white">Select an annotation task to view metadata details.</div>;
  }

  const cleanHtml = parseAndSanitizeMarkdown(summary);

  return (
    <div className="bg-white p-5 border rounded shadow-sm">
      <h2 className="text-lg font-bold mb-2">{task.title}</h2>
      <p className="text-xs font-mono text-gray-400 mb-4">ID: {task.id}</p>
      
      <div className="border-t pt-3 mt-3 text-sm space-y-2 text-gray-700">
        <div><strong>Status:</strong> <span className="capitalize">{task.status}</span></div>
        <div><strong>Assignee:</strong> {task.assignee?.name || 'Unassigned'}</div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase">AI Live Summary Stream</h3>
          {loading && <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
        </div>
        <div 
          className="text-sm prose max-w-none break-words" 
          dangerouslySetInnerHTML={{ __html: cleanHtml || '<p class="text-gray-400 italic text-xs">Awaiting streaming markdown segment data packets...</p>' }}
        />
      </div>
    </div>
  );
}
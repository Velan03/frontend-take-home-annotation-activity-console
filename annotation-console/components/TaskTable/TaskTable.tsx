import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleTasks } from '../../features/tasks/taskSelectors';
import { setSelectedTaskId } from '../../features/tasks/tasksSlice';
import { RootState } from '../../store';

export function TaskTable() {
  const tasks = useSelector(selectVisibleTasks);
  const selectedId = useSelector((state: RootState) => state.tasks.selectedTaskId);
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded border overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Annotations</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tasks.map(t => (
            <tr 
              key={t.id} 
              onClick={() => dispatch(setSelectedTaskId(t.id))}
              className={`cursor-pointer hover:bg-slate-50 ${t.id === selectedId ? 'bg-blue-50' : ''}`}
            >
              <td className="p-3 font-mono text-xs">{t.id}</td>
              <td className="p-3">{t.title}</td>
              <td className="p-3 text-xs capitalize">{t.status.replace('_', ' ')}</td>
              <td className="p-3 font-mono text-xs">{t.annotationCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
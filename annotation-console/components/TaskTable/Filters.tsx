import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/tasks/tasksSlice';
import { RootState } from '../../store';

export function Filters() {
  const dispatch = useDispatch();
  const { filterType, filterStatus } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="flex gap-4 mb-4 bg-white p-3 border rounded-md">
      <select
        title="Filter by type"
        aria-label="Filter by type"
        value={filterType}
        onChange={e => dispatch(setFilters({ type: e.target.value }))}
        className="border p-1 text-sm rounded bg-gray-50 text-gray-900"
      >
        <option value="all">All Types</option>
        <option value="image">Image</option>
        <option value="audio">Audio</option>
        <option value="text">Text</option>
      </select>
      <select
        title="Filter by status"
        aria-label="Filter by status"
        value={filterStatus}
        onChange={e => dispatch(setFilters({ status: e.target.value }))}
        className="border p-1 text-sm rounded bg-gray-50 text-gray-900"
      >
        <option value="all">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="QA">QA</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
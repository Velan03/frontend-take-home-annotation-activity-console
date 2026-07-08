import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/tasks/tasksSlice';
import { RootState } from '../../store';

export function SearchBox() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.tasks.searchQuery);

  return (
    <input
      type="text"
      placeholder="Search target Task IDs or Title names..."
      value={search}
      onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
      className="w-full border p-2 rounded text-sm mb-3 bg-white border-gray-300 text-gray-900 focus:outline-none"
    />
  );
}
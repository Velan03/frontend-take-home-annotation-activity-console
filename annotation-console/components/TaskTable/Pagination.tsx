import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/tasks/tasksSlice';
import { RootState } from '../../store';

export function Pagination() {
  const dispatch = useDispatch();
  const { page, total, pageSize } = useSelector((state: RootState) => state.tasks);
  const maxPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="flex justify-between items-center mt-3 text-xs text-gray-600 bg-white p-2 border rounded">
      <span>Page {page} of {maxPages}</span>
      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => dispatch(setPage(page - 1))} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
        <button disabled={page >= maxPages} onClick={() => dispatch(setPage(page + 1))} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
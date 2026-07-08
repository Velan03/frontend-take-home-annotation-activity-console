'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTasksPage } from '../features/tasks/taskThunks';
import { TaskTable } from '../components/TaskTable/TaskTable';
import { Filters } from '../components/TaskTable/Filters';
import { SearchBox } from '../components/TaskTable/SearchBox';
import { Pagination } from '../components/TaskTable/Pagination';
import { TaskDetails } from '../components/TaskDetails/TaskDetails';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { page, pageSize, loading, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksPage({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Annotation Console</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <SearchBox />
            <Filters />
          </div>

          {loading ? (
            <div className="text-center p-10 text-gray-500">Loading tasks...</div>
          ) : error ? (
            <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
              Error: {error}
            </div>
          ) : (
            <>
              <TaskTable />
              <Pagination />
            </>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <TaskDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
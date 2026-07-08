// features/tasks/taskThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks } from '../../services/api';
import { saveCachedDataset } from '../../lib/indexedDB';

export const fetchTasksPage = createAsyncThunk(
  'tasks/fetchPage',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await fetchTasks(page, pageSize);
    // Cache data in IndexedDB for offline support
    await saveCachedDataset(response.items, response.total);
    return response;
  }
);
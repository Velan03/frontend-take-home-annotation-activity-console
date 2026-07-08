import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { tasksAdapter } from './tasksSlice';

const selectors = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const selectVisibleTasks = createSelector(
  selectors.selectAll,
  (state: RootState) => state.tasks.filterType,
  (state: RootState) => state.tasks.filterStatus,
  (state: RootState) => state.tasks.searchQuery,
  (tasks, type, status, search) => {
    return tasks.filter(t => {
      if (type !== 'all' && t.type !== type) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.id.includes(q);
      }
      return true;
    }).sort((a, b) => b.updatedAt - a.updatedAt);
  }
);
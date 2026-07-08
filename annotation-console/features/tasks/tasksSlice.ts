import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from './types';
import { fetchTasksPage } from './taskThunks';

export const tasksAdapter = createEntityAdapter<Task>();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    total: 0,
    page: 1,
    pageSize: 20,
    selectedTaskId: null as string | null,
    filterType: 'all',
    filterStatus: 'all',
    searchQuery: '',
    isFromCache: false,
  }),
  reducers: {
    setSelectedTaskId(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },
    setFilters(state, action: PayloadAction<{ type?: string; status?: string; search?: string }>) {
      if (action.payload.type !== undefined) state.filterType = action.payload.type;
      if (action.payload.status !== undefined) state.filterStatus = action.payload.status;
      if (action.payload.search !== undefined) state.searchQuery = action.payload.search;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCachedData(state, action: PayloadAction<{ items: Task[]; total: number }>) {
      tasksAdapter.setAll(state, action.payload.items);
      state.total = action.payload.total;
      state.isFromCache = true;
    },
    updateTaskFromWS(state, action: PayloadAction<{ id: string; status?: TaskStatus; assignee?: Task['assignee']; deltaCount?: number; updatedAt?: number }>) {
      const { id, status, assignee, deltaCount, updatedAt } = action.payload;
      const existing = state.entities[id];
      if (existing) {
        if (status !== undefined) existing.status = status;
        if (assignee !== undefined) existing.assignee = assignee;
        if (deltaCount !== undefined) existing.annotationCount += deltaCount;
        if (updatedAt !== undefined) existing.updatedAt = updatedAt;
      } else {
        // Discovered out of current page boundary stub configuration
        tasksAdapter.addOne(state, {
          id,
          title: `Task ${id} (Discovered)`,
          type: 'unknown',
          status: status || TaskStatus.UNKNOWN,
          assignee: assignee || null,
          annotationCount: deltaCount || 0,
          updatedAt: updatedAt || Date.now(),
          priority: 'normal'
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksPage.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasksPage.fulfilled, (state, action) => {
        state.loading = false;
        state.isFromCache = false;
        tasksAdapter.setAll(state, action.payload.items);
        state.total = action.payload.total;
      })
      .addCase(fetchTasksPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sync updates';
      });
  }
});

export const { setSelectedTaskId, setFilters, setPage, setCachedData, updateTaskFromWS } = tasksSlice.actions;
export default tasksSlice.reducer;
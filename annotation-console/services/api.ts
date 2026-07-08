import { RawTask, Task } from '../features/tasks/types';
import { normalizeTask } from '../features/tasks/normalize';

const BASE_URL = 'http://localhost:4000/api';

export async function fetchTasks(page: number, pageSize: number): Promise<{ items: Task[]; total: number; page: number; pageSize: number }> {
  const res = await fetch(`${BASE_URL}/tasks?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  const data = await res.json();
  
  return {
    items: data.items.map((item: RawTask) => normalizeTask(item)),
    total: data.total,
    page: data.page,
    pageSize: data.pageSize
  };
}
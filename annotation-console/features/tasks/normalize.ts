import { RawTask, Task, TaskStatus } from './types';

export function normalizeTask(raw: RawTask): Task {
  let type: Task['type'] = 'unknown';
  if (['image', 'audio', 'text', 'video'].includes(raw.type)) {
    type = raw.type as Task['type'];
  }

  let status = TaskStatus.UNKNOWN;
  // Strip out spacing/underscores to confidently evaluate mixed backend styles
  const match = (raw.status || '').toLowerCase().replace(/[^a-z]/g, '');
  if (match === 'todo') status = TaskStatus.TODO;
  else if (match === 'inprogress' || match === 'inprogress') status = TaskStatus.IN_PROGRESS;
  else if (match === 'qa') status = TaskStatus.QA;
  else if (match === 'done') status = TaskStatus.DONE;
  else if (match === 'blocked') status = TaskStatus.BLOCKED;

  return {
    id: raw.id,
    title: raw.title || `Task ${raw.id}`,
    type,
    status,
    assignee: raw.assignee,
    annotationCount: typeof raw.annotationCount === 'string' ? parseInt(raw.annotationCount, 10) || 0 : raw.annotationCount,
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : Date.parse(raw.updatedAt) || Date.now(),
    priority: raw.meta?.priority === 'high' ? 'high' : 'normal',
    note: raw.meta?.note,
  };
}
export interface RawTask {
  id: string;
  title: string;
  type: string;
  status: string;
  assignee: { id: string; name: string } | null;
  annotationCount: string | number;
  updatedAt: string | number;
  meta?: { priority?: string; note?: string };
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  QA = 'QA',
  DONE = 'done',
  BLOCKED = 'blocked',
  UNKNOWN = 'unknown',
}

export interface Task {
  id: string;
  title: string;
  type: 'image' | 'audio' | 'text' | 'video' | 'unknown';
  status: TaskStatus;
  assignee: { id: string; name: string } | null;
  annotationCount: number;
  updatedAt: number;
  priority: 'high' | 'normal';
  note?: string;
}
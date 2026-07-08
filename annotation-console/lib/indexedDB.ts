import { Task } from '../features/tasks/types';

const DB_NAME = 'AnnotationConsoleCache';
const STORE_NAME = 'tasks_store';

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
  });
}

export async function saveCachedDataset(items: Task[], total: number): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ items, total, time: Date.now() }, 'dataset');
  } catch (e) {
    console.error('Cache write failed', e);
  }
}

export async function loadCachedDataset(): Promise<{ items: Task[]; total: number } | null> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('dataset');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWebSocketConnection } from '../services/websocket';
import { updateTaskFromWS } from '../features/tasks/tasksSlice';
import { TaskStatus } from '../features/tasks/types';

export function useTaskFeed() {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    
    function init() {
      ws = createWebSocketConnection('ws://localhost:4000/ws', (data) => {
        const { kind, payload } = data as { kind: string; payload: Record<string, any> };

        if (kind === 'task.updated') {
          let status = TaskStatus.UNKNOWN;
          const raw = (payload.status || '').toLowerCase().replace(/[^a-z]/g, '');
          if (raw === 'todo') status = TaskStatus.TODO;
          else if (raw === 'inprogress') status = TaskStatus.IN_PROGRESS;
          else if (raw === 'qa') status = TaskStatus.QA;
          else if (raw === 'done') status = TaskStatus.DONE;
          else if (raw === 'blocked') status = TaskStatus.BLOCKED;

          dispatch(updateTaskFromWS({ id: payload.id, status, updatedAt: payload.updatedAt }));
        } else if (kind === 'task.assigned') {
          dispatch(updateTaskFromWS({ id: payload.id, assignee: payload.assignee }));
        } else if (kind === 'annotation.created') {
          dispatch(updateTaskFromWS({ id: payload.taskId, deltaCount: 1 }));
        }
      });

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        setTimeout(init, 3000); // Reconnect loop
      };
    }

    init();
    return () => ws?.close();
  }, [dispatch]);

  return { connected };
}
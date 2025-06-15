import type { Task } from '../types/taskTypes';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare project showcase',
    description: 'Gather all materials for the presentation',
    status: 'todo',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Learn Material UI',
    description: 'Complete the MUI documentation tutorial',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Fix TypeScript errors',
    description: 'Resolve all TS issues in task components',
    status: 'done',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(),
  },
];
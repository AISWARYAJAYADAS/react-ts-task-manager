import type { Task } from '../types/taskTypes';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Develop Homepage UI',
    description: 'Design and implement the user interface for the main landing page, including responsive elements.',
    status: 'in-progress',
    dueDate: '2025-06-25',
    createdAt: new Date('2025-06-10T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Set up Database Schema',
    description: 'Define the database tables, relationships, and initial data for user authentication and task storage.',
    status: 'todo',
    dueDate: '2025-06-20',
    createdAt: new Date('2025-06-12T14:30:00Z'),
  },
  {
    id: '3',
    title: 'Implement User Authentication',
    description: 'Create user registration, login, and session management functionalities.',
    status: 'todo',
    dueDate: '2025-07-05',
    createdAt: new Date('2025-06-15T09:15:00Z'),
  },
  {
    id: '4',
    title: 'Write API Documentation',
    description: 'Document all REST API endpoints, including request/response formats and authentication requirements.',
    status: 'done',
    dueDate: '2025-06-14',
    createdAt: new Date('2025-06-05T11:00:00Z'),
  },
  {
    id: '5',
    title: 'Plan Sprint 2 Tasks',
    description: 'Outline the tasks and stories for the next development sprint, prioritizing based on project roadmap.',
    status: 'in-progress',
    dueDate: '2025-06-28',
    createdAt: new Date('2025-06-16T16:00:00Z'),
  },
];
import type { TaskStatus } from '../types/taskTypes';

export const statusColors: Record<TaskStatus, 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'> = {
  todo: 'info',        // Often used for informational or pending states
  'in-progress': 'warning', // Used for caution or ongoing work
  done: 'success',     // Used for completed or successful states
};

// Define a consistent order for statuses for potential future use (e.g., status transitions)
export const STATUS_ORDER: TaskStatus[] = ['todo', 'in-progress', 'done'];
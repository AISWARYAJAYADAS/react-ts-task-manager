export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // YYYY-MM-DD format for consistency with HTML date input
  createdAt: Date;
}

export interface TaskCardProps extends Task {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}
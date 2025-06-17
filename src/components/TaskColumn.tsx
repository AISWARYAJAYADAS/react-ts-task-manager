import { Box, Typography } from '@mui/material';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../types/taskTypes';
import { formatStatus } from '../utils/formatUtils';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskColumn = ({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        // Removed minHeight: 'auto' as it's often redundant
        // Add max-height and overflow if you want scrollable columns
        // maxHeight: '70vh', // Example fixed height
        // overflowY: 'auto', // Scroll if content overflows
      }}
    >
      <Typography variant="h6" gutterBottom>
        {formatStatus(status)} ({filteredTasks.length})
      </Typography>

      {/* Conditional rendering for empty state feedback */}
      {filteredTasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          No tasks in this column.
        </Typography>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </Box>
  );
};
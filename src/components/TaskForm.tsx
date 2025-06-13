import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  MenuItem 
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '../types/taskTypes';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  taskToEdit?: Task | null;
}

export const TaskForm = ({ open, onClose, onSubmit, taskToEdit }: TaskFormProps) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate.split('T')[0]
      });
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          margin="dense"
          label="Status"
          fullWidth
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value as TaskStatus})}
          sx={{ mb: 2 }}
        >
          {Object.keys(statusColors).map((status) => (
            <MenuItem key={status} value={status}>
              {status.replace('-', ' ')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.dueDate}
          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {taskToEdit ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const statusColors = {
  todo: 'default',
  'in-progress': 'primary',
  done: 'success'
} as const;
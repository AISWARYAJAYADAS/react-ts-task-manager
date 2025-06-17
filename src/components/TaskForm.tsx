import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '../types/taskTypes';
import { formatStatus } from '../utils/formatUtils';
import { statusColors } from '../constants/statusColors';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  taskToEdit?: Task | null;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
}

const initialFormData: Omit<Task, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: new Date().toISOString().split('T')[0], // Default to today
};

export const TaskForm = ({ open, onClose, onSubmit, taskToEdit }: TaskFormProps) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt'>>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form and errors when dialog opens or taskToEdit changes
  useEffect(() => {
    if (open) {
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,
          dueDate: taskToEdit.dueDate.split('T')[0], // Ensure YYYY-MM-DD format
        });
      } else {
        setFormData(initialFormData);
      }
      setErrors({}); // Clear errors on dialog open
    }
  }, [open, taskToEdit]);

  // Validation functions
  const validateTitle = (title: string) => (title.trim() ? '' : 'Title is required');
  const validateDueDate = (date: string) => {
    const today = new Date();
    // Set hours, minutes, seconds, milliseconds to 0 for accurate date comparison
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Ensure selected date is also compared without time

    return selectedDate < today ? 'Due date cannot be in the past' : '';
  };


  // Handle field changes with validation
  const handleFieldChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field being edited
    if (field === 'title') {
      setErrors((prev) => ({ ...prev, title: validateTitle(value as string) || undefined }));
    } else if (field === 'dueDate') {
      setErrors((prev) => ({ ...prev, dueDate: validateDueDate(value as string) || undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newErrors: FormErrors = {
      title: validateTitle(formData.title),
      dueDate: validateDueDate(formData.dueDate),
    };

    // Update errors state immediately
    setErrors(newErrors);

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(false);
      return; // Stop submission if there are errors
    }

    try {
      onSubmit(formData);
      // onClose is called by onSubmit in Dashboard after success snackbar is shown
    } catch (error) {
      // In a real app, you might log this error or show a more specific error message
      console.error("Failed to save task:", error);
      // Dashboard's snackbar will handle the error feedback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="task-form-title">
        <DialogTitle id="task-form-title">{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="task-title"
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
            disabled={isSubmitting} // Disable during submission
            aria-describedby={errors.title ? 'task-title-error' : undefined}
          />
          <TextField
            id="task-description"
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            sx={{ mb: 2 }}
            disabled={isSubmitting} // Disable during submission
          />
          <TextField
            id="task-status"
            select
            margin="dense"
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => handleFieldChange('status', e.target.value as TaskStatus)}
            sx={{ mb: 2 }}
            disabled={isSubmitting} // Disable during submission
          >
            {Object.keys(statusColors).map((status) => (
              <MenuItem key={status} value={status}>
                {formatStatus(status as TaskStatus)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="task-due-date"
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }} // Prevents selecting past dates visually
            value={formData.dueDate}
            onChange={(e) => handleFieldChange('dueDate', e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            sx={{ mb: 2 }}
            disabled={isSubmitting} // Disable during submission
            aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : taskToEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
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

interface SnackbarState {
  open: boolean;
  message: string;
}

const initialFormData: Omit<Task, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: new Date().toISOString().split('T')[0],
};

export const TaskForm = ({ open, onClose, onSubmit, taskToEdit }: TaskFormProps) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt'>>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form and errors when dialog opens or taskToEdit changes
  useEffect(() => {
    if (open) {
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,
          dueDate: taskToEdit.dueDate.split('T')[0],
        });
      } else {
        setFormData(initialFormData);
      }
      setErrors({});
      setSnackbar({ open: false, message: '' });
    }
  }, [open, taskToEdit]);

  // Validation functions
  const validateTitle = (title: string) => (title.trim() ? '' : 'Title is required');
  const validateDueDate = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date < today ? 'Due date cannot be in the past' : '';
  };

  // Handle field changes with validation
  const handleFieldChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setSnackbar({ open: true, message: 'Please fix the errors in the form' });
      setIsSubmitting(false);
      return;
    }

    try {
      onSubmit(formData);
      onClose();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '' });
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
          >
            {Object.keys(statusColors).map((status) => (
              <MenuItem key={status} value={status}>
                {formatStatus(status)}
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
            InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
            value={formData.dueDate}
            onChange={(e) => handleFieldChange('dueDate', e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            sx={{ mb: 2 }}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
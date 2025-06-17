import { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Snackbar,
  Alert,
  Tooltip,
  IconButton, // Import IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Import icons for light/dark mode

import { TaskForm } from '../components/TaskForm';
import { TaskColumn } from '../components/TaskColumn';
import type { Task, TaskStatus } from '../types/taskTypes';
import { initialTasks } from '../data/initialTasks';
import { STATUS_ORDER } from '../constants/statusColors';
import { ColorModeContext } from '../contexts/ColorModeContext';


interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Get theme and color mode context for the dark mode toggle
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // --- Add New Task ---
  const handleAddTask = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  // --- Edit Task ---
  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id) || null;
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  // --- Delete Task ---
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setSnackbar({
      open: true,
      message: 'Task deleted successfully!',
      severity: 'success',
    });
  };

  // --- Change Status ---
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setSnackbar({
      open: true,
      message: `Task status updated to "${newStatus.replace('-', ' ')}"!`,
      severity: 'success',
    });
  };

  // --- Submit New or Edited Task ---
  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    let message = '';
    if (currentTask) {
      // Editing existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
      message = 'Task updated successfully!';
    } else {
      // Creating new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(), // Simple unique ID
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
      message = 'Task created successfully!';
    }

    setIsDialogOpen(false);
    setCurrentTask(null);
    setSnackbar({ open: true, message, severity: 'success' });
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Render using STATUS_ORDER for consistent column arrangement
  const statuses: TaskStatus[] = STATUS_ORDER;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Dark Mode Toggle Button */}
          <Tooltip title={theme.palette.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Button variant="contained" onClick={handleAddTask}>
            + New Task
          </Button>
        </Box>
      </Box>

      {/* Columns */}
      <Grid container spacing={3}>
        {statuses.map((status) => (
          <Grid key={status} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskColumn
              status={status}
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          </Grid>
        ))}
      </Grid>

      {/* Dialog Form */}
      <TaskForm
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentTask(null);
        }}
        onSubmit={handleSubmitTask}
        taskToEdit={currentTask}
      />

      {/* Global Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000} // Shorter duration for success messages
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
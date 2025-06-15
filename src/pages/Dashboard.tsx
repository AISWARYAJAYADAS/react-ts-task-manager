// src/pages/Dashboard.tsx

import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import type { Task, TaskStatus } from '../types/taskTypes';
import { initialTasks } from '../data/initialTasks';
import { formatStatus } from '../utils/formatUtils';

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

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
  };

  // --- Change Status ---
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // --- Submit New or Edited Task ---
  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (currentTask) {
      // Editing existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      // Creating new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setIsDialogOpen(false);
     setCurrentTask(null);
  };

  // --- Filter tasks by status ---
  const filterTasks = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  // --- Render ---
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];

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
        <Button variant="contained" onClick={handleAddTask}>
          + New Task
        </Button>
      </Box>

      {/* Columns */}
      <Grid container spacing={3}>
        {statuses.map((status) => (
          <Grid  key={status}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                minHeight: 'auto',
                // maxHeight: '70vh',
                // overflowY: 'auto',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {formatStatus(status)} ({filterTasks(status).length})
              </Typography>

              {filterTasks(status).map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </Box>
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
    </Container>
  );
};

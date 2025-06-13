import { useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import type { Task, TaskStatus } from '../types/taskTypes';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare project showcase',
    description: 'Gather all materials for the presentation',
    status: 'todo',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Learn Material UI',
    description: 'Complete the MUI documentation tutorial',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Fix TypeScript errors',
    description: 'Resolve all TS issues in task components',
    status: 'done',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date()
  }
];

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setCurrentTask(task || null);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (currentTask) {
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? 
          { ...task, ...taskData } : task
      ));
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setTasks([...tasks, newTask]);
    }
  };

  const filterTasks = (status: TaskStatus) => tasks.filter(task => task.status === status);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleAddTask}
        >
          + New Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {(['todo', 'in-progress', 'done'] as const).map((status) => (
          <Grid item xs={12} md={4} key={status}>
            <Box sx={{ 
              p: 2, 
              backgroundColor: 'background.paper',
              borderRadius: 1,
              minHeight: '60vh'
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {status.replace('-', ' ')} ({filterTasks(status).length})
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

      <TaskForm
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitTask}
        taskToEdit={currentTask}
      />
    </Container>
  );
};
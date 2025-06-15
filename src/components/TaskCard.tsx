import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  IconButton, 
  CardActions, 
  Tooltip,
  Box 
} from '@mui/material';
import { Edit, Delete, ArrowForward, ArrowBack } from '@mui/icons-material';
import type { TaskCardProps } from '../types/taskTypes';
import { formatStatus } from '../utils/formatUtils';

const statusColors = {
  todo: 'default',
  'in-progress': 'primary',
  done: 'success'
} as const;

export const TaskCard = ({
  id,
  title,
  description,
  status,
  dueDate,
  onEdit,
  onDelete,
  onStatusChange
}: TaskCardProps) => {
  return (
    <Card sx={{ mb: 2, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
              label={formatStatus(status).toUpperCase()}     
              color={statusColors[status]}
              size="small"
          />
          <Chip 
            label={`Due: ${new Date(dueDate).toLocaleDateString()}`} 
            size="small" 
            variant="outlined" 
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          {status !== 'todo' && (
            <Tooltip title="Move back">
              <IconButton 
                    onClick={() => onStatusChange(id, status === 'done' ? 'in-progress' : 'todo')}
                    aria-label={`Move task ${title} to ${status === 'done' ? 'in-progress' : 'todo'}`}
                    >
                <ArrowBack fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {status !== 'done' && (
            <Tooltip title="Move forward">
              <IconButton onClick={() => onStatusChange(id, status === 'todo' ? 'in-progress' : 'done')}>
                <ArrowForward fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(id)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(id)} color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};
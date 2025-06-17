import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  CardActions,
  Tooltip,
  Box,
} from '@mui/material';
import { Edit, Delete, ArrowForward, ArrowBack } from '@mui/icons-material';
import type { TaskCardProps, TaskStatus } from '../types/taskTypes';
import { formatStatus } from '../utils/formatUtils';
import { statusColors, STATUS_ORDER } from '../constants/statusColors'; // Import STATUS_ORDER

export const TaskCard = ({
  id,
  title,
  description,
  status,
  dueDate,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const currentStatusIndex = STATUS_ORDER.indexOf(status);
  const canMoveBack = currentStatusIndex > 0;
  const canMoveForward = currentStatusIndex < STATUS_ORDER.length - 1;

  const getPreviousStatus = (): TaskStatus | undefined => {
    return canMoveBack ? STATUS_ORDER[currentStatusIndex - 1] : undefined;
  };

  const getNextStatus = (): TaskStatus | undefined => {
    return canMoveForward ? STATUS_ORDER[currentStatusIndex + 1] : undefined;
  };

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
          {canMoveBack && (
            <Tooltip title="Move back">
              <IconButton
                onClick={() => {
                  const prevStatus = getPreviousStatus();
                  if (prevStatus) onStatusChange(id, prevStatus);
                }}
                aria-label={`Move task ${title} to ${getPreviousStatus()?.replace('-', ' ')}`}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {canMoveForward && (
            <Tooltip title="Move forward">
              <IconButton
                onClick={() => {
                  const nextStatus = getNextStatus();
                  if (nextStatus) onStatusChange(id, nextStatus);
                }}
                aria-label={`Move task ${title} to ${getNextStatus()?.replace('-', ' ')}`}
              >
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
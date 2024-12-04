import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckCircle2,
  EllipsisVerticalIcon,
  PenIcon,
  Trash2,
} from 'lucide-react';
import DeleteBoxDialog from './delete-box-dialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { markComplete, Task } from '@/store/taskSlice';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface TaskActionProps {
  task: Task;
}

const TaskAction = ({ task }: TaskActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleMarkComplete = () => {
    dispatch(markComplete(task.id));
    toast.success('Task marked as complete! ✅');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <EllipsisVerticalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {status !== 'done' && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-3"
                onClick={handleMarkComplete}
              >
                <CheckCircle2 className="size-4" />
                Mark as Complete
              </DropdownMenuItem>
            )}
            <Link state={task} to={`/dashboard/task/edit/${task.id}`}>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-3">
                <PenIcon className="size-4" />
                Edit Task
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex cursor-pointer items-center gap-3"
          >
            <Trash2 className="size-4" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBoxDialog
        id={task.id}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default TaskAction;

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

interface TaskActionProps {
  task: Task;
}

const TaskAction = ({ task: { id, status } }: TaskActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleMarkComplete = () => {
    dispatch(markComplete(id));
    toast('Task marked as complete! ✅');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <EllipsisVerticalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {status !== 'done' && (
              <DropdownMenuItem
                className="flex cursor-pointer  items-center gap-3"
                onClick={handleMarkComplete}
              >
                <CheckCircle2 className="size-4" />
                Mark as Complete
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="flex cursor-pointer  items-center gap-3">
              <PenIcon className="size-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex cursor-pointer  items-center gap-3"
          >
            <Trash2 className="size-4" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBoxDialog
        id={id}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default TaskAction;

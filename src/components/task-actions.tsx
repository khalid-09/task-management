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

const TaskAction = ({ id }: { id: string }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <EllipsisVerticalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel className="text-center">
            Task Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button variant="ghost" size="sm">
                <CheckCircle2 />
                Mark as Complete
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost" size="sm">
                <PenIcon />
                Edit
              </Button>
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

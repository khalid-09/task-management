import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AppDispatch } from '@/store';
import { deleteTask } from '@/store/taskSlice';
import { DialogClose } from '@radix-ui/react-dialog';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

interface DeleteTaskDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const DeleteTaskDialog = ({ id, open, onClose }: DeleteTaskDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
    toast('Task deleted successfully! 🗑️');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete you task. 🗑️</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;

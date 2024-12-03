import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';
import CreateTaskForm from './create-task-form';
import { forwardRef } from 'react';

const CreateTask = () => {
  return (
    <>
      <div className="md:block hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Trigger />
          </DialogTrigger>
          <DialogContent className="font-poppins">
            <DialogHeader>
              <DialogTitle>Create you task 🎯</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new task.
              </DialogDescription>
            </DialogHeader>
            <CreateTaskForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden block">
        <Drawer>
          <DrawerTrigger asChild>
            <Trigger />
          </DrawerTrigger>
          <DrawerContent className="font-poppins p-3">
            <DrawerHeader>
              <DrawerTitle>Create you task 🎯</DrawerTitle>
              <DrawerDescription>
                Fill in the details to create a new task.
              </DrawerDescription>
            </DrawerHeader>
            <CreateTaskForm />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default CreateTask;

const Trigger = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    return (
      <Button ref={ref} className={className} {...props}>
        <PlusIcon
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Add Task
      </Button>
    );
  }
);

Trigger.displayName = 'Trigger';

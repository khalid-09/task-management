import CreateTaskForm from '@/components/create-task-form';
import { Task } from '@/store/taskSlice';
import { PenLineIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const TaskEditPage = () => {
  const location = useLocation();
  const state = location.state as Task;

  return (
    <section className="flex flex-col mt-20 items-center space-y-3 justify-center">
      <div className="flex items-center gap-3">
        <PenLineIcon className="size-6" />
        <h3 className="text-2xl font-semibold">Edit you task</h3>
      </div>
      <CreateTaskForm type="edit" task={state} />
    </section>
  );
};

export default TaskEditPage;

import { CreateTask, createTaskSchema } from '@/lib/validation/create-task';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  AlertTriangle,
  CalendarIcon,
  CheckCircle,
  ChevronLeft,
  CircleDashedIcon,
  Clock,
  FilePlus2,
  FileText,
  Star,
} from 'lucide-react';
import { DialogClose } from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Textarea } from './ui/textarea';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addTask, editTask, Task } from '@/store/taskSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CreateTaskFormProps {
  task?: Task;
  type: 'create' | 'edit';
}

const CreateTaskForm = ({ type, task }: CreateTaskFormProps) => {
  const navigate = useNavigate();
  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || undefined,
      status: task?.status || undefined,
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: CreateTask) => {
    if (type === 'edit' && task) {
      dispatch(
        editTask({
          ...data,
          dueDate: data.dueDate.toISOString(),
          id: task.id,
        })
      );
      toast.success('Task updated successfully! 🚀');
      navigate('/dashboard');
    } else {
      dispatch(addTask({ ...data, dueDate: data.dueDate.toISOString() }));
      toast.success('Task created successfully! 🚀');
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 shadow-md border p-6 rounded-lg"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="text-xl font-semibold border-none"
                  placeholder="Task Title..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-40">
                      <SelectValue className="px-2" placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-500" size={16} />
                        <span>Todo</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <div className="flex items-center gap-2">
                        <CircleDashedIcon
                          size={16}
                          className="animate-spin text-purple-500"
                        />
                        <span>In progress</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="done">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-red-500" />
                        <span>Done</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-500" size={16} />
                        <span>Low</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-yellow-600" />
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Star className="text-red-500" size={16} />
                        <span>High</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-3">
          <span>Select Due Date :</span>
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date('2030-01-01') ||
                        date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-32 resize-none font-semibold border-none"
                  placeholder="Task Description..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full pt-4 flex items-center justify-between">
          {type === 'create' && (
            <>
              <DialogClose asChild>
                <Button variant="secondary">
                  <ChevronLeft />
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">
                  Create Task
                  <FilePlus2 />
                </Button>
              </DialogClose>
            </>
          )}
          {type === 'edit' && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft />
                Back
              </Button>
              <Button type="submit">
                Edit Task
                <FilePlus2 />
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateTaskForm;

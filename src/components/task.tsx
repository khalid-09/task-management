import { Task as TaskType } from '@/store/taskSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Calendar,
  CheckCircle2,
  Circle,
  CircleDashed,
  LucideSquareDashedMousePointer,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { format } from 'date-fns';
import TaskAction from './task-actions';
import { cn } from '@/lib/utils';

interface TaskProps {
  cardTitle: 'To Do' | 'In-Progress' | 'Done';
  tasks: TaskType[];
}

const Task = ({ cardTitle, tasks }: TaskProps) => {
  return (
    <div className="border-dashed space-y-3 shadow-lg rounded-lg p-2 border md:w-1/3 w-full">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {cardTitle === 'To Do' && (
                <Circle className="text-blue-500" size={14} />
              )}
              {cardTitle === 'In-Progress' && (
                <CircleDashed className="text-orange-500" size={14} />
              )}
              {cardTitle === 'Done' && (
                <CheckCircle2 className="text-green-500" size={14} />
              )}
              {cardTitle}
            </div>
            <Badge className="text-xs">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
      </Card>
      {tasks.map(task => (
        <Card className="shadow-lg" key={task.id}>
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                className={cn(
                  'text-xs capitalize bg-blue-100 text-blue-500',
                  task.priority === 'medium' && 'bg-orange-100 text-orange-500',
                  task.priority === 'high' && 'bg-red-100 text-red-500'
                )}
              >
                {task.priority}
              </Badge>
              <TaskAction id={task.id} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm line-clamp-2">{task.description}</p>
            </div>
          </CardContent>
          <Separator />
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <p className="text-sm">
                Due on :{' '}
                <span className="font-semibold">
                  {format(new Date(task.dueDate), 'dd MMM')}
                </span>
              </p>
            </div>
          </div>
        </Card>
      ))}
      {tasks.length === 0 && (
        <div className="p-2 flex items-center gap-2">
          <LucideSquareDashedMousePointer size={16} />
          No tasks. Start adding your tasks.
        </div>
      )}
    </div>
  );
};

export default Task;

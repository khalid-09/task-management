import { Task } from '@/store/taskSlice';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import TaskAction from './task-actions';
import { Separator } from './ui/separator';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface TaskCardProps {
  cardTitle: 'To Do' | 'In-Progress' | 'Completed';
  tasks: Task[];
}

const TaskCard = ({ tasks, cardTitle }: TaskCardProps) => {
  return (
    <div className="px-1">
      {tasks.map(task => (
        <Link to={`/dashboard/task/edit/${task.id}`}>
          <Card className="mb-3 transition hover:scale-[101%]" key={task.id}>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  className={cn(
                    'text-xs capitalize bg-blue-100 text-blue-500',
                    task.priority === 'medium' &&
                      'bg-orange-100 text-orange-500',
                    task.priority === 'high' && 'bg-red-100 text-red-500'
                  )}
                >
                  {task.priority}
                </Badge>
                <TaskAction task={task} />
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
                {cardTitle !== 'Completed' && (
                  <p className="text-sm">
                    Due on:{' '}
                    <span className="font-semibold">
                      {format(new Date(task.dueDate), 'dd MMM yy')}
                    </span>
                  </p>
                )}
                {cardTitle === 'Completed' && (
                  <p className="text-sm">
                    Completed on:{' '}
                    <span className="font-semibold">
                      {format(new Date(task.dueDate), 'dd MMM yy')}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TaskCard;
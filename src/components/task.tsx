import { Task as TaskType } from '@/store/taskSlice';
import { Card, CardHeader, CardTitle } from './ui/card';
import {
  CheckCircle2,
  Circle,
  CircleDashed,
  LucideSquareDashedMousePointer,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskCard from './task-card';

interface TaskProps {
  cardTitle: 'To Do' | 'In-Progress' | 'Completed';
  tasks: TaskType[];
}

const Task = ({ cardTitle, tasks }: TaskProps) => {
  return (
    <div className="border-dashed shadow-lg rounded-lg p-2 border md:w-1/3 w-full flex flex-col">
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
              {cardTitle === 'Completed' && (
                <CheckCircle2 className="text-green-500" size={14} />
              )}
              {cardTitle}
            </div>
            <Badge className="text-xs">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <ScrollArea className="h-96 md:h-[862px] mt-3">
        <TaskCard cardTitle={cardTitle} tasks={tasks} />
        {tasks.length === 0 && (
          <div className="p-2  flex items-center justify-center md:justify-start gap-2">
            <LucideSquareDashedMousePointer size={16} />
            No tasks. Start adding your tasks.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Task;

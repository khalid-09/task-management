import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function RecentTasks() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 divide-y-2">
          {tasks.slice(0, 5).map(task => (
            <div
              key={task.id}
              className="flex pt-2 items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{task.title}</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      task.priority === 'high'
                        ? 'destructive'
                        : task.priority === 'medium'
                        ? 'default'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Due {format(new Date(task.dueDate), 'MMM dd')}
                  </span>
                </div>
              </div>
              <Badge
                className="capitalize"
                variant={task.status === 'done' ? 'default' : 'outline'}
              >
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

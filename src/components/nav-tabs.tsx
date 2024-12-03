import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import {
  Calendar,
  Circle,
  EllipsisVerticalIcon,
  Filter,
  SlidersVerticalIcon,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { format } from 'date-fns';

const NavTabs = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const tasksToDo = tasks.filter(task => task.status === 'todo');
  // const tasksInProgress = tasks.filter(task => task.status === 'in-progress');
  // const tasksDone = tasks.filter(task => task.status === 'done');

  return (
    <section className="flex p-3 md:w-2/3 w-full items-start justify-between">
      <Tabs defaultValue="kanban" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <div className="gap-1 md:gap-3 flex">
            <Button variant="outline">
              <SlidersVerticalIcon
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="md:block hidden">Filter</span>
            </Button>
            <Button variant="outline">
              <Filter
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="md:block hidden">Sort By</span>
            </Button>
          </div>
        </div>
        <TabsContent
          value="kanban"
          className="flex flex-col md:flex-row items-start gap-3"
        >
          <div className="border-dashed space-y-3 rounded-lg p-2 border md:w-1/3 w-full">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="text-blue-500" size={14} />
                    Todo
                  </div>
                  <Badge className="text-xs">{tasksToDo.length}</Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <Card className="shadow-lg" key={index}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="text-xs bg-orange-400 ">Medium</Badge>
                    <Button size="sm" variant="ghost">
                      <EllipsisVerticalIcon size={16} />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Task Title</h3>
                    <p className="text-sm line-clamp-2">
                      Descriptioasjkdfhjahfhasdhfjaskdhfjashalsjkdfhjashakjfahjgahdgdajskdfashdfjasjdfhjasdhasjdkfhasjdhfn
                    </p>
                  </div>
                </CardContent>
                <Separator />
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <p className="text-sm">
                      Due on : <span className="font-semibold">2 Dec</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))} */}
            {tasksToDo.map(task => (
              <Card className="shadow-lg" key={task.id}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="text-xs capitalize bg-orange-400 ">
                      {task.priority}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <EllipsisVerticalIcon size={16} />
                    </Button>
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
          </div>
          <div className="border md:w-1/3 rounded-lg w-full">asjdfh</div>
          <div className="border md:w-1/3 rounded-lg w-full">asljdfh</div>
        </TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default NavTabs;

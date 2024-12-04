import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Filter, SlidersVerticalIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Task from './task';

const NavTabs = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const tasksToDo = tasks.filter(task => task.status === 'todo');
  const tasksInProgress = tasks.filter(task => task.status === 'in-progress');
  const tasksDone = tasks.filter(task => task.status === 'done');

  return (
    <section className="flex py-3 w-full items-start justify-between">
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
          <Task cardTitle="To Do" tasks={tasksToDo} />
          <Task cardTitle="In-Progress" tasks={tasksInProgress} />
          <Task cardTitle="Done" tasks={tasksDone} />
        </TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default NavTabs;

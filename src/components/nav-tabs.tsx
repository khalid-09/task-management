import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Filter, SlidersVerticalIcon, Terminal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Task from './task';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const NavTabs = () => {
  const [showOverdue, setShowOverdue] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const overdueTasks = tasks.filter(
    task =>
      (task.status === 'todo' || task.status === 'in-progress') &&
      new Date(task.dueDate) < new Date()
  );

  const tasksToDisplay = showOverdue ? overdueTasks : filteredTasks;

  const tasksToDo = tasksToDisplay.filter(task => task.status === 'todo');
  const tasksInProgress = tasksToDisplay.filter(
    task => task.status === 'in-progress'
  );
  const tasksDone = tasksToDisplay.filter(task => task.status === 'done');

  return (
    <section className="flex py-3 w-full items-start justify-between">
      <Tabs defaultValue="kanban" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
          <div className="gap-1 md:gap-3 flex">
            <Button
              variant="outline"
              onClick={() => setShowOverdue(prev => !prev)}
            >
              <SlidersVerticalIcon
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="">Show Overdue Tasks</span>
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
          {tasksToDisplay.length === 0 ? (
            <Alert className="mt-4 md:w-1/2 w-full">
              <Terminal className="h-4 w-4" />
              <AlertTitle className="text-xl font-medium">
                No task found!
              </AlertTitle>
              <AlertDescription>
                Try searching for a different task or create a new one.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Task cardTitle="To Do" tasks={tasksToDo} />
              <Task cardTitle="In-Progress" tasks={tasksInProgress} />
              <Task cardTitle="Completed" tasks={tasksDone} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default NavTabs;

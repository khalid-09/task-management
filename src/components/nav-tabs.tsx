import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Filter, SlidersVerticalIcon, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Task from './task';
import { RootState } from '@/store';
import { updateTaskStatus } from '@/store/taskSlice';

const NavTabs = () => {
  const [showOverdue, setShowOverdue] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const dispatch = useDispatch();
  const [, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as 'todo' | 'in-progress' | 'done';

    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      dispatch(updateTaskStatus({ taskId, newStatus }));
    }
  };

  return (
    <section className="flex py-3 w-full items-start justify-between">
      <Tabs defaultValue="all-tasks" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all-tasks">All tasks</TabsTrigger>
          </TabsList>
          <div className="gap-1 md:gap-3 flex">
            <Button
              variant={showOverdue ? 'default' : 'outline'}
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
          value="all-tasks"
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
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <Task cardTitle="To Do" tasks={tasksToDo} />
              <Task cardTitle="In-Progress" tasks={tasksInProgress} />
              <Task cardTitle="Completed" tasks={tasksDone} />
            </DndContext>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default NavTabs;

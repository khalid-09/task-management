import { CreateTask } from '@/lib/validation/create-task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Task extends Omit<CreateTask, 'dueDate'> {
  id: string;
  dueDate: string;
}

const initialState: Task[] = [
  {
    id: '1',
    title: 'Learn Communication',
    description: 'Practice communication for Accenture Interview.',
    dueDate: '2024-12-03T18:30:00.000Z', // Overdue (for example, it's past the current date)
    priority: 'high',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Complete Redux Tutorial',
    description:
      'Finish the Redux Toolkit tutorial and implement a small project.',
    dueDate: '2024-12-05T18:30:00.000Z',
    priority: 'medium',
    status: 'todo',
  },
  {
    id: '3',
    title: 'Build Personal Portfolio',
    description: 'Design and build a responsive portfolio using Next.js.',
    dueDate: '2024-12-08T18:30:00.000Z',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: '4',
    title: 'Read TypeScript Docs',
    description:
      'Go through the TypeScript documentation to understand advanced concepts.',
    dueDate: '2024-12-10T18:30:00.000Z',
    priority: 'low',
    status: 'in-progress',
  },
  {
    id: '5',
    title: 'Complete JavaScript Course',
    description: 'Completed the advanced JavaScript course on Udemy.',
    dueDate: '2024-11-20T18:30:00.000Z', // Overdue
    priority: 'high',
    status: 'done',
  },
  {
    id: '6',
    title: 'Setup Development Environment',
    description: 'Installed VS Code, Node.js, and other necessary tools.',
    dueDate: '2024-11-15T18:30:00.000Z', // Overdue
    priority: 'medium',
    status: 'done',
  },
  {
    id: '7',
    title: 'Write Blog on React Hooks',
    description: 'Published a blog explaining React hooks and their use cases.',
    dueDate: '2024-11-10T18:30:00.000Z', // Overdue
    priority: 'low',
    status: 'done',
  },
  // Adding more overdue tasks
  {
    id: '8',
    title: 'Finish CSS Grid Project',
    description: 'Complete the CSS Grid project for portfolio.',
    dueDate: '2024-11-25T18:30:00.000Z', // Overdue
    priority: 'high',
    status: 'todo',
  },
  {
    id: '9',
    title: 'Prepare for React Interview',
    description: 'Prepare for upcoming React interview.',
    dueDate: '2024-11-30T18:30:00.000Z', // Overdue
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: '10',
    title: 'Review GitHub Projects',
    description: 'Review and update all personal GitHub projects.',
    dueDate: '2024-12-01T18:30:00.000Z', // Overdue
    priority: 'low',
    status: 'todo',
  },
];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, 'id'>>) {
      state.push({ id: uuidv4(), ...action.payload });
    },
    deleteTask(state, action: PayloadAction<string>) {
      return state.filter(task => task.id !== action.payload);
    },
    markComplete(state, action: PayloadAction<string>) {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.status = 'done';
      }
    },
  },
});

export const { addTask, deleteTask, markComplete } = taskSlice.actions;

export default taskSlice.reducer;

import { Task } from './taskSlice';

export const initialState: Task[] = [
  {
    id: '1',
    title: 'Learn Communication',
    description: 'Practice communication skills for Interview.',
    dueDate: '2024-12-03T18:30:00.000Z',
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
    dueDate: '2024-11-20T18:30:00.000Z',
    priority: 'high',
    status: 'done',
  },
  {
    id: '6',
    title: 'Setup Development Environment',
    description: 'Installed VS Code, Node.js, and other necessary tools.',
    dueDate: '2024-11-15T18:30:00.000Z',
    priority: 'medium',
    status: 'done',
  },
  {
    id: '7',
    title: 'Write Blog on React Hooks',
    description: 'Published a blog explaining React hooks and their use cases.',
    dueDate: '2024-11-10T18:30:00.000Z',
    priority: 'low',
    status: 'done',
  },
  {
    id: '8',
    title: 'Finish CSS Grid Project',
    description: 'Complete the CSS Grid project for portfolio.',
    dueDate: '2024-11-25T18:30:00.000Z',
    priority: 'high',
    status: 'todo',
  },
  {
    id: '9',
    title: 'Prepare for React Interview',
    description: 'Prepare for upcoming React interview.',
    dueDate: '2024-11-30T18:30:00.000Z',
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: '10',
    title: 'Review GitHub Projects',
    description: 'Review and update all personal GitHub projects.',
    dueDate: '2024-12-01T18:30:00.000Z',
    priority: 'low',
    status: 'todo',
  },
];

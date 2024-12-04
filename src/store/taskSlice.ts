import { CreateTask } from '@/lib/validation/create-task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Task extends Omit<CreateTask, 'dueDate'> {
  id: string;
  dueDate: string;
}

const initialState: Task[] = [
  {
    id: 'anyId',
    title: 'Learn Communication',
    description: 'Practice communication for Accenture Interview.',
    dueDate: '2024-12-03T18:30:00.000Z',
    priority: 'high',
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

export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;

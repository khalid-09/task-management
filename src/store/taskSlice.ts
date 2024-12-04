import { CreateTask } from '@/lib/validation/create-task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { initialState } from './constants';

export interface Task extends Omit<CreateTask, 'dueDate'> {
  id: string;
  dueDate: string;
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.findIndex(task => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state[taskIndex] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      return state.filter(task => task.id !== action.payload);
    },
    markComplete: (state, action: PayloadAction<string>) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.status = 'done';
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{
        taskId: string;
        newStatus: 'todo' | 'in-progress' | 'done';
      }>
    ) => {
      const task = state.find(task => task.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, markComplete, updateTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;

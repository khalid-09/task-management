import { CreateTask } from '@/lib/validation/create-task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Task extends Omit<CreateTask, 'dueDate'> {
  id: string;
  dueDate: string;
}

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, 'id'>>) {
      state.push({ id: uuidv4(), ...action.payload });
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;

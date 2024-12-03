import { z } from 'zod';

const requiredString = z
  .string({ required_error: 'Enter valid string' })
  .min(1, { message: 'Enter min 1 char.' })
  .max(100, { message: 'Enter max 100 char.' });

export const createTaskSchema = z.object({
  title: requiredString,
  description: requiredString,
  dueDate: z.date({ required_error: 'Enter valid date' }),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['todo', 'in-progress', 'done']),
});

export type CreateTask = z.infer<typeof createTaskSchema>;

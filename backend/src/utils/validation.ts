import { z } from 'zod';
import { CASABLANCA_NEIGHBORHOODS } from './constants';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
  role: z.enum(['cook', 'customer'], { errorMap: () => ({ message: 'Role must be either cook or customer' }) }),
  phone: z.string().optional(),
  neighborhood: z.enum(CASABLANCA_NEIGHBORHOODS).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
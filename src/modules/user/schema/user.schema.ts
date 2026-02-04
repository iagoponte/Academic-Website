import { z } from 'zod';
import { Role } from '../user.entity.js';


export const createUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  roles: z.array(z.enum(Role)).nonempty("Pelo menos uma role é obrigatória"),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
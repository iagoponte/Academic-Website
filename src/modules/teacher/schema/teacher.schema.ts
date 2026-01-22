import { z } from 'zod';

// Este schema valida a entrada da API (o que vem no POST)
export const createTeacherSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("E-mail invalid"),
  password: z.string().min(6, "Password has to be at least 6 characters long"),
});

export const updateTeacherSchema = createTeacherSchema.partial();
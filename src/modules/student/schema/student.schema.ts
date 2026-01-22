import { z } from 'zod';

// Este schema valida a entrada da API (o que vem no POST)
export const createStudentSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("E-mail invalid"),
  registrationNumber: z.string().length(10),
});

export const updateStudentSchema = createStudentSchema
.extend({
  isActive: z.boolean()
})
.partial();
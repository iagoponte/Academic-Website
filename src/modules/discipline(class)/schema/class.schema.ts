import { z } from 'zod';

export const createClassSchema = z.object({
  name: z.string().min(3, "O nome da disciplina deve ser claro"),
  semester: z
    .string()
    .regex(/^\d{4}\.\d$/, "Formato inválido. Use AAAA.S (ex: 2025.1)"),
  teacherIds: z.array(z.string().uuid("ID de professor inválido")).optional(),
});

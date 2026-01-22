import { z } from 'zod';

export const assignTeacherSchema = z.object({
  classId: z.string().uuid("ID da turma inválido"),
  teacherId: z.string().uuid("ID do professor inválido"),
});

export type AssignTeacherDTO = z.infer<typeof assignTeacherSchema>;
import { z } from 'zod';

// Input para matricular
export const createEnrollmentSchema = z.object({
  studentId: z.string().uuid("ID do aluno inválido"),
  classId: z.string().uuid("ID da turma inválido"),
});


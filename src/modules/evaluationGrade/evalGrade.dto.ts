import { z } from 'zod';

export const createGradeSchema = z.object({
  enrollmentId: z.string().uuid('Matrícula inválida'),
  evaluationId: z.string().uuid('Avaliação inválida'),
  value: z
    .number()
    .min(0, 'Nota mínima é 0')
    .max(10, 'Nota máxima é 10'),
});

export type CreateGradeDTO = z.infer<typeof createGradeSchema>;

export const updateGradeSchema = z.object({
  value: z
    .number()
    .min(0, 'Nota mínima é 0')
    .max(10, 'Nota máxima é 10'),
});

export type UpdateGradeDTO = z.infer<typeof updateGradeSchema>;


export interface GradeResponseDTO {
  id: string;
  value: number;

  enrollment: {
    id: string;
    student: {
      id: string;
      name: string;
      registrationNumber: string;
    };
    class: {
      id: string;
      name: string;
      semester: string;
    };
  };

  evaluation: {
    id: string;
    type: string;
    weight: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface GradeByStudentFilterDTO {
  studentId: string;
  classId?: string;
}

export interface GradeByEvaluationFilterDTO {
  evaluationId: string;
}


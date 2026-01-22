import type { Prisma, PrismaClient } from '../../infraestructure/generated/prisma/client.js';
import { prisma } from '../../infraestructure/prisma/client.js';
import type { CreateGradeDTO, UpdateGradeDTO } from './evalGrade.dto.js';

/* ======================================================
 * SELECT PADRÃO (para uso com Mapper)
 * ====================================================== */

export const gradeSelect = {
  id: true,
  value: true,
  createdAt: true,
  updatedAt: true,

  enrollment: {
    select: {
      id: true,
      student: {
        select: {
          id: true,
          name: true,
          registrationNumber: true,
        },
      },
      class: {
        select: {
          id: true,
          name: true,
          semester: true,
        },
      },
    },
  },

  evaluation: {
    select: {
      id: true,
      type: true,
      weight: true,
    },
  },
};


export type GradeWithDetails = Prisma.EvaluationGradeGetPayload<{
  select: typeof gradeSelect;
}>;

export class GradeRepository {
  /* ==========================================
   * CREATE – Lançar nota
   * ========================================== */
  async create(data: CreateGradeDTO): Promise<GradeWithDetails> {
    return prisma.evaluationGrade.create({
      data: {
        enrollmentId: data.enrollmentId,
        evaluationId: data.evaluationId,
        value: data.value,
      },
      select: gradeSelect,
    });
  }

  /* ==========================================
   * UPDATE – Ajustar nota
   * ========================================== */
  async update(id: string, data: UpdateGradeDTO): Promise<GradeWithDetails> {
    return prisma.evaluationGrade.update({
      where: { id },
      data: {
        value: data.value,
      },
      select: gradeSelect,
    });
  }

  /* ==========================================
   * EXISTS – Evitar duplicidade
   * ========================================== */
  async exists(
    enrollmentId: string,
    evaluationId: string
  ): Promise<boolean> {
    const count = await prisma.evaluationGrade.count({
      where: {
        enrollmentId,
        evaluationId,
      },
    });

    return count > 0;
  }

  /* ==========================================
   * CONSULTAS DE DOMÍNIO
   * ========================================== */

  // Boletim do aluno (por matrícula)
  async findByEnrollment(
    enrollmentId: string
  ): Promise<GradeWithDetails[]> {
    return prisma.evaluationGrade.findMany({
      where: { enrollmentId },
      select: gradeSelect,
      orderBy: {
        evaluation: { type: 'asc' },
      },
    });
  }

  // Notas de uma avaliação (diário)
  async findByEvaluation(
    evaluationId: string
  ): Promise<GradeWithDetails[]> {
    return prisma.evaluationGrade.findMany({
      where: { evaluationId },
      select: gradeSelect,
      orderBy: {
        enrollment: {
          student: { name: 'asc' },
        },
      },
    });
  }

  /* ==========================================
   * ADMIN
   * ========================================== */

  async findAll(): Promise<GradeWithDetails[]> {
    return prisma.evaluationGrade.findMany({
      select: gradeSelect,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<GradeWithDetails | null> {
    return prisma.evaluationGrade.findUnique({
      where: { id },
      select: gradeSelect,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.evaluationGrade.delete({
      where: { id },
    });
  }
}



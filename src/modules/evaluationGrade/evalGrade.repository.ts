import type { Prisma, PrismaClient } from '../../infraestructure/generated/prisma/client.js';
import { prisma } from '../../infraestructure/prisma/client.js';
import type { CreateGradeDTO, UpdateGradeDTO } from './evalGrade.dto.js';
import type { EvaluationGrade } from './evalGrade.entity.js';
import { GradeMapper } from './evalGrade.mapper.js';

const gradeInclude = {
    enrollment: {
        include: {
            student: true, // Traz dados do aluno
            class: true    // Traz dados da turma
        }
    },
    evaluation: true       // Traz dados da avaliação
};

export class GradeRepository {
  /* ==========================================
   * CREATE – Lançar nota
   * ========================================== */
  async create(data: CreateGradeDTO): Promise<EvaluationGrade> {
    const prismaGrade = await prisma.evaluationGrade.create({
      data: {
        enrollmentId: data.enrollmentId,
        evaluationId: data.evaluationId,
        value: data.value,
      },
      include: gradeInclude,
    });
    return GradeMapper.toDomain(prismaGrade);
  }

  /* ==========================================
   * UPDATE – Ajustar nota
   * ========================================== */
  async update(id: string, data: UpdateGradeDTO): Promise<EvaluationGrade> {
    const prismaGrade = await prisma.evaluationGrade.update({
      where: { id },
      data: {
        value: data.value,
      },
      include: gradeInclude,
    });
    return GradeMapper.toDomain(prismaGrade)
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
  ): Promise<EvaluationGrade[]> {
    const prismaGrades = await prisma.evaluationGrade.findMany({
      where: { enrollmentId },
      include: gradeInclude,
      orderBy: {
        evaluation: { type: 'asc' },
      },
    });
    return prismaGrades.map(grade => GradeMapper.toDomain(grade))
  }

  // Notas de uma avaliação (diário)
  async findByEvaluation(
    evaluationId: string
  ): Promise<EvaluationGrade[]> {
    const prismaGrades = await prisma.evaluationGrade.findMany({
      where: { evaluationId },
      include: gradeInclude,
      orderBy: {
        enrollment: {
          student: { name: 'asc' },
        },
      },
    });
    return prismaGrades.map(grade => GradeMapper.toDomain(grade));
  }

  /* ==========================================
   * ADMIN
   * ========================================== */

  async findAll(): Promise<EvaluationGrade[]> {
    const prismaGrades = await prisma.evaluationGrade.findMany({
      include: gradeInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return prismaGrades.map(grade => GradeMapper.toDomain(grade))
  }

  async findById(id: string): Promise<EvaluationGrade | null> {
    const prismaGrade = await prisma.evaluationGrade.findUnique({
      where: { id },
      include: gradeInclude,
    });
    if(!prismaGrade) return null;
    return GradeMapper.toDomain(prismaGrade);
  }

  async delete(id: string): Promise<void> {
    await prisma.evaluationGrade.delete({
      where: { id },
    });
  }
}



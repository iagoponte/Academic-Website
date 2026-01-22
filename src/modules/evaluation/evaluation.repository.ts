
import type { Prisma, PrismaClient } from '../../infraestructure/generated/prisma/client.js';
import { prisma } from '../../infraestructure/prisma/client.js';
import type { CreateEvaluationDTO, UpdateEvaluationDTO } from './evaluation.dto.js';
import type { Evaluation } from './evaluation.entity.js';

export class EvaluationRepository {

  create(data: CreateEvaluationDTO): Promise<Evaluation> {
    return prisma.evaluation.create({ 
      data: {
        type: data.type as any,
        description: data.description ?? null,
        weight: data.weight,
        classId: data.classId,
      }
    });
  }

  findById(id: string): Promise<Evaluation | null> {
    return prisma.evaluation.findUnique({ where: { id } });
  }

  findByClass(classId: string): Promise<Evaluation[]> {
    return prisma.evaluation.findMany({
      where: { classId },
      orderBy: { type: 'asc' }
    });
  }

  findAll(): Promise<Evaluation[]> {
    return prisma.evaluation.findMany();
  }

  update(id: string, data: UpdateEvaluationDTO): Promise<Evaluation> {
    return prisma.evaluation.update({
      where: { id },
      data: {
            ...(data.type && { type: data.type as any }), 
            ...(data.description && { description: data.description }),
            ...(data.weight !== undefined && { weight: data.weight }), 
        }
    });
  }

  delete(id: string): Promise<void> {
    return prisma.evaluation
      .delete({ where: { id } })
      .then(() => undefined);
  }
}

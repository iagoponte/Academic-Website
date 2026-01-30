
import type { Prisma, PrismaClient } from '../../infraestructure/generated/prisma/client.js';
import { prisma } from '../../infraestructure/prisma/client.js';
import type { CreateEvaluationDTO, UpdateEvaluationDTO } from './evaluation.dto.js';
import type { Evaluation } from './evaluation.entity.js';
import { EvaluationMapper } from './evaluation.mapper.js';
import { EvaluationType as PrismaEvaluationType } from '../../infraestructure/generated/prisma/client.js';
import { removeUndefined } from '../../shared/utils/removeUndefined.js';

export class EvaluationRepository {

  async create(data: CreateEvaluationDTO): Promise<Evaluation> {
    const evaluationPrisma = await prisma.evaluation.create({ 
      data: {
        type: data.type as unknown as PrismaEvaluationType,
        description: data.description ?? null,
        weight: data.weight,
        classId: data.classId,
      }
    });
    return EvaluationMapper.toDomain(evaluationPrisma);
  }

  async findById(id: string): Promise<Evaluation | null> {
    const evaluationPrisma = await prisma.evaluation.findUnique({ where: { id } });
    if(!evaluationPrisma) return null;
    return EvaluationMapper.toDomain(evaluationPrisma);
  }

  async findByClass(classId: string): Promise<Evaluation[]> {
    const evaluationsPrisma = await prisma.evaluation.findMany({
      where: { classId },
      orderBy: { type: 'asc' }
    });
    return evaluationsPrisma.map(evaluation => EvaluationMapper.toDomain(evaluation));
  }

  async findAll(): Promise<Evaluation[]> {
    const evaluationsPrisma = await prisma.evaluation.findMany();
    return evaluationsPrisma.map(evaluation => EvaluationMapper.toDomain(evaluation));

  }

  async update(id: string, data: UpdateEvaluationDTO): Promise<Evaluation> {
    const cleanData = removeUndefined(data);

    //permission to exchange enums types.
    const prismaData: any = {...cleanData};
    
    if (cleanData.type) {
        prismaData.type = cleanData.type as unknown as PrismaEvaluationType;
    }

    const evaluationPrisma = await prisma.evaluation.update({
      where: { id },
      data: prismaData
    });
    
    return EvaluationMapper.toDomain(evaluationPrisma);
  }

  async delete(id: string): Promise<void> {
    return prisma.evaluation
      .delete({ where: { id } })
      .then(() => undefined);
  }
}

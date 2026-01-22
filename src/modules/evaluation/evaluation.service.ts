import { AppError } from "../../shared/errors/appError.js";
import type { ClassRepository } from "../discipline(class)/class.repository.js";
import type { CreateEvaluationDTO, EvaluationResponseDTO, UpdateEvaluationDTO } from "./evaluation.dto.js";
import { EvaluationMapper } from "./evaluation.mapper.js";
import type { EvaluationRepository } from "./evaluation.repository.js";


export class EvaluationService {
  constructor(
    private readonly repository: EvaluationRepository,
    private readonly classRepository: ClassRepository
  ) {}

  async create(
    dto: CreateEvaluationDTO
  ): Promise<EvaluationResponseDTO> {

    const classExists =
      await this.classRepository.exists(dto.classId);

    if (!classExists) {
      throw new AppError('Turma não encontrada', 404);
    }

    const evaluation = await this.repository.create({
      type: dto.type,
      weight: dto.weight,
      description: dto.description ?? null,
      classId: dto.classId
    });

    return EvaluationMapper.toResponse(evaluation);
  }

  async listByClass(
    classId: string
  ): Promise<EvaluationResponseDTO[]> {
    const evaluations =
      await this.repository.findByClass(classId);

    return evaluations.map(EvaluationMapper.toResponse);
  }

  async getById(id: string): Promise<EvaluationResponseDTO> {
    const evaluation = await this.repository.findById(id);

    if (!evaluation) {
      throw new AppError('Avaliação não encontrada', 404);
    }

    return EvaluationMapper.toResponse(evaluation);
  }

  async listAll(): Promise<EvaluationResponseDTO[]> {
    const evaluations = await this.repository.findAll();
    return evaluations.map(EvaluationMapper.toResponse);
  }

  async update(
    id: string,
    dto: UpdateEvaluationDTO
  ): Promise<EvaluationResponseDTO> {

    await this.getById(id);

    const evaluation = await this.repository.update(id, {
      ...(dto.type && { type: dto.type }),
      ...(dto.weight !== undefined && { weight: dto.weight }),
      ...(dto.description !== undefined && { description: dto.description }),
    });

    return EvaluationMapper.toResponse(evaluation);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
}

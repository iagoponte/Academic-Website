import type { EvaluationResponseDTO } from "./evaluation.dto.js";
import type { Evaluation, EvaluationType } from "./evaluation.entity.js";
import type { Evaluation as PrismaEvaluation } from "../../infraestructure/generated/prisma/client.js";

export class EvaluationMapper {
  static toResponse(
    evaluation: Evaluation
  ): EvaluationResponseDTO {
    return {
      id: evaluation.id,
      type: evaluation.type,
      description: evaluation.description,
      weight: evaluation.weight,
      createdAt: evaluation.createdAt,
      updatedAt: evaluation.updatedAt,
    };
  }
  static toDomain(raw: PrismaEvaluation): Evaluation {
    return {
      id: raw.id,
      classId: raw.classId,
      type: raw.type as unknown as EvaluationType,
      description: raw.description,
      weight: raw.weight,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}

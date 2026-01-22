import type { EvaluationResponseDTO } from "./evaluation.dto.js";
import type { Evaluation } from "./evaluation.entity.js";

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
}

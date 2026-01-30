import { AppError } from "../../shared/errors/appError.js";
import type { EnrollmentRepository } from "../enrollment/enrollment.repository.js";
import type { EvaluationRepository } from "../evaluation/evaluation.repository.js";
import type { CreateGradeDTO, GradeResponseDTO, UpdateGradeDTO } from "./evalGrade.dto.js";
import type { EvaluationGrade } from "./evalGrade.entity.js";
import { GradeMapper } from "./evalGrade.mapper.js";
import type { GradeRepository } from "./evalGrade.repository.js";


export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  async create(dto: CreateGradeDTO): Promise<EvaluationGrade> {
    const alreadyExists = await this.gradeRepository.exists(
      dto.enrollmentId,
      dto.evaluationId
    );
    if (alreadyExists) {
      throw new AppError('Nota já lançada para esta avaliação', 409);
    }
    const enrollment =
      await this.enrollmentRepository.findById(dto.enrollmentId);

    if (!enrollment) {
      throw new AppError('Matrícula não encontrada', 404);
    }
    const evaluation =
      await this.evaluationRepository.findById(dto.evaluationId);

    if (!evaluation) {
      throw new AppError('Avaliação não encontrada', 404);
    }
    // evaluation must belong to the same class as the enrollment
    if (evaluation.classId !== enrollment.classId) {
      throw new AppError('Avaliação não pertence à turma desta matrícula', 400);
    }
    const grade = await this.gradeRepository.create(dto);
    return grade;
  }

  async update(id: string, dto: UpdateGradeDTO): Promise<EvaluationGrade> {
    const existingGrade =
      await this.gradeRepository.findById(id);

    if (!existingGrade) {
      throw new AppError('Nota não encontrada', 404);
    }

    const updatedGrade =
      await this.gradeRepository.update(id, dto);
    return updatedGrade;
  }

  // Boletim (por matrícula)
  async listByEnrollment(enrollmentId: string): Promise<EvaluationGrade[]> {
    const grades =
      await this.gradeRepository.findByEnrollment(enrollmentId);
    return grades;
  }

  // Diário (por avaliação)
  async listByEvaluation(evaluationId: string): Promise<EvaluationGrade[]> {
    const grades =
      await this.gradeRepository.findByEvaluation(evaluationId);
    return grades;
  }

  // ADMIN
  async listAll(): Promise<EvaluationGrade[]> {
    const grades = await this.gradeRepository.findAll();
    return grades;
  }

  async getById(id: string): Promise<EvaluationGrade> {
    const grade = await this.gradeRepository.findById(id);

    if (!grade) {
      throw new AppError('Nota não encontrada', 404);
    }
    return grade;
  }

  async delete(id: string): Promise<void> {
    const grade = await this.gradeRepository.findById(id);
    if (!grade) {
      throw new AppError('Nota não encontrada', 404);
    }
    await this.gradeRepository.delete(id);
  }
}

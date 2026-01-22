import { AppError } from "../../shared/errors/appError.js";
import type { EnrollmentRepository } from "../enrollment/enrollment.repository.js";
import type { EvaluationRepository } from "../evaluation/evaluation.repository.js";
import type { GradeRepository } from "../evaluationGrade/evalGrade.repository.js";
import type { ReportCardDTO } from "./reportCard.dto.js";

export class ReportCardService {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  async generate(enrollmentId: string): Promise<ReportCardDTO> {
    const enrollment =
      await this.enrollmentRepository.findById(enrollmentId);

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    const evaluations =
      await this.evaluationRepository.findByClass(enrollment.classId);

    const grades =
      await this.gradeRepository.findByEnrollment(enrollmentId);

    const gradesMap = new Map(
      grades.map(g => [g.evaluation.id, g.value])
    );

    const evaluationResults = evaluations.map(evaluation => ({
      type: evaluation.type,
      weight: evaluation.weight,
      grade: gradesMap.get(evaluation.id) ?? null
    }));

    const average = this.calculateAverage(evaluationResults);
    const status = this.calculateStatus(average);

    return {
      student: {
        name: enrollment.student.name,
        registrationNumber:
          enrollment.student.registrationNumber
      },
      class: {
        name: enrollment.class.name,
        semester: enrollment.class.semester
      },
      evaluations: evaluationResults,
      average,
      status,
      generatedAt: new Date()
    };
  }

  private calculateAverage(
    evaluations: {
      grade: number | null;
      weight: number;
    }[]
  ): number {
    let weightedSum = 0;
    let weightSum = 0;

    for (const e of evaluations) {
      if (e.grade !== null) {
        weightedSum += e.grade * e.weight;
        weightSum += e.weight;
      }
    }

    return weightSum === 0
      ? 0
      : Number((weightedSum / weightSum).toFixed(2));
  }

  private calculateStatus(
    average: number
  ): 'Aprovado' | 'Reprovado' | 'Recuperação' {
    if (average >= 7) return 'Aprovado';
    if (average >= 5) return 'Recuperação';
    return 'Reprovado';
  }
}

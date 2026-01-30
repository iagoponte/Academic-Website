import { AppError } from "../../shared/errors/appError.js";
import type { EnrollmentRepository } from "../enrollment/enrollment.repository.js";
import type { EvaluationRepository } from "../evaluation/evaluation.repository.js";
import type { GradeRepository } from "../evaluationGrade/evalGrade.repository.js";
import type { ReportCard } from "./reportCard.entity.js"; // Retorna a Entidade

export class ReportCardService {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  async generate(enrollmentId: string): Promise<ReportCard> {
    // 1. Busca a Matrícula (Ponto de partida)
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    // 2. Busca Avaliações e Notas em PARALELO (Mais rápido)
    const [evaluations, grades] = await Promise.all([
      this.evaluationRepository.findByClass(enrollment.classId),
      this.gradeRepository.findByEnrollment(enrollmentId)
    ]);

    // 3. Mapeia as notas para acesso rápido (O(1))
    const gradesMap = new Map(
      grades.map(g => [g.evaluationId, g.value])
    );

    // 4. Monta o resultado combinando Avaliação + Nota
    const evaluationResults = evaluations.map(evaluation => ({
      type: evaluation.type as string, // Converte Enum para string
      weight: evaluation.weight,
      grade: gradesMap.get(evaluation.id) ?? null
    }));

    // 5. Cálculos de Domínio
    const average = this.calculateAverage(evaluationResults);
    const status = this.calculateStatus(average);

    // 6. Retorna a Entidade
    return {
      student: {
        // Usa o operador de coalescência caso o objeto venha undefined (segurança)
        name: enrollment.student?.name ?? "N/A",
        registrationNumber: enrollment.student?.registrationNumber ?? "N/A"
      },
      classInfo: {
        name: enrollment.classInfo?.name ?? "N/A",
        semester: enrollment.classInfo?.semester ?? "N/A"
      },
      evaluations: evaluationResults,
      average,
      status,
      generatedAt: new Date()
    };
  }

  private calculateAverage(
    evaluations: { grade: number | null; weight: number }[]
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

  private calculateStatus(average: number): 'Aprovado' | 'Reprovado' | 'Recuperação' {
    if (average >= 7) return 'Aprovado';
    if (average >= 5) return 'Recuperação';
    return 'Reprovado';
  }
}

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
    
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);
      if(!enrollment) {
        throw new AppError('Enrollment not found', 404);
      }

    const [evaluations, grades] = await Promise.all([
      this.evaluationRepository.findByClass(enrollment.classId),
      this.gradeRepository.findByEnrollment(enrollmentId)
    ]);


    // const totalWeight = evaluations.reduce((acc, curr) => acc + curr.weight, 0);
    
    const gradesMap = new Map(
      grades.map(g => [g.evaluationId, g.value])
    );

    const evaluationResults = evaluations.map(evaluation => {
      const rawGrade = gradesMap.get(evaluation.id) ?? null;
      
      // let weightedGrade: number | null = null;
      // weightedGrade = rawGrade !== null ? Number(((rawGrade * evaluation.weight) / totalWeight).toFixed(2)) : null;
      //padrão funcional com nota ponderada, matematicamente correto.
      const weightedGrade = rawGrade !== null 
        ? Number((rawGrade * evaluation.weight).toFixed(2)) 
        : null;

      return {
        type: evaluation.type as string,
        weight: evaluation.weight,
        grade: rawGrade,        
        weightedGrade: weightedGrade 
      };
    });

    // 5. Cálculos de Domínio (Média Final)
    const average = this.calculateAverage(evaluationResults);
    const status = this.calculateStatus(average);

    return {
      student: {
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

  // O cálculo da média continua o mesmo (Soma Ponderada / Soma dos Pesos)
  private calculateAverage(evaluations: { grade: number | null; weight: number }[]): number {
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
